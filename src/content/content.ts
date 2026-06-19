import story from '../../content/story.zh-CN.json';
import evidence from '../../content/evidence.zh-CN.json';
import claims from '../../content/claims.zh-CN.json';
import sources from '../../content/sources.json';
import glossary from '../../content/glossary.zh-CN.json';
import timeline from '../../content/timeline.zh-CN.json';
import assets from '../../content/assets.json';
import credits from '../../content/credits.zh-CN.json';
import type {
  AssetRecord,
  ClaimRecord,
  CreditsContent,
  EvidenceRecord,
  GlossaryEntry,
  SourceRecord,
  StoryContent,
  StoryScene,
  TimelineEntry,
  EndingId,
} from '../types/content';

export const storyContent = story as StoryContent;
export const evidenceRecords = evidence as EvidenceRecord[];
export const claimRecords = claims as ClaimRecord[];
export const sourceRecords = sources as SourceRecord[];
export const glossaryEntries = glossary as GlossaryEntry[];
export const timelineEntries = timeline as TimelineEntry[];
export const assetRecords = assets as AssetRecord[];
export const creditsContent: CreditsContent = credits;

const sceneMap = new Map(storyContent.scenes.map((scene) => [scene.id, scene]));
const endingMap = new Map(storyContent.endings.map((ending) => [ending.id, ending]));
const evidenceMap = new Map(evidenceRecords.map((record) => [record.id, record]));
const claimMap = new Map(claimRecords.map((record) => [record.id, record]));
const sourceMap = new Map(sourceRecords.map((record) => [record.id, record]));

export function getScene(sceneId: string): StoryScene {
  const scene = sceneMap.get(sceneId);
  if (!scene) {
    throw new Error(`Unknown scene: ${sceneId}`);
  }
  return scene;
}

export function getEnding(endingId: EndingId) {
  const ending = endingMap.get(endingId);
  if (!ending) {
    throw new Error(`Unknown ending: ${endingId}`);
  }
  return ending;
}

export function getEvidence(evidenceId: string): EvidenceRecord {
  const record = evidenceMap.get(evidenceId);
  if (!record) {
    throw new Error(`Unknown evidence: ${evidenceId}`);
  }
  return record;
}

export function getClaim(claimId: string): ClaimRecord {
  const record = claimMap.get(claimId);
  if (!record) {
    throw new Error(`Unknown claim: ${claimId}`);
  }
  return record;
}

export function getSource(sourceId: string): SourceRecord {
  const record = sourceMap.get(sourceId);
  if (!record) {
    throw new Error(`Unknown source: ${sourceId}`);
  }
  return record;
}

export const sourceClassLabels: Record<string, string> = {
  D: '文献',
  T: '证言',
  L: '后来调查',
  C: '复合',
  R: '重构',
  U: '未决',
};
