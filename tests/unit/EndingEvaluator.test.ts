import { describe, expect, it } from 'vitest';
import { evaluateEnding } from '../../src/report/EndingEvaluator';

describe('EndingEvaluator', () => {
  it('prefers untranslated when rigor is high and blanks are preserved', () => {
    expect(
      evaluateEnding({
        editorial: { rigor: 9, care: 2, closure: 2, suspicion: 0 },
        evidenceIds: ['E_CLOGS', 'E_SLEEPWEAR'],
        flags: { openingName: 'blank', addressRecord: 'blank', lastFocus: 'doorway' },
        questionQuality: {},
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
        questionQuality: {},
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

  it('does not select untranslated when the caller address was fixed', () => {
    expect(
      evaluateEnding({
        editorial: { rigor: 9, care: 2, closure: 2, suspicion: 0 },
        evidenceIds: ['E_CLOGS', 'E_SLEEPWEAR'],
        flags: { openingName: 'blank', addressRecord: 'zhao', lastFocus: 'doorway' },
        questionQuality: {},
        reportDraft: {
          name: 'no_priority',
          status: 'highly_likely',
          deathDate: 'unknown',
          method: 'unknown',
          remains: 'not_found',
        },
      }),
    ).toBe('case_file');
  });

  it('selects monument for high closure and precise disputed fields', () => {
    expect(
      evaluateEnding({
        editorial: { rigor: 2, care: 2, closure: 9, suspicion: 0 },
        evidenceIds: ['E_EARLY_REPORT_CLUSTER', 'E_LATER_INVESTIGATION_CLUSTER'],
        flags: { openingName: 'yu', addressRecord: 'yu', lastFocus: 'road' },
        questionQuality: {},
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
        questionQuality: {},
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

  it('selects testimony weave for careful cross-witness comparison', () => {
    expect(
      evaluateEnding({
        editorial: { rigor: 9, care: 6, closure: 2, suspicion: 1 },
        evidenceIds: ['E_INTERVIEW_NEUTRAL_METHOD', 'E_INTERVIEW_NARRATIVE_METHOD'],
        flags: { openingName: 'blank', addressRecord: 'zhao', lastFocus: 'coffee_shop' },
        questionQuality: { coffee: 'narrative', road: 'neutral', house: 'neutral' },
        reportDraft: {
          name: 'dual',
          status: 'highly_likely',
          deathDate: 'unknown',
          method: 'unknown',
          remains: 'not_found',
        },
      }),
    ).toBe('testimony_weave');
  });

  it('selects delay shadow when translation delay creates unresolved suspicion', () => {
    expect(
      evaluateEnding({
        editorial: { rigor: 4, care: 2, closure: 6, suspicion: 4 },
        evidenceIds: ['E_TRANSLATION_DELAY_STRONG', 'E_NAME_EXPOSED'],
        flags: {
          openingName: 'yu',
          addressRecord: 'yu',
          lastFocus: 'coffee_shop',
          translationTime: 'days',
          translationAction: 'check',
          translationPurpose: 'interrogate',
        },
        questionQuality: {},
        reportDraft: {
          name: 'dual',
          status: 'highly_likely',
          deathDate: 'unknown',
          method: 'unknown',
          remains: 'not_found',
        },
      }),
    ).toBe('delay_shadow');
  });
});
