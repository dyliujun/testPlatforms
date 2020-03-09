import datetime


def get_current_time():
    return str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

def get_time_offset(day):
    return str((datetime.datetime.now()+datetime.timedelta(days=day)).strftime("%Y-%m-%d %H:%M:%S"))

