
import MySQLdb.cursors
import MySQLdb
import pymysql as ps

from common.readerYaml import getYamlValueForKey

class MysqlHelper:
    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.charset = "utf8"
        self.db = None
        self.curs = None

    # 数据库连接
    def open(self):
        self.db = ps.connect(host=self.host, user=self.user, password=self.password, database=self.database,
                             charset=self.charset)
        self.curs = self.db.cursor()

    # 数据库关闭
    def close(self):
        self.curs.close()
        self.db.close()

    # 数据增删改
    def cud(self, sql, params):
        self.open()
        try:
            self.curs.execute(sql, params)
            self.db.commit()
        except Exception as e:
            print('cud出现错误:', e)
            self.db.rollback()
        self.close()

    # 数据查询
    def find(self, sql, params):
        self.open()
        try:
            self.curs.execute(sql, params)
            self.close()
            return self.curs.fetchall()
        except:
            print('find出现错误')

def insert_data(tableName, dataDict):
    host = getYamlValueForKey("host1")
    user = getYamlValueForKey("user1")
    passwd = getYamlValueForKey("passwd1")
    db = getYamlValueForKey("db1")
    try:
        data_values = "(" + "%s," * (len(dataDict)) + ")"
        data_values = data_values.replace(',)', ')')
        dbField = dataDict.keys()
        dataTuple = tuple(dataDict.values())
        dbField = str(tuple(dbField)).replace("'", '')
        conn = MySQLdb.connect(host=host, user=user, passwd=passwd, db=db, charset="utf8")
        cursor = conn.cursor()
        sql = """ insert into %s %s values %s """ % (tableName, dbField, data_values)
        params = dataTuple
        cursor.execute(sql, params)
        conn.commit()
        cursor.close()
        print("********  插入成功  ********")
        return 1
    except Exception as e:
        print("********  插入失败    ********")
        print(e)
        return 0

def insert_data_new(tableName, dataDict):
    host = getYamlValueForKey("host2")
    user = getYamlValueForKey("user2")
    passwd = getYamlValueForKey("passwd2")
    db = getYamlValueForKey("db2")
    try:
        data_values = "(" + "%s," * (len(dataDict)) + ")"
        data_values = data_values.replace(',)', ')')
        dbField = dataDict.keys()
        dataTuple = tuple(dataDict.values())
        dbField = str(tuple(dbField)).replace("'", '')
        conn = MySQLdb.connect(host=host, user=user, passwd=passwd, db=db, charset="utf8")
        cursor = conn.cursor()
        sql = """ insert into %s %s values %s """ % (tableName, dbField, data_values)
        params = dataTuple
        cursor.execute(sql, params)
        conn.commit()
        cursor.close()
        print("********  插入成功  ********")
        return 1
    except Exception as e:
        print("********  插入失败    ********")
        print(e)
        return 0

def update_flow_data(fromFlowId, toFlowId):
    host1 = getYamlValueForKey("host2")
    user1 = getYamlValueForKey("user2")
    passwd1 = getYamlValueForKey("passwd2")
    db1 = getYamlValueForKey("db2")
    findSql = "SELECT order_id FROM automation.testdata_node_new where flow_id="+toFlowId+" order by order_id desc limit 1"
    findSql2 = "SELECT order_id FROM automation.testdata_node_new where flow_id="+fromFlowId+" order by order_id desc limit 1"
    try:
        toOrderIdMax = MysqlHelper(host1, user1, passwd1, db1).find(findSql, None)[0][0]
    except IndexError:
        toOrderIdMax = 0
    try:
        fromOrderMax = MysqlHelper(host1, user1, passwd1, db1).find(findSql2, None)[0][0]
    except IndexError:
        fromOrderMax = 0
    order_id = 0
    while fromOrderMax > 0:
        order_id = order_id+1
        toOrderIdMax = toOrderIdMax + 1
        updataSql = "update automation.testdata_node_new set flow_id="+toFlowId+", order_id="+str(toOrderIdMax)+" where flow_id="+fromFlowId+" and order_id="+str(order_id)+""
        print(updataSql)
        MysqlHelper(host1, user1, passwd1, db1).cud(updataSql, None)
        fromOrderMax = fromOrderMax - 1


def update_data(sql):
    mh = MysqlHelper(
        getYamlValueForKey("host2"),
        getYamlValueForKey("user2"),
        getYamlValueForKey("passwd2"),
        getYamlValueForKey("db2")
    )
    mh.cud(sql, None)

