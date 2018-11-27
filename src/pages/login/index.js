import React from 'react';
import { connect} from 'react-redux';
import { loginAction } from './../../redux/actions/loginAction';
// import { postAction } from './../../axios';
import { setLocal } from './../../utils';
import { Input, Icon, Button, message, Form } from 'antd';
import BgImg from './bg.jpg';
import Logo from './logo.png';

const FormItem = Form.Item;

const divstyle={
	width: "100vw", 
	height:"100vh", 
	overflow: "hidden",
	position: "relative"
};

const bgimg = {
	position: "absolute",
	top:"0px",
	left:"0px",
	width: "100%",
	height:"100%",
	zIndex: "0",
}

const content = {
	position: "absolute",
	top:"50%",
	left:"50%",
	width: "348px",
	height: "418px",
	background: "white",
	borderRadius: "5px",
	padding:"35px",
	zIndex: "1",
	marginTop: "-209px",
	marginLeft:"-174px"
}



class LoginPage extends React.Component{
	
	// 账户名称
	userEmpty = () => {
	    this.userNameInput.focus();
	    this.props.form.setFieldsValue({username: undefined});
	}
	
	// 账户密码
	passwordEmpty = () => {
	    this.userCodeInput.focus();
	    this.props.form.setFieldsValue({password: undefined});
	}

	handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { username, password } = values;
				this.props.handleLogin({username, password});
            }
        });
    }
    render () {
		const { getFieldDecorator } = this.props.form;
		let username = this.props.form.getFieldValue('username');
		let password = this.props.form.getFieldValue('password');
    	const suffixUserName = username ? <Icon type="close-circle" onClick={this.userEmpty} style={{ color: 'rgba(0,0,0,.25)' }} /> : null;
    	const suffixUserCode = password ? <Icon type="close-circle" onClick={this.passwordEmpty} style={{ color: 'rgba(0,0,0,.25)' }} /> : null;
        return (
            <div style={divstyle}>
               	<img src={BgImg} alt="" style={bgimg} />
               	<div style={content}>
               		<div style={{textAlign:'center',paddingBottom:20}}>
					   	<img src={Logo} alt="" style={{marginTop: 10}} />
               			<h4 style={{fontSize: "18px", margin: "20px auto"}}>大数据应用平台</h4>
					</div>
               		<Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入账户名称!' }],
                            })(
                                <Input 
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
									suffix={suffixUserName}
									ref={node => this.userNameInput = node}
                                    placeholder="请输入账户名称"
                                    size="large" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入账户密码!' }],
                            })(
                                <Input 
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
									type="password" 
									suffix={suffixUserCode}
									ref={node => this.userCodeInput = node}
                                    placeholder="请输入账户密码"
                                    size="large" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" block htmlType="submit" size="large" style={{marginTop:20}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
               	</div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin (data) {
			// const curUrl = `/bigdata/user/login`;
			const res = {
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
							"iconSelectedUrl": "test",
							"iconUrl": "test",
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
									"url": "/mainframe/GroupPortrait"
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
									"url": "/mainframe/personalportrait"
								}
							],
							"tags": [],
							"url": ""
						},
						{
							"iconSelectedUrl": "n_ico3.png",
							"iconUrl": "n_ico3.png",
							"id": 2,
							"name": "轨迹分析",
							"parentId": -1,
							"seq": 14,
							"subMenus": [
								{
									"iconSelectedUrl": "",
									"iconUrl": "",
									"id": 4,
									"name": "个人轨迹",
									"parentId": 2,
									"seq": 58,
									"subMenus": [],
									"tags": [],
									"url": "/mainframe/personalpath"
								},
								{
									"iconSelectedUrl": "",
									"iconUrl": "",
									"id": 153,
									"name": "群体轨迹",
									"parentId": 2,
									"seq": 59,
									"subMenus": [],
									"tags": [],
									"url": "/mainframe/grouppath"
								}
							],
							"tags": [],
							"url": ""
						},
						{
							"iconSelectedUrl": "",
							"iconUrl": "",
							"id": 178,
							"name": "综合预警",
							"parentId": -1,
							"seq": 256,
							"subMenus": [],
							"tags": [],
							"url": "/mainframe/comprehensivewarning"
						},
						{
							"iconSelectedUrl": "",
							"iconUrl": "",
							"id": 179,
							"name": "系统设置",
							"parentId": -1,
							"seq": 257,
							"subMenus": [
								{
									"iconSelectedUrl": "",
									"iconUrl": "",
									"id": 180,
									"name": "预警设置",
									"parentId": 179,
									"seq": 387,
									"subMenus": [],
									"tags": [],
									"url": "/mainframe/systemsetup/earlywarningsetting"
								},
								{
									"iconSelectedUrl": "",
									"iconUrl": "",
									"id": 181,
									"name": "行为轨迹设置",
									"parentId": 179,
									"seq": 388,
									"subMenus": [],
									"tags": [],
									"url": "/mainframe/systemsetup/behaviortrajectory"
								}
							],
							"tags": [],
							"url": "/mainframe/systemsetup"
						},
						{
							"iconSelectedUrl": "xitongguanli2.png",
							"iconUrl": "xitongguanli.png",
							"id": 10,
							"name": "权限管理",
							"parentId": -1,
							"seq": 259,
							"subMenus": [
								{
									"iconSelectedUrl": "",
									"iconUrl": "",
									"id": 25,
									"name": "账户管理",
									"parentId": 10,
									"seq": 264,
									"subMenus": [],
									"tags": [],
									"url": "/mainframe/accessmanage/account"
								},
								{
									"iconSelectedUrl": "",
									"iconUrl": "",
									"id": 24,
									"name": "菜单管理",
									"parentId": 10,
									"seq": 265,
									"subMenus": [],
									"tags": [],
									"url": "/mainframe/accessmanage/menu"
								},
								{
									"iconSelectedUrl": "",
									"iconUrl": "",
									"id": 26,
									"name": "权限配置",
									"parentId": 10,
									"seq": 266,
									"subMenus": [],
									"tags": [],
									"url": "/mainframe/accessmanage/authority"
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
				"success": true
			}

			if (res.success) {
				setLocal("userInfo", JSON.stringify(res.obj));
				setLocal("loginStatus", true);
				const action  = loginAction(true);
				dispatch(action);
			} else {
				message.error(res.obj)
			}

            // postAction(
            // 	curUrl
            // ).then (function (res) {
                
            // })
        }
    }
}

export default connect(null, mapDispatchToProps)(Form.create()(LoginPage))

