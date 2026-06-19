=== ch07_status ===
# scene:ch07_status
# chapter:CH07
# class:T,R
# locked:LOCK_DAUGHTER_STATUS
# evidence:E_DAUGHTER_BIRTH
女儿出生：1945年8月30日。父亲状态：尚未归来。
# evidence:E_WIFE_SEARCH_DECISION
* [写作：迟归。] # choice:CH07_STATUS_LATE
* [写作：失踪。] # choice:CH07_STATUS_MISSING
* [写作：尚不能判断。] # choice:CH07_STATUS_UNKNOWN
-> ch07_search

=== ch07_search ===
# scene:ch07_search
# chapter:CH07
# class:T,R,U
* [去咖啡店。] # choice:CH07_SEARCH_COFFEE # evidence:E_COFFEE_SHOP_TESTIMONY
* [去道路方向。] # choice:CH07_SEARCH_ROAD # evidence:E_CAR # evidence:E_TWO_SHADOWS
* [去朋友家。] # choice:CH07_SEARCH_FRIENDS # evidence:E_NO_PLANNED_ABSENCE
* [去军警岗哨。] # choice:CH07_SEARCH_POST # evidence:E_OFFICIAL_DENIAL
-> ch08_questioning_method
