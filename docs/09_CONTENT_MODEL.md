# 09 — Content and Data Model

All externalized content must be validated at build time. JSON examples below are illustrative; final schemas may use Zod or JSON Schema.

## Evidence

```ts
interface EvidenceRecord {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  sourceClass: 'D' | 'T' | 'L' | 'C' | 'R' | 'U';
  confidence: 'high' | 'medium' | 'low' | 'disputed';
  acquiredAtScene: string;
  claimIds: string[];
  sourceIds: string[];
  runProvenance: {
    choiceId?: string;
    questionMode?: 'leading' | 'neutral' | 'narrative';
    focus?: string;
  };
  appendixEligible: boolean;
}
```

## Claim

```ts
interface ClaimRecord {
  id: string;
  statement: LocalizedText;
  sourceClass: EvidenceRecord['sourceClass'];
  confidence: EvidenceRecord['confidence'];
  sourceIds: string[];
  supportingEvidenceIds: string[];
  conflictingClaimIds: string[];
  publicAppendixAllowed: boolean;
  editorialNote: LocalizedText;
  reviewedBy?: string;
  lastReviewed?: string;
}
```

## Source

```ts
interface SourceRecord {
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
```

## Story scene metadata

```ts
interface SceneMetadata {
  id: string;
  chapter: string;
  title: LocalizedText;
  dateLabel?: LocalizedText;
  locationLabel?: LocalizedText;
  historicalClasses: Array<'D' | 'T' | 'L' | 'C' | 'R' | 'U'>;
  ambience?: string;
  visual?: string;
  uiMode?: 'standard' | 'wait' | 'interview' | 'report' | 'comparison';
}
```

## App state

```ts
interface GameState {
  saveVersion: number;
  contentVersion: string;
  runId: string;
  startedAt: string;
  updatedAt: string;
  inkStateJson: string;
  checkpoint: string;
  editorial: {
    rigor: number;
    care: number;
    closure: number;
    suspicion: number;
  };
  evidenceIds: string[];
  claimIdsSeen: string[];
  questionQuality: Record<string, string>;
  reportDraft: ReportDraft;
  completedEnding?: 'monument' | 'case_file' | 'home' | 'untranslated';
}
```

## Ending content

```ts
interface EndingContent {
  id: 'monument' | 'case_file' | 'home' | 'untranslated' | 'testimony_weave' | 'delay_shadow';
  code: 'END-A' | 'END-B' | 'END-C' | 'END-D' | 'END-E' | 'END-F';
  numberLabel: string;
  title: string;
  conditionLabel: string;
  paragraphs: TextBlock[];
}
```

The settlement UI must display both `code` and `numberLabel`. The ending code is a catalog marker,
not a rank, route score, or truth hierarchy.

## Settings state

Story saves and settings are separate.

```ts
interface SettingsState {
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
```

## Validation behavior

- Invalid bundled content fails build with file and path diagnostics.
- Invalid imported saves fail safely and never execute embedded HTML/script.
- Unknown future fields are ignored only when schema version policy allows.
- Missing required historical classification is a build blocker.
- Circular claim conflicts and missing source IDs fail content tests.
