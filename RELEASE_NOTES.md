# Release Notes

## 1.0.0-rc.0 - 2026-06-19

### Added

- Complete zh-CN static browser narrative from CH00 through CH10.
- Four non-ranked endings with deterministic hidden report evaluation.
- Source-mode chips, dossier tabs, evidence, claims, timeline, sources, glossary, methodology, credits, and privacy text.
- Local autosave, restore, export/import validation, settings persistence, and destructive reset confirmation.
- Original local CSS/document-style visual assets and text sound captions.
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
- Firefox headless runs smoke/a11y coverage; two deep interaction paths are skipped because local Firefox focus/timing was unstable.
- No real historical photos or audio files are bundled in this RC.
