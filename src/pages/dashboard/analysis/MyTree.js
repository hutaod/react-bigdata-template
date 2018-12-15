
import React from "react";
import { Tree } from 'antd';
const { TreeNode } = Tree;

export default class MyTree extends React.Component {
	
	onSelect = (selectedKeys, info) => {
	    console.log('selected', selectedKeys, info);
	}
	
    render() {
	    return (
		    <Tree
		        defaultExpandAll={true}
		        onSelect={this.onSelect}
		    >
		        <TreeNode title="parent 1" key="0-0">
		          	<TreeNode title="parent 1-0" key="0-0-0">
		            	<TreeNode title="leaf" key="0-0-0-0"/>
		            	<TreeNode title="leaf" key="0-0-0-1" />
		          	</TreeNode>
		          	<TreeNode title="parent 1-1" key="0-0-1">
		            	<TreeNode title="leaf" key="0-0-1-0" />
		          	</TreeNode>
	        	</TreeNode>
	      	</Tree>
	    )
	}
}

