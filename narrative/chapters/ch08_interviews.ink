=== ch08_questioning_method ===
# scene:ch08_questioning_method
# chapter:CH08
# class:T,R
# ui:interview
你要问三名证人。每名证人最多两问。
* [那个青年是不是日本人的密探？] # choice:CH08_COFFEE_LEADING # evidence:E_INTERVIEW_LEADING_WARNING
* [你以前见过那个青年吗？] # choice:CH08_COFFEE_NEUTRAL # evidence:E_INTERVIEW_NEUTRAL_METHOD
* [请从赵老板走出家门以前说起。] # choice:CH08_COFFEE_NARRATIVE # evidence:E_INTERVIEW_NARRATIVE_METHOD
* [车里坐的是日本宪兵，对不对？] # choice:CH08_ROAD_LEADING # evidence:E_INTERVIEW_LEADING_WARNING
* [你怎样判断车里的人可能是日本人？] # choice:CH08_ROAD_NEUTRAL # evidence:E_INTERVIEW_NEUTRAL_METHOD
* [请从你走到那条路上时说起。] # choice:CH08_ROAD_NARRATIVE # evidence:E_INTERVIEW_NARRATIVE_METHOD
* [他最后一句话是什么？] # choice:CH08_HOUSE_LAST # evidence:E_INTERVIEW_NEUTRAL_METHOD
* [请从他起身时说起，包括衣服和鞋。] # choice:CH08_HOUSE_CLOTHING # evidence:E_INTERVIEW_NARRATIVE_METHOD # evidence:E_CLOGS # evidence:E_SLEEPWEAR
* [门外称呼听清了吗？] # choice:CH08_HOUSE_ADDRESS # evidence:E_DOOR_ADDRESS_UNRESOLVED
-> ch09_two_dates
