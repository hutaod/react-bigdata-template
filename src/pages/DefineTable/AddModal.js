import React from 'react'
import { Modal, Input, message } from 'antd'

class AddModal extends React.Component{
	
	state={
		name: ""
	}
	
	nameChange=(e) => {
		this.setState({
			name:e.target.value
		})
	}
	
	handleOk=() => {
		if (this.state.name) {
			this.props.sureAdd(this.state.name)
		} else {
			message.warn("请输入正确的节点（列）名称！！！")
		}
	}
	
    render () {
        return (
            <Modal
                title="新增节点（列）"
                visible={true}
                onOk={this.handleOk}
                onCancel={this.props.hideAddModal}
            >
                <Input placeholder="请输入节点（列）名称" onChange={this.nameChange} />
            </Modal>
        )
    }
}

export default AddModal