# Contributing

## Working agreement

Every change must preserve the project's distinction between historical fact, testimony, reconstruction, composite material, and unresolved uncertainty.

## Branches and commits

- Use small topic branches when working with human review.
- Prefer conventional commit prefixes: `feat`, `fix`, `content`, `docs`, `test`, `build`, `chore`.
- Historical claim changes should use `content(history): ...` and cite the claim/source ID in the commit body.

## Pull-request requirements

A change is reviewable only when it includes:

1. A clear description of player-visible impact.
2. Requirement IDs addressed.
3. Tests added or a reason tests are not applicable.
4. Screenshots or recordings for visual changes, including a keyboard-only path where relevant.
5. Historical source IDs for factual changes.
6. Accessibility and localization impact.

## Content review

- Never edit a locked line in `docs/05_FULL_GAME_SCRIPT.md` without recording the rationale.
- Never promote `[R]`, `[C]`, or `[U]` material to `[D]` without a source review.
- Do not use invented quotation marks around paraphrases.
- Preserve uncertainty rather than manufacture a satisfying scene.

## Engineering review

- Run the narrow test suite while iterating and `npm run verify` before merge.
- No new dependency without a documented reason and license check.
- All JSON/content schema changes require migration or compatibility handling.
- Keep the app usable without sound and without a pointing device.

## Documentation drift

When implementation changes a documented contract, update the relevant Markdown and `docs/32_TRACEABILITY_MATRIX.md` in the same change.
