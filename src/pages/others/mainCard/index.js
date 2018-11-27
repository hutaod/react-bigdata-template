import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import ExampleNormal from './ExampleNormal'
import ExampleTablesDL from './ExampleTablesDL'

class MainCardCont extends Component {
    render() {
        return (
            <div>
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>其他组件</Breadcrumb.Item>
                    <Breadcrumb.Item>MainCard</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <ExampleNormal/>
                    <ExampleTablesDL style={{marginTop:20}}/>
                </div>
            </div>
        )
    }
}

export default MainCardCont;