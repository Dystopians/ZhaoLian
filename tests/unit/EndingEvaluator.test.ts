import { describe, expect, it } from 'vitest';
import { evaluateEnding } from '../../src/report/EndingEvaluator';

describe('EndingEvaluator', () => {
  it('prefers untranslated when rigor is high and blanks are preserved', () => {
    expect(
      evaluateEnding({
        editorial: { rigor: 9, care: 2, closure: 2, suspicion: 0 },
        evidenceIds: ['E_CLOGS', 'E_SLEEPWEAR'],
        flags: { openingName: 'blank', addressRecord: 'blank', lastFocus: 'doorway' },
        reportDraft: {
          name: 'no_priority',
          status: 'highly_likely',
          deathDate: 'unknown',
          method: 'unknown',
          remains: 'not_found',
        },
      }),
    ).toBe('untranslated');
  });

  it('selects home when care and household evidence are high', () => {
    expect(
      evaluateEnding({
        editorial: { rigor: 2, care: 8, closure: 2, suspicion: 0 },
        evidenceIds: ['E_CLOGS', 'E_SLEEPWEAR', 'E_DAUGHTER_BIRTH', 'E_WIFE_SEARCH_DECISION'],
        flags: { openingName: 'zhao', addressRecord: 'zhao', lastFocus: 'doorway' },
        reportDraft: {
          name: 'zhao_real_yu',
          status: 'missing',
          deathDate: 'unknown',
          method: 'unknown',
          remains: 'not_found',
        },
      }),
    ).toBe('home');
  });

  it('selects monument for high closure and precise disputed fields', () => {
    expect(
      evaluateEnding({
        editorial: { rigor: 2, care: 2, closure: 9, suspicion: 0 },
        evidenceIds: ['E_EARLY_REPORT_CLUSTER', 'E_LATER_INVESTIGATION_CLUSTER'],
        flags: { openingName: 'yu', addressRecord: 'yu', lastFocus: 'road' },
        reportDraft: {
          name: 'yu_alias_zhao',
          status: 'abducted_killed',
          deathDate: 'night_29_30',
          method: 'strangle_source_wording',
          remains: 'not_found',
        },
      }),
    ).toBe('monument');
  });

  it('falls back to case file on ties', () => {
    expect(
      evaluateEnding({
        editorial: { rigor: 4, care: 4, closure: 4, suspicion: 0 },
        evidenceIds: ['E_NAME_EXPOSED'],
        flags: { openingName: 'blank', addressRecord: 'zhao', lastFocus: 'coffee_shop' },
        reportDraft: {
          name: 'dual',
          status: 'highly_likely',
          deathDate: 'unknown',
          method: 'unknown',
          remains: 'not_found',
        },
      }),
    ).toBe('case_file');
  });
});
