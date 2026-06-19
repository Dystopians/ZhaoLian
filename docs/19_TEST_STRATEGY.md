# 19 — Test Strategy

## Quality model

Tests must cover software correctness, narrative reachability, historical metadata integrity, accessibility, performance, and release packaging.

## Unit tests

Required targets:

- Tag parsing and unknown-tag behavior.
- Ending evaluator boundaries and tie-breaks.
- Report validation and warning generation.
- Evidence acquisition/provenance.
- Claim graph conflicts and missing references.
- Save codec, import rejection, and migrations.
- Settings persistence.
- Audio state independent of story progression.
- Source-class label rendering.

## Narrative tests

Create a headless story traversal harness.

### Required assertions

- Story compiles with no warnings treated as errors.
- Every choice has a destination.
- Every chapter entry is reachable.
- Every ending is reachable by at least one fixture path.
- No path allows avoiding CH06 departure.
- No path contains a post-threshold Zhao first-person or execution scene.
- Mutually exclusive current-run evidence is not acquired illegally.
- Locked lines match the manifest.
- All `evidence:` and `claim:` tags reference valid records.
- All historical scenes have source classes.
- Wait mode has exactly the intended finite sequence and reaches dawn.

### Golden paths

Maintain fixtures:

- `path_monument.json`
- `path_case_file.json`
- `path_home.json`
- `path_untranslated.json`
- `path_minimum_interaction.json`
- `path_all_report_warnings.json`

## Integration tests

- StoryEngine + TagRouter + state store.
- Choice selection unlocks evidence and autosaves atomically.
- Reload restores transcript/current choices.
- Report editor uses current-run evidence only.
- Source mode opens correct claim/source.
- Settings changes update UI and persist.

## E2E tests

Run in Chromium, Firefox, and WebKit where CI resources permit.

Required scenarios:

1. Fresh start through first evidence card.
2. Identity-exposure scene preserves unknown action.
3. Full wait sequence and dawn transition.
4. Interview leading-question warning.
5. Complete each ending via fixture or UI path.
6. Save, reload, export, delete, and import.
7. Corrupt/oversized/future save rejection.
8. Mobile dossier and focus return.
9. Back/forward navigation does not replay choices.
10. No runtime network requests to third-party origins.

## Accessibility tests

- Automated axe scans for representative states.
- Keyboard E2E path for full game or a deterministic compressed fixture.
- Focus order snapshots or explicit assertions.
- Accessible names/states for dossier, audio, source-mode, wait control, and report fields.
- High-contrast and reduced-motion visual regression spot checks.

## Historical-content lint

A custom validator must fail on:

- missing claim/source references;
- `R/C/U` content marked appendix-eligible as fact;
- quotation without quotation source metadata;
- disputed method/date stated without qualification in appendix data;
- prohibited phrases suggesting a true ending or rescue;
- unreviewed real-person naming of composite perpetrators.

## Visual regression

Use stable screenshots for:

- title;
- standard scene desktop/mobile;
- dossier;
- “郁先生” pause state;
- wait mode;
- report form;
- all endings;
- high contrast and texture-free modes.

Mask timestamps and other nondeterministic output.

## Manual playtest questions

- Did the player understand they could not save Zhao before CH06?
- Did they perceive choices as meaningful despite fixed outcome?
- Did they confuse the latest reconstruction with a true solution?
- Did the wait control feel intentional rather than broken?
- Did the wife feel like a person rather than a symbol?
- Could they explain the difference between testimony and fact?

## Exit criteria

No release with:

- failing tests;
- unreachable ending;
- broken clean install;
- critical accessibility failure;
- uncited public historical assertion;
- unresolved P0/P1 defect.
