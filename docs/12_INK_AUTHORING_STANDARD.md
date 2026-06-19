# 12 — Ink Authoring Standard

## Source organization

- `main.ink` includes globals, helper functions, chapter files, and endings.
- Each chapter has one public entry knot and private stitches.
- Shared report/choice functions live in `functions.ink`.
- Narrative text remains in ink; UI labels and non-story chrome live in localization data.

## Variables

Declare global variables in `globals.ink`. Use stable names matching `06_BRANCHING_AND_STATE.md`.

```ink
VAR rigor = 0
VAR care = 0
VAR closure = 0
VAR suspicion = 0
VAR opening_name = "blank"
VAR address_record = "blank"
VAR last_focus = "doorway"
```

Avoid storing large evidence arrays directly in ink if the app layer owns them. Emit evidence tags and keep a minimal ink boolean only when branch text needs it.

## Approved tags

```text
# scene:<scene_id>
# chapter:<chapter_id>
# date:<ISO-or-symbolic-date>
# location:<location_id>
# class:<D|T|L|C|R|U>[,<...>]
# ambience:<audio_id>
# sfx:<audio_id>
# visual:<asset_id>
# evidence:<evidence_id>
# claim:<claim_id>
# ui:<standard|wait|interview|report|comparison>
# announce:<polite|assertive>
# checkpoint:<checkpoint_id>
# locked:<locked_line_id>
```

Any new tag requires schema, router, tests, and documentation.

## Choice IDs

Ink choice display text may change; analytics-free internal IDs must remain stable via a tag or divert naming scheme.

```ink
* [保留听不清的部分。]
    # choice:CH06_ADDRESS_BLANK
    ~ address_record = "blank"
    ~ rigor += 2
    你留下两个方框。
```

## Locked lines

Use `# locked:<id>` immediately before locked lines. A validation script compares normalized text with a checked-in locked-lines manifest.

## Source classes

Every historical scene must emit at least one `# class:` tag. Mixed scenes should tag individual paragraphs or claims where feasible. Dramatic connective prose should not inherit a documented class merely because it sits beside a fact.

## Wait mode

Wait mode must be explicit and finite. It cannot depend on real clock time.

```ink
=== ch06_wait ===
# ui:wait
{ wait_count:
  - 0:
    * [等。]
      ~ wait_count += 1
      十分钟过去。桌上的话题已经换了一个。
      -> ch06_wait
  - 1:
    * [再等一会儿。]
      ~ wait_count += 1
      饭菜失去了热气。
      -> ch06_wait
  // ...
}
```

## Writing style checks

Automated checks should flag:

- “真结局”, “成功营救”, “你救下”, “游戏结束：失败”;
- execution verbs in post-threshold staged scene files unless inside source discussion;
- quotation marks around text marked as paraphrase;
- a historical paragraph without class/source tags where required;
- inaccessible instructions such as “点击红色按钮”;
- duplicate choice text in the same choice set without distinguishing labels.

## Testing hooks

Provide deterministic traversal hooks that can:

- choose by stable choice ID;
- export current scene/variables/evidence;
- enumerate all choices;
- detect dead ends;
- reach every ending via fixture paths.
