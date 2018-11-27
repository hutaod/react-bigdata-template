import React from 'react';
import { withRouter} from "react-router-dom";
import { Menu } from 'antd';
import './leftcomponent.css'
import routerConfig from '../navConfig'

const SubMenu = Menu.SubMenu;

class LeftComponent extends React.Component{
	
    state = {
        current:'',// 当前路由
        openKeys:[],//展开的父节点
        rootSubmenuKeys:[],//所有父节点
        menus:[],
    }
    
    componentWillMount(){
        // 设置左侧菜单
        this.setMenu(routerConfig);
    }
    
    // 设置菜单方法
    setMenu = (menus) => {
    	
        let current = this.props.location.pathname, // 当前路由
            openKeys = [], //展开的父节点
            rootSubmenuKeys = []; //所有父节点
        
        // 遍历获取需要展开的父节点以及所有父节点
        menus.forEach(item=>{
            if(item.subMenus){
                item.subMenus.forEach(ele=>{
                    if(ele.path === current || item.path === current){
                        openKeys = [item.name];
                    }
                })
            } else {
                if(item.path === current){
                    openKeys = [item.name];
                }
            }
    		rootSubmenuKeys.push(item.name)
        })

        this.setState({
            current,
            openKeys,
            rootSubmenuKeys
        })
    }
    
    // 菜单选择事件
    selectClick = ({ key })=> {
        this.setState({
            current: key
        });
        this.props.history.push(key);
    }
    
    // 展开父节点变化事件
    onOpenChange = (openKeys)=> {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
		if(this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			this.setState({
				openKeys
			});
		} else {
			this.setState({
				openKeys: latestOpenKey ? [latestOpenKey] : [],
			});
		}
    }
    
    render () {
        let MenuTree = routerConfig.filter(item=>!item.hide);
        return (
            <div className='leftcomponent'>
                <div className="scrollconstainer">
                    <Menu
                        onClick={this.selectClick}
                        onOpenChange={this.onOpenChange}
                        selectedKeys={this.state.current ? [this.state.current] : null}
                        openKeys={this.state.openKeys}
                        mode="inline"
                        theme="dark">
                        {MenuTree.map(item=>{
                            if(item.subMenus && item.subMenus.length>0){
                                return (
                                <SubMenu key={item.name} title={<span>{item.icon}<span>{item.name}</span></span>}>
                                    {item.subMenus.map(child=>{
                                        if(!child.hide){
                                            return (<Menu.Item key={child.path}>
                                                {child.name}
                                            </Menu.Item>)
                                        } else {
                                            return null;
                                        }
                                    })}
                                </SubMenu>)
                            } else {
                                return (<Menu.Item key={item.path}>
                                    <span>{item.icon}</span>{item.name}
                                </Menu.Item>)
                            }
                        })}
                    </Menu>
                </div>
            </div>
        )
    }
}

export default withRouter(LeftComponent)