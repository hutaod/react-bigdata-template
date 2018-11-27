import React, { Component } from 'react';
import { Breadcrumb, Card, Tabs } from 'antd';
import Trail from './Trail'
import Hot from './Hot'

const TabPane = Tabs.TabPane;

class BaiduMaps extends Component {
    render() {
        return (
            <div>
                <Breadcrumb  className="breadcrumb">
                    <Breadcrumb.Item>地图</Breadcrumb.Item>
                    <Breadcrumb.Item>百度地图</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <Card>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="轨迹图" key="1">
                                <Trail/>
                            </TabPane>
                            <TabPane tab="热力图" key="2">
                                <Hot/>
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </div>
        )
    }
}

export default BaiduMaps;