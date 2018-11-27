import React from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import './rightcomponent.css'
import { routerConfig } from '../../../config'


// 获取到异步组件
const routeLists = [];

// 递归把树转成一维数组
routerConfig.forEach((ele) => {
    if(ele.subMenus){
        ele.subMenus.forEach(item=>{
            routeLists.push(item);
        })
    } else {
        routeLists.push(ele);
    }
})

class RightComponent extends React.Component{
    render () {
        return (
            <div className='rightcomponent'>
                <div className='scrollcontainer'>
                    <Switch>
                        {routeLists.map(item=>(
                            <Route path={item.path} key={item.path} component={item.component}/>
                        ))}
                        <Route path="*" render={(props) => <Redirect to={routeLists[0].path}/>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(RightComponent)