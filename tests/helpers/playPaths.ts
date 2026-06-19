import { StoryEngine } from '../../src/engine/StoryEngine';
import type { GameState, ReportDraft } from '../../src/types/content';

export const commonIntroPath = [
  'CH01_LISTEN_JAPANESE',
  'CH01_ASK_RETURNED',
  'CH02_TIME_TOMORROW',
  'CH02_ACTION_CHECK_NAMES',
  'CH02_PURPOSE_INTERROGATE',
  'CH02_RESPONSE_ACCENT',
  'CH03_NO_EXPLANATION',
  'CH04_ACTION_UNRECORDED',
  'CH04_NOTE_ADDRESS',
  'CH05_ACCOUNTS',
  'CH05_ALIAS_PAPER',
  'CH05_ROUTE_MAP',
  'CH06_ADDRESS_BLANK',
  'CH06_FOCUS_DOORWAY',
] as const;

export function advanceAllWait(engine: StoryEngine): void {
  for (let index = 0; index < 5; index += 1) {
    engine.advanceWait();
  }
}

export function playChoicePath(
  choices: readonly string[],
  reportDraft: ReportDraft = {
    name: 'dual',
    status: 'highly_likely',
    deathDate: 'unknown',
    method: 'unknown',
    remains: 'not_found',
  },
): GameState {
  const engine = new StoryEngine();
  for (const choice of choices) {
    engine.selectChoice(choice);
    if (engine.snapshot().currentSceneId === 'ch06_wait') {
      advanceAllWait(engine);
    }
  }
  while (engine.snapshot().currentSceneId === 'ch06_wait') {
    advanceAllWait(engine);
  }
  if (engine.snapshot().currentSceneId !== 'ch10_final_report') {
    throw new Error(`Path did not reach report: ${engine.snapshot().currentSceneId}`);
  }
  return engine.confirmReport(reportDraft);
}

export const untranslatedPath = [
  'CH00_NAME_ZHAO',
  ...commonIntroPath,
  'CH07_STATUS_UNKNOWN',
  'CH07_SEARCH_COFFEE',
  'CH07_SEARCH_ROAD',
  'CH08_COFFEE_NEUTRAL',
  'CH08_COFFEE_NARRATIVE',
  'CH08_ROAD_NEUTRAL',
  'CH08_ROAD_NARRATIVE',
  'CH08_HOUSE_CLOTHING',
  'CH08_HOUSE_ADDRESS',
  'CH09_PIN_LATER',
  'CH09_MARK_CONFLICT',
] as const;

export const monumentPath = [
  'CH00_NAME_YU',
  'CH01_LISTEN_JAPANESE',
  'CH01_LEDGER',
  'CH02_TIME_DAYS',
  'CH02_ACTION_BRING',
  'CH02_PURPOSE_REGISTER',
  'CH02_RESPONSE_WINE',
  'CH03_EXPOSED_FEAR',
  'CH04_ACTION_HAND_STOPS',
  'CH04_NOTE_CALM',
  'CH05_ROUTE_MAP',
  'CH05_CASE',
  'CH05_ALIAS_PAPER',
  'CH06_ADDRESS_YU',
  'CH06_FOCUS_ROAD',
  'CH07_STATUS_MISSING',
  'CH07_SEARCH_POST',
  'CH07_SEARCH_ROAD',
  'CH08_COFFEE_LEADING',
  'CH08_ROAD_LEADING',
  'CH08_HOUSE_LAST',
  'CH08_HOUSE_CLOTHING',
  'CH08_COFFEE_NEUTRAL',
  'CH08_ROAD_NEUTRAL',
  'CH09_PIN_EARLY',
  'CH09_PIN_LATER',
] as const;

export const homePath = [
  'CH00_NAME_ZHAO',
  'CH01_ASK_RETURNED',
  'CH01_LEDGER',
  'CH02_TIME_TOMORROW',
  'CH02_ACTION_INVITE',
  'CH02_PURPOSE_TALK',
  'CH02_RESPONSE_WINE',
  'CH03_COMPANION_FEAR',
  'CH04_ACTION_POURS',
  'CH04_NOTE_HOSTING',
  'CH05_ACCOUNTS',
  'CH05_ALIAS_PAPER',
  'CH05_CASE',
  'CH06_ADDRESS_ZHAO',
  'CH06_FOCUS_DOORWAY',
  'CH07_STATUS_LATE',
  'CH07_SEARCH_FRIENDS',
  'CH07_SEARCH_COFFEE',
  'CH08_COFFEE_NARRATIVE',
  'CH08_ROAD_NARRATIVE',
  'CH08_HOUSE_CLOTHING',
  'CH08_HOUSE_ADDRESS',
  'CH08_COFFEE_NEUTRAL',
  'CH08_ROAD_NEUTRAL',
  'CH09_MARK_CONFLICT',
  'CH09_PIN_LATER',
] as const;

export const caseFilePath = [
  'CH00_NAME_BLANK',
  'CH01_LISTEN_JAPANESE',
  'CH01_LEDGER',
  'CH02_TIME_TONIGHT',
  'CH02_ACTION_INVITE',
  'CH02_PURPOSE_TALK',
  'CH02_RESPONSE_REEXPLAIN',
  'CH03_LANGUAGE_FEAR',
  'CH04_ACTION_POURS',
  'CH04_NOTE_ADDRESS',
  'CH05_ROUTE_MAP',
  'CH05_ACCOUNTS',
  'CH05_CASE',
  'CH06_ADDRESS_ZHAO',
  'CH06_FOCUS_COFFEE',
  'CH07_STATUS_MISSING',
  'CH07_SEARCH_COFFEE',
  'CH07_SEARCH_FRIENDS',
  'CH08_COFFEE_NEUTRAL',
  'CH08_ROAD_NEUTRAL',
  'CH08_HOUSE_LAST',
  'CH08_HOUSE_CLOTHING',
  'CH08_COFFEE_LEADING',
  'CH08_ROAD_NARRATIVE',
  'CH09_PIN_EARLY',
  'CH09_MARK_CONFLICT',
] as const;

export const testimonyWeavePath = [
  'CH00_NAME_BLANK',
  'CH01_LISTEN_JAPANESE',
  'CH01_ASK_RETURNED',
  'CH02_TIME_TOMORROW',
  'CH02_ACTION_CHECK_NAMES',
  'CH02_PURPOSE_TALK',
  'CH02_RESPONSE_REEXPLAIN',
  'CH03_NO_EXPLANATION',
  'CH04_ACTION_UNRECORDED',
  'CH04_NOTE_ADDRESS',
  'CH05_ROUTE_MAP',
  'CH05_ACCOUNTS',
  'CH05_CASE',
  'CH06_ADDRESS_ZHAO',
  'CH06_FOCUS_COFFEE',
  'CH07_STATUS_MISSING',
  'CH07_SEARCH_COFFEE',
  'CH07_SEARCH_ROAD',
  'CH08_COFFEE_NEUTRAL',
  'CH08_COFFEE_NARRATIVE',
  'CH08_ROAD_NEUTRAL',
  'CH08_ROAD_NARRATIVE',
  'CH08_HOUSE_CLOTHING',
  'CH08_HOUSE_ADDRESS',
  'CH09_MARK_CONFLICT',
  'CH09_PIN_LATER',
] as const;

export const delayShadowPath = [
  'CH00_NAME_YU',
  'CH01_LISTEN_JAPANESE',
  'CH01_LEDGER',
  'CH02_TIME_DAYS',
  'CH02_ACTION_CHECK_NAMES',
  'CH02_PURPOSE_INTERROGATE',
  'CH02_RESPONSE_ACCENT',
  'CH03_EXPOSED_FEAR',
  'CH04_ACTION_HAND_STOPS',
  'CH04_NOTE_ADDRESS',
  'CH05_ROUTE_MAP',
  'CH05_ACCOUNTS',
  'CH05_ALIAS_PAPER',
  'CH06_ADDRESS_YU',
  'CH06_FOCUS_COFFEE',
  'CH07_STATUS_UNKNOWN',
  'CH07_SEARCH_POST',
  'CH07_SEARCH_COFFEE',
  'CH08_COFFEE_LEADING',
  'CH08_ROAD_LEADING',
  'CH08_HOUSE_LAST',
  'CH08_COFFEE_NEUTRAL',
  'CH08_ROAD_NEUTRAL',
  'CH08_HOUSE_ADDRESS',
  'CH09_PIN_EARLY',
  'CH09_MARK_CONFLICT',
] as const;
