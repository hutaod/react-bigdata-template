import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import LineChart from '../../../common/components/BizCharts/LineChart';
import BarChart from '../../../common/components/BizCharts/BarChart';
import PieChart from '../../../common/components/BizCharts/PieChart';
import WordCloudChart from '../../../common/components/BizCharts/WordCloudChart';
import ChartWidthDownload from './ChartWithDownload';
import { Guide } from "bizcharts"

const { Region } = Guide;

class BizChart extends Component {
    render() {
        const lineData = [
            { month: "Jan", Tokyo: 7.0, London: 3.9 },
            { month: "Feb", Tokyo: 6.9, London: 4.2 },
            { month: "Mar", Tokyo: 9.5, London: 5.7 },
            { month: "Apr", Tokyo: 14.5, London: 8.5 },
            { month: "May", Tokyo: 18.4, London: 11.9 },
            { month: "Jun", Tokyo: 21.5, London: 15.2 },
            { month: "Jul", Tokyo: 25.2, London: 17.0 },
            { month: "Aug", Tokyo: 26.5, London: 16.6 },
            { month: "Sep", Tokyo: 23.3, London: 14.2 },
            { month: "Oct", Tokyo: 18.3, London: 10.3 },
            { month: "Nov", Tokyo: 13.9, London: 6.6 },
            { month: "Dec", Tokyo: 9.6, London: 4.8 }
        ];

        const barData = [
            {
                label: "Monday",
                series1: 2800,
                series2: 2260
            },
            {
                label: "Tuesday",
                series1: 1800,
                series2: 1300
            },
            {
                label: "Wednesday",
                series1: 950,
                series2: 900
            },
            {
                label: "Thursday",
                series1: 500,
                series2: 390
            },
            {
                label: "Friday",
                series1: 170,
                series2: 100
            }
        ];
        const oneBarData = [
            {
                label: "Monday",
                series1: 2800
            },
            {
                label: "Tuesday",
                series1: 1800
            },
            {
                label: "Wednesday",
                series1: 950
            },
            {
                label: "Thursday",
                series1: 500
            },
            {
                label: "Friday",
                series1: 170
            },
            {
                label: "Thur",
                series1: 500
            }
        ];

        const pieData = [
            { item: '事例一', count: 40 },
            { item: '事例二', count: 21 },
            { item: '事例三', count: 17 },
            { item: '事例四', count: 13 },
            { item: '事例五', count: 9 }
        ];

        const wordData = [{
            "x": "China",
            "value": 1383220000,
            "category": "asia"
        }, {
            "x": "India",
            "value": 1316000000,
            "category": "asia"
        }, {
            "x": "United States",
            "value": 324982000,
            "category": "america"
        }, {
            "x": "Indonesia",
            "value": 263510000,
            "category": "asia"
        }, {
            "x": "Brazil",
            "value": 207505000,
            "category": "america"
        }];
        return (
            <React.Fragment>
                <Card title={'折线图'}>
                    <Row gutter={20}>
                        <Col span={12}>
                            <h3>悬浮提示框默认内容</h3>
                            <LineChart
                                data={lineData}
                            />
                        </Col>
                        <Col span={12}>
                            <h3>悬浮提示框自定义内容（添加单位）</h3>
                            <LineChart
                                data={lineData}
                                geomTooltip={['type*value', (type,item) => {
                                    return {
                                        name: type,
                                        value: item + '次'
                                    };
                                }]}
                            />
                        </Col>
                    </Row>
                    
                </Card>
                <Card title={'柱状图'} style={{ marginTop: 20 }}>
                    <Row gutter={20}>
                        <Col span={12}>
                            <BarChart
                                data={oneBarData}
                                scales={{
                                    value: {
                                        formatter(text, item, index) {
                                            return `${text}人`;
                                        },
                                    }
                                }}
                                keyLabel = {
                                    {
                                        autoRotate: false,
                                        textStyle: {
                                            rotate: 30,
                                        }
                                    }
                                }
                            />
                        </Col>
                        <Col span={12}>
                            <BarChart
                                data={oneBarData}
                                transpose
                            />
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={12}>
                            <BarChart
                                data={barData}
                                scales={{
                                    value: {
                                        formatter(text, item, index) {
                                            return `${text}人`;
                                        },
                                    }
                                }}
                            />
                        </Col>
                        <Col span={12}>
                            <BarChart
                                data={barData}
                                transpose
                            />
                        </Col>
                    </Row>
                </Card>
                <Card title={'饼图'} style={{ marginTop: 20 }}>
                    <Row gutter={20}>
                        <Col span={12}>
                            <PieChart
                                data={pieData}
                                onClickAction={(ev)=>{
                                    // 点击获取当前行数据
                                    console.log(ev.data._origin);
                                }}
                            />
                        </Col>
                        <Col span={12}>
                            <PieChart
                                data={pieData}
                                innerRadius={0.55}
                            />
                        </Col>
                    </Row>

                </Card>
                <ChartWidthDownload
                    title={'带下载按钮柱状图'}
                    data={barData}
                />
                <Card title={'词云'} style={{ marginTop: 20 }}>
                    <WordCloudChart
                        data={wordData}
                    />
                </Card>
                <Card title={'辅助区块'} style={{ marginTop: 20 }}>
                    <LineChart data={lineData}>
                        <Guide>
                            <Region start={['min', 0]} end={['max', 10]} style={{ fill: '#5AC405', fillOpacity: 0.4 }} />
                        </Guide>
                    </LineChart>
                </Card>
            </React.Fragment>
        )
    }
}

export default BizChart;