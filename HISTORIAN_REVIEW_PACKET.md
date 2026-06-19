# Historian Review Packet

This packet is prepared for qualified human review. It does not claim human approval.

## Review Scope

- Yu Dafu / Zhao Lian chronology in Sumatra.
- Interpreter and wine-factory accounts.
- "Yu Xiansheng" anecdote provenance.
- 29 August departure testimony.
- 30 August daughter-birth record.
- Hu Yuzhi investigation and edition variants.
- Early 17 September / shooting cluster.
- Later 29-30 August / alternate-method cluster.
- Japanese military-police institutional terminology.
- Payakumbuh and August 1945 Indonesian context.
- Wife naming variants and agency framing.

## Machine-Readable Audit Sources

| Inventory | File                          | Count | Notes                                                                             |
| --------- | ----------------------------- | ----: | --------------------------------------------------------------------------------- |
| Sources   | `content/sources.json`        |    15 | Historical, technical, and project-rule source records.                           |
| Claims    | `content/claims.zh-CN.json`   |    26 | Class, confidence, source IDs, conflicts, appendix eligibility, and review notes. |
| Evidence  | `content/evidence.zh-CN.json` |    36 | D/T/L/C/R/U classes represented.                                                  |
| Timeline  | `content/timeline.zh-CN.json` |    20 | Chronology entries linked to claims/evidence.                                     |
| Glossary  | `content/glossary.zh-CN.json` |    25 | Terms and contested labels.                                                       |

`scripts/validate-content.mjs` and `scripts/validate-history.mjs` verify source links, class coverage, unresolved labeling, wife-agency minimums, no-rescue/no-execution policy, and prohibited certainty claims.

## Claim Audit

Reviewers should begin with `content/claims.zh-CN.json`. Each claim contains:

- stable claim ID;
- source class and confidence level;
- supporting source IDs;
- conflict links where applicable;
- public appendix eligibility;
- editorial notes and review status.

Critical unresolved or contested clusters are intentionally not collapsed into certainty: death date, method, exact location, young caller identity, and later investigative details remain qualified in data and UI.

## Reconstruction Audit

Composite or reconstructed material is disclosed in the following implementation areas:

- `content/story.zh-CN.json`: scene and line class labels, evidence IDs, and locked lines.
- `narrative/**/*.ink`: author-facing tags for chapter, scene, source class, evidence, and locked text.
- `content/evidence.zh-CN.json`: evidence records with source classes and appendix restrictions.
- `src/app/AppController.ts`: dossier, methodology, and source-mode presentation.

Dialog and staging are treated as game reconstruction unless backed by source records. The threshold rule stops the camera before the disappearance.

## Questions Requiring Human Judgment

- Which edition of Hu Yuzhi's work should be treated as the citation base, and what pagination/wording variants matter?
- Which original Suzuki Masao publication and interview chain should anchor later death-detail claims?
- Which Indonesian-language sources should contextualize Payakumbuh, occupation terminology, and local post-surrender conditions?
- Are Japanese military-police titles translated accurately and with sufficient institutional specificity?
- How should wife naming variants be explained in a public appendix without overstating certainty?
- Does any appendix wording imply forensic certainty beyond the evidence classes?

## Reviewer Sign-Off

| Area                               | Reviewer                   | Qualification  | Date       | Result/notes                 |
| ---------------------------------- | -------------------------- | -------------- | ---------- | ---------------------------- |
| Modern Chinese literature          | external reviewer required | to be supplied | not signed | Pending genuine human review |
| Japanese occupation history        | external reviewer required | to be supplied | not signed | Pending genuine human review |
| Indonesian / West Sumatran context | external reviewer required | to be supplied | not signed | Pending genuine human review |
