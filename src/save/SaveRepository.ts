import { decodeSave, encodeSave } from './SaveCodec';
import type { GameState } from '../types/content';

const DB_NAME = 'zhao-lian-casefile';
const STORE_NAME = 'saves';
const AUTOSAVE_KEY = 'autosave';
const FALLBACK_KEY = 'zhao-lian-autosave';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onerror = () => reject(request.error ?? new Error('无法打开 IndexedDB。'));
    request.onsuccess = () => resolve(request.result);
  });
}

export class SaveRepository {
  async saveAutosave(state: GameState): Promise<void> {
    const encoded = encodeSave(state);
    localStorage.setItem(FALLBACK_KEY, encoded);
    if (!('indexedDB' in window)) return;

    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).put(encoded, AUTOSAVE_KEY);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error('无法写入存档。'));
    });
    db.close();
  }

  async loadAutosave(): Promise<GameState | null> {
    const fallback = localStorage.getItem(FALLBACK_KEY);
    if (!('indexedDB' in window)) {
      return fallback ? decodeSave(fallback).payload : null;
    }

    try {
      const db = await openDb();
      const encoded = await new Promise<string | undefined>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const request = transaction.objectStore(STORE_NAME).get(AUTOSAVE_KEY);
        request.onsuccess = () => resolve(request.result as string | undefined);
        request.onerror = () => reject(request.error ?? new Error('无法读取存档。'));
      });
      db.close();
      if (encoded) return decodeSave(encoded).payload;
    } catch {
      if (fallback) return decodeSave(fallback).payload;
    }
    return fallback ? decodeSave(fallback).payload : null;
  }

  async deleteAutosave(): Promise<void> {
    localStorage.removeItem(FALLBACK_KEY);
    if (!('indexedDB' in window)) return;
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).delete(AUTOSAVE_KEY);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error('无法删除存档。'));
    });
    db.close();
  }

  exportAutosave(state: GameState): Blob {
    return new Blob([encodeSave(state)], { type: 'application/json;charset=utf-8' });
  }
}
