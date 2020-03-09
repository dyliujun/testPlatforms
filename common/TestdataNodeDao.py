
from common.dbUitls import MysqlHelper
from common.readerYaml import getYamlValueForKey

mh = MysqlHelper(
    getYamlValueForKey("host1"),
    getYamlValueForKey("user1"),
    getYamlValueForKey("passwd1"),
    getYamlValueForKey("db1")
)

mhNew = MysqlHelper(
    getYamlValueForKey("host2"),
    getYamlValueForKey("user2"),
    getYamlValueForKey("passwd2"),
    getYamlValueForKey("db2")
)

def getPathByTestDataNodeNew():
    sql = "SELECT path FROM automation.testdata_node_new"
    return mhNew.find(sql, None)

def getFlowNameNew():
    sql = "SELECT flow_name FROM automation.testdata_flow_new"
    return mhNew.find(sql, None)

def getPathBySwaggerApiNew():
    sql = "SELECT path FROM automation.swagger_api"
    return mhNew.find(sql, None)

def getRemarkNew():
    sql = "SELECT path,remark FROM automation.swagger_api"
    return mhNew.find(sql, None)


def getSwaggerApiAllNew():
    sql = "SELECT * FROM automation.swagger_api"
    return mhNew.find(sql, None)


def isExitPathNew(path):
    testDataNodePath = getPathByTestDataNodeNew()
    k = ()
    for paht in testDataNodePath:
        k = k + (paht[0],)
    return k.count(path)

def isExitServiceNew(service):
    testFlowDataService = getFlowNameNew()
    k = ()
    for i in testFlowDataService:
        k = k + (i[0],)
    return k.count(service)

def isExitSwaggerApiNew(path):
    apiStatisticsPath = getPathBySwaggerApiNew()
    k = ()
    for paht in apiStatisticsPath:
        k = k + (paht[0],)
    return k.count(path)


def getRemarksNew(url):
    apiStatisticsRemark = getRemarkNew()
    for path in apiStatisticsRemark:
        if url == path[0]:
            return path[1]