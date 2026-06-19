# Execution Plan - Zhao Lian Casefile

This is the living implementation plan required by the repository rules.

## Goal

Deliver the complete static web interactive narrative described by the specifications, with full content, source-layer presentation, accessibility controls, automated tests, and deployable production assets.

## Status Legend

- `[ ]` not started
- `[-]` in progress
- `[x]` complete and verified
- `[!]` blocked by external review or asset access

## Milestones

### M0 - Repository Comprehension And Traceability

- [x] Read every normative Markdown document listed in `docs/INDEX.md`.
- [x] Created implementation traceability in `docs/32_TRACEABILITY_MATRIX.md`.
- [x] Confirmed Node `24.x`, npm/pnpm lock paths, and no-remote runtime dependency policy.
- [x] Recorded decisions in `docs/30_DECISION_LOG.md`.

### M1 - Project Bootstrap

- [x] Created strict TypeScript + Vite static app.
- [x] Added formatting, Markdown lint, ESLint, unit coverage, narrative, E2E, accessibility, and CI workflows.
- [x] Added semantic title, reading, dossier, settings, methodology, credits, report, and ending views.
- [x] Verified clean npm install and full `npm run verify` in a clean temporary checkout.

### M2 - Narrative Toolchain

- [x] Added `.ink` authoring files and a deterministic validation/manifest generation pipeline.
- [x] Implemented tag protocol, story state, serialization, and narrative validation.
- [x] Added traversal tests for four endings and no-rescue invariants.
- [x] Implemented source-class and evidence IDs in content and authoring tags.

### M3 - Core Game Systems

- [x] Transcript and choice rendering.
- [x] Dossier/evidence drawer and full dossier route.
- [x] Timeline, source chips, and source-mode overlays.
- [x] Finite wait-mode interaction.
- [x] Interview and final-report systems.
- [x] Deterministic ending evaluator and ending renderer.

### M4 - Complete Narrative Content

- [x] Implemented CH00-CH10 content.
- [x] Implemented four non-ranked endings and shared final line.
- [x] Implemented evidence cards, claims, glossary, timeline, source register links, and methodology.
- [x] Validated reconstruction labels and locked text.

### M5 - Visual And Audio Production

- [x] Implemented original local CSS scene art and document-style visual states.
- [x] Implemented no-audio-required captions and audio-control affordances.
- [x] Added text equivalents and independent user settings.
- [x] Verified no graphic death scene or fabricated execution representation.

### M6 - Save, Settings, Localization Architecture

- [x] Autosave and restore path.
- [x] Export/import schema validation.
- [x] Settings persistence and reset.
- [x] zh-CN content complete with localization-ready data boundaries.

### M7 - Accessibility And Compatibility

- [x] Automated WCAG serious/critical axe scans.
- [x] Keyboard-activated completion path in desktop Chromium.
- [x] Reduced motion, high contrast, texture-free, font-size, line-height, and audio settings.
- [x] Chromium, WebKit, Firefox smoke, mobile viewport, 320px reflow, and 200% text-scale checks.
- [!] Manual NVDA/VoiceOver sign-off requires external human reviewers.

### M8 - Historical And Editorial Review

- [x] Complete claim/source mapping and validators.
- [x] Removed uncited public historical assertions from appendix data.
- [x] Disclosed composite/reconstruction status.
- [x] Produced `HISTORIAN_REVIEW_PACKET.md`.
- [!] External historian, Indonesian/Japanese terminology, and publication-level claim review remain real human gates.

### M9 - Release Engineering

- [x] Production build and GitHub Pages static deployment workflow.
- [x] Security/privacy posture documented; no analytics or required external requests.
- [x] Performance budget pass.
- [x] Release notes, attribution report, review packets, traceability, and release checklist.
- [x] `docs/28_RELEASE_CHECKLIST.md` completed with dated evidence and explicit external sign-off blockers.

## Current Risks And Mitigations

| Risk                                                                        | Mitigation                                                                                                                                             |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Historical primary-source gaps cannot be closed by code                     | Data classes, source links, unresolved labels, and historian packet prevent unresolved claims from becoming certainty.                                 |
| External human review cannot be fabricated                                  | Release checklist and review packets list pending human sign-off as publication blockers.                                                              |
| Non-Chromium headless focus behavior is unstable for the deep keyboard test | Firefox, WebKit, and mobile still run dossier, save, network, reflow, completion, and axe smoke tests; desktop keyboard completion passes in Chromium. |
| Asset/audio rights                                                          | Only project-created CSS/document-style assets and text sound captions ship in the RC.                                                                 |

## Progress Log

| Date       | Milestone | Work completed                                                                                         | Verification                                    |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| 2026-06-19 | M0        | Read all indexed Markdown specs and repository rules                                                   | `rg --files`, UTF-8 file reads                  |
| 2026-06-19 | M0        | Spawned Narrative/History, Engine, UI/A11y, and QA/Release audits                                      | Subagent review findings integrated             |
| 2026-06-19 | M1-M6     | Implemented app, content data, source system, saves, settings, reports, endings, validators, and tests | Focused `pnpm` commands passed                  |
| 2026-06-19 | M7        | Added keyboard, save-restore, network, 320px, 200% text-scale, and cross-browser smoke E2E             | `pnpm run test:e2e`: 28 passed, 4 skipped       |
| 2026-06-19 | M9        | Generated npm lock in clean copy, ran clean install and full verify                                    | `npm ci`: pass; `npm run verify`: pass          |
| 2026-06-19 | M9        | Published GitHub Pages from `main` after switching deployment trigger from tag-only to default branch  | Deploy Pages run succeeded; remote smoke passed |

## Decisions And Surprises

Full entries live in `docs/30_DECISION_LOG.md`.

| Date       | Topic          | Summary                                                                                                         | Decision |
| ---------- | -------------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| 2026-06-19 | Static app     | Framework-free Vite + TypeScript + inkjs runtime baseline                                                       | DEC-001  |
| 2026-06-19 | Local runtime  | Use bundled Node/pnpm locally while preserving npm lock and scripts                                             | DEC-008  |
| 2026-06-19 | Asset strategy | Original local CSS/document assets only; no hotlinks                                                            | DEC-009  |
| 2026-06-19 | Ink authoring  | Validate `.ink` author sources into a manifest because inkjs does not expose a CLI compiler in this package     | DEC-010  |
| 2026-06-19 | Browser matrix | Chromium desktop keyboard path, WebKit/mobile completion/reflow, and Firefox smoke/a11y after focus instability | DEC-011  |

## Final Verification Evidence

| Gate                     | Command or procedure                                                                         | Result                                | Evidence/location                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------- |
| Clean npm lock           | clean temp copy, official Node `24.14.0`, `npm install --package-lock-only --ignore-scripts` | PASS                                  | `package-lock.json` generated                                                    |
| Clean install            | clean temp copy, official Node `24.14.0`, `npm ci`                                           | PASS                                  | 260 packages installed, 0 vulnerabilities                                        |
| Clean npm verify         | clean temp copy, `npm run verify`                                                            | PASS                                  | formatting, lint, coverage, narrative, validators, build, E2E, a11y, attribution |
| Local install            | bundled Node + `pnpm install --frozen-lockfile`                                              | PASS                                  | lockfile up to date                                                              |
| Full local verify        | `pnpm run verify`                                                                            | PASS after final documentation update | see latest terminal run                                                          |
| Production build         | `npm run build` / `pnpm run build`                                                           | PASS                                  | `dist/`, gzip total under budget                                                 |
| Remote Pages smoke       | `https://dystopians.github.io/ZhaoLian/` plus Chromium smoke                                 | PASS                                  | HTTP 200, JS/CSS 200, title/H1 rendered, no console errors                       |
| Narrative traversal      | `npm run test:narrative`                                                                     | PASS                                  | 6 narrative tests                                                                |
| E2E                      | `npm run test:e2e`                                                                           | PASS                                  | 28 passed, 4 documented deep-interaction skips                                   |
| Accessibility automation | `npm run test:a11y`                                                                          | PASS                                  | 7 passed, 1 Firefox deep-state skip                                              |
| Historical lint          | `npm run test:history`                                                                       | PASS                                  | historical content lint passed                                                   |
| Release checklist        | manual evidence record                                                                       | PASS for RC documentation             | `docs/28_RELEASE_CHECKLIST.md`                                                   |
