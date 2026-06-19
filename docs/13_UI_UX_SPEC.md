# 13 — UI/UX Specification

## Information architecture

Top-level destinations:

- 开始／继续
- 案卷
- 设置
- 方法与史料
- 制作人员与授权

During play, the main layout has:

1. context rail: date, place, chapter;
2. reading column: transcript and choices;
3. dossier rail/drawer: evidence and source access.

On small screens, context becomes a compact header and the dossier opens as a modal drawer with focus trapping and return-focus behavior.

## Core screens

### Title and content notice

- Title, subtitle, Start/Continue, Settings, Methodology.
- Content notice before first play.
- Explicit interaction contract.
- No audio may begin before player interaction; after the player starts or resumes the casefile, stage BGM should automatically fade in, crossfade on track changes, and fade out on pause.

### Reading view

- Recommended line width: 34–42 Chinese characters at default desktop scale.
- New paragraphs append; current choice block follows reading order.
- Previously read text remains available in the transcript.
- Choice buttons use full sentences, not tiny inline links.
- No timed choices.

### Dossier

Tabs:

- 证据
- 主张
- 时间线
- 来源
- 词汇

Every card displays source class in text and pattern. Cards can be filtered by scene, class, or conflict status. Filters must not hide the currently focused item without announcement.

### Source mode

A toggle reveals compact chips beside relevant paragraphs:

- 文献
- 证言
- 后来调查
- 复合
- 重构
- 未决

Activating a chip opens a plain-language explanation and source link/record. Source mode defaults off during first play and can be enabled at any time.

### Wait mode

- Replace choice list with one large wait button.
- Add persistent status text: `故事仍在继续；当前动作是等待。`
- Do not animate an indefinite spinner.
- Each activation moves focus to the new paragraph, then returns a sensible tab path to the next wait control.
- Offer no skip on first play. After first completion, a setting may compress pauses while preserving all text.

### Interview mode

Each question displays its wording only. Do not label choices “leading” before selection. After the answer, dossier metadata can explain that the wording was leading, neutral, or narrative.

### Report editor

- A structured form with fieldset/legend.
- Each option displays evidence support, conflict, and certainty.
- Blank/unknown is a first-class valid option.
- A review screen shows generated text and warnings before confirmation.
- The player can go back and revise report fields, but cannot replay historical choices inside the same run.

## Focus and announcements

- Use a visible focus indicator meeting contrast requirements.
- After selecting a choice, focus the first new narrative paragraph or a live-region summary; do not force screen-reader users to reread the full transcript.
- Announce evidence unlocked politely.
- Assertive announcements are reserved for blocking errors.

## Responsive behavior

Breakpoints should be content-driven. Required test widths:

- 320 × 568
- 375 × 667
- 390 × 844
- 768 × 1024
- 1280 × 720
- 1440 × 900

No horizontal scrolling at 320 CSS pixels except intentionally scrollable tables with labels and alternatives.

## Empty and error states

- Empty dossier: explain that evidence appears through play.
- No search results: offer reset filters.
- Corrupt save: explain and offer import another, start new, or inspect metadata.
- Story error: preserve save and offer return to last checkpoint.

## UX anti-patterns

- No modal after every evidence acquisition.
- No red/green correctness feedback.
- No simulated typewriter effect that cannot be disabled.
- No tiny paper-texture text with low contrast.
- No drag-only interactions.
- No hidden hover-only source notes.
