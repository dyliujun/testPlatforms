
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


def getCountsByswaggerApi(size):
    sql1 = "SELECT count(*) FROM automation.swagger_api where remark='内部调用'"
    sql2 = "SELECT count(*) FROM automation.swagger_api where remark='测试接口'"
    sql3 = "SELECT count(*) FROM automation.swagger_api where remark='废弃接口'"
    sql4 = "SELECT count(*) FROM automation.swagger_api where remark='提醒接口'"
    sql5 = "SELECT count(*) FROM automation.swagger_api where remark='微信公众号'"
    sql6 = "SELECT count(*) FROM automation.swagger_api where remark='已实现自动化'"
    sql7 = "SELECT count(distinct service_name)  FROM automation.swagger_api"
    sql8 = "SELECT distinct remark  FROM automation.swagger_api"
    sql9 = "SELECT count(*)  FROM automation.swagger_api"
    sql10 = "SELECT count(*) FROM automation.swagger_api where remark in ('','未实现','标记未实现')"

    allApi = mhNew.find("SELECT * FROM automation.swagger_api limit "+ size, None)
    innerCellCounts = int(mhNew.find(sql1, None)[0][0])
    testApiCounts = int(mhNew.find(sql2, None)[0][0])
    abandonCounts = int(mhNew.find(sql3, None)[0][0])
    remindCounts = int(mhNew.find(sql4, None)[0][0])
    wechatCounts = int(mhNew.find(sql5, None)[0][0])
    doneCounts = int(mhNew.find(sql6, None)[0][0])
    serviceCounts = int(mhNew.find(sql7, None)[0][0])
    totalCounts = int(mhNew.find(sql9, None)[0][0])
    undoneCounts = int(mhNew.find(sql10, None)[0][0])
    skipApiCounts = totalCounts - (doneCounts+undoneCounts)
    remarkList = mhNew.find(sql8, None)
    return {
        "serviceCounts": serviceCounts,
        "doneCounts": doneCounts,
        "undoneCounts": undoneCounts,
        "innerCellCounts": innerCellCounts,
        "testApiCounts": testApiCounts,
        "remindCounts": remindCounts,
        "wechatCounts": wechatCounts,
        "abandonCounts": abandonCounts,
        "skipApiCounts": skipApiCounts,
        "totalCounts": totalCounts,
        "remarkList": remarkList,
        "progress": int(doneCounts/(doneCounts+undoneCounts)*100),
        "allApi": allApi
    }

def getCounts():
    sql6 = "SELECT count(*) FROM automation.swagger_api where remark='已实现自动化'"
    sql9 = "SELECT count(*)  FROM automation.swagger_api"
    sql10 = "SELECT count(*) FROM automation.swagger_api where remark in ('','未实现','标记未实现')"
    doneCounts = int(mhNew.find(sql6, None)[0][0])
    totalCounts = int(mhNew.find(sql9, None)[0][0])
    undoneCounts = int(mhNew.find(sql10, None)[0][0])
    skipApiCounts = totalCounts - (doneCounts+undoneCounts)
    return {
        "doneCounts": doneCounts,
        "undoneCounts": undoneCounts,
        "skipApiCounts": skipApiCounts,
        "totalCounts": totalCounts,
        "progress": int(doneCounts/(doneCounts+undoneCounts)*100),
    }



def filterApiUnlabeled():
    return mhNew.find("SELECT * FROM automation.swagger_api where remark in ('','未实现','标记未实现')", None)

def filterApiByPath(selectType, inputKey):
    sql = "SELECT * FROM automation.swagger_api where "+selectType+" like '%"+inputKey+"%';"
    print(sql)
    return mhNew.find(sql, None)

def filterApiAll():
    return mhNew.find("SELECT * FROM automation.swagger_api ", None)

def getRemarkList():
    sql8 = "SELECT distinct remark  FROM automation.swagger_api"
    return mhNew.find(sql8, None)

