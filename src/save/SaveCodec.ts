import { SAVE_VERSION } from '../state/initialState';
import type { GameState } from '../types/content';

export interface SaveEnvelope {
  format: 'zhao-lian-save';
  saveVersion: number;
  contentVersion: string;
  exportedAt: string;
  payload: GameState;
  checksum?: string;
}

const MAX_SAVE_BYTES = 500_000;

export function encodeSave(state: GameState): string {
  const envelope: SaveEnvelope = {
    format: 'zhao-lian-save',
    saveVersion: SAVE_VERSION,
    contentVersion: state.contentVersion,
    exportedAt: new Date().toISOString(),
    payload: state,
  };
  return JSON.stringify(envelope, null, 2);
}

function hasForbiddenKey(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false;
  for (const key of Object.keys(value)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') return true;
    const nested = (value as Record<string, unknown>)[key];
    if (hasForbiddenKey(nested)) return true;
  }
  return false;
}

export function decodeSave(input: string): SaveEnvelope {
  const bytes = new TextEncoder().encode(input).byteLength;
  if (bytes > MAX_SAVE_BYTES) {
    throw new Error('存档文件过大，已拒绝导入。');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch {
    throw new Error('存档不是有效 JSON。');
  }

  if (hasForbiddenKey(parsed)) {
    throw new Error('存档包含不安全对象键，已拒绝导入。');
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('存档结构无效。');
  }

  const envelope = parsed as Partial<SaveEnvelope>;
  if (envelope.format !== 'zhao-lian-save') {
    throw new Error('存档格式不匹配。');
  }
  if (envelope.saveVersion !== SAVE_VERSION) {
    throw new Error(`不支持的存档版本：${String(envelope.saveVersion)}。`);
  }
  if (!envelope.payload || typeof envelope.payload !== 'object') {
    throw new Error('存档缺少 payload。');
  }

  const payload = envelope.payload as Partial<GameState>;
  if (typeof payload.currentSceneId !== 'string' || !Array.isArray(payload.transcript)) {
    throw new Error('存档缺少当前场景或文本记录。');
  }
  if (!Array.isArray(payload.evidenceIds) || !Array.isArray(payload.claimIdsSeen)) {
    throw new Error('存档证据结构无效。');
  }

  return envelope as SaveEnvelope;
}
