import React from 'react';
import { Icon } from 'antd';

const config =  [
    {
        name: 'Dashboard',
        icon: <i className="iconfont icon-shujumofang" style={{marginRight: 8}}></i>,
        subMenus:[{
            name: '分析页',
            url: '/mainframe/dashboard/analysis'
        },{
            name: '关系页',
            url: '/mainframe/dashboard/relation'
        }]
    },
    {
        name: '地图',
        icon: <i className="iconfont icon-guiji" style={{marginRight: 8}}></i>,
        subMenus:[{
            name: '百度地图',
            url:'/mainframe/map/baidumaps'
        },{
            name: 'bmap',
            url:'/mainframe/map/bmap'
        }]
    },
    {
        name: '其他组件',
        icon: <Icon type="radar-chart" theme="outlined" />,
        subMenus:[{
            name: '弹框',
            url:'/mainframe/others/modal'
        },{
            name: '空数据处理',
            url:'/mainframe/others/nodata'
        },
        {
            name: 'Table转Excel',
            url:'/mainframe/others/tabletoexcel'
        },
        {
            name: 'MainCard',
            url:'/mainframe/others/MainCard'
        },        
        {
            name: '富文本编辑器',
            url:'/mainframe/others/editor'
        }]
    },
    // {
    //     name: '异常页',
    //     icon: <Icon type="exclamation-circle" theme="outlined" />,
    //     subMenus:[{
    //         name: '403',
    //         url:'/mainframe/error/403'
    //     },{
    //         name: '404',
    //         url:'/mainframe/error/404'
    //     },{
    //         name: '500',
    //         url:'/mainframe/error/500'
    //     }]
    // },
    // {
    //     name: '综合预警',
    //     icon: <i className="iconfont icon-yujing" style={{marginRight: 8}}></i>,
    //     url:'/mainframe/comprehensivewarning'
    // },
    // {
    //     name: '系统设置',
    //     icon: <i className="iconfont icon-icon--" style={{marginRight: 8}}></i>,
    //     subMenus:[{
    //         name: '预警设置',
    //         url:'/mainframe/systemsetup/earlywarningsetting'
    //     },{
    //         name: '行为轨迹设置',
    //         url:'/mainframe/systemsetup/behaviortrajectory'
    //     }]
    // },
    // {
    //     name: '权限管理',
    //     icon: <i className="iconfont icon-quanxianguanli" style={{marginRight: 8}}></i>,
    //     subMenus:[
    //     	{
	//             name: '账户管理',
	//             url:'/mainframe/accessmanage/account'
	//         },
	//         {
	//             name: '菜单管理',
	//             url:'/mainframe/accessmanage/menu'
	//         },
	//         {
	//             name: '权限配置',
	//             url:'/mainframe/accessmanage/authority'
	//         }
    //     ]
    // },
]

export default config;