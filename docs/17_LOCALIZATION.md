# 17 — Localization and Language Policy

## Release scope

- **v1 complete locale:** `zh-CN`.
- Architecture must support later `en`, `ja`, and `id`, but untranslated locales are not required for v1 release.

## Separation

- Narrative prose remains in locale-specific ink files or a documented localization workflow.
- UI chrome, settings, source-class labels, error messages, and metadata are externalized.
- Do not concatenate fragments in ways that assume Chinese grammar.
- Dates, punctuation, and names use locale-aware formatters where appropriate.

## Proper names and place names

Maintain a glossary entry with:

- Chinese form;
- Latin-script form;
- local/Japanese form if relevant;
- period-appropriate and contemporary variants;
- note on disputed transliteration.

Required entries include:

- 郁达夫 / Yu Dafu;
- 赵廉 / Zhao Lian;
- 巴爷公务 / Payakumbuh;
- 武吉丁宜 / Bukittinggi;
- 苏门答腊 / Sumatra;
- 胡愈之 / Hu Yuzhi;
- 赵豫记;
- 日本宪兵 / Japanese military police / Kempeitai terminology review.

## Japanese and Indonesian dialogue

- Main release can present Chinese translation with a visible language label.
- Any actual Japanese or Indonesian phrase must be reviewed by a qualified speaker and fit 1940s register where relevant.
- Do not use machine-translated historical dialogue as final copy.
- The inaudible name at the door remains inaudible in every locale.

## Translation ethics

Future translations must preserve:

- distinction between “missing,” “abducted,” “killed,” and “presumed killed”;
- source classes and confidence;
- the social difference between Zhao Lian and Yu Dafu;
- ambiguity of the young caller;
- no true-ending implication.

## Text expansion and layout

Design UI for at least 35% expansion in English and varying Japanese/Indonesian line breaks. Do not bake text into images except facsimile props that also have accessible transcription.

## Locale QA

For each locale:

- linguistic review;
- historical terminology review;
- full screenshot/overflow pass;
- screen-reader labels review;
- locked-line equivalence review;
- glossary consistency check.
