import React, { Component } from 'react';
import { Breadcrumb, Card, Tabs } from 'antd';
import BizChart from './BizChart'
import OtherChart from './OtherChart'
import Progress from './Progress'
import Biaxial from './Biaxial'
import Test from './Test'

const TabPane = Tabs.TabPane;

class Analysis extends Component {
    render() {
        return (
            <div>
                <Breadcrumb  className="breadcrumb">
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>分析页</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <Card>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="BizChart常用图表" key="1">
                                <BizChart/>
                            </TabPane>
                            <TabPane tab="BizChart其他图表" key="2">
                                <OtherChart/>
                            </TabPane>
                            <TabPane tab="BizChart多轴图" key="3">
                                <Biaxial/>
                            </TabPane>
                            <TabPane tab="进度条" key="4">
                                <Progress/>
                            </TabPane>
                            <TabPane tab="测试" key="5">
                                <Test/>
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Analysis;