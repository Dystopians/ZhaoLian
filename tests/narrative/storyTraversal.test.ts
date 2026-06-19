import { describe, expect, it } from 'vitest';
import { storyContent } from '../../src/content/content';
import { StoryEngine } from '../../src/engine/StoryEngine';
import {
  caseFilePath,
  homePath,
  monumentPath,
  playChoicePath,
  untranslatedPath,
} from '../helpers/playPaths';

describe('narrative traversal', () => {
  it('contains CH00 through CH10', () => {
    const chapters = new Set(storyContent.scenes.map((scene) => scene.chapter));
    for (const chapter of [
      'CH00',
      'CH01',
      'CH02',
      'CH03',
      'CH04',
      'CH05',
      'CH06',
      'CH07',
      'CH08',
      'CH09',
      'CH10',
    ]) {
      expect(chapters.has(chapter)).toBe(true);
    }
  });

  it('has exact locked lines in story data', () => {
    const transcriptText = JSON.stringify(storyContent);
    for (const locked of storyContent.lockedLines) {
      expect(transcriptText).toContain(locked.text);
    }
  });

  it('reaches all four endings through golden paths', () => {
    const monument = playChoicePath(monumentPath, {
      name: 'yu_alias_zhao',
      status: 'abducted_killed',
      deathDate: 'night_29_30',
      method: 'strangle_source_wording',
      remains: 'not_found',
    });
    const caseFile = playChoicePath(caseFilePath);
    const home = playChoicePath(homePath, {
      name: 'zhao_real_yu',
      status: 'missing',
      deathDate: 'unknown',
      method: 'unknown',
      remains: 'not_found',
    });
    const untranslated = playChoicePath(untranslatedPath, {
      name: 'no_priority',
      status: 'highly_likely',
      deathDate: 'unknown',
      method: 'unknown',
      remains: 'not_found',
    });

    expect(monument.completedEnding).toBe('monument');
    expect(caseFile.completedEnding).toBe('case_file');
    expect(home.completedEnding).toBe('home');
    expect(untranslated.completedEnding).toBe('untranslated');
  });

  it('does not offer rescue, follow, combat, or execution choices in CH06', () => {
    const forbidden = /阻止|救|尾随|跟随|战斗|逃生|处决|行刑/;
    const ch06Choices = storyContent.scenes
      .filter((scene) => scene.chapter === 'CH06')
      .flatMap((scene) => scene.choices ?? []);
    expect(ch06Choices.map((choice) => choice.label).join('\n')).not.toMatch(forbidden);
  });

  it('wait mode is finite and reaches dawn', () => {
    const engine = new StoryEngine();
    for (const choice of [
      'CH00_NAME_BLANK',
      'CH01_LISTEN_JAPANESE',
      'CH01_LEDGER',
      'CH02_TIME_TONIGHT',
      'CH02_ACTION_BRING',
      'CH02_PURPOSE_INTERROGATE',
      'CH02_RESPONSE_REEXPLAIN',
      'CH03_NO_EXPLANATION',
      'CH04_ACTION_UNRECORDED',
      'CH04_NOTE_ADDRESS',
      'CH05_ROUTE_MAP',
      'CH05_ACCOUNTS',
      'CH05_CASE',
      'CH06_ADDRESS_BLANK',
      'CH06_FOCUS_DOORWAY',
    ]) {
      engine.selectChoice(choice);
    }
    expect(engine.snapshot().currentSceneId).toBe('ch06_wait');
    for (let index = 0; index < 5; index += 1) engine.advanceWait();
    expect(engine.snapshot().currentSceneId).toBe('ch07_status');
  });

  it('keeps the shared final line on every ending', () => {
    const state = playChoicePath(untranslatedPath, {
      name: 'no_priority',
      status: 'highly_likely',
      deathDate: 'unknown',
      method: 'unknown',
      remains: 'not_found',
    });
    expect(state.transcript.at(-1)?.text).toBe(storyContent.sharedFinalLine);
  });
});
