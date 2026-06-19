# 11 — Target Repository Structure

Codex should create a coherent structure close to the following. Deviations require an entry in the decision log.

```text
/
├── AGENTS.md
├── CODEX_MASTER_PROMPT.md
├── PLANS.md
├── README.md
├── CONTRIBUTING.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── eslint.config.*
├── .prettierrc*
├── .editorconfig
├── .gitignore
├── .nvmrc
├── index.html
│
├── narrative/
│   ├── main.ink
│   ├── globals.ink
│   ├── functions.ink
│   ├── endings.ink
│   └── chapters/
│       ├── ch00_archive.ink
│       ├── ch01_zhao_boss.ink
│       ├── ch02_translator.ink
│       ├── ch03_dream.ink
│       ├── ch04_yu_sensei.ink
│       ├── ch05_surrender.ink
│       ├── ch06_departure.ink
│       ├── ch07_morning.ink
│       ├── ch08_interviews.ink
│       ├── ch09_two_dates.ink
│       └── ch10_report.ink
│
├── content/
│   ├── evidence.zh-CN.json
│   ├── claims.zh-CN.json
│   ├── sources.json
│   ├── glossary.zh-CN.json
│   ├── timeline.zh-CN.json
│   ├── credits.zh-CN.json
│   └── schemas/
│
├── src/
│   ├── main.ts
│   ├── app/
│   │   ├── AppController.ts
│   │   ├── routes.ts
│   │   └── events.ts
│   ├── engine/
│   │   ├── StoryEngine.ts
│   │   ├── TagRouter.ts
│   │   └── NarrativeDiagnostics.ts
│   ├── state/
│   │   ├── GameStateStore.ts
│   │   ├── SettingsStore.ts
│   │   └── migrations/
│   ├── evidence/
│   │   ├── EvidenceStore.ts
│   │   └── ClaimGraph.ts
│   ├── report/
│   │   ├── ReportBuilder.ts
│   │   ├── ReportValidator.ts
│   │   └── EndingEvaluator.ts
│   ├── save/
│   │   ├── SaveRepository.ts
│   │   ├── SaveCodec.ts
│   │   └── SaveImportValidator.ts
│   ├── audio/
│   │   ├── AudioController.ts
│   │   └── AudioManifest.ts
│   ├── ui/
│   │   ├── views/
│   │   ├── components/
│   │   ├── focus/
│   │   └── announcements/
│   ├── i18n/
│   ├── content/
│   ├── styles/
│   └── types/
│
├── public/
│   ├── images/
│   ├── audio/
│   ├── icons/
│   └── manifest.webmanifest (optional)
│
├── scripts/
│   ├── compile-ink.*
│   ├── validate-content.*
│   ├── traverse-story.*
│   ├── validate-history.*
│   └── generate-attributions.*
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── narrative/
│   ├── e2e/
│   ├── accessibility/
│   ├── fixtures/
│   └── snapshots/
│
├── docs/
│   └── existing specification package plus implementation notes
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy-pages.yml
│       └── dependency-review.yml
│
└── dist/  (generated, not committed unless deployment policy requires)
```

## Naming conventions

- TypeScript files: `PascalCase.ts` for classes/components, `camelCase.ts` for utilities.
- CSS: meaningful component or layer names, no generated obfuscation needed.
- ink knots: `snake_case` with chapter prefix when helpful.
- Requirement IDs remain uppercase and stable.
- Evidence/claim/source IDs are uppercase kebab or underscore consistently; do not rename after release without migration aliases.

## Generated-file rule

Generated files must start with a comment or metadata field saying how to regenerate them. Never manually edit generated story JSON, source manifests, or attribution output.
