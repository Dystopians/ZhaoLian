=== ch02_time_slot ===
# scene:ch02_time_slot
# chapter:CH02
# class:C,R
# ui:standard
桌上有三个人名。军警把名单推来。

* [今晚以前。] # choice:CH02_TIME_TONIGHT
* [明天上午。] # choice:CH02_TIME_TOMORROW # evidence:E_TRANSLATION_DELAY
* [过几天。] # choice:CH02_TIME_DAYS # evidence:E_TRANSLATION_DELAY_STRONG
-> ch02_action_slot

=== ch02_action_slot ===
# scene:ch02_action_slot
# chapter:CH02
# class:C,R
* [带来。] # choice:CH02_ACTION_BRING
* [请来说明情况。] # choice:CH02_ACTION_INVITE
* [让我先核对姓名。] # choice:CH02_ACTION_CHECK_NAMES # evidence:E_NAME_REMOVED
-> ch02_purpose_slot

=== ch02_purpose_slot ===
# scene:ch02_purpose_slot
# chapter:CH02
# class:C,R
* [审问。] # choice:CH02_PURPOSE_INTERROGATE
* [登记。] # choice:CH02_PURPOSE_REGISTER
* [谈一谈。] # choice:CH02_PURPOSE_TALK
-> ch02_followup

=== ch02_followup ===
# scene:ch02_followup
# chapter:CH02
# class:C,R
军警问：“我说的是明天吗？”
* [说口音太重。] # choice:CH02_RESPONSE_ACCENT
* [拿起名单重新解释。] # choice:CH02_RESPONSE_REEXPLAIN
* [倒酒，转开话题。] # choice:CH02_RESPONSE_WINE # evidence:E_WINE_AS_SHIELD
# locked:LOCK_DAY_NIGHT_TRANSLATION
白天，他替别人翻译。夜里，他担心自己的话被别人翻译。
-> ch03_dream_speech
