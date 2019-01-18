import React, { Component } from 'react';
import { Popover, Icon } from 'antd';
import './topcomponent.css';
// import logo from './logo.png';
import { getLocal } from '../../../utils';
import { NavLink,withRouter } from 'react-router-dom';
import ChangePassModal from "./ChangePassModal";

class TopComponent extends Component{
    state = {
        changePassShow: false,
    }
    changePass = () => {
        this.setState({
            changePassShow: true,
        });
    }
    handleOk = (values) => {
        console.log(values)
        this.setState({
            changePassShow: false,
        });
        // const userId = JSON.parse(localStorage.getItem('userInfo')).id + '';
        // const data = { userId, originalPassword: values.oldPass, currentPassword: values.newPass, isEncrypt: false }
        // postAction("/bigdata/system/user/update/password", data).then(
        //     (res) => {
        //         if (res.success) {
        //             message.success('密码修改成功！');
        //             this.setState({
        //                 changePassShow: false,
        //             });
        //         } else {
        //             message.warn(res.obj);
        //         }
        //     }
        // )
    }
    handleCancel = () => {
        this.setState({
            changePassShow: false,
        });
    }
    logout=()=>{
        localStorage.clear()
        this.props.history.replace('/LoginPage')
    }
    render () {
        const userName = JSON.parse(getLocal("userInfo")).name;
        const content = (<div>
            <p><span className='top-a-text' onClick={this.changePass}><Icon type="form" theme="outlined" style={{ marginRight: 5 }} />修改密码</span></p>
            <p style={{ marginBottom: 0 }}><span className='top-a-text' onClick={this.logout}><Icon type="poweroff" theme="outlined" style={{ marginRight: 5 }} />退出登录</span></p>
        </div>);
        return (
            <div className='topcomponent'>
                <NavLink to='/'>
                    {/* <img src={logo} className="logo" alt=""/> */}
                </NavLink>
                <p>大数据应用平台</p>
                <Popover content={content}>
                    <span className="username">
                        欢迎，{userName}
                        <Icon type="setting" theme="outlined" style={{marginLeft: '20px', fontSize:'18px'}} />
                    </span>
                </Popover>
                {
                    this.state.changePassShow ?(
                        <ChangePassModal
                            handleOk={this.handleOk}
                            handleCancel={this.handleCancel}
                        />
                    ):null
                }
            </div>
        )
    }
}


export default withRouter(TopComponent)