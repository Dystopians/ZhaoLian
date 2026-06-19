# AGENTS.md

## Mission

Build and ship the complete production-ready browser game specified in this repository: **《出去一趟：赵廉案卷》**. Do not stop at scaffolding, a mockup, a vertical slice, or a partial chapter.

## Read first

Before editing code, read in this order:

1. `CODEX_MASTER_PROMPT.md`
2. `docs/INDEX.md`
3. `docs/26_ACCEPTANCE_CRITERIA.md`
4. `docs/07_HISTORICAL_RESEARCH.md`
5. `docs/08_ETHICS_AND_REPRESENTATION.md`
6. The remaining documents routed by `docs/INDEX.md`

Keep `PLANS.md` updated throughout long-running work.

## Non-negotiable product rules

- The player cannot save Zhao Lian/Yu Dafu, prevent the departure, follow him into the car, or witness an execution.
- There is no “true ending,” no secret survival route, and no reward for guessing a death method.
- Japanese military-police responsibility must not be dissolved into abstract “fate,” but uncertain execution details must remain uncertain.
- Never invent last thoughts, last words, a body, a grave coordinate, or a definitive execution scene.
- Distinguish documented fact, testimony, later reconstruction, composite material, and unresolved uncertainty in both content data and UI.
- The unnamed Indonesian youth must not become a stand-in for collective Indonesian guilt.
- The wife and newborn child must be represented as people with agency, not merely a symbolic life/death device.
- No graphic violence, jump scares, countdown choices, achievements, scores, loot, or monetization.

## Engineering rules

- Target a static browser application built with TypeScript, Vite, ink/inkjs, semantic HTML, and CSS.
- Prefer framework-free TypeScript unless a written ADR demonstrates a clear need for a UI framework.
- Keep runtime dependencies small and justified.
- Compile `.ink` sources during build; do not ship a browser-side authoring compiler unless required and documented.
- Use strict TypeScript. No unexplained `any`, silent promise rejection, or swallowed errors.
- Validate externalized content at build time.
- Keep narrative state deterministic and serializable.
- Store saves locally; network analytics are off by default and not required for release.
- All interactive controls must be keyboard operable and have accessible names.
- Meet the verification commands defined by the finished `package.json`; at minimum provide `dev`, `build`, `typecheck`, `lint`, `format:check`, `test`, `test:e2e`, `test:a11y`, `test:narrative`, and `verify`.

## Work behavior

- Plan before implementing major phases.
- Make reasonable decisions from the specifications instead of repeatedly asking for approval.
- Record substantive decisions in `docs/30_DECISION_LOG.md`.
- When a missing detail affects historical truth, do not guess: use a clearly labeled reconstruction or preserve the blank.
- When a dependency or command differs from the specification because of current tooling, use the current stable supported method, lock it, and record the decision.
- Add tests with each feature and run the narrowest relevant checks before the full verification suite.
- Review your own diff for historical, accessibility, and privacy regressions.

## Definition of complete

Work is complete only when every MUST item in `docs/26_ACCEPTANCE_CRITERIA.md` passes, `npm run verify` succeeds from a clean install, the full game is playable end-to-end, and the release checklist is completed. A final response must summarize implemented features, tests run, known limitations, and any explicitly deferred SHOULD/COULD items.
