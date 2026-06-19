# 30 - Decision Log

Record decisions as immutable entries. Supersede rather than silently rewrite old decisions.

## DEC-001 - Static TypeScript + Vite + inkjs Baseline

- **Status:** accepted.
- **Context:** The product is text-first, has limited animation, requires custom archival UI, accessibility, and static hosting.
- **Decision:** Use framework-free strict TypeScript with Vite and ink/inkjs unless implementation evidence justifies a change.
- **Consequences:** Small runtime and direct semantic control; app view/state organization is implemented locally.

## DEC-002 - Fixed Historical Outcome

- **Status:** accepted.
- **Decision:** No player action can prevent Zhao Lian's disappearance or show an alternate survival.
- **Reason:** Avoid victim-blaming, optimization of historical violence, and false agency.

## DEC-003 - No Execution Scene

- **Status:** accepted.
- **Decision:** Narrative camera stops at the threshold; later content uses waiting, testimony, and documents.
- **Reason:** Matches evidentiary absence and ethical form.

## DEC-004 - Four Non-Ranked Archival Endings

- **Status:** accepted.
- **Decision:** Endings reflect closure, rigor, and care, with no true/good/bad labels.
- **Reason:** Make editorial consequences visible without gamifying truth.

## DEC-005 - Source-Class System

- **Status:** accepted.
- **Decision:** D/T/L/C/R/U classes exist in content data, authoring tags, dossier, methodology, and validators.
- **Reason:** Prevent dramatic reconstruction from silently becoming public history.

## DEC-006 - No Remote Telemetry In V1

- **Status:** accepted.
- **Reason:** Privacy, preservation, static hosting, and minimal complexity.

## DEC-007 - Primary Release zh-CN, Localization-Ready

- **Status:** accepted.
- **Reason:** Complete quality in one language is preferred to unreviewed machine translation.

## DEC-008 - npm-Compatible Scripts With pnpm Local Execution

- **Status:** accepted.
- **Date:** 2026-06-19.
- **Context:** The Codex desktop environment exposes Node `v24.14.0` and `pnpm 11.0.7` through bundled runtime paths, while ambient `node`, `npm`, and `npx` were not on PATH.
- **Options considered:** Stop for external Node/npm installation; use the bundled Node/pnpm; generate npm evidence in a clean official Node checkout.
- **Decision:** Implement standard npm-compatible scripts and both lockfiles. Use bundled Node/pnpm for local development, then verify npm in a clean temporary checkout with official Node `24.14.0` and npm `11.9.0`.
- **Consequences:** `pnpm run verify`, clean `npm ci`, and clean `npm run verify` are all supported. CI uses pnpm for deterministic install speed; release docs include npm and pnpm commands.
- **Requirements affected:** AC-001, AC-060, AC-070.

## DEC-009 - Original Local Asset Strategy For Release Candidate

- **Status:** accepted.
- **Date:** 2026-06-19.
- **Context:** The repository contains no licensed historical images, audio, or fonts. Specifications forbid hotlinked or unknown-license assets and prohibit fabricated archival photos.
- **Options considered:** Use public web images after rights research; generate fake archival media; ship original local CSS/document-style assets and no-audio-equivalent captions.
- **Decision:** Use only project-created CSS/document-style visual assets, system fonts, and text sound captions/audio-controller affordances for v1. Do not include external photos or audio unless provenance is added later.
- **Consequences:** Production can pass provenance and privacy gates without delaying for protected assets. The release notes and review packets state that real-photo and human-reviewed audio enhancements remain post-review options.
- **Requirements affected:** AC-055, AC-066, AC-071.

## DEC-010 - Validated Ink Authoring Manifest Instead Of Bundled Compiler

- **Status:** accepted.
- **Date:** 2026-06-19.
- **Context:** The selected `inkjs` package provides the browser Story runtime but does not expose a reliable project-local compiler CLI in this environment.
- **Options considered:** Add another compiler dependency; hand-compile story JSON; keep `.ink` as authoring source and validate it into a manifest while the runtime uses canonical JSON content.
- **Decision:** Keep `.ink` chapter files as authoring/source-control artifacts and validate tags, locked lines, and coverage with `scripts/compile-ink.mjs`, producing `generated/narrative-manifest.json`. The playable runtime consumes `content/story.zh-CN.json`.
- **Consequences:** Narrative authoring remains inspectable and tested without adding an unstable compiler path. If a compiler is introduced later, it must preserve the same data contracts and validators.
- **Requirements affected:** AC-003, AC-005, AC-006, AC-062.

## DEC-011 - Browser Automation Matrix For RC

- **Status:** accepted.
- **Date:** 2026-06-19.
- **Context:** Specifications prefer Chromium, Firefox, and WebKit coverage. Local Firefox headless was unstable for deep focus/timing tests but passed smoke, save, network, reflow, and axe checks.
- **Options considered:** Restrict to Chromium only; force all non-Chromium deep keyboard paths despite flakiness; include desktop Chromium keyboard path plus WebKit/mobile completion/reflow and Firefox smoke/accessibility checks.
- **Decision:** Run the full deep keyboard E2E path in desktop Chromium. Include WebKit, mobile, and Firefox in the project matrix, skipping the unstable deep keyboard test where appropriate while retaining completion, save, network, reflow, dossier, and axe coverage.
- **Consequences:** MUST gates remain stable; SHOULD cross-browser evidence is stronger than single-browser coverage and honestly documents the focus limitations.
- **Requirements affected:** AC-050, AC-052, AC-063, AC-064, AC-081.

## DEC-012 - Default-Branch Pages Deployment Trigger

- **Status:** accepted.
- **Date:** 2026-06-19.
- **Context:** GitHub Pages deployment from a release tag built successfully but failed during the Pages deploy job, while the repository had already been configured to use GitHub Actions as the Pages source.
- **Options considered:** Keep tag-only deployment and require manual UI dispatch; add default-branch deployment; replace Pages with another static host.
- **Decision:** Deploy GitHub Pages from pushes to the protected/default `main` branch, while keeping manual workflow dispatch available.
- **Consequences:** Online play can be published by a normal `main` push after the owner selects GitHub Actions as the Pages source. Release tags can still be used for versioning, but they are no longer required to create the Pages deployment.
- **Requirements affected:** CI/CD GitHub Pages deployment requirement in `docs/20_CI_CD_AND_DEPLOYMENT.md`.

## DEC-013 - AI-Assisted Silhouette Visuals And Licensed Local Music

- **Status:** accepted.
- **Date:** 2026-06-19.
- **Context:** The project owner supplied historical-looking portrait, invasion, and map references, requested a unified silhouette art direction, a western-Pacific map background, and staged music. Repository policy still forbids shipping unlicensed photos/audio or fake archival photos.
- **Options considered:** Ship the supplied reference images directly; continue with CSS-only blockouts; generate original non-photographic visuals and use only music with redistribution-friendly licenses.
- **Decision:** Use the supplied images only as local references, generate project-owned low-color silhouette WebP art, bundle OpenGameArt tracks for investigation stages, and use the project-owner supplied `相対性理論 - スマトラ警備隊.mp3` track for the ending screen through a stable runtime copy.
- **Consequences:** The runtime gains portraits, scene illustrations, context art, map background, investigation music, and the requested ending track while preserving asset provenance and historical-photo boundaries. The ending track remains non-essential and begins only after player interaction.
- **Requirements affected:** AC-044, AC-055, AC-066, AC-071, AC-072.
- **Supersedes/superseded by:** Extends DEC-009 by replacing CSS-only visuals with reviewed AI-assisted local images and licensed local audio.

## DEC-014 - Initial Bundle Budget With Lazy Media Accounting

- **Status:** accepted.
- **Date:** 2026-06-19.
- **Context:** The visual/audio pass adds WebP illustrations and two local music files. The performance specification allows large appendix images and audio to load lazily and states that audio decoding must not block first text.
- **Options considered:** Count every emitted media byte against the initial 1.5 MB budget; remove media; separate initial critical transfer from lazy media in the performance report.
- **Decision:** Keep the 1.5 MB budget for initial JS/CSS/critical media and add a separate lazy-media compressed budget/report for stage illustrations and audio.
- **Consequences:** First readable content remains protected while the release report honestly tracks media weight. Runtime UI loads scene images lazily and audio only after player interaction, then auto-fades stage BGM as the casefile progresses.
- **Requirements affected:** AC-055, AC-065, AC-066.

## DEC-015 - Ending-Specific Settlement Art And Verbal Coda

- **Status:** accepted.
- **Date:** 2026-06-19.
- **Context:** The four non-ranked endings originally shared a report-desk visual and brief coda. The project owner requested distinct settlement screens and a more language-forward ending layer with a time-space interlacing feeling.
- **Options considered:** Add ranked endings; keep four endings and only change presentation; add two non-ranked endings for existing but underused state dimensions.
- **Decision:** Keep the archival-ethics structure and deterministic evaluator, expand each ending's text to the current six-paragraph settlement template, display stable `END-A` through `END-F` catalog markers, and add one original non-photographic WebP settlement image per ending. `END-E` uses careful cross-witness questioning; `END-F` uses translation-delay suspicion without closing death details. The settlement coda also gives each ending a distinct short Yu Dafu atmospheric excerpt and five ending-specific echo lines, explicitly framed as echo rather than last words. The art uses map, paper, threshold, waterlike light, and negative space rather than depicting execution, corpse, grave, or solved death location.
- **Consequences:** Endings now feel more materially and verbally distinct while preserving the no-true-ending rule and the threshold/uncertainty constraints.
- **Requirements affected:** AC-004, AC-005, AC-013, AC-066, AC-071.

## DEC-016 - Curated Open Audio Sourcing Before Runtime Import

- **Status:** accepted.
- **Date:** 2026-06-19.
- **Context:** The project owner requested richer, more varied music sources for
  different scene contexts. Asset policy requires provenance and redistribution
  rights for every shipped file, while many free libraries mix CC0, CC-BY, NC,
  platform-specific, and unclear terms.
- **Options considered:** Bulk-download tracks from free libraries; keep the
  current limited music set until a full composer pass; create a curated
  source-and-scene matrix and require per-track review before import.
- **Decision:** Add `docs/36_AUDIO_LIBRARY_RESEARCH.md` as the audio expansion
  route. It records viable free/open libraries, scene-fit recommendations, and a
  per-track review checklist. No new runtime music is added until exact track
  pages, licenses, attribution text, loop quality, file size, and prohibited-cue
  risks are reviewed and registered.
- **Consequences:** Future audio expansion can be broader without weakening the
  release asset gate. Candidate discovery can proceed quickly, but shipped
  tracks still pass through `content/assets.json`, attribution generation, and
  playback/accessibility checks.
- **Requirements affected:** AC-055, AC-066, AC-071, AC-072.

## Template For New Decisions

```text
## DEC-XXX - Title

- Status: proposed | accepted | superseded | rejected
- Date:
- Context:
- Options considered:
- Decision:
- Consequences:
- Requirements affected:
- Supersedes/superseded by:
```
