=== ch04_yu_sensei_action ===
# scene:ch04_yu_sensei_action
# chapter:CH04
# class:T,R
军警把杯子推过去。
“赵先生。”
“不对。”
# locked:LOCK_YU_SENSEI
# evidence:E_NAME_EXPOSED
郁先生。

* [记录：他的手停了一下。] # choice:CH04_ACTION_HAND_STOPS
* [记录：他继续斟酒。] # choice:CH04_ACTION_POURS
* [记录：他笑了。] # choice:CH04_ACTION_SMILES
* [记录：证言没有记录他的动作。] # choice:CH04_ACTION_UNRECORDED
-> ch04_yu_sensei_note

=== ch04_yu_sensei_note ===
# scene:ch04_yu_sensei_note
# chapter:CH04
# class:T,R
军警说，为了调查他，他们花了半年。
* [写入：称呼由“赵”变为“郁”。] # choice:CH04_NOTE_ADDRESS # evidence:E_NAME_EXPOSED
* [写入：调查持续约半年。] # choice:CH04_NOTE_HALF_YEAR # evidence:E_INVESTIGATION_DURATION
* [写入：他表现得镇定。] # choice:CH04_NOTE_CALM
* [写入：他继续招待对方。] # choice:CH04_NOTE_HOSTING # evidence:E_HOSTING_AFTER_EXPOSURE
# locked:LOCK_AFTER_EXPOSURE
那天以后，日本人知道赵廉是谁。赵廉也知道，日本人知道。第二天，酒厂仍然开门。
-> ch05_radio_surrender
