# Implementation Report

## Release Candidate

- App version: `1.0.0-rc.0`
- Content version: `1.0.0`
- Save schema version: `1`
- Commit/tag: not created in this workspace
- Build date: 2026-06-19
- Runtime target: static browser app served from `dist/`

## Implemented Product

The release candidate implements the full zh-CN browser narrative from title screen through CH00-CH10, including finite wait mode, translation and questioning scenes, dossier tabs, source mode, final report drafting, four non-ranked endings, and the locked shared final line.

The game preserves the fixed historical disappearance. It has no rescue route, no following past the threshold, no execution scene, no invented last words, and no true-answer ending. Historical claims, evidence, timeline entries, glossary terms, source classes, and unresolved clusters live in versioned JSON data under `content/`.

## Architecture

- App shell: `src/app/AppController.ts`, `src/main.ts`, `src/styles/main.css`.
- Story runtime: `src/engine/StoryEngine.ts`, `content/story.zh-CN.json`, `narrative/**/*.ink`.
- Ink validation: `scripts/compile-ink.mjs` produces `generated/narrative-manifest.json`.
- Evidence and claims: `src/evidence/*`, `content/evidence.zh-CN.json`, `content/claims.zh-CN.json`, `content/sources.json`.
- Report and endings: `src/report/ReportBuilder.ts`, `src/report/EndingEvaluator.ts`.
- Saves and settings: `src/save/*`, `src/state/*`.
- Validation: `scripts/validate-content.mjs`, `scripts/validate-history.mjs`, `scripts/check-performance.mjs`, `scripts/generate-attributions.mjs`.
- CI/deploy: `.github/workflows/ci.yml`, `.github/workflows/deploy-pages.yml`, `.github/workflows/dependency-review.yml`.

## Verification

| Check                    | Command/procedure                                           | Result                                | Evidence                                                           |
| ------------------------ | ----------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------ |
| Clean install            | clean temporary checkout, official Node `24.14.0`, `npm ci` | PASS                                  | 260 packages installed, 0 vulnerabilities                          |
| Full npm verify          | clean temporary checkout, `npm run verify`                  | PASS                                  | all verify stages completed                                        |
| Full pnpm verify         | `pnpm run verify`                                           | PASS after final documentation update | latest terminal run                                                |
| Production build         | `npm run build` / `vite build` through verify               | PASS                                  | `dist/`, gzip total under budget                                   |
| Narrative invariants     | `npm run test:narrative`                                    | PASS                                  | 6 tests, four endings and no-rescue invariant                      |
| Unit coverage            | `npm run test:coverage`                                     | PASS                                  | statements 89.25%, branches 82.58%, functions 94.11%, lines 88.61% |
| E2E                      | `npm run test:e2e`                                          | PASS                                  | 28 passed, 4 documented deep-interaction skips                     |
| Accessibility automation | `npm run test:a11y`                                         | PASS                                  | 7 passed, 1 Firefox deep-state skip                                |
| Historical lint          | `npm run test:history`                                      | PASS                                  | source classes, unresolved labels, and prohibited claims checked   |
| Performance              | `scripts/check-performance.mjs`                             | PASS                                  | total gzip about 35.9 KB                                           |

## Acceptance Status

All machine-verifiable MUST criteria in `docs/26_ACCEPTANCE_CRITERIA.md` are mapped in `docs/32_TRACEABILITY_MATRIX.md` and covered by implementation paths plus tests or validators.

Public-release human review gates are not fabricated: `HISTORIAN_REVIEW_PACKET.md`, `ACCESSIBILITY_REVIEW_PACKET.md`, and `docs/28_RELEASE_CHECKLIST.md` identify the remaining external sign-offs for historian review, Indonesian/Japanese terminology, and manual screen-reader passes.

## Known Limitations

- Genuine human historian and accessibility reviewer signatures are pending for public publication.
- Firefox, WebKit, and mobile headless profiles run smoke, save, network, reflow, completion, and axe checks; the deep keyboard path is limited to desktop Chromium because other headless focus states were unstable.
- No real historical photos or audio files ship in this RC; all visual assets are project-created CSS/document-style assets.
