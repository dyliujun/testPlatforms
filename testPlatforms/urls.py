"""testPlatforms URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path

from apitest.views import Flow, Common, Node, Statistics, Configs

from performance.views import *
from plan.views import plan
from sql.views import *
from task.views import startWork, startBeat
urlpatterns = [

    #Common
    path('admin/', admin.site.urls),
    url(r'^index$', Common.apitest),
    url(r'^$', Common.apitest),
    url(r'actionFlow', Common.actionFlow),
    url(r'actionAllFlow', Common.actionAllFlow),
    url(r'lookDetailReport', Common.lookDetailReport),
    url(r'lookSummaryReport', Common.lookSummaryReport),

    #Flow
    url(r'^getFlowData$', Flow.getFlowData),
    url(r'addFlow', Flow.addFlow),
    url(r'editFlow', Flow.editFlow),
    url(r'deleteFlow', Flow.deleteFlow),
    url(r'getFlowDataByCreater', Flow.getFlowDataByCreater),
    url(r'changeFlowState', Flow.changeFlowState),
    url(r'filterFlowName', Flow.filterFlowName),
    url(r'getFlowIdList', Flow.getFlowIdList),
    url(r'filterPath$', Flow.filterPath),

    #Node
    url(r'getNodeData', Node.getNodeData),
    url(r'getOutSql', Node.getOutSql),
    url(r'getPreSql', Node.getPreSql),
    url(r'getPostKey', Node.getPostKey),
    url(r'getParameter', Node.getParameter),
    url(r'deleteNode', Node.deleteNode),
    url(r'addNode', Node.addNode),
    url(r'editNode', Node.editNode),
    url(r'savePostKey', Node.savePostKey),
    url(r'editParameter', Node.editParameter),
    url(r'editOutSql', Node.editOutSql),
    url(r'editPreSql', Node.editPreSql),
    url(r'changeNodeState', Node.changeNodeState),


    #Statistics
    url(r'getApiCounts', Statistics.getApiCounts),
    url(r'transferFlowData', Statistics.transferFlowData),
    url(r'manualStatistics', Statistics.manualStatistics),
    url(r'filterApi', Statistics.filterApi),
    url(r'saveRemark', Statistics.saveRemark),
    url(r'filterPath2', Statistics.filterPath2),
    url(r'quickAddNode', Statistics.quickAddNode),
    url(r'getLastOrderId', Statistics.getLastOrderId),

    #Task
    url(r'getBuriedInfo', getBuriedInfo),
    url(r'startWork', startWork),
    url(r'startBeat', startBeat),

    #Config
    url(r'getEmail', Configs.getEmail),
    url(r'emailChange', Configs.emailChange),
    url(r'deleteDefaultVar', Configs.deleteDefaultVar),
    url(r'addDefaultVar', Configs.addDefaultVar),
    url(r'editDefaultVar', Configs.editDefaultVar),
    url(r'getDefaultVar', Configs.getDefaultVar),


    #Other
    url(r'sqlIndex', sqlIndex),
    url(r'register', register),
    url(r'clearModelCodeRecords', clearModelCodeRecords),
    url(r'clearPhoneCodeRecords', clearPhoneCodeRecords),
    url(r'changeCreatedTime', changeCreatedTime),
    url(r'getUserInfo', getUserInfo),
    url(r'getTokenInfo', getTokenInfo),
    url(r'getTodoInfo', getTodoInfo),
    url(r'plan', plan),

    #Performance
    url(r'performance', performance),
    url(r'getPerformanceFlowData', getPerformanceFlowData),
    url(r'getPerformanceNodeData', getPerformanceNodeData),
    url(r'getPerformanceOutSql', getPerformanceOutSql),
    url(r'getPerformancePreSql', getPerformancePreSql),
    url(r'getPerformancePostKey', getPerformancePostKey),
    url(r'getPerformanceParameter', getPerformanceParameter),
    url(r'addPerformanceFlow', addPerformanceFlow),
    url(r'editPerformanceFlow', editPerformanceFlow),
    url(r'deletePerformanceFlow', deletePerformanceFlow),
    url(r'deletePerformanceNode', deletePerformanceNode),
    url(r'addPerformanceNode', addPerformanceNode),
    url(r'editPerformanceNode', editPerformanceNode),
    url(r'savePerformancePostKey', savePerformancePostKey),
    url(r'editPerformanceParameter', editPerformanceParameter),
    url(r'editPerformanceOutSql$', editPerformanceOutSql),
    url(r'editPerformancePreSql', editPerformancePreSql),
    url(r'getPerformanceCreater', getPerformanceCreater),
    url(r'actionPerformanceFlow', actionPerformanceFlow),
    url(r'getPerformanceEmail', getPerformanceEmail),
    url(r'performanceEmailChange', performanceEmailChange),
    url(r'actionPerformanceAllFlow', actionPerformanceAllFlow),
    url(r'changePerformanceFlowState', changePerformanceFlowState),
    url(r'changePerformanceNodeState', changePerformanceNodeState),
    url(r'deletePerformanceDefaultVar', deletePerformanceDefaultVar),
    url(r'addPerformanceDefaultVar', addPerformanceDefaultVar),
    url(r'editPerformanceDefaultVar', editPerformanceDefaultVar),
    url(r'getPerformanceDefaultVar', getPerformanceDefaultVar),
    url(r'getPerformanceConfig', getPerformanceConfig),
    url(r'savePerformanceConfig', savePerformanceConfig),

    # url(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_URL}),
]
