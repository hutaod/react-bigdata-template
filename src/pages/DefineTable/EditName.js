import React from 'react'
import { Modal, Input, message } from 'antd'

class EditName extends React.Component{
	
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
			this.props.sureEdit(this.state.name)
		} else {
			message.warn("请输入正确的节点（列）名称！！！")
		}
	}
	
	componentDidMount(){
		this.setState({
			name: this.props.title
		})
	}
	
    render () {
        return (
            <Modal
                title="编辑节点（列）"
                visible={true}
                onOk={this.handleOk}
                onCancel={this.props.hideEdit}
            >
                <Input value={this.state.name} onChange={this.nameChange} />
            </Modal>
        )
    }
}

export default EditName