import React, { Component } from 'react';
import { Breadcrumb, Card } from 'antd';
import Ueditor from "./Ueditor"

class Editor extends Component {
    render() {
        return (
            <React.Fragment>
                <Breadcrumb  className="breadcrumb">
                    <Breadcrumb.Item>其他组件</Breadcrumb.Item>
                    <Breadcrumb.Item>富文本编辑器</Breadcrumb.Item>
                </Breadcrumb>
               	<Card>
				    <Ueditor /> 
               	</Card>
                
            </React.Fragment>
        );
    }
}

export default Editor;

