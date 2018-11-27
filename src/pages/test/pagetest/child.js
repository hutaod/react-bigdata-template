import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb, Button } from 'antd';

class ModalCont extends Component {
    render() {
        return (
            <div>
                <Breadcrumb  className="breadcrumb">
                    <Breadcrumb.Item>测试</Breadcrumb.Item>
                    <Breadcrumb.Item>页面测试</Breadcrumb.Item>
                    <Breadcrumb.Item>子页面</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <Button onClick={()=>{
                        this.props.history.goBack();
                    }}>返回</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(ModalCont);