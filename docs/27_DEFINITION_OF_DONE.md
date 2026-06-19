# 27 — Definition of Done

## For a code change

- Requirement IDs identified.
- Implementation is typed, readable, and follows repository conventions.
- New behavior has unit/integration/E2E coverage appropriate to risk.
- Accessibility impact considered and tested.
- Error and empty states included.
- No new dependency without license/need review.
- Relevant documentation and traceability updated.
- Narrow tests and formatting pass.

## For a narrative scene

- Entry and exit paths work.
- Every choice has a stable ID.
- Fixed historical outcome is preserved.
- Source classes and claim/evidence tags are present.
- Reconstruction/composite text is correctly marked.
- Locked lines validated.
- No invented last interiority or prohibited depiction.
- Wife/local/Japanese representation rules reviewed where applicable.
- Headless traversal and at least one UI path pass.
- Editorial style and terminology checks pass.

## For an evidence or claim record

- Stable ID.
- Clear player-facing label and summary.
- Source class and confidence.
- Valid source IDs.
- Conflict links where relevant.
- Appendix eligibility reviewed.
- No quotation without exact source metadata.
- Historian review status recorded.

## For an asset

- Correct dimensions/format and optimized size.
- Original/license provenance recorded.
- Alt text or decorative status.
- High contrast/texture-free behavior reviewed.
- No historical claim embedded in the image without source review.
- No remote hotlink.

## For a milestone

- Planned deliverables exist.
- Acceptance subset passes.
- Risks and decisions updated.
- Playable build generated.
- Test evidence recorded in `../PLANS.md`.
- No unresolved P0 issue.

## For release

- Every MUST criterion in `26_ACCEPTANCE_CRITERIA.md` passes.
- Clean `npm ci` and `npm run verify` pass.
- Production deployment smoke-tested.
- Historical and accessibility sign-offs complete.
- License and source audit complete.
- Release notes and rollback artifact available.
- Known limitations disclose only approved SHOULD/COULD deferrals, not broken MUST requirements.
