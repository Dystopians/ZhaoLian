export type SourceClass = 'D' | 'T' | 'L' | 'C' | 'R' | 'U';
export type Confidence = 'high' | 'medium' | 'low' | 'disputed';
export type SceneMode = 'standard' | 'wait' | 'interview' | 'report' | 'comparison';
export type EndingId =
  | 'monument'
  | 'case_file'
  | 'home'
  | 'untranslated'
  | 'testimony_weave'
  | 'delay_shadow';
export type QuestionMode = 'leading' | 'neutral' | 'narrative';

export interface TextBlock {
  id: string;
  text: string;
  classes: SourceClass[];
  lockedId?: string;
  evidenceIds?: string[];
  claimIds?: string[];
}

export interface ChoiceEffects {
  editorial?: Partial<Record<'rigor' | 'care' | 'closure' | 'suspicion', number>>;
  evidenceIds?: string[];
  claimIds?: string[];
  set?: Partial<RunFlags>;
  questionQuality?: Record<string, QuestionMode>;
}

export interface StoryChoice {
  id: string;
  label: string;
  response: TextBlock[];
  effects: ChoiceEffects;
  witness?: string;
  questionMode?: QuestionMode;
}

export interface WaitStep {
  id: string;
  label: string;
  text: string;
  caption: string;
}

export interface InterviewRules {
  totalRequired: number;
  maxPerWitness: number;
}

export interface StoryScene {
  id: string;
  chapter: string;
  title: string;
  dateLabel: string;
  locationLabel: string;
  historicalClasses: SourceClass[];
  mode: SceneMode;
  visual?: string;
  ambience?: string;
  sfx?: string;
  requiredChoiceCount?: number;
  entry: TextBlock[];
  choices?: StoryChoice[];
  completion?: TextBlock[];
  nextSceneId?: string;
  waitSteps?: WaitStep[];
  interviewRules?: InterviewRules;
}

export interface ReportOption {
  id: string;
  label: string;
  warning: string;
  rigor?: number;
  care?: number;
  closure?: number;
  disputed?: boolean;
  blank?: boolean;
}

export interface ReportField {
  id: keyof ReportDraft;
  legend: string;
  options: ReportOption[];
}

export interface EndingContent {
  id: EndingId;
  code: string;
  numberLabel: string;
  title: string;
  conditionLabel: string;
  paragraphs: TextBlock[];
}

export interface LockedLine {
  id: string;
  text: string;
}

export interface StoryContent {
  contentVersion: string;
  startSceneId: string;
  sharedFinalLine: string;
  lockedLines: LockedLine[];
  scenes: StoryScene[];
  reportFields: ReportField[];
  endings: EndingContent[];
  methodology: string[];
}

export interface EvidenceRecord {
  id: string;
  title: string;
  summary: string;
  sourceClass: SourceClass;
  confidence: Confidence;
  acquiredAtScene: string;
  claimIds: string[];
  sourceIds: string[];
  runProvenance: {
    choiceId?: string;
    questionMode?: QuestionMode;
    focus?: string;
  };
  appendixEligible: boolean;
}

export interface ClaimRecord {
  id: string;
  shortLabel: string;
  statement: string;
  sourceClass: SourceClass;
  confidence: Confidence;
  sourceIds: string[];
  supportingEvidenceIds: string[];
  conflictingClaimIds: string[];
  publicAppendixAllowed: boolean;
  editorialNote: string;
  lastReviewed: string;
  reviewedBy: string;
}

export interface SourceRecord {
  id: string;
  title: string;
  authorOrInstitution: string;
  publication: string;
  date?: string;
  url?: string;
  language: 'zh' | 'ja' | 'id' | 'en' | 'other';
  sourceType:
    | 'primary'
    | 'testimony'
    | 'scholarship'
    | 'journalism'
    | 'institutional'
    | 'technical';
  accessStatus: 'verified' | 'to-review' | 'unavailable';
  notes: string;
  licenseOrQuotationPolicy?: string;
}

export interface GlossaryEntry {
  id: string;
  term: string;
  latin: string;
  definition: string;
}

export interface TimelineEntry {
  id: string;
  date: string;
  kind: string;
  label: string;
  claimIds: string[];
}

export interface AssetRecord {
  id: string;
  filePath: string;
  type: string;
  creator: string;
  sourceUrlOrContract: string;
  license: string;
  attributionText: string;
  modifications: string;
  historicalSubject: string;
  altTextOrDecorative: string;
  reviewStatus: 'BLOCKOUT' | 'DRAFT' | 'REVIEW' | 'FINAL' | 'REVIEWED';
  reviewer: string;
  date: string;
}

export interface CreditsContent {
  title: string;
  projectCreated: string[];
  humanReviewGates: string[];
  privacy: string;
  licenseNote: string;
}

export interface EditorialState {
  rigor: number;
  care: number;
  closure: number;
  suspicion: number;
}

export interface RunFlags {
  openingName: 'yu' | 'zhao' | 'blank';
  addressRecord: 'yu' | 'zhao' | 'blank';
  lastFocus: 'doorway' | 'coffee_shop' | 'road';
  translationTime?: 'tonight' | 'tomorrow' | 'days';
  translationAction?: 'bring' | 'invite' | 'check';
  translationPurpose?: 'interrogate' | 'register' | 'talk';
  householdStatus?: 'late' | 'missing' | 'unknown';
}

export interface ReportDraft {
  name: string;
  status: string;
  deathDate: string;
  method: string;
  remains: string;
}

export interface TranscriptEntry extends TextBlock {
  sceneId: string;
  announced?: boolean;
}

export interface GameState {
  saveVersion: number;
  contentVersion: string;
  runId: string;
  startedAt: string;
  updatedAt: string;
  currentSceneId: string;
  checkpoint: string;
  editorial: EditorialState;
  flags: RunFlags;
  evidenceIds: string[];
  metaEvidenceIds: string[];
  claimIdsSeen: string[];
  selectedChoiceIds: Record<string, string[]>;
  questionQuality: Record<string, QuestionMode>;
  interviewCounts: Record<string, number>;
  waitIndex: number;
  transcript: TranscriptEntry[];
  reportDraft: ReportDraft;
  reportWarnings: string[];
  reportText?: string;
  completedEnding?: EndingId;
}

export interface SettingsState {
  version: number;
  textScale: number;
  lineHeight: number;
  instantText: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  textureFree: boolean;
  masterVolume: number;
  ambienceVolume: number;
  effectsVolume: number;
  captionsForSound: boolean;
  sourceMode: boolean;
  locale: string;
}
