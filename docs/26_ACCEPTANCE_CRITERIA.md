# 26 — Acceptance Criteria

This is the primary pass/fail contract. **All MUST criteria are release blockers.** Codex must provide evidence for each criterion in the traceability matrix or release report.

## A. Complete playable product

- **AC-001 MUST:** A clean install can start the development server and produce a production build using documented commands.
- **AC-002 MUST:** A player can start a new run and reach an ending without developer tools or manual state edits.
- **AC-003 MUST:** CH00 through CH10 are implemented with all fixed beats in `05_FULL_GAME_SCRIPT.md`.
- **AC-004 MUST:** All six endings are reachable through legitimate UI choices.
- **AC-005 MUST:** Every ending ends with the locked shared final line.
- **AC-006 MUST:** No choice can save Zhao, prevent his departure, follow him past the threshold, or witness an execution.
- **AC-007 MUST:** No placeholder copy such as TODO, lorem ipsum, “coming soon,” inactive button, or empty required screen remains.

## B. Historical and ethical integrity

- **AC-010 MUST:** Every public historical appendix assertion links to at least one source record.
- **AC-011 MUST:** Documented, testimony, later-research, composite, reconstruction, and unresolved classes are represented in data and UI.
- **AC-012 MUST:** The game clearly attributes the strongest responsibility to Japanese military police while qualifying disputed operational details.
- **AC-013 MUST:** No invented last words, thoughts, death scene, corpse, grave coordinate, or false forensic certainty appears.
- **AC-014 MUST:** The young caller remains unresolved and is not used to assign collective Indonesian blame.
- **AC-015 MUST:** The wife has at least three active scene beats and two practical decisions.
- **AC-016 MUST:** Composite and reconstructed people/scenes are disclosed in methodology.
- **AC-017 MUST:** Both early and later death-detail clusters appear as conflicting records, not a progression to a “true answer.”

## C. Game systems

- **AC-020 MUST:** Opening name choice has Yu Dafu, Zhao Lian, and blank options with persistent effects.
- **AC-021 MUST:** Translation mechanic includes phrase-level choices and no right/wrong score.
- **AC-022 MUST:** “郁先生” scene lets player record action or absence of action evidence.
- **AC-023 MUST:** Wait mode contains the specified finite sequence and makes clear the app is functioning.
- **AC-024 MUST:** Interview mode distinguishes leading, neutral, and narrative questions after selection.
- **AC-025 MUST:** Report form supports unknown/blank values and displays conflicts.
- **AC-026 MUST:** Ending logic is deterministic, tested, and hidden from the player.
- **AC-027 MUST:** Current-run evidence, prior-run meta knowledge, and source records remain distinct.

## D. Dossier and sources

- **AC-030 MUST:** Dossier includes evidence, claims, timeline, sources, and glossary.
- **AC-031 MUST:** Each evidence card shows source class in text and non-color visual form.
- **AC-032 MUST:** Source mode can be enabled/disabled at any time and does not block progression.
- **AC-033 MUST:** Claim conflict links are functional.
- **AC-034 MUST:** Methodology explains the camera/threshold rule and reconstruction policy.

## E. Saves and privacy

- **AC-040 MUST:** Autosave restores the exact current scene, choices, evidence, and report draft after reload.
- **AC-041 MUST:** Export/import round-trip passes for current save schema.
- **AC-042 MUST:** Corrupt, oversized, and unsupported-version saves fail safely.
- **AC-043 MUST:** Story saves and accessibility/settings persistence are separable.
- **AC-044 MUST:** Core play sends no required third-party network requests and collects no analytics.
- **AC-045 MUST:** Delete/reset controls behave as labeled and require confirmation for destructive actions.

## F. Accessibility

- **AC-050 MUST:** Entire game can be completed by keyboard.
- **AC-051 MUST:** Focus remains visible and moves predictably after choices, drawers, dialogs, and chapter transitions.
- **AC-052 MUST:** Automated accessibility scans pass agreed serious/critical thresholds for all representative states.
- **AC-053 MUST:** 200% zoom and 320 CSS-pixel reflow preserve content and function.
- **AC-054 MUST:** Reduced motion, high contrast, texture-free mode, font scale, line height, instant text, and audio controls work and persist.
- **AC-055 MUST:** Meaningful sound has optional text captions, and audio is never required.
- **AC-056 MUST:** Report support/conflict and evidence classes are not communicated by color alone.

## G. Quality and compatibility

- **AC-060 MUST:** `npm run verify` passes from a clean checkout after locked install.
- **AC-061 MUST:** Unit, integration, narrative, historical-lint, E2E, and accessibility suites exist and pass.
- **AC-062 MUST:** Four golden narrative paths and no-rescue invariant are automated.
- **AC-063 MUST:** Production build runs without uncaught console errors in supported browsers.
- **AC-064 MUST:** Required desktop/mobile viewports have no blocking overflow or inaccessible control.
- **AC-065 MUST:** Bundle and responsiveness meet `21_PERFORMANCE_AND_COMPATIBILITY.md` budgets or have an approved waiver.
- **AC-066 MUST:** No unlicensed runtime asset or dependency is included.

## H. Documentation and release

- **AC-070 MUST:** README has install, development, verification, build, and deployment instructions.
- **AC-071 MUST:** Source register, credits, licenses, privacy, content notice, methodology, and release notes are present.
- **AC-072 MUST:** Decision log explains material deviations from this specification.
- **AC-073 MUST:** Traceability matrix maps every MUST requirement to implementation and verification.
- **AC-074 MUST:** Release checklist is completed with dated evidence.

## SHOULD goals

- **AC-080 SHOULD:** Completed-run archive can compare prior report texts without implying truth completion.
- **AC-081 SHOULD:** Cross-browser E2E runs in Chromium, Firefox, and WebKit on each release.
- **AC-082 SHOULD:** A post-completion historical note includes reviewed real images with verified rights.
- **AC-083 SHOULD:** App is installable/offline through a service worker only if update safety is verified.
