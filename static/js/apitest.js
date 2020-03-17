var vm = new Vue({
    el: '#app',
    mounted: function() {
        var dataPost = { "page_id": 1, "page_size": 18 };
        this.$http.post(this.url + '/getFlowData', dataPost).then(
            function(data) {
                this.FlowlistSize = data.body[0].size;
                this.flowData = data.body[0].flowData;
                this.FlowIdList = data.body[0].FlowIdList;
                console.log(this.flowData);
                console.log(this.FlowlistSize);
            }
        );
        this.$http.get(this.url + '/getEmail').then(
            function(data) {
                this.recipients = data.body[0].email;
            }
        );
    },
    data() {
        return {
            url: 'http://apitest.shiguangxu.com:8001',

            //loading文案
            text: "接口运行中...",

            //统计
            remarkLists: [],
            tableData: [],
            lableData: {
                "id": "",
                "remark": "",
                "order_id": "",
                "flow_id": "",
                "author": ""
            },
            filtrate: '',
            filters: [],
            allApiJsonList: [],
            inputKey: '',
            selectType: 'path',
            order_id: "",

            //分页大小
            page_size: 18,
            apiSize: 1001,
            pageSize: 18,
            FlowlistSize: 100,
            currentPage: 1,

            //其他配置
            path: '',
            path2: '',
            recipients: '',
            envOptions: [{
                value: 'test',
                label: '测试环境'
            }, {
                value: 'pre',
                label: '预发布环境'
            }, {
                value: 'prod',
                label: '线上环境'
            }, {
                value: 'dev',
                label: '开发环境'
            }],
            activeName: "apitest",
            creater: [{
                "creater": "全部负责人"
            }, {
                "creater": "柳军"
            }, {
                "creater": "陈俊波"
            }, {
                "creater": "崔庆用"
            }, {
                "creater": "余一鸣"
            }, {
                "creater": "陆金爱"
            }],
            activeIndex2: '3',
            varListData: [{
                "argumentName": "示例1:变量名称",
                "argumentValue": "示例1:变量值",
            }],
            search: '',
            value: true,
            visible: false,
            formLabelWidth: '120px',

            //sql查询
            outSqlData: [],

            //测试流
            filtrateFlowId: '',
            FlowIdList: [{
                'flowId': '',
                'flow_name': ''
            }],
            deleteFlowId: '',
            flowDataDefault: {
                "pk": "",
                "flow_name": "",
                "account": "",
                "password": "",
                "priority": "1",
                "creater": "",
                "run_env": "",
                "swagger_url": "",
                "state": "1"
            },
            flowName: "",
            flowData: [],
            expands: [],

            //接口
            deleteNodeId: '',
            nodeFlowId: '',
            nodeDataDefault: [{
                "pk": "",
                "order_id": "",
                "node_name": "",
                "method": "POST",
                "path": "",
                "parameter": "",
                "run_env": "test,pre,prod,beta",
                "expect_response": "\"code\":200,\"msg\":\"操作成功\"",
                "sleep_time": 0,
                "state": "1",
                "isexcute_pre_sql": "0",
                "pre_keys": "",
                "pre_sql_str": "",
                "pre_sql_para": "",
                "pre_sql_out": "",
                "ischechdb": "0",
                "sql_str": "",
                "sql_para": "",
                "expect_db": "",
                "post_keys": "",
                "post_keys_extractor": "",
                "post_keys_default": "",
            }],
            nodeDataDefaultAdd: [{
                "pk": "",
                "order_id": "",
                "node_name": "",
                "method": "POST",
                "path": "",
                "parameter": "",
                "run_env": "test,pre,prod,beta",
                "expect_response": "\"code\":200,\"msg\":\"操作成功\"",
                "sleep_time": 0,
                "state": "1",
                "isexcute_pre_sql": "0",
                "pre_keys": "",
                "pre_sql_str": "",
                "pre_sql_para": "",
                "pre_sql_out": "",
                "ischechdb": "0",
                "sql_str": "",
                "sql_para": "",
                "expect_db": "",
                "post_keys": "",
                "post_keys_extractor": "",
                "post_keys_default": "",
            }],
            nodeData: [],
            postKeyData: [],
            preSqlData: [],
            parameterData: [],
            currentRow: '',
            nodeDisplayList:{
                "order_id": true,
                "node_name": true,
                "method": true,
                "path": true,
                "parameter": true,
                "pre_keys": false,
                "run_env": true,
                "expect_response": true,
                "sleep_time": true,
                "state": true,
                "preSql":true,
                "outSqlData":true,
                "postKeyData":true,
                "operation":true,
                "sqlConfig":false,
            },

            isIndeterminate: true,
            checkAll: false,

            //loading开关
            statisticsLoading: false,
            statisticsLoading2: false,
            actionLoading: false,
            actionLoading2: false,

            //dialog
            dialogDrawer: false,
            dialogDrawer2: false,
            dialogDrawerQuickAddNode: false,
            dialogFormVisible: false,
            dialogParameter: false,
            dialogManualStatistics: false,
            dialogUnDoStatistics: false,
            dialogPreSql: false,
            dialogOutSql: false,
            dialogPostKey: false,
            dialogEmailChange: false,
            deleteFlowDialogVisible: false,
            dialogReport: false,
            deleteNodeDialogVisible: false,
            dialogDefaultVar: false,
            dialogCopyNode: false,
            dialogEditNode: false,
            dialogTableVisible: false,
            dialogTableDisplay: false
        }
    },
    methods: {
        //公共
        handleClick(targetName) {
            if (targetName.name === "apitest") {
                this.activeName = targetName.name;
                console.log(this.activeName);
                var dataPost = { "page_id": 1, "page_size": 18 };
                this.$http.post(this.url + '/getFlowData', dataPost).then(
                    function(data) {
                        this.FlowlistSize = data.body[0].size;
                        this.flowData = data.body[0].flowData;
                        this.FlowIdList = data.body[0].FlowIdList;
                        console.log(this.flowData);
                        console.log(this.FlowlistSize);
                    }
                );
            } else if (targetName.name === "config") {
                this.activeName = targetName.name;
                console.log(this.activeName);
                var dataPost = { "page_id": 1, "page_size": 15 };
                this.$http.post(this.url + '/getFlowData', dataPost).then(
                    function(data) {
                        this.FlowlistSize = data.body[0].size;
                        this.flowData = data.body[0].flowData;
                        this.FlowIdList = data.body[0].FlowIdList;
                        console.log(this.flowData);
                        console.log(this.FlowlistSize);
                    }
                );
            } else if (targetName.name === "task") {
                this.activeName = targetName.name;
                console.log(this.activeName);
            } else if (targetName.name === "statistics") {
                this.statisticsLoading = true;
                dataPost = {
                    "page_id": 1,
                    "page_size": 15
                };
                this.$http.post(this.url + '/getApiCounts', dataPost).then(
                    function(data) {
                        code = data.body[0].code;
                        if (code === "200") {
                            this.tableData = [];
                            this.filters = [];
                            this.allApiJsonList = [];
                            this.tableData = [data.body[0].data];
                            remarkList = data.body[0].data.remarkList;
                            let allApi = data.body[0].data.allApi;
                            for (let i = 0; i < remarkList.length; i++) {
                                if (remarkList[i][0] === "") {
                                    this.filters.push({
                                        text: "接口未标记",
                                        value: "接口未标记"
                                    })
                                } else {
                                    this.filters.push({
                                        text: remarkList[i][0],
                                        value: remarkList[i][0]
                                    })
                                }
                            }
                            for (let i = 0; i < allApi.length; i++) {
                                this.allApiJsonList.push({
                                    "id": allApi[i][0],
                                    "service_name": allApi[i][2],
                                    "summary": allApi[i][4],
                                    "path": allApi[i][5],
                                    "author": allApi[i][13],
                                    "remark": allApi[i][14]
                                })
                            }
                            this.$http.post(this.url + '/getFlowIdList', {}).then(
                                function(data) {
                                    code = data.body.code;
                                    if (code === "200") {
                                        this.FlowIdList = data.body.FlowIdList;
                                        console.log("handleClick-statistics-FlowIdList",this.FlowIdList)
                                    }
                                }
                            );
                            this.apiSize = parseInt(data.body[0].data.totalCounts);
                            this.statisticsLoading = false;
                        } else {
                            this.statisticsLoading = false;
                        }

                    }
                );
            }
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        expandChange(row, expandedRows, index) {
            this.loading = true;
            this.actionLoading2 = true;
            if (expandedRows.length > 1) {
                this.expands = [];
                if (row) {
                    this.expands.splice(index, 1);
                }
                this.$refs.flowTableRef.toggleRowExpansion(expandedRows[0]);
                this.nodeFlowId = row.pk;
                this.filtrateFlowId = row.pk;
                console.log("expandChange-nodeFlowId", this.nodeFlowId);
                var dataPost = { "flow_id": row.pk };
                this.$http.post(this.url + '/getNodeData', dataPost).then(
                    function(data) {
                        this.nodeData = data.body;
                        this.currentRow = '';
                        this.actionLoading2 = false;
                    }
                );
            } else {
                this.expands = [];
                this.nodeFlowId = row.pk;
                this.filtrateFlowId = row.pk;
                console.log("expandChange-nodeFlowId", this.nodeFlowId);
                var dataPost = { "flow_id": row.pk };
                this.$http.post(this.url + '/getNodeData', dataPost).then(
                    function(data) {
                        this.nodeData = data.body;
                        this.currentRow = '';
                        this.actionLoading2 = false;
                    }
                );
            }
        },
        actionFlow(index, row) {
            this.actionLoading2 = true;
            var dataPost = {
                "flow_id": row.pk,
            };
            this.$http.post(this.url + '/actionFlow', dataPost).then(
                function(data) {
                    var responData = data.status;
                    if (responData === 200 || responData === '200') {
                        this.actionLoading2 = false;
                        this.$message({
                            showClose: true,
                            message: '测试流接口执行成功，结果请查收邮件',
                            type: 'success'
                        });
                        this.dialogReport = true;
                    } else {
                        this.actionLoading2 = false;
                        this.$message({
                            showClose: true,
                            message: '很遗憾，接口执行失败',
                            type: 'error'
                        });
                        this.dialogReport = true;
                    }
                }
            );
        },
        actionAllFlow() {
            var dataPost = {};
            this.actionLoading = true;
            this.$http.post(this.url + '/actionAllFlow', dataPost).then(
                function(data) {
                    var responData = data.status;
                    if (responData === 200 || responData === '200') {
                        this.actionLoading = false;
                        this.$message({
                            showClose: true,
                            message: '测试流接口执行成功，结果请查收邮件',
                            type: 'success'
                        });
                        this.dialogReport = true;
                    } else {
                        this.actionLoading = false;
                        this.$message({
                            showClose: true,
                            message: '很遗憾，接口执行失败',
                            type: 'error'
                        });
                        this.dialogReport = true;
                    }
                }
            );


        },

        //统计
        filterPath2() {
            this.statisticsLoading = true;
            var dataPost = {
                "selectType": this.selectType,
                "inputKey": this.inputKey.trim()
            };
            this.$http.post(this.url + '/filterPath2', dataPost).then(
                function(data) {
                    this.page_size = 2000;
                    code = data.body[0].code;
                    if (code === "200") {
                        console.log(data.body[0].remarkList);
                        console.log(data.body[0].data[0]);
                        this.filters = [];
                        this.allApiJsonList = [];
                        remarkList = data.body[0].remarkList;
                        for (let i = 0; i < remarkList.length; i++) {
                            if (remarkList[i][0] === "") {
                                this.filters.push({
                                    text: "接口未标记",
                                    value: "接口未标记"
                                })
                            } else {
                                this.filters.push({
                                    text: remarkList[i][0],
                                    value: remarkList[i][0]
                                })
                            }
                        }
                        let allApi = data.body[0].data;
                        console.log("allApi.length", allApi.length);
                        for (let i = 0; i < allApi.length; i++) {
                            this.allApiJsonList.push({
                                "id": allApi[i][0],
                                "service_name": allApi[i][2],
                                "summary": allApi[i][4],
                                "path": allApi[i][5],
                                "author": allApi[i][13],
                                "remark": allApi[i][14]
                            })
                        }
                        this.apiSize = allApi.length;
                        this.statisticsLoading = false;
                    } else {
                        this.statisticsLoading = false;
                    }
                }
            );
        },
        unfilterApi() {
            this.statisticsLoading = true;
            dataPost = {
                "switch": false,
            };
            this.$http.post(this.url + '/filterApi', dataPost).then(
                function(data) {
                    this.page_size = 2000;
                    code = data.body[0].code;
                    if (code === "201") {
                        this.filters = [];
                        this.allApiJsonList = [];
                        remarkList = data.body[0].remarkList;
                        for (let i = 0; i < remarkList.length; i++) {
                            if (remarkList[i][0] === "") {
                                this.filters.push({
                                    text: "接口未标记",
                                    value: "接口未标记"
                                })
                            } else {
                                this.filters.push({
                                    text: remarkList[i][0],
                                    value: remarkList[i][0]
                                })
                            }
                        }
                        let allApi = data.body[0].data;
                        for (let i = 0; i < allApi.length; i++) {
                            this.allApiJsonList.push({
                                "id": allApi[i][0],
                                "service_name": allApi[i][2],
                                "summary": allApi[i][4],
                                "path": allApi[i][5],
                                "author": allApi[i][13],
                                "remark": allApi[i][14]
                            })
                        }
                        this.apiSize = allApi.length;
                        this.statisticsLoading = false;
                    } else {
                        this.statisticsLoading = false;
                    }
                }
            );
        },
        filterApi() {
            this.statisticsLoading = true;
            dataPost = {
                "switch": true,
            };
            this.$http.post(this.url + '/filterApi', dataPost).then(
                function(data) {
                    this.page_size = 2000;
                    code = data.body[0].code;
                    if (code === "200") {
                        this.filters = [];
                        this.allApiJsonList = [];
                        remarkList = data.body[0].remarkList;
                        for (let i = 0; i < remarkList.length; i++) {
                            if (remarkList[i][0] === "") {
                                this.filters.push({
                                    text: "接口未标记",
                                    value: "接口未标记"
                                })
                            } else {
                                this.filters.push({
                                    text: remarkList[i][0],
                                    value: remarkList[i][0]
                                })
                            }
                        }
                        let allApi = data.body[0].data;
                        for (let i = 0; i < allApi.length; i++) {
                            this.allApiJsonList.push({
                                "id": allApi[i][0],
                                "service_name": allApi[i][2],
                                "summary": allApi[i][4],
                                "path": allApi[i][5],
                                "author": allApi[i][13],
                                "remark": allApi[i][14]
                            })
                        }
                        this.apiSize = allApi.length;
                        this.statisticsLoading = false;
                    } else {
                        this.statisticsLoading = false;
                    }

                }
            );
        },
        labeledApi(index, row) {
            this.dialogDrawer2 = true;
            this.lableData = {
                "id": row.id,
                "remark": row.remark,
                "author": row.author
            }
        },
        quickAdd(index, row) {
            console.log("quickAdd-row",row);
            console.log("quickAdd-row.path",row.path);
            console.log("quickAdd-row.summary",row.summary);
            this.dialogDrawerQuickAddNode = true;
            let flowId = "";
            for (i=0;i<this.FlowIdList.length;i++){
                if (this.FlowIdList[i].flow_name === row.service_name){
                    flowId = this.FlowIdList[i].flowId
                }
            }
            this.$http.post(this.url + '/getLastOrderId', {"flow_id":flowId}).then(
                function(data) {
                    if (data.body.code === "200") {
                        console.log("lastOrderId+1",(data.body.lastOrderId+1));
                        this.lableData = {
                            "id": row.id,
                            "remark": "已实现自动化",
                            "author": row.author,
                            "order_id": data.body.lastOrderId+1,
                            "summary": row.summary,
                            "path": row.path,
                            "flow_id": flowId
                        };
                        console.log("quickAdd-lableData",this.lableData)
                    }else{
                        this.lableData = {
                            "id": row.id,
                            "remark": "已实现自动化",
                            "author": row.author,
                            "order_id": 0,
                            "summary": row.summary,
                            "path": row.path,
                            "flow_id": flowId
                        };
                        console.log("quickAdd-lableData",this.lableData)
                    }
                }
            );


        },
        quickAddOk() {
            dataPost = {
                "id": this.lableData.id,
                "remark": this.lableData.remark,
                "author": this.lableData.author,
                "order_id": this.lableData.order_id,
                "flow_id": this.lableData.flow_id
            };
            console.log("quickAddOk-dataPost",dataPost);
            this.$http.post(this.url + '/quickAddNode', dataPost).then(
                function(data) {
                    if (data.body[0].code === "200") {
                        this.$message({
                            showClose: true,
                            message: '添加成功，请到测试流ID='+this.lableData.flow_id+'中查看',
                            type: 'success'
                        });
                        for (i = 0; i < this.allApiJsonList.length; i++) {
                            if (this.lableData.id === this.allApiJsonList[i].id) {
                                this.allApiJsonList[i].remark = this.lableData.remark;
                                this.allApiJsonList[i].author = this.lableData.author;
                            }
                        }
                        this.dialogDrawerQuickAddNode = false;
                    } else {
                        this.dialogDrawerQuickAddNode = false;
                    }
                }
            );

        },
        saveRemark(row, index) {
            this.statisticsLoading = true;
            dataPost = {
                "id": this.lableData.id,
                "remark": this.lableData.remark,
                "author": this.lableData.author
            };
            this.$http.post(this.url + '/saveRemark', dataPost).then(
                function(data) {
                    if (data.body[0].code === "200") {
                        this.dialogDrawer2 = false;
                        dataPost = {
                            "page_id": 1,
                            "page_size": 2000
                        };
                        for (i = 0; i < this.allApiJsonList.length; i++) {
                            if (this.lableData.id === this.allApiJsonList[i].id) {
                                this.allApiJsonList[i].remark = this.lableData.remark;
                                this.allApiJsonList[i].author = this.lableData.author;
                            }
                        }
                        this.tableData[0].doneCounts = data.body[0].data.doneCounts;
                        this.tableData[0].undoneCounts = data.body[0].data.undoneCounts;
                        this.tableData[0].skipApiCounts = data.body[0].data.skipApiCounts;
                        this.tableData[0].totalCounts = data.body[0].data.totalCounts;
                        this.tableData[0].progress = data.body[0].data.progress;
                        console.log("--->data", data.body[0].data);
                        this.statisticsLoading = false;
                    }

                }
            );
        },
        cancelForm() {
            this.dialogDrawer2 = false;
            this.dialogDrawerQuickAddNode = false;
        },
        transferFlowData(row) {
            var fromFlowId = row.pk;
        },
        openSwagger() {
            window.open("http://47.112.0.183:8801/swagger-ui.html", "_blank");
        },
        manualStatistics() {
            this.statisticsLoading = true;
            this.tableData = [];
            this.filters = [];
            this.allApiJsonList = [];
            var dataPost = {
                "page_id": 1,
                "page_size": 15
            };
            this.$http.post(this.url + '/manualStatistics', dataPost).then(
                function(data) {
                    code = data.body[0].code;
                    if (code === 200 || code === '200') {
                        this.tableData = [data.body[0].data];
                        remarkList = data.body[0].data.remarkList;
                        let allApi = data.body[0].data.allApi;
                        for (let i = 0; i < remarkList.length; i++) {
                            if (remarkList[i][0] === "") {
                                this.filters.push({
                                    text: "接口未标记",
                                    value: "接口未标记"
                                })
                            } else {
                                this.filters.push({
                                    text: remarkList[i][0],
                                    value: remarkList[i][0]
                                })
                            }
                        }
                        for (let i = 0; i < allApi.length; i++) {
                            this.allApiJsonList.push({
                                "id": allApi[i][0],
                                "service_name": allApi[i][2],
                                "summary": allApi[i][4],
                                "path": allApi[i][5],
                                "author": allApi[i][13],
                                "remark": allApi[i][14]
                            })
                        }
                        this.apiSize = parseInt(data.body[0].data.totalCounts);
                        console.log("this.tableData--->", this.tableData);
                        console.log("this.allApiJsonList--->", this.allApiJsonList);
                        this.statisticsLoading = false;
                    } else {

                    }

                }
            );
        },
        filterTag(value, row) {
            return row.remark === value;
        },
        handleCurrentChange2(val) {
            console.log(`当前页: ${val}`);
            var dataPost = {
                "page_id": val,
                "page_size": 15
            };
            this.$http.post(this.url + '/getApiCounts', dataPost).then(
                function(data) {
                    code = data.body[0].code;
                    if (code === "200") {
                        this.tableData = [];
                        this.filters = [];
                        this.allApiJsonList = [];
                        this.tableData = [data.body[0].data];
                        remarkList = data.body[0].data.remarkList;
                        let allApi = data.body[0].data.allApi;
                        for (let i = 0; i < remarkList.length; i++) {
                            if (remarkList[i][0] === "") {
                                this.filters.push({
                                    text: "接口未标记",
                                    value: "接口未标记"
                                })
                            } else {
                                this.filters.push({
                                    text: remarkList[i][0],
                                    value: remarkList[i][0]
                                })
                            }
                        }
                        for (let i = 0; i < allApi.length; i++) {
                            this.allApiJsonList.push({
                                "id": allApi[i][0],
                                "service_name": allApi[i][2],
                                "summary": allApi[i][4],
                                "path": allApi[i][5],
                                "author": allApi[i][13],
                                "remark": allApi[i][14]
                            })
                        }
                        this.apiSize = parseInt(data.body[0].data.totalCounts);
                        console.log("this.filters--->", this.filters);
                        console.log("this.tableData--->", this.tableData);
                        console.log("this.allApiJsonList--->", this.allApiJsonList);
                        this.statisticsLoading = false;
                    } else {
                        this.statisticsLoading = false;
                    }

                }
            );
        },
        formatJson2() {
            text = this.nodeDataDefault.parameter;
            console.log(text);
            if (text.indexOf("$") !== -1) {
                this.nodeDataDefault.parameter = JSON.stringify(JSON.parse(text.replace(/\:\$/g, "\:\"\$").replace(/\$\,/g, "\$\"\,").replace(/\$\}/g, "\$\"\}").replace(/\[\$/g, "\[\"\$").replace(/\$\]/g, "\$\"\]")), null, 2);
            } else {
                this.nodeDataDefault.parameter = JSON.stringify(JSON.parse(text), null, 2);
            }
        },

        //测试流
        jumpSwagger(row) {
            console.log("jumpSwagger—flow_name:", row.flow_name)
            window.open("http://47.112.0.183:8801/swagger-ui.html?urls.primaryName=" + row.flow_name, "_blank")
                // window.open(row.swagger_url, "_blank");
        },
        filterPath() {
            var dataPost = { "path": this.path.trim() };
            this.$http.post(this.url + '/filterPath', dataPost).then(
                function(data) {
                    this.flowData = data.body[0].flowData;
                    this.pageSize = 200;
                }
            );
        },
        filterFlowName() {
            var dataPost = { "flow_name": this.flowName.trim() };
            this.$http.post(this.url + '/filterFlowName', dataPost).then(
                function(data) {
                    this.flowData = data.body[0].flowData;
                    this.pageSize = 200;
                }
            );
        },
        filtrateCreater() {
            var dataPost = {
                "creater": this.filtrate,
                "page_size": 200
            };
            this.$http.post(this.url + '/getFlowDataByCreater', dataPost).then(
                function(data) {
                    var responData = data.status;
                    if (responData === 200 || responData === '200') {
                        this.flowData = data.body;
                        this.pageSize = 200;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '很遗憾，筛选失败',
                            type: 'error'
                        });
                    }
                }
            );

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            console.log("page_size:", val);
            this.pageSize = val;
            var dataPost = { "page_id": 1, "page_size": this.pageSize };
            this.$http.post(this.url + '/getFlowData', dataPost).then(
                function(data) {
                    var responData = data.status;
                    if (responData === 200 || responData === '200') {
                        this.flowData = data.body[0].flowData;
                        this.FlowIdList = data.body[0].FlowIdList;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '很遗憾，切换分页失败',
                            type: 'error'
                        });
                    }

                }
            );

        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            var dataPost = { "page_id": val, "page_size": this.pageSize };
            this.$http.post(this.url + '/getFlowData', dataPost).then(
                function(data) {
                    var responData = data.status;
                    if (responData === 200 || responData === '200') {
                        this.FlowIdList = data.body[0].FlowIdList;
                        this.flowData = data.body[0].flowData;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '很遗憾，切换分页失败',
                            type: 'error'
                        });
                    }

                }
            );
        },
        addFlowRow(flowData) {
            flowData.push({
                "account": "请输入测试账号",
                "flow_name": "请输入测试流",
                "password": "请输入测试账号密码",
                "priority": "请设置优先级",
                "creater": "请输入负责人",
                "run_env": "请选择可运行环境",
                "swagger_url": "请选择可运行环境",
                "state": "请设置是否开启自动化"
            })
        },
        addFlowOk(flowDataDefault) {
            console.log(flowDataDefault.run_env);
            var account = flowDataDefault.account;
            var flow_name = flowDataDefault.flow_name;
            var password = flowDataDefault.password;
            var priority = flowDataDefault.priority;
            var creater = flowDataDefault.creater;
            var run_env = flowDataDefault.run_env;
            var swagger_url = flowDataDefault.swagger_url;
            var state = flowDataDefault.state;
            if (state === null || state === undefined) {
                alert("请选择是否开启自动化")
            } else {
                this.loading = true;
                var dataPost = {
                    "account": account,
                    "flow_name": flow_name,
                    "password": password,
                    "priority": priority,
                    "creater": creater,
                    "run_env": run_env,
                    "swagger_url": swagger_url,
                    "state": state,
                    "flow_code": this.FlowlistSize + 1
                };
                this.$http.post(this.url + '/addFlow', dataPost).then(
                    function(data) {
                        var responData = data.status;
                        if (responData === 200 || responData === '200') {
                            this.$message({
                                showClose: true,
                                message: '恭喜你，添加成功',
                                type: 'success'
                            });
                            this.flowData.push(dataPost);
                            this.FlowlistSize = this.FlowlistSize + 1
                        } else {
                            this.$message({
                                showClose: true,
                                message: '很遗憾，添加失败了，快查查原因吧',
                                type: 'error'
                            });
                        }
                    }
                );
            }
        },
        saveFlowEdit(index, row) {
            var flowTable = document.getElementById('flowTable');
            var currentRow = flowTable.getElementsByClassName('el-table__body')[0].getElementsByClassName("el-table__row")[index];
            for (var i = 1; i < currentRow.children.length - 3; i++) {
                var cell = currentRow.children[i].getElementsByClassName('cell')[0];
                var elInput = cell.children[0];
                var elSpan = cell.children[1];
                elInput.style.display = 'none';
                elSpan.style.display = 'block';
                cell.style.color = 'black';
            }
            this.loading = true;
            var dataPost = {
                "account": row.account,
                "flow_name": row.flow_name,
                "password": row.password,
                "priority": row.priority,
                "creater": row.creater,
                "run_env": row.run_env,
                "state": row.state,
                "swagger_url": row.swagger_url,
                "flow_code": row.flow_code,
                "pk": row.pk
            };
            this.$http.post(this.url + '/editFlow', dataPost).then(
                function(data) {
                    var responData = data.status;
                    if (responData === 200 || responData === '200') {
                        this.$message({
                            showClose: true,
                            message: '恭喜你，保存成功',
                            type: 'success'
                        });
                        currentRow.children[11].getElementsByClassName('save')[0].style.display = 'none';
                        currentRow.children[11].getElementsByClassName('edit')[0].style.display = 'block';
                    } else {
                        this.$message({
                            showClose: true,
                            message: '很遗憾，保存失败，快查查原因吧',
                            type: 'error'
                        });
                    }
                }
            );
        },
        changeFlowState(row) {
            var dataPost = {
                "state": row.state,
                "flow_id": row.pk
            };
            this.$http.post(this.url + '/changeFlowState', dataPost).then(
                function(data) {
                    var responData = data.status;
                    if (responData === 200 || responData === '200') {
                        this.$message({
                            showClose: true,
                            message: '设置测试流状态成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: '设置测试流状态失败',
                            type: 'error'
                        });
                    }
                }
            );
        },
        dbEditFlowTable(index, row) {
            var flowTable = document.getElementById('flowTable');
            console.log("flowTable", flowTable);
            var currentRow = flowTable.getElementsByClassName('el-table__body')[0].getElementsByClassName("current-row")[0];
            console.log("currentRow", currentRow);
            for (var i = 1; i < currentRow.children.length - 3; i++) {
                var cell = currentRow.children[i].getElementsByClassName('cell')[0];
                var elInput = cell.children[0];
                var elSpan = cell.children[1];
                elInput.style.display = 'block';
                elSpan.style.display = 'none';
                cell.style.color = 'blue';
            }
            currentRow.children[11].getElementsByClassName('save')[0].style.display = 'block';
            currentRow.children[11].getElementsByClassName('edit')[0].style.display = 'none';
            console.log("row", row);
            console.log("index", index);
        },
        editFlowTable(index, row) {
            var flowTable = document.getElementById('flowTable');
            console.log("flowTable", flowTable);
            var currentRow = flowTable.getElementsByClassName('el-table__body')[0].getElementsByClassName("el-table__row")[index];
            console.log("currentRow", currentRow);
            for (var i = 1; i < currentRow.children.length - 3; i++) {
                var cell = currentRow.children[i].getElementsByClassName('cell')[0];
                var elInput = cell.children[0];
                var elSpan = cell.children[1];
                elInput.style.display = 'block';
                elSpan.style.display = 'none';
                cell.style.color = 'blue';
            }
            currentRow.children[11].getElementsByClassName('save')[0].style.display = 'block';
            currentRow.children[11].getElementsByClassName('edit')[0].style.display = 'none';
            console.log("row", row);
            console.log("index", index);
        },
        addFlowCancel() {
            document.body.click();
        },
        deleteFlowRow(index, rows, row) {
            console.log(row);
            this.deleteFlowId = row.pk;
            console.log(this.deleteFlowId);
            console.log(index);
            rows.splice(index, 1);
            this.deleteFlowDialogVisible = true;
        },
        deleteFlowOk() {
            this.loading = true;
            console.log(this.deleteFlowId);
            var dataPost = {
                "flow_id": this.deleteFlowId,
            };
            this.$http.post(this.url + '/deleteFlow', dataPost).then(
                function(data) {
                    var responData = data.status;
                    if (responData === 200 || responData === '200') {
                        this.$message({
                            showClose: true,
                            message: '恭喜你，删除成功',
                            type: 'success'
                        });
                        this.deleteFlowDialogVisible = false;
                        window.location.reload();
                    } else {
                        this.$message({
                            showClose: true,
                            message: '很遗憾，删除失败，快查查原因吧',
                            type: 'error'
                        });
                    }
                }
            );
        },
        rowClick(row, column, event) {
            console.log("this.currentRow=", this.currentRow);
            console.log("column=", column);
            this.currentRow = document.getElementById('nodeTable').getElementsByClassName("current-row")[0];
            console.log("this.currentRow2=", this.currentRow);
            this.currentRow = document.getElementById('nodeTable').getElementsByClassName("current-row")[0];
            console.log("this.currentRow3=", this.currentRow);
        },

        //接口
        copyApi(nodeData, index, row) {
            this.nodeDataDefault = [row];
            console.log("this.nodeDataDefault--->", this.nodeDataDefault);
            this.dialogCopyNode = true;
        },
        addApi(nodeData, index, row) {
            this.nodeDataDefault = [row];
            console.log("this.nodeDataDefault--->", this.nodeDataDefault);
            this.dialogTableVisible = true
        },
        savePostKey() {
            console.log("node_id", this.postKeyData.node_id);
            console.log("postKeyData", this.postKeyData);
            var dataPost = {
                "node_id": this.postKeyData.node_id,
                "post_keys": this.postKeyData.post_keys,
                "post_keys_extractor": this.postKeyData.post_keys_extractor,
                "post_keys_default": this.postKeyData.post_keys_default
            };
            this.$http.post(this.url + '/savePostKey', dataPost).then(
                function(data) {
                    var responData = data.status;
                    console.log("responData=", responData);
                    if (responData === 200 || responData === '200') {
                        console.log("this.nodeData=", this.nodeData);
                        var nodeTable = document.getElementById('nodeTable');
                        var currentRow = nodeTable.getElementsByClassName('el-table__body')[0].getElementsByClassName("current-row")[0];
                        console.log('post_keys=', this.postKeyData.post_keys);
                        if (this.postKeyData.post_keys != null || this.postKeyData.post_keys > 0 || this.postKeyData.post_keys !== "") {
                            currentRow.getElementsByClassName("popoverButtonPost")[0].innerHTML = this.postKeyData.post_keys;
                        } else {
                            currentRow.getElementsByClassName("popoverButtonPost")[0].innerHTML = '无后置变量';
                        }
                        console.log("postKeyData=", this.postKeyData);
                        this.$message({
                            showClose: true,
                            message: '恭喜你，后置变量提取设置成功',
                            type: 'success'
                        });
                        this.dialogPostKey = false;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '很抱歉，后置变量提取设置失败',
                            type: 'error'
                        });
                    }
                }
            );

        },
        formatPostKey: function(row, formatPostKey) {
            return row.post_keys != null && row.post_keys.length > 0 && row.post_keys !== "" ? row.post_keys : '无后置变量';
        },
        getPostKey(index, row) {
            this.currentRow = document.getElementById('nodeTable').getElementsByClassName('el-table__body')[0].getElementsByClassName("current-row ")[0];
            console.log('getPostKey-index', index);
            console.log('getPostKey-this.currentRow', this.currentRow);
            this.postKeyData = '';
            this.dialogPostKey = true;
            var dataPost = { "node_id": row.pk };
            this.$http.post(this.url + '/getPostKey', dataPost).then(
                function(data) {
                    var responData = data.body;
                    console.log("responData=", responData);
                    this.postKeyData = {
                        "node_id": row.pk,
                        "post_keys": responData[0].post_keys,
                        "post_keys_extractor": responData[0].post_keys_extractor,
                        "post_keys_default": responData[0].post_keys_default
                    };
                    console.log("postKeyDataGet=", this.postKeyData);
                }
            )
        },
        saveParameter() {
            var dataPost = {
                "node_id": this.parameterData.key,
                "parameter": this.parameterData.value,
                "pre_keys": this.parameterData.pre_keys
            };
            this.$http.post(this.url + '/editParameter', dataPost).then(
                function(data) {
                    var responData = data.status;
                    if (responData === 200 || responData === '200') {
                        for (i = 0; i < this.nodeData.length; i++) {
                            if (this.parameterData.key === this.nodeData[i].pk) {
                                this.nodeData[i].parameter = this.parameterData.value;
                                this.nodeData[i].pre_keys = this.parameterData.pre_keys
                            }
                        }
                        var nodeTable = document.getElementById('nodeTable');
                        var currentRow = nodeTable.getElementsByClassName('el-table__body')[0].getElementsByClassName("current-row")[0];
                        currentRow.getElementsByClassName("parameterButton")[0].innerHTML = this.parameterData.value;
                        // currentRow.getElementsByClassName("span_pre_keys")[0].innerHTML = this.parameterData.pre_keys;
                        this.$message({
                            showClose: true,
                            message: '保存成功',
                            type: 'success'
                        });
                        this.dialogParameter = false;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '很遗憾，保存失败',
                            type: 'error'
                        });
                        this.dialogParameter = false;
                    }

                }
            );
        },
        getParameter(index, row) {
            this.currentRow = document.getElementById('nodeTable').getElementsByClassName('el-table__body')[0].getElementsByClassName("current-row ")[0];
            this.dialogParameter = true;
            this.parameterData = '';
            console.log('getParameter-index', index);
            console.log('getParameter-this.currentRow', this.currentRow);
            var dataPost = { "node_id": row.pk };
            this.$http.post(this.url + '/getParameter', dataPost).then(
                function(data) {
                    var responData = data.body;
                    console.log("getParameter-responData:", responData);
                    this.parameterData = {
                        "key": row.pk,
                        "value": responData[0].parameter,
                        "pre_keys": responData[0].pre_keys
                    };
                }
            )
        },
        saveOutSql() {
            var dataPost = {
                "node_id": this.outSqlData.node_id,
                "ischechdb": this.outSqlData.ischechdb,
                "sql_str": this.outSqlData.sql_str,
                "sql_para": this.outSqlData.sql_para,
                "expect_db": this.outSqlData.expect_db
            };
            this.$http.post(this.url + '/editOutSql', dataPost).then(
                function(data) {
                    var responData = data.status;
                    if (responData === 200 || responData === '200') {
                        var nodeTable = document.getElementById('nodeTable');
                        var currentRow = nodeTable.getElementsByClassName('el-table__body')[0].getElementsByClassName("current-row")[0];
                        if (this.outSqlData.ischechdb === '1' || this.outSqlData.ischechdb === 1) {
                            currentRow.getElementsByClassName("popoverButton")[0].innerHTML = '已开启';
                        } else if (this.outSqlData.ischechdb === '0' || this.outSqlData.ischechdb === 0) {
                            currentRow.getElementsByClassName("popoverButton")[0].innerHTML = '已关闭';
                        } else {
                            currentRow.getElementsByClassName("popoverButton")[0].innerHTML = '未配置';
                        }
                        this.dialogOutSql = false;
                        this.$message({
                            showClose: true,
                            message: '保存成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: '很遗憾，保存失败',
                            type: 'error'
                        });
                    }
                }
            );
        },
        formatOutSql: function(row, column) {
            return row.ischechdb === 1 || row.ischechdb === '1' ? '已开启' : row.ischechdb === 0 || row.ischechdb === '0' ? '已关闭' : '未配置'
        },
        getOutSql(index, row, even) {
            this.currentRow = document.getElementById('nodeTable').getElementsByClassName('el-table__body')[0].getElementsByClassName("current-row ")[0];
            console.log('getOutSql-index', index);
            console.log('getOutSql-this.currentRow', this.currentRow);
            this.outSqlData = '';
            this.dialogOutSql = true;
            var dataPost = { "node_id": row.pk };
            this.$http.post(this.url + '/getOutSql', dataPost).then(
                function(data) {
                    var responData = data.body;
                    console.log("responData=", responData);
                    this.outSqlData = {
                        "node_id": row.pk,
                        "ischechdb": responData[0].ischechdb,
                        "sql_str": responData[0].sql_str,
                        "sql_para": responData[0].sql_para,
                        "expect_db": responData[0].expect_db
                    };
                    console.log("outSqlData=", this.outSqlData);
                }
            )
        },
        savePreSql() {
            var dataPost = {
                "node_id": this.preSqlData.node_id,
                "isexcute_pre_sql": this.preSqlData.isexcute_pre_sql,
                "pre_sql_str": this.preSqlData.pre_sql_str,
                "pre_sql_para": this.preSqlData.pre_sql_para,
                "pre_sql_out": this.preSqlData.pre_sql_out,
            };
            this.$http.post(this.url + '/editPreSql', dataPost).then(
                function(data) {
                    var responData = data.status;
                    if (responData === 200 || responData === '200') {
                        var nodeTable = document.getElementById('nodeTable');
                        var currentRow = nodeTable.getElementsByClassName('el-table__body')[0].getElementsByClassName("current-row")[0];
                        if (this.preSqlData.isexcute_pre_sql === '1' || this.preSqlData.isexcute_pre_sql === 1) {
                            currentRow.getElementsByClassName("popoverButtonPre")[0].innerHTML = '已开启';
                        } else if (this.preSqlData.isexcute_pre_sql === '0' || this.preSqlData.isexcute_pre_sql === 0) {
                            currentRow.getElementsByClassName("popoverButtonPre")[0].innerHTML = '已关闭';
                        } else {
                            currentRow.getElementsByClassName("popoverButtonPre")[0].innerHTML = '未配置';
                        }
                        this.dialogPreSql = false;
                        this.$message({
                            showClose: true,
                            message: '保存成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: '很遗憾，保存失败',
                            type: 'error'
                        });
                    }
                }
            );
        },
        formatPreSql: function(row, column) {
            return row.isexcute_pre_sql === 1 || row.isexcute_pre_sql === '1' ? '已开启' : row.isexcute_pre_sql === 0 || row.isexcute_pre_sql === '0' ? '已关闭' : '未配置'
        },
        getPreSql(index, row) {
            this.currentRow = document.getElementById('nodeTable').getElementsByClassName('el-table__body')[0].getElementsByClassName("current-row ")[0];
            console.log('getPreSql-index', index);
            console.log('getPreSql-row', row);
            console.log('getPreSql-this.currentRow', this.currentRow);
            this.dialogPreSql = true;
            this.preSqlData = '';
            var dataPost = { "node_id": row.pk };
            this.$http.post(this.url + '/getPreSql', dataPost).then(
                function(data) {
                    var responData = data.body;
                    console.log("responData=", responData);
                    this.preSqlData = {
                        "node_id": row.pk,
                        "isexcute_pre_sql": responData[0].isexcute_pre_sql,
                        "pre_sql_str": responData[0].pre_sql_str,
                        "pre_sql_para": responData[0].pre_sql_para,
                        "pre_sql_out": responData[0].pre_sql_out
                    };
                    console.log("preSqlData=", this.preSqlData);
                }
            );
        },
        formatState: function(row, column) {
            console.log(typeof row.state);
            return row.state === 1 || row.state === '1' ? "已开启" : row.state === 0 || row.state === '0' ? "已关闭" : "未设置"
        },
        formatStateNode: function(row, column) {
            console.log("row", row);
            return row.state === 1 || row.state === '1' ? '已开启接口' : row.state === 0 || row.state === '0' ? '已关闭接口' : '未设置接口状态'
        },
        addNodeRow(nodeData) {
            nodeData.push({
                "order_id": nodeData.length + 1,
                "node_name": "",
                "method": "",
                "path": "",
                "parameter": "",
                "run_env": "",
                "pre_keys": "",
                "sleep_time": "",
                "state": "0",
                "expect_response": "",
                "isexcute_pre_sql": "0",
                "pre_sql_str": "",
                "pre_sql_para": "",
                "pre_sql_out": "",
                "ischechdb": "0",
                "sql_str": "",
                "sql_para": "",
                "expect_db": "",
                'post_keys': "",
                'post_keys_extractor': "",
                'post_keys_default': "",
                "pk": nodeData.length + 1
            })
        },
        changeNodeState(row) {
            var dataPost = {
                "state": row.state,
                "node_id": row.pk
            };
            this.$http.post(this.url + '/changeNodeState', dataPost).then(
                function(data) {
                    var responData = data.status;
                    if (responData === 200 || responData === '200') {
                        this.$message({
                            showClose: true,
                            message: '配置接口状态成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: '配置接口状态失败',
                            type: 'error'
                        });
                    }
                }
            );
        },
        editNodeTable(index, row) {
            this.dialogEditNode = true;
            this.nodeDataDefault = [row];
            this.filtrateFlowId = row.flow_id;
        },
        dbEditNodeTable(index, row) {
            console.log("this.filtrateFlowId--->", this.filtrateFlowId);
            console.log("index--->", index);
            console.log("row--->", row);
            console.log("this.currentRow--->", this.currentRow);
            for (i = 0; i < this.nodeData.length; i++) {
                if (index.pk === this.nodeData[i].pk) {
                    this.nodeData[i].parameter = index.parameter
                }
            }
            const nodeTable = document.getElementById('nodeTable');
            const currentRow = nodeTable.getElementsByClassName('el-table__body')[0].getElementsByClassName("current-row")[0];

            for (i = 0; i < currentRow.children.length - 5; i++) {
                var cell = currentRow.children[i].getElementsByClassName('cell')[0];
                var elInput = cell.children[0];
                var elSpan = cell.children[1];
                elInput.style.display = 'block';
                elSpan.style.display = 'none';
                cell.style.color = 'blue';
            }
            currentRow.getElementsByClassName('saveNode')[0].style.display = 'block';
            currentRow.getElementsByClassName('editNode')[0].style.display = 'none';
        },
        saveNode() {
            console.log("nodeDataDefault--->", this.nodeDataDefault);
            var dataPost = {
                "order_id": this.nodeDataDefault.order_id,
                "flow_id": this.filtrateFlowId,
                "node_name": this.nodeDataDefault.node_name,
                "method": this.nodeDataDefault.method,
                "path": this.nodeDataDefault.path.trim(),
                "parameter": this.nodeDataDefault.parameter,
                "run_env": this.nodeDataDefault.run_env,
                "pre_keys": this.nodeDataDefault.pre_keys,
                "sleep_time": this.nodeDataDefault.sleep_time,
                "state": this.nodeDataDefault.state,
                "expect_response": this.nodeDataDefault.expect_response,
                "isexcute_pre_sql": this.nodeDataDefault.isexcute_pre_sql,
                "pre_sql_str": this.nodeDataDefault.pre_sql_str,
                "pre_sql_para": this.nodeDataDefault.pre_sql_para,
                "pre_sql_out": this.nodeDataDefault.pre_sql_out,
                "ischechdb": this.nodeDataDefault.ischechdb,
                "sql_str": this.nodeDataDefault.sql_str,
                "sql_para": this.nodeDataDefault.sql_para,
                "expect_db": this.nodeDataDefault.expect_db,
                'post_keys': this.nodeDataDefault.post_keys,
                'post_keys_extractor': this.nodeDataDefault.post_keys_extractor,
                'post_keys_default': this.nodeDataDefault.post_keys_default,
                "pk": this.nodeDataDefault.pk
            };
            this.$http.post(this.url + '/editNode', dataPost).then(
                function(data) {
                    var responData = data.status;
                    var node_id = data.body[0].node_id;
                    if (responData === 200 || responData === '200') {
                        this.$message({
                            showClose: true,
                            message: '恭喜你，保存成功',
                            type: 'success'
                        });
                        this.dialogDrawer = false;
                        if (this.filtrateFlowId !== this.nodeFlowId) {
                            window.location.reload();
                        } else {
                            var nodeTable = document.getElementById('nodeTable');
                            var currentRow = nodeTable.getElementsByClassName('el-table__body')[0].getElementsByClassName("current-row")[0];
                            currentRow.getElementsByClassName("parameterButton")[0].innerHTML = this.nodeDataDefault.parameter;
                            this.dialogDrawer = false;
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: '很遗憾，保存失败，快查查原因吧',
                            type: 'error'
                        });
                    }
                }
            );
        },
        saveNodeEdit(index, row, event) {
            var nodeTable = document.getElementById('nodeTable');
            var currentRow = nodeTable.getElementsByClassName('el-table__body')[0].getElementsByClassName("el-table__row")[index];
            console.log("this.currentRow", this.currentRow);
            console.log("saveNodeEdit-row", row);
            console.log("saveNodeEdit-index", index);
            console.log("saveNodeEdit-currentRow", currentRow);
            for (i = 0; i < this.nodeData.length; i++) {
                if (row.pk === this.nodeData[i].pk) {
                    this.nodeData[i].parameter = row.parameter;
                }
            }
            console.log("this.nodeData--->" + i, this.nodeData);
            for (var i = 0; i < currentRow.children.length - 5; i++) {
                var cell = currentRow.children[i].getElementsByClassName('cell')[0];
                var elInput = cell.children[0];
                var elSpan = cell.children[1];
                elInput.style.display = 'none';
                elSpan.style.display = 'block';
                cell.style.color = 'black';
            }
            this.loading = true;
            var dataPost = {
                "order_id": row.order_id,
                "flow_id": this.filtrateFlowId,
                "node_name": row.node_name,
                "method": row.method,
                "path": row.path.trim(),
                "parameter": row.parameter,
                "run_env": row.run_env,
                "pre_keys": row.pre_keys,
                "sleep_time": row.sleep_time,
                "state": row.state,
                "expect_response": row.expect_response,
                "isexcute_pre_sql": row.isexcute_pre_sql,
                "pre_sql_str": row.pre_sql_str,
                "pre_sql_para": row.pre_sql_para,
                "pre_sql_out": row.pre_sql_out,
                "ischechdb": row.ischechdb,
                "sql_str": row.sql_str,
                "sql_para": row.sql_para,
                "expect_db": row.expect_db,
                'post_keys': row.post_keys,
                'post_keys_extractor': row.post_keys_extractor,
                'post_keys_default': row.post_keys_default,
                "pk": row.pk
            };
            console.log("dataPost--->", dataPost);
            this.$http.post(this.url + '/editNode', dataPost).then(
                function(data) {
                    var responData = data.status;
                    if (responData === 200 || responData === '200') {
                        this.$message({
                            showClose: true,
                            message: '恭喜你，保存成功',
                            type: 'success'
                        });
                        currentRow.getElementsByClassName("parameterButton")[0].innerHTML = row.parameter;
                        currentRow.getElementsByClassName('saveNode')[0].style.display = 'none';
                        currentRow.getElementsByClassName('editNode')[0].style.display = 'block';
                    } else {
                        this.$message({
                            showClose: true,
                            message: '很遗憾，保存失败，快查查原因吧',
                            type: 'error'
                        });
                    }
                }
            );
            this.currentRow = currentRow;
        },
        addNodeOk(nodeDataDefaultAdd) {
            this.loading = true;
            if (nodeDataDefaultAdd[0].order_id === '') {
                this.$message({
                    showClose: true,
                    message: '执行顺序不能为空，请填写',
                    type: 'error'
                });
            } else {
                var dataPost = {
                    "order_id": nodeDataDefaultAdd[0].order_id,
                    "flow_id": this.filtrateFlowId,
                    "node_name": nodeDataDefaultAdd[0].node_name,
                    "method": nodeDataDefaultAdd[0].method,
                    "path": nodeDataDefaultAdd[0].path.trim(),
                    "parameter": nodeDataDefaultAdd[0].parameter,
                    "run_env": nodeDataDefaultAdd[0].run_env,
                    "pre_keys": nodeDataDefaultAdd[0].pre_keys,
                    "sleep_time": nodeDataDefaultAdd[0].sleep_time,
                    "state": nodeDataDefaultAdd[0].state,
                    "expect_response": nodeDataDefaultAdd[0].expect_response,
                    "isexcute_pre_sql": nodeDataDefaultAdd[0].isexcute_pre_sql,
                    "pre_sql_out": nodeDataDefaultAdd[0].pre_sql_out,
                    "pre_sql_para": nodeDataDefaultAdd[0].pre_sql_para,
                    "pre_sql_str": nodeDataDefaultAdd[0].pre_sql_str,
                    "expect_db": nodeDataDefaultAdd[0].expect_db,
                    "ischechdb": nodeDataDefaultAdd[0].ischechdb,
                    "sql_para": nodeDataDefaultAdd[0].sql_para,
                    "sql_str": nodeDataDefaultAdd[0].sql_str,
                    'post_keys': nodeDataDefaultAdd[0].post_keys,
                    'post_keys_extractor': nodeDataDefaultAdd[0].post_keys_extractor,
                    'post_keys_default': nodeDataDefaultAdd[0].post_keys_default,
                };
                this.$http.post(this.url + '/addNode', dataPost).then(
                    function(data) {
                        console.log(dataPost);
                        var responData = data.status;
                        var node_id = data.body[0].node_id;
                        if (responData === 200 || responData === '200') {
                            this.$message({
                                showClose: true,
                                message: '恭喜你，添加成功',
                                type: 'success'
                            });
                            if (this.filtrateFlowId !== this.nodeFlowId) {
                                window.location.reload();
                            } else {
                                this.nodeData.push({
                                    "order_id": nodeDataDefaultAdd[0].order_id,
                                    "flow_id": this.filtrateFlowId,
                                    "node_name": nodeDataDefaultAdd[0].node_name,
                                    "method": nodeDataDefaultAdd[0].method,
                                    "path": nodeDataDefaultAdd[0].path.trim(),
                                    "parameter": nodeDataDefaultAdd[0].parameter,
                                    "run_env": nodeDataDefaultAdd[0].run_env,
                                    "pre_keys": nodeDataDefaultAdd[0].pre_keys,
                                    "sleep_time": nodeDataDefaultAdd[0].sleep_time,
                                    "state": nodeDataDefaultAdd[0].state,
                                    "expect_response": nodeDataDefaultAdd[0].expect_response,
                                    "isexcute_pre_sql": nodeDataDefaultAdd[0].isexcute_pre_sql,
                                    "pre_sql_out": nodeDataDefaultAdd[0].pre_sql_out,
                                    "pre_sql_para": nodeDataDefaultAdd[0].pre_sql_para,
                                    "pre_sql_str": nodeDataDefaultAdd[0].pre_sql_str,
                                    "expect_db": nodeDataDefaultAdd[0].expect_db,
                                    "ischechdb": nodeDataDefaultAdd[0].ischechdb,
                                    "sql_para": nodeDataDefaultAdd[0].sql_para,
                                    "sql_str": nodeDataDefaultAdd[0].sql_str,
                                    'post_keys': nodeDataDefaultAdd[0].post_keys,
                                    'post_keys_extractor': nodeDataDefaultAdd[0].post_keys_extractor,
                                    'post_keys_default': nodeDataDefaultAdd[0].post_keys_default,
                                    "pk": node_id
                                });
                            }
                        } else {
                            this.$message({
                                showClose: true,
                                message: '很遗憾，添加失败了，快查查原因吧',
                                type: 'error'
                            });
                        }
                    }
                );
            }
        },
        copyNodeOk(nodeDataDefault) {
            this.loading = true;
            if (nodeDataDefault[0].order_id === '') {
                this.$message({
                    showClose: true,
                    message: '执行顺序不能为空，请填写',
                    type: 'error'
                });
            } else {
                var dataPost = {
                    "order_id": nodeDataDefault[0].order_id,
                    "flow_id": this.filtrateFlowId,
                    "node_name": nodeDataDefault[0].node_name,
                    "method": nodeDataDefault[0].method,
                    "path": nodeDataDefault[0].path.trim(),
                    "parameter": nodeDataDefault[0].parameter,
                    "run_env": nodeDataDefault[0].run_env,
                    "pre_keys": nodeDataDefault[0].pre_keys,
                    "sleep_time": nodeDataDefault[0].sleep_time,
                    "state": nodeDataDefault[0].state,
                    "expect_response": nodeDataDefault[0].expect_response,
                    "isexcute_pre_sql": nodeDataDefault[0].isexcute_pre_sql,
                    "pre_sql_out": nodeDataDefault[0].pre_sql_out,
                    "pre_sql_para": nodeDataDefault[0].pre_sql_para,
                    "pre_sql_str": nodeDataDefault[0].pre_sql_str,
                    "expect_db": nodeDataDefault[0].expect_db,
                    "ischechdb": nodeDataDefault[0].ischechdb,
                    "sql_para": nodeDataDefault[0].sql_para,
                    "sql_str": nodeDataDefault[0].sql_str,
                    'post_keys': nodeDataDefault[0].post_keys,
                    'post_keys_extractor': nodeDataDefault[0].post_keys_extractor,
                    'post_keys_default': nodeDataDefault[0].post_keys_default,
                };
                this.$http.post(this.url + '/addNode', dataPost).then(
                    function(data) {
                        console.log(dataPost);
                        var responData = data.status;
                        var node_id = data.body[0].node_id;
                        if (responData === 200 || responData === '200') {
                            this.$message({
                                showClose: true,
                                message: '恭喜你，复制成功',
                                type: 'success'
                            });
                            if (this.filtrateFlowId !== this.nodeFlowId) {
                                window.location.reload();
                            } else {
                                this.$http.post(this.url + '/getNodeData', dataPost).then(
                                    function(data) {
                                        this.nodeData = data.body;
                                    }
                                );
                            }
                            this.nodeDataDefault = [{
                                "pk": "",
                                "order_id": "",
                                "node_name": "",
                                "method": "POST",
                                "path": "",
                                "parameter": "",
                                "run_env": "",
                                "expect_response": "",
                                "sleep_time": 0,
                                "state": "1",
                                "isexcute_pre_sql": "0",
                                "pre_keys": "",
                                "pre_sql_str": "",
                                "pre_sql_para": "",
                                "pre_sql_out": "",
                                "ischechdb": "0",
                                "sql_str": "",
                                "sql_para": "",
                                "expect_db": "",
                                "post_keys": "",
                                "post_keys_extractor": "",
                                "post_keys_default": "",
                            }]
                        } else {
                            this.$message({
                                showClose: true,
                                message: '很遗憾，添加失败了，快查查原因吧',
                                type: 'error'
                            });
                        }
                    }
                );
            }
        },
        formatJson(parameterData) {
            text = parameterData.value;
            if (text.indexOf("$") !== -1) {
                this.parameterData.value = JSON.stringify(JSON.parse(text.replace(/\:\$/g, "\:\"\$").replace(/\$\,/g, "\$\"\,").replace(/\$\}/g, "\$\"\}").replace(/\[\$/g, "\[\"\$").replace(/\$\]/g, "\$\"\]")), null, 2);
            } else {
                this.parameterData.value = JSON.stringify(JSON.parse(text), null, 2);
            }
        },
        pCancel(row) {
            document.body.click();
            this.dialogParameter = false;
            this.dialogPreSql = false;
            this.dialogPostKey = false;
            this.dialogOutSql = false;
            this.dialogManualStatistics = false;
            this.dialogUnDoStatistics = false;
        },
        addNodeCancel() {
            document.body.click();
        },
        deleteNodeRow(index, rows, row) {
            this.deleteNodeId = row.pk;
            console.log(this.deleteNodeId);
            rows.splice(index, 1);
            this.deleteNodeDialogVisible = true;
        },
        deleteNodeOk() {
            this.loading = true;
            var dataPost = {
                "node_id": this.deleteNodeId,
            };
            this.$http.post(this.url + '/deleteNode', dataPost).then(
                function(data) {
                    var responData = data.status;
                    if (responData === 200 || responData === '200') {
                        this.$message({
                            showClose: true,
                            message: '恭喜你，删除成功',
                            type: 'success'
                        });
                        this.deleteNodeDialogVisible = false
                    } else {
                        this.$message({
                            showClose: true,
                            message: '很遗憾，删除失败，快查查原因吧',
                            type: 'error'
                        });
                    }
                }
            );
        },
        handleCheckAllChange(val) {
            console.log("handleCheckAllChange-val",val);
            console.log("handleCheckAllChange-this.nodeDisplayList",this.nodeDisplayList);

            this.isIndeterminate = false;
        },
        handleCheckedHeaderChange(value) {
            console.log("handleCheckedHeaderChange-val",value);
            console.log("handleCheckedHeaderChange-this.nodeDisplayList",this.nodeDisplayList);
            let checkedCount = value.length;
            this.isIndeterminate = checkedCount > 0
        },


        //定时任务
        startTask() {
            this.$http.get(this.url + '/startTask').then(
                function(data) {
                    this.$message({
                        showClose: true,
                        message: 'Beat服务启动成功',
                        type: 'success'
                    });
                }
            );
            this.$http.get(this.url + '/startWork').then(
                function(data) {
                    this.$message({
                        showClose: true,
                        message: 'Work服务启动成功',
                        type: 'success'
                    });
                }
            );
        },
        startWork() {
            this.$http.get(this.url + '/startWork').then(
                function(data) {
                    this.$message({
                        showClose: true,
                        message: '恭喜你，Work服务启动成功',
                        type: 'success'
                    });
                }
            );
        },

        //接口配置
        getDefaultVar() {
            this.$http.get(this.url + '/getDefaultVar').then(
                function(data) {
                    this.varListData = data.body[0].varList;
                }
            );
        },
        emailChange() {
            var dataPost = {
                "email": this.recipients
            };
            this.$http.post(this.url + '/emailChange', dataPost).then(
                function(data) {
                    var responData = data.status;
                    if (responData === 200 || responData === '200') {
                        this.$message({
                            showClose: true,
                            message: '恭喜你，邮箱修改成功',
                            type: 'success'
                        });
                        this.dialogEmailChange = false;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '很遗憾，邮箱修改失败',
                            type: 'error'
                        });
                        this.dialogEmailChange = false;
                    }
                }
            );
        },

    }
});