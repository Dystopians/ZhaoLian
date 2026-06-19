import { getEnding, getScene, storyContent } from '../content/content';
import { buildReportResult } from '../report/ReportBuilder';
import { clampEditorial, createInitialGameState } from '../state/initialState';
import type {
  ChoiceEffects,
  EndingId,
  GameState,
  ReportDraft,
  StoryChoice,
  StoryScene,
  TextBlock,
  TranscriptEntry,
} from '../types/content';

function uniquePush(target: string[], values: string[] | undefined): void {
  for (const value of values ?? []) {
    if (!target.includes(value)) target.push(value);
  }
}

function transcriptEntries(sceneId: string, blocks: TextBlock[]): TranscriptEntry[] {
  return blocks.map((block) => ({ ...block, sceneId }));
}

function selectedForScene(state: GameState, sceneId: string): string[] {
  return state.selectedChoiceIds[sceneId] ?? [];
}

function applyEffects(state: GameState, effects: ChoiceEffects): void {
  for (const [key, delta] of Object.entries(effects.editorial ?? {})) {
    const editorialKey = key as keyof GameState['editorial'];
    state.editorial[editorialKey] = clampEditorial(state.editorial[editorialKey] + delta);
  }

  uniquePush(state.evidenceIds, effects.evidenceIds);
  uniquePush(state.claimIdsSeen, effects.claimIds);

  if (effects.set) {
    state.flags = { ...state.flags, ...effects.set };
  }

  if (effects.questionQuality) {
    state.questionQuality = { ...state.questionQuality, ...effects.questionQuality };
  }
}

export class StoryEngine {
  private state: GameState;

  constructor(state = createInitialGameState()) {
    this.state = structuredClone(state);
    if (this.state.transcript.length === 0) {
      this.appendSceneEntry(this.state.currentSceneId);
    }
  }

  snapshot(): GameState {
    return structuredClone(this.state);
  }

  currentScene(): StoryScene {
    return getScene(this.state.currentSceneId);
  }

  availableChoices(): StoryChoice[] {
    const scene = this.currentScene();
    const choices = scene.choices ?? [];
    const selected = selectedForScene(this.state, scene.id);

    return choices.filter((choice) => {
      if (selected.includes(choice.id)) return false;
      if (scene.mode !== 'interview' || !choice.witness || !scene.interviewRules) return true;
      return (this.state.interviewCounts[choice.witness] ?? 0) < scene.interviewRules.maxPerWitness;
    });
  }

  selectChoice(choiceId: string): GameState {
    const scene = this.currentScene();
    const choice = this.availableChoices().find((candidate) => candidate.id === choiceId);
    if (!choice) {
      throw new Error(`Choice is not available in ${scene.id}: ${choiceId}`);
    }

    this.markChoice(scene.id, choice.id);
    if (scene.mode === 'interview' && choice.witness) {
      this.state.interviewCounts[choice.witness] =
        (this.state.interviewCounts[choice.witness] ?? 0) + 1;
    }

    applyEffects(this.state, choice.effects);
    this.state.transcript.push(...transcriptEntries(scene.id, choice.response));

    if (this.isSceneComplete(scene)) {
      this.completeAndAdvance(scene);
    }

    this.touch(scene.id);
    return this.snapshot();
  }

  advanceWait(): GameState {
    const scene = this.currentScene();
    if (scene.mode !== 'wait' || !scene.waitSteps) {
      throw new Error(`Current scene is not wait mode: ${scene.id}`);
    }

    const step = scene.waitSteps[this.state.waitIndex];
    if (!step) {
      throw new Error(`No wait step ${this.state.waitIndex} in ${scene.id}`);
    }

    this.state.transcript.push({
      id: step.id,
      text: step.text,
      classes: ['R'],
      sceneId: scene.id,
      claimIds: ['HIS-017'],
    });
    this.state.transcript.push({
      id: `${step.id}_caption`,
      text: step.caption,
      classes: ['R'],
      sceneId: scene.id,
      claimIds: ['HIS-017'],
    });
    this.state.waitIndex += 1;

    if (this.state.waitIndex >= scene.waitSteps.length) {
      this.state.waitIndex = 0;
      this.advanceTo(scene.nextSceneId);
    }

    this.touch(scene.id);
    return this.snapshot();
  }

  confirmReport(draft: ReportDraft): GameState {
    const scene = this.currentScene();
    if (scene.mode !== 'report') {
      throw new Error(`Current scene is not report mode: ${scene.id}`);
    }

    const report = buildReportResult(this.state, draft);
    this.state.reportDraft = { ...draft };
    this.state.reportWarnings = report.warnings;
    this.state.reportText = report.text;
    this.state.completedEnding = report.endingId;
    uniquePush(this.state.evidenceIds, ['E_REPORT_UNKNOWN_FIELDS']);
    uniquePush(this.state.claimIdsSeen, ['HIS-022', 'HIS-023']);

    this.appendEnding(report.endingId);
    this.touch(scene.id);
    return this.snapshot();
  }

  private appendSceneEntry(sceneId: string): void {
    const scene = getScene(sceneId);
    this.state.transcript.push(...transcriptEntries(scene.id, scene.entry));
    for (const block of scene.entry) {
      uniquePush(this.state.evidenceIds, block.evidenceIds);
      uniquePush(this.state.claimIdsSeen, block.claimIds);
    }
  }

  private markChoice(sceneId: string, choiceId: string): void {
    const selected = selectedForScene(this.state, sceneId);
    this.state.selectedChoiceIds = {
      ...this.state.selectedChoiceIds,
      [sceneId]: [...selected, choiceId],
    };
  }

  private isSceneComplete(scene: StoryScene): boolean {
    const selectedCount = selectedForScene(this.state, scene.id).length;
    if (scene.mode === 'interview' && scene.interviewRules) {
      return selectedCount >= scene.interviewRules.totalRequired;
    }
    return selectedCount >= (scene.requiredChoiceCount ?? 1);
  }

  private completeAndAdvance(scene: StoryScene): void {
    if (scene.completion) {
      this.state.transcript.push(...transcriptEntries(scene.id, scene.completion));
      for (const block of scene.completion) {
        uniquePush(this.state.evidenceIds, block.evidenceIds);
        uniquePush(this.state.claimIdsSeen, block.claimIds);
      }
    }
    this.advanceTo(scene.nextSceneId);
  }

  private advanceTo(sceneId: string | undefined): void {
    if (!sceneId) return;
    this.state.currentSceneId = sceneId;
    this.state.checkpoint = sceneId;
    this.appendSceneEntry(sceneId);
  }

  private appendEnding(endingId: EndingId): void {
    const ending = getEnding(endingId);
    const sceneId = `ending_${ending.id}`;
    this.state.currentSceneId = sceneId;
    this.state.checkpoint = sceneId;
    this.state.transcript.push(
      {
        id: `${sceneId}_title`,
        sceneId,
        text: `结局：${ending.code}｜${ending.title}`,
        classes: ['R'],
        claimIds: ['HIS-023'],
      },
      ...(this.state.reportText
        ? [
            {
              id: `${sceneId}_report`,
              sceneId,
              text: this.state.reportText,
              classes: ['L' as const, 'U' as const],
              claimIds: ['HIS-009', 'HIS-012', 'HIS-022'],
            },
          ]
        : []),
      ...transcriptEntries(sceneId, ending.paragraphs),
      {
        id: 'LOCK_SHARED_FINAL',
        sceneId,
        text: storyContent.sharedFinalLine,
        classes: ['R'],
        lockedId: 'LOCK_SHARED_FINAL',
        claimIds: ['HIS-023'],
      },
    );
  }

  private touch(previousSceneId: string): void {
    this.state.updatedAt = new Date().toISOString();
    this.state.checkpoint = this.state.currentSceneId || previousSceneId;
  }
}
