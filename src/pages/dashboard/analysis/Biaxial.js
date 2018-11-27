import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { BarLineChart, BarPercentLineChart,OneBarLineChart } from '../../../common/components/BizCharts/Biaxial';

class BizChart extends Component {
    render() {
        const barData = [
            { month: "Jan", Tokyo: 7.0, London: 3.9, test: 80 },
            { month: "Feb", Tokyo: 6.9, London: 4.2, test: 40 },
            { month: "Mar", Tokyo: 9.5, London: 5.7, test: 100 },
            { month: "Apr", Tokyo: 14.5, London: 8.5, test: 100 },
            { month: "May", Tokyo: 18.4, London: 11.9, test: 100 },
            { month: "Jun", Tokyo: 21.5, London: 15.2, test: 100 },
            { month: "Jul", Tokyo: 25.2, London: 17.0, test: 100 },
            { month: "Aug", Tokyo: 26.5, London: 16.6, test: 100 },
            { month: "Sep", Tokyo: 23.3, London: 14.2, test: 100 },
            { month: "Oct", Tokyo: 18.3, London: 10.3, test: 100 },
            { month: "Nov", Tokyo: 13.9, London: 6.6, test: 100 },
            { month: "Dec", Tokyo: 9.6, London: 4.8, test: 100 }
        ];
        const lineScale = {
            test:{minLimit:0,ticks:[0,20,40,60,80,100]}
        }
        const lineScale2 = {
            London:{ ticks:[0,20,40,60,80,100] },
            test:{ ticks:[0,20,40,60,80,100] }
        }
        const barData2 = [
            { month: "Jan", London: 3.9, test: 80 },
            { month: "Feb", London: 4.2, test: 40 },
            { month: "Mar", London: 5.7, test: 100 },
            { month: "Apr", London: 8.5, test: 100 },
            { month: "May", London: 11.9, test: 100 },
            { month: "Jun", London: 15.2, test: 100 },
            { month: "Jul", London: 17.0, test: 100 },
            { month: "Aug", London: 16.6, test: 100 },
            { month: "Sep", London: 14.2, test: 100 },
            { month: "Oct", London: 10.3, test: 100 },
            { month: "Nov", London: 6.6, test: 100 },
            { month: "Dec", London: 4.8, test: 100 }
        ];

        // 多柱状图，多折线
        const chartData3 = [
            { month: "Jan", Tokyo: 7.0, London: 3.9, test: 80, test1: 80 },
            { month: "Feb", Tokyo: 6.9, London: 4.2, test: 40, test1: 80 },
            { month: "Mar", Tokyo: 9.5, London: 5.7, test: 100, test1: 80 },
            { month: "Apr", Tokyo: 14.5, London: 8.5, test: 100, test1: 80 },
            { month: "May", Tokyo: 18.4, London: 11.9, test: 100, test1: 80 },
            { month: "Jun", Tokyo: 21.5, London: 15.2, test: 100, test1: 80 },
            { month: "Jul", Tokyo: 25.2, London: 17.0, test: 100, test1: 80 },
            { month: "Aug", Tokyo: 26.5, London: 16.6, test: 100, test1: 80 },
            { month: "Sep", Tokyo: 23.3, London: 14.2, test: 100, test1: 80 },
            { month: "Oct", Tokyo: 18.3, London: 10.3, test: 100, test1: 80 },
            { month: "Nov", Tokyo: 13.9, London: 6.6, test: 100, test1: 80 },
            { month: "Dec", Tokyo: 9.6, London: 4.8, test: 100, test1: 80 }
        ];
        return (
            <React.Fragment>
                <Card title={'多轴图-自定义刻度'} style={{ marginTop: 20 }}>
                    <Row gutter={20}>
                        <Col span={12}>
                            <Card title="多柱状图单折线">
                                <BarLineChart 
                                    data={barData} 
                                    LineDataKey="test" 
                                    padding={[40,70,60,60]}
                                    geomType="intervalStack"
                                    lineScale={lineScale}/>
                                <h4>添加单位</h4>
                                <BarLineChart 
                                    data={barData} 
                                    LineDataKey="test" 
                                    padding={[40,70,60,60]}
                                    geomType="intervalStack"
                                    lineScale={lineScale}
                                    barTooltip={['type*value', (type,item) => {
                                        return {
                                            name: type,
                                            value: item + '次'
                                        };
                                    }]}
                                    lineTooltip={[['test', (item) => {
                                        return {
                                            name: 'test',
                                            value: item + '次'
                                        };
                                    }]]}/>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="多柱状图多折线">
                                <BarLineChart 
                                    data={chartData3} 
                                    LineDataKey={["test","test1"]} 
                                    padding={[40,70,60,60]}
                                    lineScale={{
                                        test:{minLimit:0,ticks:[0,20,40,60,80,100],},
                                        test1:{minLimit:0,ticks:[0,20,40,60,80,100]}
                                    }}
                                    geomType="intervalStack">
                                </BarLineChart>
                                <h4>添加单位</h4>
                                <BarLineChart 
                                    data={chartData3} 
                                    LineDataKey={["test","test1"]} 
                                    padding={[40,70,60,60]}
                                    lineScale={{
                                        test:{minLimit:0,ticks:[0,20,40,60,80,100],},
                                        test1:{minLimit:0,ticks:[0,20,40,60,80,100]}
                                    }}
                                    geomType="intervalStack"
                                    barTooltip={['type*value', (type,item) => {
                                        return {
                                            name: type,
                                            value: item + '次'
                                        };
                                    }]}
                                    lineTooltip={[['test', (value) => {
                                        return {
                                            name: 'test',
                                            value: value + '次'
                                        };
                                    }],['test1', (value) => {
                                        return {
                                            name: 'test1',
                                            value: value + '次'
                                        };
                                    }]]}>
                                </BarLineChart>
                            </Card>
                        </Col>
                    </Row>
                    
                </Card>
                <Card title={'多轴图-百分比'} style={{ marginTop: 20 }}>
                    <BarPercentLineChart 
                        data={barData} 
                        LineDataKey="test" 
                        padding={[40,70,60,60]}
                        axisGrid={null}>
                    </BarPercentLineChart>
                </Card>
                <Card title={'多轴图-隐藏Y轴(柱状图只能是单个，折线图可多个)'} style={{ marginTop: 20 }}>
                    <Row>
                        <Col span={12}>
                            <h3>单折线</h3>
                            <OneBarLineChart 
                                data={barData2} 
                                BarDataKey="test" 
                                padding={[40,70,60,60]}
                                barScale={lineScale2}
                                visibleLineAxis={false}>
                            </OneBarLineChart>
                        </Col>
                        <Col span={12}>
                            <h3>多折线</h3>
                            <OneBarLineChart 
                                data={barData} 
                                BarDataKey="test" 
                                padding={[40,70,60,60]}
                                barScale={lineScale2}
                                visibleLineAxis={false}
                                barTooltip={['test', (value) => {
                                    return {
                                        name: 'test',
                                        value: value + '次'
                                    };
                                }]}
                                lineTooltip={[['Tokyo', (value) => {
                                    return {
                                        name: 'Tokyo',
                                        value: value + '次'
                                    };
                                }],['London', (value) => {
                                    return {
                                        name: 'London',
                                        value: value + '次'
                                    };
                                }]]}>
                            </OneBarLineChart>
                        </Col>
                    </Row>
                    
                </Card>
            </React.Fragment>
        )
    }
}

export default BizChart;