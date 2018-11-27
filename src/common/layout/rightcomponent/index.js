import React from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import './rightcomponent.css'
import routerConfig from '../navConfig'


// 获取到异步组件
const routeLists = [];

// 递归获取路由配置
var loopAction = (configs) => {
    configs.forEach(item=>{
        if(item.subMenus){
            loopAction(item.subMenus);
        } else {
            routeLists.push(item);
        }
    })
}

//递归把树转成一维数组
loopAction(routerConfig);

class RightComponent extends React.Component{
    render () {
        return (
            <div className='rightcomponent'>
                <div className='scrollcontainer'>
                    <Switch>
                        {routeLists.map(item=>(
                            <Route path={item.path} key={item.path} exact={item.exact} component={item.component}/>
                        ))}
                        <Route path="*" render={(props) => <Redirect to={routeLists[0].path}/>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(RightComponent)