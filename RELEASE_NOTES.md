# Release Notes

## 1.0.0-rc.0 - 2026-06-19

### Added

- Complete zh-CN static browser narrative from CH00 through CH10.
- Four non-ranked endings with deterministic hidden report evaluation.
- Source-mode chips, dossier tabs, evidence, claims, timeline, sources, glossary, methodology, credits, and privacy text.
- Local autosave, restore, export/import validation, settings persistence, and destructive reset confirmation.
- Original low-color WebP silhouette visual assets, including a western-Pacific map background, chapter scene art, two non-photographic portrait treatments, and context illustrations.
- Local lazy-loaded OpenGameArt stage music plus the owner-supplied `相対性理論 - スマトラ警備隊` ending track, all with text sound captions and explicit playback controls.
- Full validation and release toolchain: format, Markdown lint, ESLint, unit coverage, narrative traversal, content/history validators, TypeScript, production build, performance budget, E2E, accessibility scans, and attribution generation.
- GitHub Actions CI, dependency review, and static Pages deployment workflows.

### Historical And Content Notes

- Death-date and method clusters remain conflicting records, not a solved truth path.
- The young caller remains unresolved.
- Wife agency beats and practical decisions are included.
- Public claims are source-linked in `content/claims.zh-CN.json`.
- Composite and reconstructed scenes are disclosed through data classes and methodology text.

### Save Compatibility

- Initial save schema: `1`.
- Future schemas must add migration fixtures before release.

### Known Limitations

- External historian and manual screen-reader review are pending before public publication.
- Firefox headless runs smoke/a11y coverage; unstable deep interaction paths are documented as skips where focus/timing is unreliable.
- No real historical photos are bundled in this RC.
- The ending screen uses the owner-supplied local `相対性理論 - スマトラ警備隊.mp3` track via a stable runtime copy under `assets/audio/`.
