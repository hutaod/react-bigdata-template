import React from 'react'
import { Tree, Card, Icon, message } from 'antd'
import AddModal from './AddModal'
import DeleteWarning from './DeleteWarning'
import EditName from './EditName'
import AddPic from './add.png'

const { TreeNode } = Tree;

class DynamicTree extends React.Component{
    constructor (props) {
        super (props);
        this.state={
            treeData: [],
			selectedKeys: [],
            key: "",
			title: "",
			children: null,
			addStatus: false, // 新增节点（列）的弹出框， 
			deleteStatus: false, // 删除节点弹出框
			editStatus: false // 编辑节点（列）名称弹出框
        }
    }
    
		// 树形结构选中事件
    onSelect = (selectedKeys, info) => {
		let _children = info.node.props.dataRef ? info.node.props.dataRef.children : null;
		let _title = info.node.props.title;
		let _key = selectedKeys[0];
		this.setState({ 
				selectedKeys,
				key: _key,
				title: _title,
				children: _children,
		});
    }
    
		// 树形结构遍历
    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
          return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode {...item} />;
    })
		
		// 新增节点（列）， 显示弹出框
    addNode = () => {
		this.setState({
			addStatus: true
		})
    }
		
	// 删除节点（列）， 显示弹出框
	deleteNode = () => {
		if (this.state.selectedKeys && this.state.selectedKeys[0]) {
			this.setState({
				deleteStatus: true
			})
		} else {
			message.warn("请点击选择要删除的节点（列）！！！")
		}
	}
		
	// 编辑节点， 显示弹出框
	editNode = () => {
		if (this.state.selectedKeys && this.state.selectedKeys[0]) {
			this.setState({
				editStatus: true
			})
		} else {
			message.warn("请点击选择要编辑的节点（列）！！！")
		}
	}
		
	// 隐藏“新增节点（列）弹出框”
	hideAddModal=()=>{
		this.setState({
			addStatus: false
		})
	}
	
	// 隐藏“删除节点弹出框”
	hideDeleteWarning= () => {
		this.setState({
			deleteStatus: false
		})
	}
		
	// 隐藏“编辑节点弹出框”
	hideEdit= () => {
		this.setState({
			editStatus: false
		})
	}
	
	// 更新treeData
	addNewData = (ary, newNode) => {
		let newARY = ary.map((item) => {
			if (item.key === this.state.key ) {
				item = newNode
			} else {
				if (item.children && item.children[0]) {
					item.children = this.addNewData(item.children, newNode)
				}
			}
			return item
		})
		return newARY
	}
		
		
		// “新增节点（列）弹出框”， 确定按钮的事件
    sureAdd = (newTreeNodeName) => { // newTreeNodeName 为弹出框中输入的名称
		
		if (this.state.key) { // 当前存在选中的节点， 添加子节点
		
			let _children;
			
			if (this.state.children && this.state.children[0]) { // 已经存在子节点
				_children = [
					...this.state.children,
					{
						title: newTreeNodeName,
						key: this.state.key + "_" + this.state.children.length
					}
				]
			} else { // 不存在子节点
				_children = [
					{
						title: newTreeNodeName,
						key: this.state.key + "_0"
					}
				]
			}
			
			let newNode = {
				title: this.state.title,
				key: this.state.key,
				children: _children
			};
			
			let newData = this.addNewData(this.state.treeData, newNode)
			this.setState({
				treeData: newData,
				children:newNode.children
			}, ()=> {
				this.props.getColumns(JSON.parse(JSON.stringify(this.state.treeData)))
			})
			
		} else { // 无选中节点，直接添加根节点
			this.setState({
				treeData: [
					...this.state.treeData,
					{
						title: newTreeNodeName,
						key: "0_" + this.state.treeData.length
					}
				]
			}, ()=> {
				this.props.getColumns(JSON.parse(JSON.stringify(this.state.treeData)))
			})
		}
		
		this.setState({
			addStatus: false
		})
			
    }
		
		// 更新treeData
		deleteNewData = ary => {
			
			ary.forEach((item, index) => {
				if (item.key === this.state.key ) {
					ary.splice(index,1);
				} else {
					if (item.children && item.children[0]) {
						item.children = this.deleteNewData(item.children)
					}
				}
			})
			
			ary.forEach(
				(item, index) => {
					let arr = item.key.split("-");
					arr[arr.length - 1] = index;
					ary[index].key=arr.join("-");
				}
			)
			
			return ary
		}
		
		// 确定删除节点
		sureDelete = () => {
			let newData = this.deleteNewData(this.state.treeData);
			this.setState({
				treeData: newData,
				title: "",
				key: "",
				children:null,
				selectedKeys: [],
				deleteStatus: false
			}, ()=> {
					this.props.getColumns(JSON.parse(JSON.stringify(this.state.treeData)))
				})
		}
		
		// 更新treeData
		editNewData = (ary, title) => {
			ary.forEach((item, index) => {
				if (item.key === this.state.key ) {
					item.title = title
					return
				} else {
					if (item.children && item.children[0]) {
						item.children = this.editNewData(item.children, title)
					}
				}
			})
			return ary
		}
		
		// 编辑确定按钮
		sureEdit = (title) => {
			let newData = this.editNewData(this.state.treeData, title)
			this.setState({
				treeData: newData,
				title,
				editStatus: false
			}, ()=> {
					this.props.getColumns(JSON.parse(JSON.stringify(this.state.treeData)))
				})
		}

    render () {
        return (
            <Card 
                style={{height: "100%", overflow: "hidden"}} 
                bodyStyle={{height: "100%",overflow: "auto",marginBottom: "-56px",paddingBottom: "-56px"}} 
                title="表单自定义"
                extra={
                    <span>
                        <Icon 
                            type="plus-square" 
                            title="新增节点（列）" 
                            style={{ fontSize: '18px', color: '#08c', cursor: "pointer", marginRight: "7px" }} 
                            onClick={this.addNode}
                        />
                        <Icon 
                            type="form" 
                            title="编辑节点（列）名称" 
                            style={{ fontSize: '18px', color: '#08c', cursor: "pointer", marginRight: "7px" }}
														onClick={this.editNode}
                        />
                        <Icon 
                            type="delete" 
                            title="删除节点（列）" 
                            style={{ fontSize: '18px', color: '#08c', cursor: "pointer" }}
														onClick={this.deleteNode}
                        />
                    </span>
                }
            >
								{
									this.state.treeData && this.state.treeData[0]
									?
									<Tree
											defaultExpandAll={true}
											onSelect={this.onSelect}
											selectedKeys={this.state.selectedKeys}
									>
											{this.renderTreeNodes(this.state.treeData)}
									</Tree>
									:
									<p style={{textAlign: "center", paddingTop: "50px"}}>
										<img src={AddPic} alt="点击添加节点（列）" style={{width: "auto", cursor: "pointer"}} onClick={this.addNode} />,
									</p>
								}
								
								{
									this.state.addStatus
									?
									<AddModal hideAddModal={this.hideAddModal} sureAdd={this.sureAdd} />
									:
									null
								}
								
								{
									this.state.deleteStatus
									? 
									<DeleteWarning hideDeleteWarning={this.hideDeleteWarning} sureDelete = {this.sureDelete} />
									: 
									null
								}
								
								{
									this.state.editStatus
									?
									<EditName hideEdit={this.hideEdit} sureEdit={this.sureEdit} title={this.state.title} />
									:
									null
								}
								
            </Card>
        )
    }
}

export default DynamicTree