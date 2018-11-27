import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';

class ModalCont extends Component {
    render() {
        return (
            <div>
                <Breadcrumb  className="breadcrumb">
                    <Breadcrumb.Item>测试</Breadcrumb.Item>
                    <Breadcrumb.Item>页面测试</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <Link to="/test/pagetest/child">跳转到下砖子页面</Link>
                </div>
            </div>
        )
    }
}

export default withRouter(ModalCont);