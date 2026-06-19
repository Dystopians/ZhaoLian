import { evidenceRecords, getEvidence } from '../content/content';
import type { EvidenceRecord, GameState } from '../types/content';

export class EvidenceStore {
  all(): EvidenceRecord[] {
    return evidenceRecords;
  }

  acquired(state: GameState): EvidenceRecord[] {
    return state.evidenceIds.map((id) => getEvidence(id));
  }

  metaOnly(state: GameState): EvidenceRecord[] {
    return state.metaEvidenceIds
      .filter((id) => !state.evidenceIds.includes(id))
      .map((id) => getEvidence(id));
  }
}
