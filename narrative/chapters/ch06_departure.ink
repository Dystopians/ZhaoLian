=== ch06_address ===
# scene:ch06_address
# chapter:CH06
# class:T,U,R
“……先生。”
* [记录为“赵先生”。] # choice:CH06_ADDRESS_ZHAO
* [记录为“郁先生”。] # choice:CH06_ADDRESS_YU
* [记录为“……先生”。] # choice:CH06_ADDRESS_BLANK # evidence:E_DOOR_ADDRESS_UNRESOLVED
-> ch06_departure_focus

=== ch06_departure_focus ===
# scene:ch06_departure_focus
# chapter:CH06
# class:T,U,R
# evidence:E_INDONESIAN_CONVERSATION
赵廉到门外，同青年用印尼语低声说了几句。
# locked:LOCK_OUT_FOR_A_WHILE
有点事情，我出去一趟。
# evidence:E_CLOGS
# evidence:E_SLEEPWEAR
他没有换衣服。脚上仍是木屐。
* [记录门口：睡衣、木屐、门槛。] # choice:CH06_FOCUS_DOORWAY # evidence:E_THRESHOLD_RULE
* [记录咖啡店方向。] # choice:CH06_FOCUS_COFFEE
* [记录道路方向。] # choice:CH06_FOCUS_ROAD
-> ch06_wait

=== ch06_wait ===
# scene:ch06_wait
# chapter:CH06
# class:R
# ui:wait
故事仍在继续；当前动作是等待。
* [等。]
  # choice:WAIT_1
  十分钟过去。桌上的话题已经换了一个。
* [再等一会儿。]
  # choice:WAIT_2
  饭菜失去了热气。
* [继续等。]
  # choice:WAIT_3
  有人走到门口看了一次。
* [还等。]
  # choice:WAIT_4
  灯芯短了。
* [等到天亮。]
  # choice:WAIT_5
  -> ch07_status
