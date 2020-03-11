import json

from requests import HTTPError

from common.TestdataNodeDao import getSwaggerApiAllNew, isExitServiceNew, isExitPathNew, isExitSwaggerApiNew, \
    getPathBySwaggerApiNew, getPathByTestDataNodeNew, getCountsByswaggerApi
from common.dbUitls import insert_data_new, update_data, MysqlHelper
from common.readerYaml import getYamlValueForKey
from common.requestUitls import doRequest
from common.time import get_current_time

swaggerList = doRequest("GET", "http://tapi.shiguangxu.com/swagger-resources", {}, {}, {})

def getParameters(ParameterJson, definitionsJson):
    if ParameterJson == {}:
        return {}
    for i in ParameterJson:
        if i["in"] == "body":
            try:
                schema = i["schema"]["$ref"]
            except KeyError:
                print("无body参数")
                return {}
            else:
                lenStart = str(schema).find("definitions/") + len("definitions/")
                parameter = definitionsJson[schema[lenStart:]]["properties"]
                return parameter
def getResponese(responses, definitionsJson):
    resp = responses["200"]
    try:
        schema = resp["schema"]["$ref"]
    except KeyError:
        print("无返回data")
        return {"code": 200, "msg": "操作成功", "data": {}}
    else:
        lenStart = str(schema).find("definitions/") + len("definitions/")
        try:
            data = definitionsJson[schema[lenStart:]]["properties"]["data"]["$ref"]
        except KeyError:
            print("无返回data")
            return {"code": 200, "msg": "操作成功", "data": {}}
        else:
            lenStart2 = str(data).find("definitions/") + len("definitions/")

            try:
                dataJson = definitionsJson[data[lenStart2:]]["properties"]
            except KeyError:
                return {"code": 200, "msg": "操作成功", "data": {}}
            else:
                return {"code": 200, "msg": "操作成功", "data": dataJson}

def swaggerApiTransferNew():
    swaggerData = getSwaggerApiAllNew()
    flow_id = 1
    flow_code = 1
    for e in swaggerData:
        if isExitServiceNew(e[2]) <= 0:
            dataDict = {
                "flow_id": flow_id,
                "flow_code": flow_code,
                "flow_name": e[2],
                "priority": 1,
                "account": "",
                "password": "",
                "run_env": "",
                "state": 1,
                "swagger_url": e[12],
                "create_time": get_current_time(),
                "update_time": get_current_time(),
                "creater": "",
                "modifier": ""
            }
            insert_data_new("testdata_flow_new", dataDict)
            flow_id = flow_id+1
            flow_code = flow_code+1
def getSwaggerApiNew():
    swaggerUrl = getYamlValueForKey("swaggerUrl")
    serviceCount = 0
    apiCounts = 0
    unStatisticsCounts = 0
    ignoreList = ["/web-backend/v2/api-docs", "/service-monitor/v2/api-docs", "/web-frontend/v2/api-docs"]
    for path in json.loads(swaggerList):
        if path["url"] not in ignoreList:
            try:
                respon = doRequest("GET", swaggerUrl + path["url"], {}, {}, {})
            except HTTPError:
                print("无法打开微服务:", path["url"])
            else:
                responJson = json.loads(respon)
                serviceCount = serviceCount + 1
                # 服务api数量
                apiCount = 0
                # 服务未统计接口
                unStatisticsCount = 0
                # 服务名称
                serviceName = str(path["location"]).split("/")[1]
                print("================" + str(serviceName))
                for paths in list(responJson["paths"].keys()):
                    if paths != "/checkalive" and paths != "/service/weixin/api":
                        if isExitSwaggerApiNew(paths) <= 0:
                            print("未统计-->" + str(paths))
                            data_dict = {}
                            apiCount = apiCount + 1
                            unStatisticsCount = unStatisticsCount + 1
                            try:
                                definitions = responJson["definitions"]
                            except KeyError:
                                definitions = {}

                            if "post" in responJson["paths"][paths]:
                                deprecated = responJson["paths"][paths]["post"]["deprecated"]
                                deleted = 0
                                remark = ""
                                if deprecated is True:
                                    deleted = 1
                                    remark = "废弃接口"
                                elif deprecated is False:
                                    deleted = 0
                                try:
                                    parameters = responJson["paths"][paths]["post"]["parameters"]
                                except KeyError:
                                    parameters = {}
                                responses = responJson["paths"][paths]["post"]["responses"]
                                data_dict = {
                                    "service": serviceName,
                                    "service_name": path["name"],
                                    "tags": responJson["paths"][paths]["post"]["tags"],
                                    "summary": responJson["paths"][paths]["post"]["summary"],
                                    "path": paths,
                                    "type": "3",
                                    "method": "post",
                                    "request_parameter": json.dumps(getParameters(parameters, definitions)),
                                    "responses": json.dumps(getResponese(responses, definitions)),
                                    "deleted": deleted,
                                    "isAuto": "0",
                                    "swagger_url": swaggerUrl + path["url"],
                                    "author": "柳军",
                                    "remark": remark,
                                    "created": get_current_time(),
                                    "updated": get_current_time()
                                }
                            elif "get" in responJson["paths"][paths]:
                                deprecated = responJson["paths"][paths]["get"]["deprecated"]
                                deleted = 0
                                remark = ""
                                if deprecated is True:
                                    deleted = 1
                                    remark = "废弃接口"
                                elif deprecated is False:
                                    deleted = 0
                                responses = responJson["paths"][paths]["get"]["responses"]
                                try:
                                    parameters = responJson["paths"][paths]["get"]["parameters"]
                                except KeyError:
                                    parameters = {}
                                data_dict = {
                                    "service": serviceName,
                                    "service_name": path["name"],
                                    "tags": responJson["paths"][paths]["get"]["tags"],
                                    "summary": responJson["paths"][paths]["get"]["summary"],
                                    "path": paths,
                                    "type": "3",
                                    "method": "get",
                                    "request_parameter": json.dumps(getParameters(parameters, definitions)),
                                    "responses": json.dumps(getResponese(responses, definitions)),
                                    "deleted": deleted,
                                    "isAuto": "0",
                                    "swagger_url": swaggerUrl + path["url"],
                                    "author": "柳军",
                                    "remark": remark,
                                    "created": get_current_time(),
                                    "updated": get_current_time()
                                }
                            insert_data_new("swagger_api", data_dict)
                        else:
                            apiCount = apiCount + 1
                apiCounts = apiCounts + apiCount
                unStatisticsCounts = unStatisticsCounts + unStatisticsCount
    print("======================================")
    print("微服务数量-->", serviceCount)
    print("接口总数-->", apiCounts)
    print("未统计接口总数-->", unStatisticsCounts)
    print("======================================")
    return {
        "serviceCount": serviceCount,
        "apiCounts": apiCounts,
        "unStatisticsCounts": unStatisticsCounts,
    }
def swaggerApiStatistics():
    print("----------开始统计未实现接口--------")
    paths = getPathBySwaggerApiNew()
    doPaths = getPathByTestDataNodeNew()
    for path in paths:
        if path in doPaths:
            print("已实现-->", path[0])
            sql = "update automation.swagger_api set remark='已实现自动化', isAuto='1' where path='"+path[0]+"'"
            update_data(sql)

def toStatisticsApi():
    getSwaggerApiNew()
    swaggerApiStatistics()

# ApiStatistics()