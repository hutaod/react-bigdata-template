import React, { Component } from 'react';
import { Breadcrumb, Card, Tabs, Button } from 'antd';
import QianXi from '../../../common/components/Bmap/QianXi'

const TabPane = Tabs.TabPane;

class BMap extends Component {
    state = {
        datas: [],
        datas2: [],
    }
    getDatas = () => {
        const to = '武汉';
        const datas = [
            { from: '湖北', count: 354552, to: to },
            { from: '河北', count: 354551, to: to },
            { from: '天津', count: 97323, to: to },
            { from: '山东', count: 28664, to: to },
            { from: '山西', count: 16650, to: to },
            { from: '辽宁', count: 14379, to: to },
            { from: '河南', count: 10980, to: to },
            { from: '内蒙古自治区', count: 9603, to: to },
            { from: '江苏', count: 4536, to: to },
            { from: '上海', count: 3556, to: to },
            { from: '广东', count: 2600, to: to },
        ]
        this.setState({datas})
    }
    getDatas2 = () => {
        const from = '武汉';
        const datas2 = [
            { from: from, count: 354551, to: '湖北' },
            { from: from, count: 85451, to: '河北' },
            { from: from, count: 97323, to: '天津' },
            { from: from, count: 28664, to: '山东' },
            { from: from, count: 16650, to: '山西' },
            { from: from, count: 14379, to: '辽宁' },
            { from: from, count: 10980, to: '河南' },
            { from: from, count: 9603, to: '内蒙古自治区' },
            { from: from, count: 4536, to: '江苏' },
            { from: from, count: 3556, to: '上海' },
            { from: from, count: 2600, to: '广东' },
        ]
        this.setState({datas2})
    }
    render() {
        return (
            <div>
                <Breadcrumb  className="breadcrumb">
                    <Breadcrumb.Item>地图</Breadcrumb.Item>
                    <Breadcrumb.Item>BMap</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <Card>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="生源分布" key="1">
                                <div style={{marginBottom:20}}>
                                    <Button onClick={this.getDatas}>获取数据</Button>
                                </div>
                                <QianXi datas={this.state.datas || []}/>
                            </TabPane>
                            <TabPane tab="毕业去向" key="2">
                                <div style={{marginBottom:20}}>
                                    <Button onClick={this.getDatas2}>获取数据</Button>
                                </div>
                                <QianXi datas={this.state.datas2 || []}/>
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </div>
        )
    }
}

export default BMap;