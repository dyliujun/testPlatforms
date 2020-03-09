import time

import redis


userId=''
re1 = redis.Redis(host='47.112.0.183', port='9379', password="2019foOU*129redAb", db=1)
re0 = redis.Redis(host='47.112.0.183', port='9379', password="2019foOU*129redAb", db=0)
# print(re.keys("*u_sw_7665126565784587192*"))




print('【u_sw】' + str(re1.hgetall("u_sw_" + userId)))
# print(re0.get("email-code-301108603@qq.com"))
# print(re0.get("sms-code-13367339376"))
print('【devices】' + str(re1.zrange('device_' + userId, 0, -1, withscores=True)))
print('【user_survivor_device】' + str(re0.hgetall("user_survivor_device_" + userId)))
# print(re0.type("device_" + userId))
