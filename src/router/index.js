import React, {Component, Fragment} from "react";
import { asyncComponent } from '../utils';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Loading from '../common/layout/loading';

// 获取到异步组件
const MainFrame = asyncComponent(() => import('../pages/main'));
const LoginPage = asyncComponent(() => import('../pages/login'));

// 定义路由配置组建
// 根据状态管理配置不同的路由
class RouterPage extends Component {
    render() {
        const {loginStatus} = this.props;
        if (loginStatus) {
            // 已登录状态下，进入首页面
            return (
                <Fragment>
                    <Switch>
                        <Route path="/" component={MainFrame}/>
                        <Route path="/LoginPage" render={(props) => <Redirect to='/'/>}/>
                        <Route path="*" render={(props) => <Redirect to='/'/>}/>
                    </Switch>
                    <Loading/>
                </Fragment>
            )
        } else {
            // 未登录状态下进入登录界面
            return (
                <React.Fragment>
                    <Switch>
                        <Route path="/LoginPage" component={LoginPage}/>
                        <Route path="*" render={(props) => <Redirect to='/LoginPage'/>}/>
                    </Switch>
                    <Loading/>
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        loginStatus: state.loginReducer.loginStatus
    }
}

// 组建连接状态管理，并更新路由配置
export default withRouter(connect(mapStateToProps, null)(RouterPage));