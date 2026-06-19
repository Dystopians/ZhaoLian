# Accessibility Review Packet

This packet records automated evidence and the remaining manual scripts for genuine accessibility review.

## Automated Results

| State/browser        | Tool/command        | Result                                                      | Report path          |
| -------------------- | ------------------- | ----------------------------------------------------------- | -------------------- |
| Title/content notice | `npm run test:a11y` | PASS across Chromium, Firefox, WebKit, mobile profile       | `playwright-report/` |
| Standard reading     | `npm run test:a11y` | PASS representative reading state in Chromium/WebKit/mobile | `playwright-report/` |
| Wait mode            | `npm run test:a11y` | PASS representative wait state in Chromium/WebKit/mobile    | `playwright-report/` |
| Dossier/source mode  | `npm run test:e2e`  | PASS visibility and non-blocking progression                | `playwright-report/` |
| Save import errors   | `npm run test:e2e`  | PASS controlled error text                                  | `playwright-report/` |
| Keyboard path        | `npm run test:e2e`  | PASS in desktop Chromium                                    | `playwright-report/` |
| 320px reflow         | `npm run test:e2e`  | PASS                                                        | `playwright-report/` |
| 200% text scaling    | `npm run test:e2e`  | PASS                                                        | `playwright-report/` |

Latest focused evidence:

- `npm run test:e2e`: 28 passed, 4 documented deep-interaction skips.
- `npm run test:a11y`: 7 passed, 1 Firefox deep-state skip.

## Manual Keyboard Path

Automated keyboard activation covers start, repeated story choices, wait mode, report radio selection, report submission, and visible focus in desktop Chromium.

Human keyboard reviewer script:

1. Start a new case using only keyboard navigation and activation.
2. Open and close the dossier, then verify focus returns predictably.
3. Toggle source mode in settings and return to reading.
4. Complete wait mode without pointer input.
5. Complete the report form and reach any ending.
6. Repeat with high contrast, reduced motion, and increased font size.

## Screen-Reader Scripts

These scripts are prepared but not executed by Codex:

- NVDA + Firefox or Chromium on Windows: title notice, main navigation, reading region, choice group, dossier dialog, settings, report form, ending.
- VoiceOver + Safari/WebKit: same route, plus modal close and focus return.
- Expected behavior: headings announce in order, buttons have names, source-class chips are not color-only, dialogs expose `role="dialog"` and modal state, report warnings are reachable as text, and no timed action is required.

## Visual And Reflow Checks

- 320 CSS-pixel reflow: automated PASS.
- 200% text scaling: automated PASS.
- High contrast: settings toggle exists and persists; visual human review still recommended.
- Reduced motion: settings and CSS media-query handling exist; no core action requires animation.
- Texture-free mode: settings toggle exists and persists.
- Audio captions: meaningful cues are text captions; audio is never required.

## Open Issues

- Manual screen-reader sign-off is pending genuine human review.
- Firefox and mobile headless focus state is unstable for the deep keyboard path; those profiles still pass axe, save, network, reflow, completion, and dossier smoke tests.

## Human Reviewer Sign-Off

| Environment        | Reviewer                   | Date       | Result/notes                 |
| ------------------ | -------------------------- | ---------- | ---------------------------- |
| Keyboard only      | external reviewer required | not signed | Pending genuine human review |
| NVDA / Windows     | external reviewer required | not signed | Pending genuine human review |
| VoiceOver / WebKit | external reviewer required | not signed | Pending genuine human review |
