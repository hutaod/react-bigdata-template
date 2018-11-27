import React, { Component } from 'react';
import { Breadcrumb, Card, Button, Alert } from 'antd';
import MainModal from '../../../common/components/MainModal';

class ModalCont extends Component {
    state = {
        visibleModel: false,
        noFooterModel: false,
    }
    showModel = () => {
        this.setState({visibleModel:true})
    }
    hideModel = () => {
        this.setState({visibleModel:false})
    }
    showNoFooterModel = () => {
        this.setState({noFooterModel:true})
    }
    hideNoFooterModel = () => {
        this.setState({noFooterModel:false})
    }
    render() {
        return (
            <div>
                <Breadcrumb  className="breadcrumb">
                    <Breadcrumb.Item>其他组件</Breadcrumb.Item>
                    <Breadcrumb.Item>弹框</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <Card title="弹出框">
                        <Button onClick={this.showModel}>点击显示弹框</Button>
                        <Button onClick={this.showNoFooterModel} style={{marginLeft:20}}>无底部内容</Button>
                        <div style={{marginTop:20}}>
                            <Alert message="其他api与antd model保持一致" type="info" showIcon />
                        </div>
                    </Card>
                    <MainModal 
                        title={'hello'}
                        visible={this.state.visibleModel} 
                        onCancel={this.hideModel}>
                        hello World    
                    </MainModal>
                    <MainModal 
                        title={'hello'}
                        visible={this.state.noFooterModel} 
                        onCancel={this.hideNoFooterModel}
                        noFooter={true}>
                        设置noFooter=true时不显示底部内容     
                    </MainModal>
                </div>
            </div>
        )
    }
}

export default ModalCont;