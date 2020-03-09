from task.dbUitls import MysqlHelper

mh = MysqlHelper('47.115.35.45', 'gjdev', '12345678', 'automation')


def findStatusById(params):
    sql = "SELECT * FROM automation.task_new where taskId=%s"
    return mh.find(sql, params)
