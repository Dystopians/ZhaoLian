# 07 — Historical Research and Claim Policy

## Purpose

This document governs what the game may state as history, what it may stage as reconstruction, and what must remain unresolved.

## Baseline claims for implementation

These claims may be implemented provisionally, subject to source-register review:

- **HIS-001:** Yu Dafu fled Singapore during the Japanese advance and eventually lived in Payakumbuh/巴爷公务 under the name Zhao Lian.
- **HIS-002:** He participated in a wine-factory/business cover commonly associated with the name 赵豫记.
- **HIS-003:** His Japanese ability led to forced or compelled interpreter work for Japanese military police/occupation authorities.
- **HIS-004:** Accounts state that he used this position to help or protect Chinese and local people; individual rescue scenes in the game are composites unless independently sourced.
- **HIS-005:** A later recollection describes a military policeman addressing him as “郁先生” after investigation into his identity.
- **HIS-006:** Japan's surrender was announced before his disappearance, but local Japanese forces retained practical control during the transfer-of-power vacuum.
- **HIS-007:** On the night of 29 August 1945, a young local man called at the house; Zhao Lian went out in sleepwear and wooden clogs, saying he would return, and disappeared.
- **HIS-008:** A daughter was born on 30 August while the household was confronting his absence.
- **HIS-009:** Hu Yuzhi conducted an early investigation and strongly attributed the disappearance to Japanese military police.
- **HIS-010:** A widely circulated early account gives 17 September and shooting, while later research gives the night of 29/30 August and a different killing method.
- **HIS-011:** No remains or fully conclusive judicial reconstruction are available to the project.

## Required source classes

- `D_DOCUMENTED`: supported by strong contemporaneous or convergent institutional records.
- `T_TESTIMONY`: witness statement, memoir, or later recollection.
- `L_LATER_RESEARCH`: later scholarly/journalistic reconstruction using interviews or archives.
- `C_COMPOSITE`: several accounts merged for dramatic clarity.
- `R_RECONSTRUCTION`: staging detail invented to make a scene playable.
- `U_UNRESOLVED`: contradiction or absence that must remain open.

The game must never call `C`, `R`, or `U` a historical fact.

## Claim record minimum

Every historical claim object contains:

```text
id
short_label
statement
class
confidence: high | medium | low | disputed
source_ids[]
conflicting_claim_ids[]
public_appendix_allowed: boolean
editorial_note
last_reviewed_date
reviewer
```

## Unresolved questions that must remain visible

- Exact identity and knowledge of the young caller.
- Exact first syllable/name used at the door.
- Exact vehicle occupants and what a road witness could see.
- Exact arrest route after leaving the house.
- Exact death date.
- Exact killing method.
- Exact location and burial/remains.
- Exact wording of many remembered conversations.

## Research tasks before release candidate

1. Locate and review the best available text of Hu Yuzhi's `郁达夫的流亡与失踪` and record publication variants.
2. Locate Suzuki Masao's original research publication/interview evidence, not only secondary summaries.
3. Verify the wording and provenance of the “郁先生” anecdote.
4. Resolve or explain naming variants for Yu Dafu's wife in relevant Chinese and Southeast Asian sources.
5. Verify geographic names and transliterations: Payakumbuh/巴爷公务, Bukittinggi/武吉丁宜, and alleged locations.
6. Ask an Indonesian historian/language consultant to review local political context in August 1945.
7. Ask a Japanese-occupation historian to review institutional terminology and surrender-period authority.
8. Verify daughter birth date and how it is documented.
9. Separate officially commemorative biographies from evidentiary accounts where they conflict.
10. Create a historian sign-off table for every public appendix claim.

## Writing rules

- Use “据……回忆/调查” for testimony and later reconstruction.
- Do not place paraphrases in quotation marks.
- A quotation may be used only when the source text and edition are identified.
- When sources disagree, state the disagreement before offering an inference.
- Attribution to Japanese military police may be expressed strongly where sources support it; exact operational details remain qualified.
- Avoid the vague phrase “死于命运” or equivalents that erase agency.
