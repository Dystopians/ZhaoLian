# 02 — Product Requirements Document

Requirement levels: **MUST**, **SHOULD**, **COULD**, **WON'T for v1**.

## Functional requirements

### Narrative runtime

- **PRD-001 MUST:** Render a complete ink-authored story from prologue through final archive text.
- **PRD-002 MUST:** Choices can modify observation, wording, evidence access, questioning quality, and ending text, but cannot alter the historical disappearance.
- **PRD-003 MUST:** Support local branches that reconverge without losing meaningful state.
- **PRD-004 MUST:** Provide four non-ranked endings: Monument, Case File, Person Who Did Not Return Home, and Untranslated Word.
- **PRD-005 MUST:** Show the same shared final sentence after every ending.
- **PRD-006 MUST:** Never expose a true-ending label, completion percentage for truth, or secret survival path.

### Evidence and source layers

- **PRD-010 MUST:** Every historical claim used in the appendix has a claim ID and at least one source ID.
- **PRD-011 MUST:** Content can be classified as documented fact, testimony, later reconstruction, composite, dramatic reconstruction, or unresolved.
- **PRD-012 MUST:** Source mode displays classification without interrupting normal reading.
- **PRD-013 MUST:** Evidence cards retain acquisition scene, wording, classification, and related claims.
- **PRD-014 MUST:** The final report displays certainty with text and border patterns, not color alone.

### Core interactions

- **PRD-020 MUST:** Opening name-field choice supports “郁达夫”, “赵廉”, and blank.
- **PRD-021 MUST:** At least two translation scenes use phrase-level choices with consequences for evidence and suspicion, not right/wrong vocabulary scoring.
- **PRD-022 MUST:** The identity-exposure scene includes the address “郁先生” and allows the player to distinguish recorded action from interpretation.
- **PRD-023 MUST:** The departure scene does not provide prevent/follow/warn choices.
- **PRD-024 MUST:** The wait sequence replaces ordinary progression with repeated waiting actions and ends at dawn.
- **PRD-025 MUST:** Witness interviews include neutral, narrative, and leading question forms whose evidentiary quality differs.
- **PRD-026 MUST:** The final report allows uncertain fields to remain blank or marked unknown.

### Dossier and timeline

- **PRD-030 MUST:** Dossier provides evidence, claims, sources, glossary, and timeline tabs.
- **PRD-031 MUST:** Timeline distinguishes event date, report date, and later-research date.
- **PRD-032 SHOULD:** Clicking a claim reveals all supporting and conflicting sources.
- **PRD-033 SHOULD:** Players can revisit unlocked transcript excerpts without changing past choices.

### Save and settings

- **PRD-040 MUST:** Autosave at scene boundaries and manual save slots.
- **PRD-041 MUST:** Export/import a versioned save file with validation.
- **PRD-042 MUST:** Persist accessibility and audio settings separately from story saves.
- **PRD-043 MUST:** Provide clear reset options for current run, all saves, and settings.
- **PRD-044 SHOULD:** Allow a new run to skip already-seen introductory explanations, never critical narrative text.

### Supplementary material

- **PRD-050 MUST:** Include historical note, methodology, source register, content warning, credits, licenses, and privacy statement.
- **PRD-051 MUST:** State which people/scenes are composite or reconstructed.
- **PRD-052 MUST:** Historical appendix must not present disputed death details as certain.
- **PRD-053 SHOULD:** Offer a post-completion comparison of the player's wording against alternative archival formulations.

## Non-functional requirements

- **PRD-060 MUST:** Meet WCAG 2.2 AA target described in `16_ACCESSIBILITY.md`.
- **PRD-061 MUST:** Work in current stable Chromium, Firefox, and WebKit families and defined mobile viewports.
- **PRD-062 MUST:** Initial production payload and performance remain within budgets in `21_PERFORMANCE_AND_COMPATIBILITY.md`.
- **PRD-063 MUST:** Core play functions without network requests after assets load.
- **PRD-064 MUST:** No account, cookie banner, tracking SDK, or telemetry is required.
- **PRD-065 MUST:** All player-generated/save content is treated as untrusted during import.
- **PRD-066 MUST:** Clean install, build, and verification are reproducible from repository instructions.

## WON'T for v1

- Voice acting.
- Multiplayer or social sharing integration.
- Cloud saves.
- Native mobile app packaging.
- Dynamic AI-generated dialogue.
- User-generated stories.
- Explicit execution depiction.
- Alternate-history rescue ending.
