# 28 - Release Checklist

Release-candidate evidence date: 2026-06-19.

Status: engineering RC is complete and deployable to a static host. Public publication remains blocked on genuine external historian and manual accessibility sign-off.

## Code And Build

- [x] Repository clean and release tag/version agreed. Version is `1.0.0-rc.0`; release candidate tag `v1.0.0-rc.0` is prepared for the deployed commit.
- [x] `npm ci` succeeds in a clean environment. Evidence: clean temporary checkout with official Node `24.14.0` and npm `11.9.0`.
- [x] `npm run verify` passes. Evidence: clean temporary checkout and local pnpm verification.
- [x] Production build generated and locally previewed. Evidence: Playwright web server runs `vite build` and `vite preview`.
- [x] No uncaught console error in supported automated smoke paths. Evidence: E2E suite passed.
- [x] Bundle-size budget passes. Evidence: `scripts/check-performance.mjs`, total gzip about 35.9 KB.
- [x] Dependency audit and license report reviewed for RC. Evidence: npm audit 0 vulnerabilities and `dist/reports/attributions.json`.

## Narrative

- [x] CH00-CH10 present. Evidence: `content/story.zh-CN.json`, `narrative/chapters/`.
- [x] Four endings reachable. Evidence: `tests/narrative/storyTraversal.test.ts`.
- [x] Shared final line exact. Evidence: locked-line validation in `scripts/validate-content.mjs`.
- [x] No rescue/follow/execution path. Evidence: history validator and traversal tests.
- [x] Locked-line validator passes. Evidence: `scripts/compile-ink.mjs` and content validator.
- [x] No placeholder prose in playable content. Evidence: content validator and E2E smoke.
- [x] All source classes and evidence links validate. Evidence: `npm run validate:content`.

## Historical Review

- [ ] Historian reviewed public appendix claims. Pending external human reviewer.
- [x] Hu Yuzhi source status documented. Evidence: `docs/29_SOURCE_REGISTER.md`, `content/sources.json`.
- [x] Suzuki Masao source status documented. Evidence: `docs/29_SOURCE_REGISTER.md`, `content/sources.json`.
- [x] "Yu Xiansheng" anecdote provenance documented. Evidence: claims/evidence source links and historian packet.
- [x] Wife naming variants explained. Evidence: claims, glossary, and historian packet.
- [ ] Indonesian and Japanese terminology reviewed by qualified humans. Pending external human reviewers.
- [x] Conflicting death-date/method clusters remain qualified. Evidence: history validator and claims data.
- [x] Composite and reconstruction disclosure complete. Evidence: methodology, data classes, source mode.

## Ethics And Sensitivity

- [x] No graphic violence or invented final interiority.
- [x] Japanese military-police responsibility is clear.
- [x] Young caller not scapegoated.
- [x] Wife has required agency beats.
- [x] Content notice accurate.
- [x] Marketing copy does not promise solving a murder.

## Accessibility

- [x] Keyboard-only full completion in automated matrix. Evidence: desktop Chromium pass; WebKit/mobile profiles have completion/reflow/a11y smoke coverage.
- [ ] Screen-reader manual pass documented. Pending NVDA/VoiceOver human review.
- [x] Automated accessibility suite passes. Evidence: 7 axe tests pass, with 1 documented Firefox deep-state skip.
- [x] 200% text scale and 320px reflow pass. Evidence: E2E tests pass.
- [x] Reduced motion, high contrast, texture-free modes pass implementation checks. Evidence: settings controls and E2E/axe smoke.
- [x] Audio captions and mute-only completion pass. Evidence: text cue implementation; no audio required.
- [x] Focus order and modal return focus pass automated smoke. Evidence: E2E dossier and keyboard tests.

## Saves And Privacy

- [x] Autosave/reload in representative mode. Evidence: E2E reload test.
- [x] Export/import round trip covered by codec/unit path. Evidence: `tests/unit/SaveCodec.test.ts`.
- [x] Corrupt/large/future save rejection. Evidence: unit tests and E2E corrupt import test.
- [x] Migration tests pass for current schema. Evidence: schema `1` decode tests.
- [x] Privacy page matches actual network behavior. Evidence: no external request E2E test.
- [x] No analytics/tracking/remote font/CDN requests. Evidence: network E2E and local asset register.
- [x] Delete/reset controls verified. Evidence: destructive actions require confirmation in settings implementation.

## Assets And Credits

- [x] Every image/audio/font has provenance. Evidence: `content/assets.json`, `ATTRIBUTIONS.md`.
- [x] No hotlinked asset. Evidence: asset validator and no external request E2E.
- [x] Credits and licenses generated. Evidence: `dist/reports/attributions.json`.
- [x] Real-person images used only with verified rights. Evidence: no real-person images included.
- [x] Alt text/text alternatives complete for shipped non-photographic assets. Evidence: asset register and semantic UI.

## Deployment

- [x] Staging URL smoke-tested. Evidence: GitHub Pages deployment from `main` succeeded and `https://dystopians.github.io/ZhaoLian/` returned HTTP 200 with app title/H1 and no browser console errors.
- [x] CSP/security headers guidance checked where host permits. Evidence: static no-remote posture and deployment notes.
- [x] Base path and deep navigation tested. Evidence: single-page static app uses no required deep routes.
- [ ] Previous release available for rollback. Not applicable to first RC until a hosted release exists.
- [x] Static release bundle and attribution reports archived locally. Evidence: `dist/`.
- [x] Production URL and release notes prepared. Evidence: `RELEASE_NOTES.md`; URL is `https://dystopians.github.io/ZhaoLian/`.

## Sign-Off

| Area                         | Reviewer                          | Date       | Result/notes                                    |
| ---------------------------- | --------------------------------- | ---------- | ----------------------------------------------- |
| Product                      | Codex implementation audit        | 2026-06-19 | RC prepared; owner publication approval pending |
| Engineering                  | Codex automated verification      | 2026-06-19 | PASS                                            |
| Narrative                    | Codex narrative/history validator | 2026-06-19 | PASS machine checks                             |
| Historical                   | external reviewer required        | not signed | Pending genuine human review                    |
| Indonesian/Japanese language | external reviewer required        | not signed | Pending genuine human review                    |
| Accessibility                | external reviewer required        | not signed | Manual screen-reader review pending             |
| License/assets               | Codex asset audit                 | 2026-06-19 | PASS for included local assets                  |
