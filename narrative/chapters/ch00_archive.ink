=== ch00_archive_name ===
# scene:ch00_archive_name
# chapter:CH00
# class:R,U
# ui:standard
# locked:LOCK_CASE_TITLE
案卷题名：＿＿＿＿失踪案

* [写下“郁达夫”。]
  # choice:CH00_NAME_YU
  ~ opening_name = "yu"
  ~ closure += 1
  你先写下了后来的人最熟悉的名字。1945年8月29日晚，小镇上的多数人并不这样称呼他。
* [写下“赵廉”。]
  # choice:CH00_NAME_ZHAO
  ~ opening_name = "zhao"
  ~ care += 1
  你先写下了当时小镇最熟悉的名字。后来的纪念碑不会只写这个名字。
* [暂不填写。]
  # choice:CH00_NAME_BLANK
  ~ opening_name = "blank"
  ~ rigor += 1
  档案接受空白。纪念仪式通常不能。

# locked:LOCK_CONTRACT
你不能改变这件事。你将改变它留下来的文字。
# evidence:E_THRESHOLD_RULE
-> ch01_zhao_boss
