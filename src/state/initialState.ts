import { storyContent } from '../content/content';
import type { GameState, ReportDraft, SettingsState } from '../types/content';

export const SAVE_VERSION = 1;

export const defaultReportDraft: ReportDraft = {
  name: 'dual',
  status: 'highly_likely',
  deathDate: 'unknown',
  method: 'unknown',
  remains: 'not_found',
};

export const defaultSettings: SettingsState = {
  version: 1,
  textScale: 1,
  lineHeight: 1.75,
  instantText: true,
  reducedMotion: false,
  highContrast: false,
  textureFree: false,
  masterVolume: 0,
  ambienceVolume: 0,
  effectsVolume: 0,
  captionsForSound: true,
  sourceMode: false,
  locale: 'zh-CN',
};

export function createRunId(): string {
  return globalThis.crypto.randomUUID();
}

export function createInitialGameState(now = new Date()): GameState {
  const timestamp = now.toISOString();
  return {
    saveVersion: SAVE_VERSION,
    contentVersion: storyContent.contentVersion,
    runId: createRunId(),
    startedAt: timestamp,
    updatedAt: timestamp,
    currentSceneId: storyContent.startSceneId,
    checkpoint: storyContent.startSceneId,
    editorial: {
      rigor: 0,
      care: 0,
      closure: 0,
      suspicion: 0,
    },
    flags: {
      openingName: 'blank',
      addressRecord: 'blank',
      lastFocus: 'doorway',
    },
    evidenceIds: [],
    metaEvidenceIds: [],
    claimIdsSeen: [],
    selectedChoiceIds: {},
    questionQuality: {},
    interviewCounts: {},
    waitIndex: 0,
    transcript: [],
    reportDraft: { ...defaultReportDraft },
    reportWarnings: [],
  };
}

export function clampEditorial(value: number): number {
  return Math.max(0, Math.min(20, value));
}
