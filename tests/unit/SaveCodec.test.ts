import { describe, expect, it } from 'vitest';
import { decodeSave, encodeSave } from '../../src/save/SaveCodec';
import { createInitialGameState } from '../../src/state/initialState';

describe('SaveCodec', () => {
  it('round-trips a versioned save envelope', () => {
    const state = createInitialGameState(new Date('2026-06-19T00:00:00.000Z'));
    const encoded = encodeSave(state);
    const decoded = decodeSave(encoded);
    expect(decoded.format).toBe('zhao-lian-save');
    expect(decoded.saveVersion).toBe(1);
    expect(decoded.payload.currentSceneId).toBe('ch00_archive_name');
  });

  it('rejects corrupt JSON safely', () => {
    expect(() => decodeSave('{not json')).toThrow('有效 JSON');
  });

  it('rejects oversized saves', () => {
    expect(() => decodeSave('x'.repeat(500_001))).toThrow('过大');
  });

  it('rejects future versions', () => {
    const state = createInitialGameState();
    const envelope = JSON.parse(encodeSave(state)) as Record<string, unknown>;
    envelope.saveVersion = 999;
    expect(() => decodeSave(JSON.stringify(envelope))).toThrow('不支持');
  });

  it('rejects prototype pollution keys', () => {
    const state = createInitialGameState();
    const payload = JSON.parse(encodeSave(state)) as Record<string, unknown>;
    const malicious = JSON.stringify(payload).replace(
      '"payload":{',
      '"payload":{"__proto__":{"polluted":true},',
    );
    expect(() => decodeSave(malicious)).toThrow('不安全');
  });
});
