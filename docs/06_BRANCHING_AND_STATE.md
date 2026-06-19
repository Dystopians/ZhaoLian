# 06 — Branching, State, and Ending Logic

## Branching model

Use a **foldback structure**: local choices alter text, evidence, and final report affordances, then reconverge at fixed historical beats. No branch can bypass CH06 departure or create a post-threshold Zhao viewpoint.

## Hidden editorial tendencies

### `rigor`

Increases when the player:

- preserves inaudible or unknown wording;
- distinguishes action from interpretation;
- uses neutral/narrative questions;
- labels testimony/reconstruction correctly;
- leaves unsupported fields blank.

### `care`

Increases when the player:

- preserves household and everyday details;
- respects witness uncertainty;
- avoids coercive questioning;
- recognizes the wife and local relationships as more than evidence instruments.

### `closure`

Increases when the player:

- fills ambiguous names;
- adds emotional interpretation;
- chooses one exact death date/method;
- favors concise commemorative wording.

None is displayed or described as morality.

## Suggested ranges

Each run should generally end with values in 0–12. Clamp at 0–20 to simplify future content.

## Ending evaluator

Use deterministic, documented logic with test fixtures. Suggested order:

```text
if rigor >= 8 and closure <= 3 and preserved_blank_count >= 2:
    END-D untranslated
else if care >= 7 and household_evidence_count >= 3:
    END-C home
else if closure >= 8 and precise_disputed_fields >= 2:
    END-A monument
else:
    END-B case_file
```

Tie-break rule: END-B. Do not expose thresholds.

## Evidence rules

- Evidence belongs to the current run.
- Previously seen evidence from completed runs may appear in a separate meta archive but cannot satisfy current-run ending conditions.
- Mutually exclusive focus evidence can coexist only if independently obtained later through testimony; provenance must differ.
- Evidence cards cannot silently upgrade from `[T]` to `[D]` because multiple witnesses repeat a rumor.

## Report constraints

The report editor may allow historically weak combinations so the player can feel the act of overstatement, but it must:

1. show a visible warning;
2. label the assertion as inference or disputed;
3. prevent the historical appendix from inheriting the assertion as fact;
4. record the choice for ending reflection.

## Save determinism

All state needed to reproduce text and endings must be serializable:

- ink runtime state;
- app-level evidence and report data;
- content and save schema versions;
- deterministic story seed, even if v1 uses no randomness;
- accessibility/settings stored separately.

## Forbidden state

Do not implement:

- health, survival, suspicion failure, lives, score, money, inventory puzzles;
- hidden timer that changes the departure;
- completion percentage labeled as truth;
- achievement for identifying a perpetrator or death method.
