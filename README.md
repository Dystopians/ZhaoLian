# Zhao Lian Casefile

Static browser interactive narrative about the final Sumatra period of Yu Dafu under the Zhao Lian alias. The product is a zh-CN text-first casefile game: the player cannot change the historical disappearance, only how the surviving record is read, questioned, translated, and filed.

## Release Status

- App version: `1.0.0-rc.0`
- Content version: `1.0.0`
- Save schema: `1`
- Runtime: static web app, no server-side API
- Privacy: no analytics, no remote fonts, no required third-party network requests
- Publication gate: external historian and manual screen-reader sign-off are prepared but not impersonated in this repository

## Requirements

- Node.js `24.x` or newer, matching `.nvmrc`
- npm `11.x` for the locked npm path, or pnpm `11.0.7` via Corepack
- Playwright browser runtimes for verification: Chromium, Firefox, and WebKit

## Install

```bash
npm ci
npx playwright install chromium firefox webkit
```

The implementation is also pnpm-compatible:

```bash
corepack enable
corepack prepare pnpm@11.0.7 --activate
pnpm install --frozen-lockfile
pnpm exec playwright install chromium firefox webkit
```

## Run Locally

```bash
npm run dev
```

Open the printed localhost URL. The dev server prepares the generated narrative manifest before Vite starts.

## Verify

```bash
npm run verify
```

The verification chain runs formatting, Markdown lint, ESLint, unit coverage, narrative traversal, content validation, historical lint, ink-source validation, TypeScript, production build, performance budget, Playwright E2E, Playwright accessibility scans, and attribution generation.

Useful focused commands:

```bash
npm run test
npm run test:narrative
npm run test:history
npm run test:e2e
npm run test:a11y
npm run build
```

## Build And Preview

```bash
npm run build
npm run preview
```

The production bundle is emitted to `dist/`. Playwright E2E uses `vite build` plus `vite preview` so production preview is exercised by the automated suite.

## Deploy

Any static host can serve `dist/`. For GitHub Pages, use `.github/workflows/deploy-pages.yml` by pushing a `v*` tag or running the workflow manually. The app assumes local static assets only and does not require environment variables.

## Project Map

- `content/`: machine-readable story, sources, claims, evidence, glossary, timeline, credits, and asset provenance.
- `narrative/`: authored `.ink` source files validated into `generated/narrative-manifest.json`.
- `src/`: strict TypeScript app, story engine, dossier, report evaluator, saves, settings, audio captions, and DOM UI.
- `tests/`: unit, narrative, E2E, and accessibility tests.
- `scripts/`: content/history/ink/performance/attribution validators.
- `docs/`: normative specification, traceability, release checklist, decisions, and source register.

## Historical Boundary

The game fixes the disappearance outcome. It does not include a rescue route, execution scene, invented last words, corpse/grave certainty, or a single true-answer ending. Public appendix claims must remain linked to source records and unresolved clusters stay unresolved.
