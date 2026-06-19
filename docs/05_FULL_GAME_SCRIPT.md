# 05 — Full Game Script Specification

This is the authoritative scene blueprint. It contains locked text, required choices, state effects, evidence grants, and transitions. Writers may expand atmospheric and connective prose within the editorial and historical rules, but must not change fixed outcomes.

## Notation

- `[D]` documented/strongly established.
- `[T]` testimony or later recollection.
- `[L]` later research reconstruction.
- `[R]` dramatic staging reconstruction.
- `[C]` composite person/event.
- `[U]` unresolved.
- `LOCKED:` exact or nearly exact required text.

## Global variables

```text
rigor: integer, starts 0
care: integer, starts 0
closure: integer, starts 0
suspicion: integer, starts 0
opening_name: yu | zhao | blank
address_record: yu | zhao | blank
last_focus: doorway | coffee_shop | road
evidence: set<string>
claims_seen: set<string>
question_quality: map<witness, leading|neutral|narrative>
report_fields: structured object
```

Values are hidden. Choices must be described by their content, never by stat names.

---

## CH00 — `archive_name` / 请填写姓名

**Purpose:** establish the player as editor and teach that naming is an intervention.

**Visual:** black field, typewriter line, one empty case-title field.

**LOCKED:**

> 案卷题名：＿＿＿＿失踪案

Choices:

1. `郁达夫`
   - `opening_name = yu`
   - `closure += 1`
   - Response: `你先写下了后来的人最熟悉的名字。1945年8月29日晚，小镇上的多数人并不这样称呼他。`
2. `赵廉`
   - `opening_name = zhao`
   - `care += 1`
   - Response: `你先写下了当时小镇最熟悉的名字。后来的纪念碑不会只写这个名字。`
3. `暂不填写`
   - `opening_name = blank`
   - `rigor += 1`
   - Response: `档案接受空白。纪念仪式通常不能。`

Then display the contract:

**LOCKED:**

> 你不能改变这件事。你将改变它留下来的文字。

Unlock dossier tutorial and three empty drawers: `名字`, `译文`, `日期`.

Transition to CH01.

---

## CH01 — `zhao_boss` / 赵老板

**Time:** reconstructed 1942–1944, not one exact date.  
**Classes:** `[C][R]`, with individual factual claims separately tagged.

**Scene:** rain, Zhao Yu Ji wine factory, bottle crates, Japanese serviceman collecting wine, local customer watching Zhao speak Japanese.

Required base text:

> 伙计把酒搬到门边。日本军人说了一句话。赵老板用日语回答。两个人都笑了。
>
> 柜台旁的人低声说：“他和宪兵倒很熟。”
>
> 伙计没有回答。过了一会儿才说：“上星期被抓走的那个，也是他带回来的。”

Player can inspect only two of four:

- `听日语谈话`
  - grant `E_JAPANESE_FLUENCY`
  - claim: fluency can support both collaboration suspicion and forced use.
- `询问回来的人`
  - grant `E_PROTECTIVE_INTERVENTION_COMPOSITE`
  - mark as `[C]`; `care += 1` if player preserves composite label.
- `查看酒厂账簿`
  - grant `E_LEDGER_ZHAO_LIAN`
  - introduces daily legal/business identity.
- `观察军人的态度`
  - grant `E_UTILIZED_BY_OCCUPIERS`
  - wording must avoid claiming trust or membership.

After the second inspection:

**LOCKED:**

> 在小镇上，一个人与日本人说话。有人因此怀疑他。有人因此活下来。

Dossier prompt asks player to classify one sentence as action vs interpretation. Transition CH02.

---

## CH02 — `translator_list` / 译员

**Purpose:** translation mechanic and moral ambiguity.

**Scene:** military-police office; a list of three names; order meaning: bring the people before tonight for questioning.

The player assembles Zhao's conveyed version from three slots.

Time slot:

- `今晚以前` — literal; `suspicion -= 1`, no escape-time evidence.
- `明天上午` — delay; `suspicion += 1`, grant `E_TRANSLATION_DELAY`.
- `过几天` — strong alteration; `suspicion += 2`, grant `E_TRANSLATION_DELAY_STRONG`.

Action slot:

- `带来`
- `请来说明情况`
- `让我先核对姓名`

Purpose slot:

- `审问`
- `登记`
- `谈一谈`

Required follow-up:

> 军警问：“我说的是明天吗？”

Response choices:

- `说口音太重` — protects ambiguity, small suspicion.
- `拿起名单重新解释` — may grant `E_NAME_REMOVED` if “核对姓名” selected.
- `倒酒，转开话题` — invokes social cover, grant `E_WINE_AS_SHIELD`.

Do not display rescued-person counters. The scene ends with:

**LOCKED:**

> 白天，他替别人翻译。夜里，他担心自己的话被别人翻译。

Transition CH03.

---

## CH03 — `dream_speech` / 梦话

**Form:** short nocturnal chapter; rain, fan, lamp; no direct internal monologue.

Present a testimony-derived statement that Zhao worried about speaking in sleep. Player assigns an editorial label:

- `身份暴露的恐惧` — interpretation; `closure += 1`.
- `牵连同伴的恐惧` — interpretation; `care += 1`.
- `语言失去控制的恐惧` — thematic interpretation; no factual promotion.
- `不作解释` — `rigor += 1`.

Then show two boxes:

> 材料所说的：他担心说梦话。  
> 你所写的：＿＿＿＿。

Grant `E_DREAM_SPEECH_TESTIMONY`. Transition CH04.

---

## CH04 — `yu_sensei` / 郁先生

**Purpose:** exact dramatic center; identity exposure without immediate arrest.

**Class:** anecdote from later recollection `[T]`; action details beyond the address and general exchange are `[R]` unless source-verified.

Scene:

> 军警把杯子推过去。
>
> “赵先生。”
>
> 赵廉给他倒酒。
>
> 军警看了一会儿杯中的酒。
>
> “不对。”
>
> 他重新抬起头。

Pause all ambience.

**LOCKED:**

> 郁先生。

Player records the immediate action:

- `他的手停了一下。` — `[R]`, `closure += 1`.
- `他继续斟酒。` — action reconstruction, lower interpretive claim.
- `他笑了。` — `[R]`, `closure += 1`.
- `证言没有记录他的动作。` — `rigor += 2`.

Continue, paraphrased from testimony:

> 军警说，为了调查他，他们花了半年，还查到上海和东京。
>
> 赵廉回答，若早问，他早会说明，何必花这些钱。随后仍请对方喝酒。

Player chooses what enters the main case-note:

- `称呼由“赵”变为“郁”` — strong, grant `E_NAME_EXPOSED`.
- `调查持续约半年` — testimony, grant `E_INVESTIGATION_DURATION`.
- `他表现得镇定` — interpretation; `closure += 1`.
- `他继续招待对方` — action, grant `E_HOSTING_AFTER_EXPOSURE`.

Required ending:

**LOCKED:**

> 那天以后，日本人知道赵廉是谁。赵廉也知道，日本人知道。第二天，酒厂仍然开门。

Transition CH05.

---

## CH05 — `radio_surrender` / 广播里的胜利

**Time:** 15–28 August 1945.

Radio announces surrender. Do not play triumphant orchestral music; use static, breaths, interrupted reception.

Player may inspect three of four future objects:

1. `回国路线图`
   - grant `E_RETURN_ROUTE`
   - text: pencil route breaks at sea and resumes.
2. `农场或酒厂账目`
   - grant `E_UNFINISHED_ACCOUNTS`
   - text: obligations imply an expected future, not proof of safety.
3. `写有赵廉的证件`
   - grant `E_ALIAS_DOCUMENT`
   - asks where the name should end if he returns.
4. `未装满的箱子`
   - grant `E_PARTLY_PACKED_CASE`
   - no invented inventory beyond books/clothing unless sourced.

Include wife and friends discussing practical matters, not only patriotic exclamation. Give the wife at least one action: checking supplies, correcting an account, asking what must be done before travel, or declining to pack prematurely.

End:

**LOCKED:**

> 战争在广播里结束了。街上的汽车、枪和档案，还在日本人手中。

Transition CH06.

---

## CH06 — `out_for_a_while` / 出去一趟

**Time:** night of 29 August 1945.  
**This chapter contains the irreversible threshold.**

Household conversation; restrained ambience. Three knocks. The caller lowers his voice:

> “……先生。”

Player records:

- `赵先生` — `address_record=zhao`, `closure += 1`.
- `郁先生` — `address_record=yu`, `closure += 2`.
- `……先生` — `address_record=blank`, `rigor += 2`.

The game must explicitly state that the first syllable cannot be recovered from available materials.

Continue:

> 赵廉到门外，同青年用印尼语低声说了几句。他回来时没有坐下。

**LOCKED:**

> 有点事情，我出去一趟。

> 他没有换衣服。脚上仍是木屐。

Grant `E_CLOGS`, `E_SLEEPWEAR`, `E_INDONESIAN_CONVERSATION` with testimony class.

Player chooses the final focus:

- `门口` — detailed clothes/threshold evidence.
- `咖啡店方向` — caller/conversation evidence.
- `道路方向` — possible vehicle setup.

No rescue, warning, follow, refusal, combat, or time-loop choices.

After Zhao crosses threshold, remove ordinary Continue control and enter wait mode.

### Wait sequence

Only one primary control is present, accessible as a button with changing accessible name.

1. `等。` → `十分钟过去。桌上的话题已经换了一个。`
2. `再等一会儿。` → `饭菜失去了热气。`
3. `继续等。` → `有人走到门口看了一次。`
4. `还等。` → `灯芯短了。`
5. `等到天亮。` → transition CH07.

No randomization and no hidden alternative. The UI must make clear the application has not frozen.

---

## CH07 — `august_thirtieth` / 八月三十日

At dawn, player classifies current status:

- `迟归` — cautious household language.
- `失踪` — administrative definition begins.
- `尚不能判断` — high rigor.

This does not change the event, only report timing.

Player can prioritize two search locations:

### Coffee shop

Base testimony:

> “他们说的是印尼话。”
>
> “谁先走的？”
>
> “我不记得。也可能是一起。”
>
> “说了什么？”
>
> “当时没觉得重要。”

Grant `E_COFFEE_SHOP_TESTIMONY` and, if last focus was coffee shop, an additional detail with no certainty promotion.

### Road

Base testimony:

> “有一辆车。”
>
> “什么颜色？”
>
> “晚上看不清。”
>
> “车里是什么人？”
>
> “我看见两个影子。有人说是日本人。”

Grant `E_CAR`, `E_TWO_SHADOWS`; Japanese identity remains inference unless later supported.

### Friends' homes

Confirms absence and ordinary expectations. Grant `E_NO_PLANNED_ABSENCE` without claiming he had no secret plan.

### Military-police post

Staff deny knowledge. A glance or pause may be staged only as `[R]` and cannot become proof. Grant `E_OFFICIAL_DENIAL`.

During searching, show two fields without melodramatic commentary:

**LOCKED:**

> 女儿出生：1945年8月30日。  
> 父亲状态：尚未归来。

Wife must make at least one decision about who searches, what object is kept, or which name is used when asking. Transition CH08.

---

## CH08 — `questioning_method` / 问话的方法

Player conducts interviews with three witnesses; two questions per witness.

Question forms:

- **Leading:** gains concise but contaminated certainty; `closure += 1` and records a warning.
- **Neutral:** balanced evidence; `rigor += 1`.
- **Narrative:** asks witness to recount from a preceding moment; may yield mundane detail; `care += 1` and/or `rigor += 1`.

Required examples:

Coffee-shop worker:

- Leading: `那个青年是不是日本人的密探？`
- Neutral: `你以前见过那个青年吗？`
- Narrative: `请从赵老板走出家门以前说起。`

Road witness:

- Leading: `车里坐的是日本宪兵，对不对？`
- Neutral: `你怎样判断车里的人可能是日本人？`
- Narrative: `请从你走到那条路上时说起。`

House witness:

- Last sentence.
- Clothing.
- Form of address.
- Whether anything seemed unusual.

Only two can be asked. If asked whether Zhao knew danger, response must be:

> 他没有换衣服。
>
> 这可以被理解为毫无戒备，也可以被理解为不愿让屋里的人担心。档案不能替他决定是哪一种。

Grant question-quality metadata. Transition CH09.

---

## CH09 — `two_dates` / 两个日期

Split screen or sequential accessible equivalent.

### Early report cluster

- 17 September 1945.
- shooting.
- possible burial location.
- derived from indirect postwar information and later circulation.

### Later investigation cluster

- night of 29 August or early 30 August.
- strangling/hanging formulation depending verified source wording.
- location unresolved.
- linked to later interviews/research involving former military-police personnel.

### Common center

- left home on 29 August and did not return.
- Japanese military police had knowledge, motive/opportunity, and post-surrender capacity.
- no recovered remains.
- no complete contemporaneous judicial record resolving every detail.

Player must not merge clusters into one certainty. They can pin, compare, and mark conflicts. Grant `E_EARLY_REPORT_CLUSTER`, `E_LATER_INVESTIGATION_CLUSTER`, `E_NO_REMAINS`, `E_NO_COMPLETE_JUDICIAL_RECORD`.

Transition to report editor.

---

## CH10 — `final_report` / 编目

Fields and choices:

### Name

- `郁达夫（化名赵廉）`
- `赵廉（本名郁达夫）`
- `郁达夫／赵廉`
- `暂不规定主次`

### Last confirmed appearance

- fixed as `1945年8月29日晚` with supporting testimony classification.

### Status

- `失踪`
- `被绑架后遇害`
- `高度可能被日本宪兵绑架并杀害`

### Death date

- `1945年8月29日夜至30日凌晨`
- `1945年9月17日`
- `不详`

### Method

- `绞杀／扼杀（依来源措辞）`
- `枪杀`
- `不详`

### Remains

- fixed: `未发现`

Every selection displays evidence class and conflicts. Unsupported combinations are allowed only if immediately flagged and cannot be exported as an unqualified historical appendix statement.

Ending evaluation occurs after confirmation.

---

## Endings

There is no success/failure label. Each ending shows the generated report, a reflection on what was made visible or erased, then the shared final line.

### END-A — `monument` / 纪念碑

Typical condition: high closure; precise wording chosen despite conflict.

Base text:

> 郁达夫，化名赵廉，于1945年8月29日被日本宪兵诱捕，旋遭杀害。
>
> 这段文字容易被记住。为了让它成为完整的一句话，你缩短了两个日期之间的距离。

Do not accuse the player of wrongdoing; explain public-memory function and evidentiary cost.

### END-B — `case_file` / 赵廉失踪案

Default balanced condition.

Base text:

> 赵廉，本名郁达夫，于1945年8月29日晚离家后失踪。现有证词和后续调查强烈指向日本宪兵绑架并杀害；具体死亡时间、方式与地点未获完整司法确认。
>
> 这份记录没有提供一个完整现场。因为历史没有留下完整现场。

### END-C — `home` / 家中未归者

Typical condition: high care and household evidence.

Base text:

> 1945年8月29日晚，赵廉穿睡衣和木屐离开家中，说很快回来。8月30日，家人开始寻找。女儿于同日出生。他没有回来。
>
> 对文学史，失踪的是郁达夫。对屋里等待的人，失踪的是赵廉。

### END-D — `untranslated` / 未译之词

Typical condition: high rigor, low closure, multiple preserved blanks.

Base form:

> 敲门者的称呼：＿＿先生  
> 死亡日期：＿＿  
> 死亡方式：＿＿  
> 遗骸：未发现
>
> 你没有把空白误写成答案。但空白也不能替死者作证。

### Shared final line

**LOCKED:**

> 无论你如何编目，他都没有从门外回来。

After the line, show real-person notice, concise biography, methodology, source register, and replay option.
