import Mock from 'mockjs';

//用户登录
Mock.mock('/bigdata/user/login?username=admin&password=!23qaz',{
    success: true,
    "msg": "登录成功",
    "obj": {
        "accountNonExpired": true,
        "accountNonLocked": true,
        "authorities": [],
        "credentialsNonExpired": true,
        "enabled": true,
        "id": 1,
        "menus": [
            {
                "iconSelectedUrl": "n_ico2.png",
                "iconUrl": "n_ico2.png",
                "id": 150,
                "name": "综合画像",
                "parentId": -1,
                "seq": 11,
                "subMenus": [
                    {
                        "iconSelectedUrl": "",
                        "iconUrl": "",
                        "id": 151,
                        "name": "群体画像",
                        "parentId": 150,
                        "seq": 12,
                        "subMenus": [],
                        "tags": [],
                        "url": "/bigdata/labelbehavior/group"
                    },
                    {
                        "iconSelectedUrl": "",
                        "iconUrl": "",
                        "id": 152,
                        "name": "个人画像",
                        "parentId": 150,
                        "seq": 13,
                        "subMenus": [],
                        "tags": [],
                        "url": "/bigdata/labelbehavior/personal"
                    }
                ],
                "tags": [],
                "url": ""
            },
            {
                "iconSelectedUrl": "n_ico3.png",
                "iconUrl": "n_ico3.png",
                "id": 2,
                "name": "行为轨迹",
                "parentId": -1,
                "seq": 14,
                "subMenus": [
                    {
                        "iconSelectedUrl": "",
                        "iconUrl": "",
                        "id": 3,
                        "name": "重点人群轨迹",
                        "parentId": 2,
                        "seq": 30,
                        "subMenus": [],
                        "tags": [
                            "老师",
                            "学生"
                        ],
                        "url": "/bigdata/behavior/focusgroups"
                    },
                    {
                        "iconSelectedUrl": "",
                        "iconUrl": "",
                        "id": 4,
                        "name": "上网轨迹",
                        "parentId": 2,
                        "seq": 58,
                        "subMenus": [],
                        "tags": [],
                        "url": "/bigdata/behavior/internet"
                    },
                    {
                        "iconSelectedUrl": "",
                        "iconUrl": "",
                        "id": 153,
                        "name": "校园热力分析",
                        "parentId": 2,
                        "seq": 59,
                        "subMenus": [],
                        "tags": [],
                        "url": "/bigdata/behavior/hotmap"
                    }
                ],
                "tags": [],
                "url": ""
            },
            {
                "iconSelectedUrl": "n_ico4.png",
                "iconUrl": "n_ico4.png",
                "id": 21,
                "name": "综合预警",
                "parentId": -1,
                "seq": 200,
                "subMenus": [
                    {
                        "iconSelectedUrl": "",
                        "iconUrl": "",
                        "id": 154,
                        "name": "学业预警",
                        "parentId": 21,
                        "seq": 201,
                        "subMenus": [],
                        "tags": [],
                        "url": "/bigdata/prewarn/schoolwork"
                    },
                    {
                        "iconSelectedUrl": "",
                        "iconUrl": "",
                        "id": 155,
                        "name": "消费预警",
                        "parentId": 21,
                        "seq": 202,
                        "subMenus": [],
                        "tags": [],
                        "url": "/bigdata/prewarn/consumption"
                    },
                    {
                        "iconSelectedUrl": "",
                        "iconUrl": "",
                        "id": 156,
                        "name": "网络预警",
                        "parentId": 21,
                        "seq": 204,
                        "subMenus": [],
                        "tags": [],
                        "url": "/bigdata/prewarn/network"
                    },
                    {
                        "iconSelectedUrl": "",
                        "iconUrl": "",
                        "id": 157,
                        "name": "失联预警",
                        "parentId": 21,
                        "seq": 205,
                        "subMenus": [],
                        "tags": [],
                        "url": "/bigdata/prewarn/loss"
                    },
                    {
                        "iconSelectedUrl": "",
                        "iconUrl": "",
                        "id": 158,
                        "name": "贫困",
                        "parentId": 21,
                        "seq": 206,
                        "subMenus": [],
                        "tags": [],
                        "url": "/bigdata/prewarn/poverty"
                    },
                    {
                        "iconSelectedUrl": "",
                        "iconUrl": "",
                        "id": 159,
                        "name": "预警管理",
                        "parentId": 21,
                        "seq": 207,
                        "subMenus": [],
                        "tags": [],
                        "url": "/bigdata/prewarn/manager"
                    }
                ],
                "tags": [],
                "url": ""
            },
            {
                "iconSelectedUrl": "",
                "iconUrl": "zhinengbi.png",
                "id": 5,
                "name": "智能BI",
                "parentId": -1,
                "seq": 244,
                "subMenus": [
                    {
                        "iconSelectedUrl": "shujuyuan2.png",
                        "iconUrl": "shujuyuan.png",
                        "id": 6,
                        "name": "数据源管理",
                        "parentId": 5,
                        "seq": 249,
                        "subMenus": [],
                        "tags": [],
                        "url": "/bi/datasource/config"
                    },
                    {
                        "iconSelectedUrl": "shujuji2.png",
                        "iconUrl": "shujuji.png",
                        "id": 7,
                        "name": "数据集管理",
                        "parentId": 5,
                        "seq": 251,
                        "subMenus": [],
                        "tags": [],
                        "url": "/bi/dataset/config"
                    },
                    {
                        "iconSelectedUrl": "tubiaosheji2.png",
                        "iconUrl": "tubiaosheji.png",
                        "id": 8,
                        "name": "图表设计",
                        "parentId": 5,
                        "seq": 252,
                        "subMenus": [],
                        "tags": [],
                        "url": "/bi/widget/config"
                    },
                    {
                        "iconSelectedUrl": "kanbansheji2.png",
                        "iconUrl": "kanbansheji.png",
                        "id": 9,
                        "name": "看板设计",
                        "parentId": 5,
                        "seq": 253,
                        "subMenus": [],
                        "tags": [],
                        "url": "/bi/board/config"
                    }
                ],
                "tags": [],
                "url": ""
            },
            {
                "iconSelectedUrl": "xitongguanli2.png",
                "iconUrl": "xitongguanli.png",
                "id": 10,
                "name": "系统管理",
                "parentId": -1,
                "seq": 257,
                "subMenus": [
                    {
                        "iconSelectedUrl": "",
                        "iconUrl": "",
                        "id": 25,
                        "name": "账户管理",
                        "parentId": 10,
                        "seq": 262,
                        "subMenus": [],
                        "tags": [],
                        "url": "/sys/user/manage"
                    },
                    {
                        "iconSelectedUrl": "",
                        "iconUrl": "",
                        "id": 24,
                        "name": "菜单管理",
                        "parentId": 10,
                        "seq": 263,
                        "subMenus": [],
                        "tags": [],
                        "url": "/sys/menu/manage"
                    },
                    {
                        "iconSelectedUrl": "",
                        "iconUrl": "",
                        "id": 26,
                        "name": "权限配置",
                        "parentId": 10,
                        "seq": 264,
                        "subMenus": [],
                        "tags": [],
                        "url": "/sys/permission/manage"
                    }
                ],
                "tags": [],
                "url": ""
            }
        ],
        "name": "Administrator",
        "sex": 1,
        "userId": "",
        "username": "admin"
    },
})
//当前预警配置列表
Mock.mock('/bigdata/alarmStrategy/pageAlarmStrategy',{
    "success": true,
    "msg": "成功",
    "obj": {
        "pageNum": 1,
        "pageSize": 10,
        "size": 4,
        "startRow": 1,
        "endRow": 4,
        "total": 4,
        "pages": 1,
        "list": [
            {
                "id": "1",
                "strategyName": "测2试",
                "strategyTarget": "40040,40210",
                "startDate": "2018-08-08",
                "endDate": "2018-08-08",
                "removeFlag": 0,
                "status": "失效",
                "strategyTargetCollege": "电力工程学院、康尼学院"
            },
            {
                "id": "26d3e3123ac3456fa051f5fe606341ce",
                "strategyName": "测试哈哈哈1111111",
                "strategyTarget": "10002,10003",
                "startDate": "2018-02-02",
                "endDate": "2018-03-03",
                "removeFlag": 0,
                "status": "失效",
                "strategyTargetCollege": ""
            },
            {
                "id": "4460877565db4bda93f0b43ed0a73950",
                "strategyName": "测1试",
                "strategyTarget": "40040,40210",
                "startDate": "2016-06-06",
                "endDate": "2017-07-07",
                "removeFlag": 0,
                "status": "失效",
                "strategyTargetCollege": "电力工程学院、康尼学院"
            },
            {
                "id": "a3b8d33bd6734887b6dbceada0abd808",
                "strategyName": "测试",
                "strategyTarget": "10002,10003",
                "startDate": "2018-02-02",
                "endDate": "2018-03-03",
                "removeFlag": 0,
                "status": "失效",
                "strategyTargetCollege": ""
            }
        ],
        "prePage": 0,
        "nextPage": 0,
        "isFirstPage": true,
        "isLastPage": true,
        "hasPreviousPage": false,
        "hasNextPage": false,
        "navigatePages": 8,
        "navigatepageNums": [
            1
        ],
        "navigateFirstPage": 1,
        "navigateLastPage": 1,
        "lastPage": 1,
        "firstPage": 1
    },
    "errorCode": null
})

//根据预警配置id获取详细预警配置策略信息
Mock.mock('/bigdata/alarmStrategy/findById',{
    "success": true,
    "msg": "成功",
    "obj": {
        "id": "26d3e3123ac3456fa051f5fe606341ce",
        "strategyName": "测试哈哈哈1111111",
        "strategyTarget": "40210,40141",
        "startDate": "2018-02-02",
        "endDate": "2018-03-03",
        "removeFlag": 1,
        "status": "失效",
        "schoolCollege": [
            {
                "collegeName": "电力工程学院",
                "collegeCode": "40040",
                "selectFlag": false
            },
            {
                "collegeName": "康尼学院",
                "collegeCode": "40210",
                "selectFlag": false
            },
            {
                "collegeName": "机械工程学院",
                "collegeCode": "40010",
                "selectFlag": false
            },
            {
                "collegeName": "计算机工程学院",
                "collegeCode": "40070",
                "selectFlag": false
            },
            {
                "collegeName": "自动化学院",
                "collegeCode": "40050",
                "selectFlag": false
            },
            {
                "collegeName": "外国语学院",
                "collegeCode": "40141",
                "selectFlag": false
            },
            {
                "collegeName": "材料工程学院",
                "collegeCode": "40020",
                "selectFlag": false
            },
            {
                "collegeName": "能源与动力工程学院",
                "collegeCode": "40030",
                "selectFlag": false
            },
            {
                "collegeName": "通信工程学院",
                "collegeCode": "40060",
                "selectFlag": false
            },
            {
                "collegeName": "经济与管理学院",
                "collegeCode": "40081",
                "selectFlag": false
            },
            {
                "collegeName": "人文与社会科学学院",
                "collegeCode": "40131",
                "selectFlag": false
            },
            {
                "collegeName": "艺术与设计学院",
                "collegeCode": "40100",
                "selectFlag": false
            },
            {
                "collegeName": "建筑工程学院",
                "collegeCode": "40090",
                "selectFlag": false
            },
            {
                "collegeName": "汽车与轨道交通学院",
                "collegeCode": "40111",
                "selectFlag": false
            },
            {
                "collegeName": "环境工程学院",
                "collegeCode": "40121",
                "selectFlag": false
            },
            {
                "collegeName": "工业中心",
                "collegeCode": "40171",
                "selectFlag": false
            },
            {
                "collegeName": "国际合作与交流处",
                "collegeCode": "10110",
                "selectFlag": false
            },
            {
                "collegeName": "机械工程学院(联合培养)",
                "collegeCode": "L40010",
                "selectFlag": false
            },
            {
                "collegeName": "自动化学院(电气工程学院)",
                "collegeCode": "L40050",
                "selectFlag": false
            },
            {
                "collegeName": "建筑工程学院(路桥与港航工程学联合培养)",
                "collegeCode": "L40090",
                "selectFlag": false
            }
        ],
        "alarmStrategyType": [],
        "alarmPush": []
    },
    "errorCode": null
})

//获取所有学院列表
Mock.mock('/bigdata/school/listCollege',{
    "success": true,
    "msg": "成功",
    "obj": [
        {
            "id": null,
            "collegeName": "电力工程学院",
            "collegeCode": "40040",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "康尼学院",
            "collegeCode": "40210",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "机械工程学院",
            "collegeCode": "40010",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "计算机工程学院",
            "collegeCode": "40070",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "自动化学院",
            "collegeCode": "40050",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "外国语学院",
            "collegeCode": "40141",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "材料工程学院",
            "collegeCode": "40020",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "能源与动力工程学院",
            "collegeCode": "40030",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "通信工程学院",
            "collegeCode": "40060",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "经济与管理学院",
            "collegeCode": "40081",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "人文与社会科学学院",
            "collegeCode": "40131",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "艺术与设计学院",
            "collegeCode": "40100",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "建筑工程学院",
            "collegeCode": "40090",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "汽车与轨道交通学院",
            "collegeCode": "40111",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "环境工程学院",
            "collegeCode": "40121",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "工业中心",
            "collegeCode": "40171",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "国际合作与交流处",
            "collegeCode": "10110",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "机械工程学院(联合培养)",
            "collegeCode": "L40010",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "自动化学院(电气工程学院)",
            "collegeCode": "L40050",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        },
        {
            "id": null,
            "collegeName": "建筑工程学院(路桥与港航工程学联合培养)",
            "collegeCode": "L40090",
            "collegePriority": null,
            "majorName": null,
            "majorCode": null,
            "majorPriority": null,
            "grade": null,
            "classCode": null,
            "className": null,
            "classPriority": null
        }
    ],
    "errorCode": null
})