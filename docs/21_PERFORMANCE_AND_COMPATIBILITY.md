# 21 — Performance and Compatibility

## Performance budgets

Targets on a mid-range mobile device and a throttled reasonable network profile:

- Initial compressed transfer excluding optional post-game high-resolution images: **≤ 1.5 MB**.
- Initial JavaScript compressed: **≤ 250 KB** preferred, **≤ 400 KB** hard review threshold.
- Initial CSS compressed: **≤ 80 KB**.
- First meaningful readable content: **≤ 2.5 s** target.
- Choice response to new text: **≤ 100 ms** excluding intentional animation.
- Dossier open/close: **≤ 150 ms** perceived response.
- No long task over 200 ms during ordinary reading.
- Cumulative layout shift near zero during text reveal and asset loading.

Large appendix images and audio should load lazily. Audio decoding must not block first text.

Implementation note: the release budget script reports initial compressed transfer separately from lazy media. The western-Pacific map and title image count as critical initial media; scene illustrations and music are tracked under the lazy-media budget.

## Asset optimization

- Use modern web image formats with fallback only where needed.
- Provide explicit dimensions to prevent layout shift.
- Prefer vector/simple CSS for document lines and patterns.
- Compress audio and avoid many tiny request files if bundling is more efficient.
- Never ship unused reference images or full-resolution scans solely for atmosphere.

## Browser support

Support current stable and previous major family where practical for:

- Chromium-based browsers;
- Firefox;
- Safari/WebKit.

Minimum feature assumptions must be documented after implementation. Avoid unsupported experimental APIs for core play.

## Mobile and input

- Touch targets meet accessibility sizing expectations.
- No hover dependency.
- Safe-area insets respected on notched devices.
- Virtual keyboard does not hide report fields or confirmations.
- Landscape and portrait remain functional, though portrait may be optimized.

## Low-resource behavior

- Audio can be disabled before loading large files where practical.
- Texture-free mode reduces background assets.
- Story content remains usable if an illustration fails.
- Avoid continuous canvas animation, WebGL, or large animation libraries.

## Performance tests

- Bundle-size check in CI.
- Lighthouse or equivalent smoke audit as advisory plus hard custom budgets.
- E2E assertion that first scene becomes interactive.
- Test save with maximum expected transcript/evidence size.
- Memory check across full play/replay to ensure old DOM nodes and audio buffers are released.
