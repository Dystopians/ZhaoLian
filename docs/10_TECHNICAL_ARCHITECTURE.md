# 10 — Technical Architecture

## Architectural goals

- Static-hostable, offline-tolerant after initial asset load.
- Semantic and accessible by default.
- Narrative content separated from UI/runtime code.
- Deterministic, serializable story state.
- Small dependency surface and easy archival preservation.
- Build-time validation of all content and historical metadata.

## Baseline stack

- **Language:** strict TypeScript.
- **Build tool:** Vite.
- **Narrative:** ink source compiled to JSON; inkjs runtime in browser.
- **UI:** semantic HTML + modular CSS + framework-free TypeScript.
- **Unit/integration tests:** Vitest.
- **E2E/browser tests:** Playwright.
- **Accessibility automation:** Playwright plus axe-core integration or an equivalent maintained tool.
- **Formatting/linting:** Prettier, ESLint, Markdown linting.
- **Hosting:** any static host; GitHub Pages configuration included.

Codex may change a tool only through an ADR showing a clear gain, migration cost, license, and effect on accessibility.

## High-level components

```text
Ink source
   │
   ▼
Build-time compiler ──► story.json + narrative manifest
                              │
Bundled JSON: claims/evidence/sources/glossary
                              │
                              ▼
                    Content validation gate
                              │
                              ▼
Browser application
 ├─ StoryEngine
 ├─ TagRouter
 ├─ GameStateStore
 ├─ EvidenceStore
 ├─ ClaimGraph
 ├─ ReportBuilder
 ├─ EndingEvaluator
 ├─ SaveRepository
 ├─ SettingsRepository
 ├─ AudioController
 ├─ AccessibilityController
 └─ View layer
```

## Story compilation

- Keep `.ink` authoring files under `narrative/`.
- A build script compiles the root story and emits deterministic JSON into a generated directory ignored by manual editing.
- Compilation errors fail `dev`, `build`, and CI.
- Extract tags or a manifest at build time to validate scene IDs, evidence IDs, source classes, audio cues, and asset references.
- Generated story JSON is versioned in build output, not necessarily committed unless an ADR chooses reproducible checked-in artifacts.

## Runtime boundaries

### `StoryEngine`

Owns inkjs story continuation, choice selection, state export/import, and current tags. It does not manipulate the DOM.

### `TagRouter`

Converts approved ink tags into typed application events. Unknown tags fail in development and log a visible safe error in production.

### `GameStateStore`

Combines ink state with app-level evidence, settings-independent story metadata, report draft, and ending state. Updates are transactional.

### `EvidenceStore` and `ClaimGraph`

Read-only content repositories plus current-run acquisition state. They enforce provenance and conflict display.

### `ReportBuilder`

Validates report combinations and produces both player-facing and historically qualified text. It cannot mutate source records.

### View layer

Uses progressive enhancement: core text, choices, and navigation remain intelligible without animation or audio. Never insert narrative text using unsafe HTML.

## Navigation model

Prefer view-state routing rather than a large SPA router dependency. Required views:

- title/content notice;
- game;
- dossier;
- settings;
- methodology/sources;
- credits/licenses;
- fatal-error recovery.

Browser history may represent top-level views. Restoring a save must not duplicate historical choices.

## Error handling

- A failed content load displays a plain-language error and recovery actions.
- Autosave failure is announced non-intrusively and manual export remains available where possible.
- Imported save errors identify the issue without echoing malicious content.
- Audio failure never blocks play.
- A story dead-end in development throws with knot/path context; production shows a recovery screen and preserves the save.

## Dependency policy

- Prefer standards APIs and small libraries.
- Lock dependencies and commit the lockfile.
- No runtime dependency with unclear license.
- No analytics, ad, remote-font, or third-party script dependency.
- Avoid loading any production asset from a remote CDN.

## Browser storage

- IndexedDB for save slots and completed-run archives.
- localStorage only for tiny settings/fallback and migration marker.
- Save export is a JSON file with a non-executable MIME type.
- Quota failures handled explicitly.

## Observability

No remote telemetry is required. Development builds may expose:

- current scene/knot;
- story variables;
- tag events;
- unlocked evidence;
- source classifications;
- save migration logs.

Production logging must avoid dumping full saves or personal file paths.
