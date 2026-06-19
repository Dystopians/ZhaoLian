# 25 — Risk Register

Scales: probability and impact are Low/Medium/High.

| ID    | Risk                                                                   |  Prob. | Impact | Mitigation                                                                         | Trigger/owner                                                 |
| ----- | ---------------------------------------------------------------------- | -----: | -----: | ---------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| R-001 | Secondary sources conflict on date/method                              |   High |   High | Preserve clusters; obtain primary/near-primary material; historian sign-off        | Any proposed definitive wording / history lead                |
| R-002 | Fixed outcome feels like meaningless choice                            | Medium |   High | Explicit contract; choices affect evidence, questions, report, endings             | Playtests report “choices do nothing” / design lead           |
| R-003 | Players search for a rescue route                                      |   High | Medium | No suggestive UI; preface contract; post-play explanation                          | More than 20% expect survival branch / UX lead                |
| R-004 | “Mystery” framing erases Japanese responsibility                       | Medium |   High | Name institution; separate attribution certainty from execution-detail uncertainty | Review flags abstract fate language / narrative lead          |
| R-005 | Indonesian caller becomes scapegoat                                    | Medium |   High | Keep identity/motive unresolved; cultural review                                   | Players blame community / sensitivity reviewer                |
| R-006 | Wife/newborn reduced to symbolism                                      | Medium |   High | Required agency beats and practical actions                                        | Script review finds only childbirth function / narrative lead |
| R-007 | “郁先生” anecdote overtreated as transcript                            |   High | Medium | Testimony label; avoid unsupported gestures                                        | Source review cannot verify wording / history lead            |
| R-008 | Wait mode appears broken                                               | Medium |   High | Explicit status, focus management, usability tests                                 | Drop-off or support reports / UX engineer                     |
| R-009 | Source labels overwhelm literary pacing                                | Medium | Medium | Source mode off by default; progressive disclosure                                 | Players open fewer scenes or report clutter / UX lead         |
| R-010 | Ink and app state diverge                                              | Medium |   High | Transactional state, integration tests, stable checkpoints                         | Restore mismatch / engineering lead                           |
| R-011 | Save invalidation after content edit                                   | Medium |   High | Versioned migrations and checkpoint map                                            | Changed knot paths / engineering lead                         |
| R-012 | Accessibility added too late                                           | Medium |   High | Semantic baseline and automated scans from vertical slice                          | Major redesign in phase 5 / product owner                     |
| R-013 | Art uses unlicensed web references                                     | Medium |   High | Asset manifest, no hotlinking, license gate                                        | Missing provenance / art lead                                 |
| R-014 | Bundle grows due to audio/images                                       | Medium | Medium | Lazy loading, budgets, compression                                                 | CI size threshold / engineering lead                          |
| R-015 | Machine-translated Japanese/Indonesian errors                          |   High | Medium | Human language review; Chinese-only fallback                                       | No consultant available / editorial lead                      |
| R-016 | Historical appendix repeats official commemorative claims uncritically | Medium |   High | Source comparison and confidence labels                                            | Conflicting institutional pages / historian                   |
| R-017 | Codex stops at scaffold or vertical slice                              | Medium |   High | Master prompt, AGENTS, acceptance matrix, no-completion gate                       | Missing chapters/tests / project owner                        |
| R-018 | Automated traversal misses UI-only dead end                            | Medium | Medium | Combine headless story and browser E2E                                             | Divergent state / QA                                          |
| R-019 | CSP broken by inline or dev assumptions                                |    Low | Medium | Security test and deployment headers                                               | Production console violations / engineer                      |
| R-020 | Project uses “latest” dependencies unreproducibly                      | Medium | Medium | Lockfile, engines, CI clean install                                                | Different local/CI output / engineer                          |

## Risk review cadence

- Review at each milestone and before release candidate.
- Any High/High risk without active mitigation blocks release.
- Closed risks remain in the register with closure evidence rather than deletion.
