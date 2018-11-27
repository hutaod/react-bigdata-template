import React from 'react';
import { withRouter} from "react-router-dom";
import { Menu } from 'antd';
import './leftcomponent.css'
import { routerConfig } from '../../../config'

const SubMenu = Menu.SubMenu;

class LeftComponent extends React.Component{
	
    state = {
        current:'',
        openKeys:[],
        menus:[]
    }
    
    componentWillMount(){
        this.setMenu(routerConfig);
    }
    
    setMenu = (menus) => {
    	
        let current = this.props.location.pathname;
        let openKeys = [];
        let rootSubmenuKeys = [];
        
        menus.forEach(item=>{
            if(item.subMenus){
                item.subMenus.forEach(ele=>{
                    if(ele.path === current){
                        openKeys = [item.name];
                    }
                })
            }
    		rootSubmenuKeys.push(item.name)
        })
        this.setState({
            current,
            openKeys,
            rootSubmenuKeys
        })
    }
    
    selectClick = ({ key })=> {
        this.setState({
            current: key
        });
        this.props.history.push(key);
    }
    
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