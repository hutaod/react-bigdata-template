import React from 'react';
import { asyncComponent } from '../utils';
import { Icon } from 'antd';

/**
 * name  导航名
 * path  导航路径
 * icon  导航图标
 * hide 是否在左侧导航隐藏，默认false，即默认隐藏
 * subMenus  子菜单
 */

// 导航路由配置
const routerConfig = [
    {
        name: "dashboard",
        path: "/dashboard",
        icon: <i className="iconfont icon-shujumofang" style={{marginRight: 8}}></i>,
        subMenus: [
            { name: "分析页", path: "/dashboard/analysis"},
            { name: "关系页", path: "/dashboard/relation" },
        ]
    },
    {
        name: '地图',
        path: "/map",
        icon: <i className="iconfont icon-guiji" style={{marginRight: 8}}></i>,
        subMenus:[
            { name: '百度地图', path:'/map/baiduMaps' },
            { name: 'bmap', path:'/map/bMap' }
        ]
    },
    {
        name: '其他组件',
        path: "/others",
        icon: <Icon type="radar-chart" theme="outlined" />,
        subMenus:[
            { name: '弹框', path:'/others/modal' },
            { name: '空数据处理', path:'/others/noData' },
            { name: 'Table转Excel', path:'/others/tableToExcel' },
            { name: 'MainCard', path:'/others/mainCard' },        
            { name: '富文本编辑器', path:'/others/editor',hide:false }
        ]
    }
]

//动态获取路由component
routerConfig.forEach(item=>{
    if(item.subMenus){
        item.subMenus.forEach(ele=>{
            ele.component = asyncComponent(() => import('../pages'+ele.path));
        })
    } else {
        item.component = asyncComponent(() => import('../pages'+item.path));
    }
})

export default routerConfig;