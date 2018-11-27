import React, { Component } from 'react';
import { Breadcrumb, Card, Row, Col } from 'antd';
import NoData from '../../../common/components/NoData/NoDataComponent'

class NoDataCont extends Component {
    render() {
        return (
            <div>
                <Breadcrumb  className="breadcrumb">
                    <Breadcrumb.Item>其他组件</Breadcrumb.Item>
                    <Breadcrumb.Item>空数据处理</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <Row gutter={20}>
                        <Col span={12}>
                            <Card title="数据加载中...">
                                <div style={{height:300}}>
                                    <NoData/>
                                </div>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="暂无数据">
                                <div style={{height:300}}>
                                    <NoData data="nodata"/>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    
                </div>
            </div>
        )
    }
}

export default NoDataCont;