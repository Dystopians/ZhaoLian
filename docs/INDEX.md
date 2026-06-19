# Documentation Index and Authority Map

This is the authoritative routing map for the specification repository. Codex and human contributors must use it to identify what to read, which document controls a decision, and how to resolve conflicts.

## Document authority

### Tier 0 — Repository execution rules

1. `../AGENTS.md` — persistent rules automatically applicable to work in the repository.
2. `../CODEX_MASTER_PROMPT.md` — the full implementation goal for the initial long-running task.
3. `../PLANS.md` — living execution state; it records progress but cannot weaken normative requirements.

### Tier 1 — Non-negotiable truth, ethics, and completion

- `07_HISTORICAL_RESEARCH.md`
- `08_ETHICS_AND_REPRESENTATION.md`
- `26_ACCEPTANCE_CRITERIA.md`
- `27_DEFINITION_OF_DONE.md`

### Tier 2 — Product and narrative contracts

- `02_PRODUCT_REQUIREMENTS.md`
- `04_NARRATIVE_BIBLE.md`
- `05_FULL_GAME_SCRIPT.md`
- `06_BRANCHING_AND_STATE.md`

### Tier 3 — Engineering and data contracts

- `09_CONTENT_MODEL.md`
- `10_TECHNICAL_ARCHITECTURE.md`
- `11_REPOSITORY_STRUCTURE.md`
- `12_INK_AUTHORING_STANDARD.md`
- `18_SAVE_PRIVACY_AND_TELEMETRY.md`
- `19_TEST_STRATEGY.md`
- `20_CI_CD_AND_DEPLOYMENT.md`
- `21_PERFORMANCE_AND_COMPATIBILITY.md`
- `22_SECURITY.md`

### Tier 4 — Experience and production direction

- `03_PLAYER_EXPERIENCE.md`
- `13_UI_UX_SPEC.md`
- `14_VISUAL_ART_SPEC.md`
- `15_AUDIO_SPEC.md`
- `16_ACCESSIBILITY.md`
- `17_LOCALIZATION.md`
- `33_EDITORIAL_STYLE_GUIDE.md`
- `34_ASSET_AND_LICENSE_POLICY.md`

### Tier 5 — Planning, inventory, and review support

- `23_PROJECT_PLAN.md`
- `24_BACKLOG.md`
- `25_RISK_REGISTER.md`
- `28_RELEASE_CHECKLIST.md`
- `29_SOURCE_REGISTER.md`
- `30_DECISION_LOG.md`
- `31_CONTENT_INVENTORY.md`
- `32_TRACEABILITY_MATRIX.md`
- `35_GLOSSARY.md`
- `../IMPLEMENTATION_REPORT.md`
- `../HISTORIAN_REVIEW_PACKET.md`
- `../ACCESSIBILITY_REVIEW_PACKET.md`
- `../RELEASE_NOTES.md`
- `../ATTRIBUTIONS.md`

## Conflict resolution

When two documents conflict:

1. Preserve higher-level system/developer/user instructions outside this repository.
2. Within the repository, obey `../AGENTS.md` and the Tier 1 documents first.
3. Historical/ethical restraint overrides dramatic convenience and technical shortcuts.
4. Acceptance criteria override backlog estimates or optional production suggestions.
5. The full script controls story beats; the narrative bible controls tone and thematic interpretation.
6. Technical architecture controls default implementation, but a documented ADR may change it if all acceptance criteria still pass.
7. A newer accepted decision-log entry may supersede an older lower-tier design detail, never a non-negotiable without explicit product-owner revision.
8. When ambiguity remains, choose the option that preserves uncertainty, accessibility, privacy, and reversibility.

## Mandatory initial reading path for Codex

Read before writing implementation code:

1. `../README.md`
2. `../AGENTS.md`
3. `../CODEX_MASTER_PROMPT.md`
4. `00_EXECUTIVE_SUMMARY.md`
5. `01_PROJECT_CHARTER.md`
6. `02_PRODUCT_REQUIREMENTS.md`
7. `26_ACCEPTANCE_CRITERIA.md`
8. `07_HISTORICAL_RESEARCH.md`
9. `08_ETHICS_AND_REPRESENTATION.md`
10. `10_TECHNICAL_ARCHITECTURE.md`
11. `11_REPOSITORY_STRUCTURE.md`
12. `19_TEST_STRATEGY.md`
13. `32_TRACEABILITY_MATRIX.md`

Then read the phase-specific routes below.

## Reading routes

### Narrative/content implementation

- `04_NARRATIVE_BIBLE.md`
- `05_FULL_GAME_SCRIPT.md`
- `06_BRANCHING_AND_STATE.md`
- `12_INK_AUTHORING_STANDARD.md`
- `29_SOURCE_REGISTER.md`
- `33_EDITORIAL_STYLE_GUIDE.md`
- `35_GLOSSARY.md`
- `../IMPLEMENTATION_REPORT.md`
- `../HISTORIAN_REVIEW_PACKET.md`
- `../ACCESSIBILITY_REVIEW_PACKET.md`
- `../RELEASE_NOTES.md`
- `../ATTRIBUTIONS.md`

### UI, art, audio, and player experience

- `03_PLAYER_EXPERIENCE.md`
- `13_UI_UX_SPEC.md`
- `14_VISUAL_ART_SPEC.md`
- `15_AUDIO_SPEC.md`
- `16_ACCESSIBILITY.md`
- `17_LOCALIZATION.md`
- `34_ASSET_AND_LICENSE_POLICY.md`

### Data, saves, security, and performance

- `09_CONTENT_MODEL.md`
- `18_SAVE_PRIVACY_AND_TELEMETRY.md`
- `21_PERFORMANCE_AND_COMPATIBILITY.md`
- `22_SECURITY.md`

### QA and release

- `19_TEST_STRATEGY.md`
- `20_CI_CD_AND_DEPLOYMENT.md`
- `25_RISK_REGISTER.md`
- `26_ACCEPTANCE_CRITERIA.md`
- `27_DEFINITION_OF_DONE.md`
- `28_RELEASE_CHECKLIST.md`
- `32_TRACEABILITY_MATRIX.md`

## Complete Markdown manifest

| File                                  | Purpose                                               | Normative?                              |
| ------------------------------------- | ----------------------------------------------------- | --------------------------------------- |
| `../README.md`                        | Package orientation and handoff                       | Informative/entry point                 |
| `../AGENTS.md`                        | Persistent Codex/repository rules                     | Yes                                     |
| `../CODEX_MASTER_PROMPT.md`           | End-to-end implementation task                        | Yes for execution                       |
| `../PLANS.md`                         | Living implementation plan and evidence               | Operational                             |
| `../CONTRIBUTING.md`                  | Human/agent contribution standards                    | Yes                                     |
| `../IMPLEMENTATION_REPORT.md`         | Final implementation and verification report template | Operational deliverable                 |
| `../HISTORIAN_REVIEW_PACKET.md`       | Human historical review packet template               | External review deliverable             |
| `../ACCESSIBILITY_REVIEW_PACKET.md`   | Automated/manual accessibility review packet          | External review deliverable             |
| `../RELEASE_NOTES.md`                 | Release history template                              | Release deliverable                     |
| `../ATTRIBUTIONS.md`                  | Dependency and asset attribution template             | Release deliverable                     |
| `INDEX.md`                            | This authority and routing map                        | Yes                                     |
| `00_EXECUTIVE_SUMMARY.md`             | Product summary and success outcomes                  | Yes                                     |
| `01_PROJECT_CHARTER.md`               | Purpose, scope, governance, audience                  | Yes                                     |
| `02_PRODUCT_REQUIREMENTS.md`          | Functional/non-functional requirements                | Yes                                     |
| `03_PLAYER_EXPERIENCE.md`             | Experience pillars, emotional curve, user stories     | Yes                                     |
| `04_NARRATIVE_BIBLE.md`               | Themes, voice, roles, motifs, locked lines            | Yes                                     |
| `05_FULL_GAME_SCRIPT.md`              | Scene-by-scene authoritative script blueprint         | Yes                                     |
| `06_BRANCHING_AND_STATE.md`           | Variables, foldback branches, ending logic            | Yes                                     |
| `07_HISTORICAL_RESEARCH.md`           | Claims, classes, uncertainties, research tasks        | Yes, highest                            |
| `08_ETHICS_AND_REPRESENTATION.md`     | Representation and harm-prevention boundaries         | Yes, highest                            |
| `09_CONTENT_MODEL.md`                 | Evidence/claim/source/save data contracts             | Yes                                     |
| `10_TECHNICAL_ARCHITECTURE.md`        | Stack, components, runtime boundaries                 | Yes/default                             |
| `11_REPOSITORY_STRUCTURE.md`          | Target code/content layout                            | Yes/default                             |
| `12_INK_AUTHORING_STANDARD.md`        | Ink structure, tags, locked-line and lint rules       | Yes                                     |
| `13_UI_UX_SPEC.md`                    | Screens, modes, focus, responsive behavior            | Yes                                     |
| `14_VISUAL_ART_SPEC.md`               | Visual style, assets, motion, depiction rules         | Yes                                     |
| `15_AUDIO_SPEC.md`                    | Mixer, cues, prohibitions, captions                   | Yes                                     |
| `16_ACCESSIBILITY.md`                 | WCAG target and manual/automated requirements         | Yes, release blocking                   |
| `17_LOCALIZATION.md`                  | Locale architecture and language policy               | Yes                                     |
| `18_SAVE_PRIVACY_AND_TELEMETRY.md`    | Saves, import, deletion, privacy                      | Yes                                     |
| `19_TEST_STRATEGY.md`                 | Unit, narrative, E2E, accessibility, history tests    | Yes                                     |
| `20_CI_CD_AND_DEPLOYMENT.md`          | CI, build, release, static hosting                    | Yes                                     |
| `21_PERFORMANCE_AND_COMPATIBILITY.md` | Budgets, browsers, mobile, low-resource behavior      | Yes                                     |
| `22_SECURITY.md`                      | Threat model, CSP, import and supply-chain rules      | Yes                                     |
| `23_PROJECT_PLAN.md`                  | Human-scale phases and milestone gates                | Operational                             |
| `24_BACKLOG.md`                       | Prioritized epics and stories                         | Operational                             |
| `25_RISK_REGISTER.md`                 | Risks, mitigations, triggers, ownership               | Operational                             |
| `26_ACCEPTANCE_CRITERIA.md`           | Primary release pass/fail contract                    | Yes, highest                            |
| `27_DEFINITION_OF_DONE.md`            | Done criteria by work-item type and release           | Yes                                     |
| `28_RELEASE_CHECKLIST.md`             | Evidence-backed release checklist                     | Yes at release                          |
| `29_SOURCE_REGISTER.md`               | Historical/technical source inventory and gaps        | Yes for sourcing                        |
| `30_DECISION_LOG.md`                  | Accepted and future architectural/editorial decisions | Operational/authoritative when accepted |
| `31_CONTENT_INVENTORY.md`             | Minimum content and asset counts                      | Yes                                     |
| `32_TRACEABILITY_MATRIX.md`           | Requirement-to-code/test mapping                      | Yes at completion                       |
| `33_EDITORIAL_STYLE_GUIDE.md`         | Chinese prose, certainty, naming and UI language      | Yes                                     |
| `34_ASSET_AND_LICENSE_POLICY.md`      | Provenance, licenses, real photos, fonts              | Yes                                     |
| `35_GLOSSARY.md`                      | Stable product/historical/technical terminology       | Yes                                     |

## Completion audit

Before Codex reports completion, it must:

- read every file in the manifest;
- update `../PLANS.md`, `30_DECISION_LOG.md`, and `32_TRACEABILITY_MATRIX.md`;
- produce implementation and tests for every MUST requirement;
- run the complete verification suite from a clean install;
- finish `28_RELEASE_CHECKLIST.md` for all machine-verifiable items;
- never fabricate external historian, language-consultant, or accessibility-human signatures—create review packets and clearly mark external sign-off only where genuinely pending.
