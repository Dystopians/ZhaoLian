import type { EndingId, GameState, ReportDraft } from '../types/content';

export interface EndingInputs {
  editorial: GameState['editorial'];
  evidenceIds: string[];
  flags: GameState['flags'];
  reportDraft: ReportDraft;
}

export function countPreservedBlanks(inputs: EndingInputs): number {
  let count = 0;
  if (inputs.flags.addressRecord === 'blank') count += 1;
  if (inputs.reportDraft.deathDate === 'unknown') count += 1;
  if (inputs.reportDraft.method === 'unknown') count += 1;
  if (inputs.reportDraft.remains === 'not_found') count += 1;
  if (inputs.reportDraft.name === 'no_priority') count += 1;
  return count;
}

export function countPreciseDisputedFields(reportDraft: ReportDraft): number {
  let count = 0;
  if (reportDraft.deathDate === 'night_29_30' || reportDraft.deathDate === 'sep_17') count += 1;
  if (reportDraft.method === 'strangle_source_wording' || reportDraft.method === 'shooting')
    count += 1;
  return count;
}

export function countHouseholdEvidence(evidenceIds: string[]): number {
  const household = ['E_CLOGS', 'E_SLEEPWEAR', 'E_DAUGHTER_BIRTH', 'E_WIFE_SEARCH_DECISION'];
  return household.filter((id) => evidenceIds.includes(id)).length;
}

export function evaluateEnding(inputs: EndingInputs): EndingId {
  const preservedBlankCount = countPreservedBlanks(inputs);
  const householdEvidenceCount = countHouseholdEvidence(inputs.evidenceIds);
  const preciseDisputedFields = countPreciseDisputedFields(inputs.reportDraft);

  if (inputs.editorial.rigor >= 8 && inputs.editorial.closure <= 3 && preservedBlankCount >= 2) {
    return 'untranslated';
  }

  if (inputs.editorial.care >= 7 && householdEvidenceCount >= 3) {
    return 'home';
  }

  if (inputs.editorial.closure >= 8 && preciseDisputedFields >= 2) {
    return 'monument';
  }

  return 'case_file';
}
