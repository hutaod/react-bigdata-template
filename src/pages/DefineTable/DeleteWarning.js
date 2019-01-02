import React from 'react'
import { Modal } from 'antd'

class DeleteWarning extends React.Component{
	
	handleOk=() => {
		this.props.sureDelete()
	}
	
	render () {
		return (
			<Modal
				title="删除提醒"
				visible={true}
				onOk={this.handleOk}
				onCancel={this.props.hideDeleteWarning}
			>
				确定删除当前节点(列), 以及当前节点(列)下面的所有子节点(子列)?
			</Modal>
		)
	}
}

export default DeleteWarning