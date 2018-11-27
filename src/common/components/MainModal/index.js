import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import './style.less'
/**
 * noFooter  是否需要底部内容
 * 其他api和antd保持一致
 */
class MainModal extends Component {
    render() {
        let props = Object.assign({},this.props,{
            footer: null,
            onOk: undefined,
            className: 'main-mpdal-comp'
        })
        return (
            <Modal
                {...props}
            >
                {this.props.children}
                {this.props.noFooter?null:<div style={{textAlign:'center',marginTop:20}}>
                    <Button type={'primary'} onClick={this.props.onOk}>{this.props.okText || '保 存'}</Button>
                    <Button style={{marginLeft:10}} onClick={this.props.onCancel}>{this.props.cancelText || '取 消'}</Button>
                </div>}
            </Modal>
        )
    }
}

export default MainModal;