# 16 — Accessibility Requirements

Target: WCAG 2.2 Level AA for the production web application, plus narrative-specific usability requirements.

## Keyboard

- Every function is available from keyboard alone.
- Logical tab order follows visual and reading order.
- No keyboard trap except intentional modal focus trap with Escape/close control.
- Choice shortcuts, if added, supplement rather than replace normal controls.
- Focus is restored after dossier/settings close.

## Screen readers

- Semantic landmarks: header, nav, main, complementary/dossier, footer.
- Heading hierarchy is consistent.
- Choice lists use buttons inside an appropriately labeled group.
- Evidence strength is communicated in text.
- New narrative text is announced without rereading the entire transcript.
- Decorative paper textures are ignored by assistive tech.
- Icon-only controls have accessible names and states.

## Visual

- Text/background contrast meets AA; focus indicator meets applicable WCAG 2.2 criteria.
- No information relies on color alone.
- Text can scale to at least 200% without loss of content/function.
- Reflow works at 320 CSS pixels.
- Provide high-contrast and texture-free modes.
- Default body text should be comfortable for Chinese reading; allow font scale and line-height adjustment.

## Motion and timing

- Honor `prefers-reduced-motion` automatically and provide an in-app override.
- No time-limited choices.
- Typewriter/reveal animation can be disabled or set to instant.
- No flashing content.
- Audio is never required to understand or advance.

## Cognitive accessibility

- Use consistent verbs and control placement.
- Explain source classes in plain language.
- Avoid unexplained abbreviations in player-facing text.
- Provide a persistent transcript.
- Confirm destructive reset actions and distinguish story reset from settings reset.
- The wait interaction explicitly says the game is continuing.

## Forms

- Report fields use `fieldset` and `legend`.
- Error/warning text is associated with controls.
- Unknown/blank choices are clearly labeled and valid.
- Imported-save file errors identify the issue and next action.

## Sound

- Independent volume controls.
- Captions for meaningful sound cues.
- No autoplay before interaction.
- Muting audio never hides a choice or evidence.

## Automated checks

Use Playwright-based accessibility scans for representative states:

- title/content notice;
- standard reading;
- open dossier;
- wait mode;
- interview mode;
- report editor with warnings;
- each ending;
- settings and methodology.

Automated scans do not replace manual review.

## Manual test matrix

- Keyboard-only complete playthrough.
- NVDA + Firefox or Chromium on Windows where available.
- VoiceOver + Safari/WebKit on macOS/iOS where available.
- 200% zoom and 400% text/reflow spot checks.
- High contrast/forced colors.
- Reduced motion.
- Audio muted with captions off and on.

## Release blockers

- Unreachable choice or report field by keyboard.
- Focus loss after a choice.
- Source class communicated by color only.
- Wait mode mistaken for frozen state in usability testing.
- Modal trap without exit.
- Critical AA violation without documented equivalent solution.
