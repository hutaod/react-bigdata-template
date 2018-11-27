import React, { Component } from 'react';
import { Table } from 'antd';
import ReactDOM from 'react-dom';
import MainCard from '../../../common/components/MainCard';
import BarChart from '../../../common/components/BizCharts/BarChart';


class ExampleNormal extends Component {
    state = {
        tab: '1',
        chartIns: undefined
    }
    changeTab = (e) => {
        this.setState({ tab: e.target.value }, () => {
            if (this.refs['table']) {
                const tableCon = ReactDOM.findDOMNode(this.refs['table'])
                const table = tableCon.querySelector('table')
                table.setAttribute('id', 'table-to-xls')
            }
        })
    }
    render() {
        const chartData = [
            { name: '计算机院', value: 117 },
            { name: '经济学院', value: 217 },
            { name: '法学院', value: 157 },
            { name: '电子信息学院', value: 227 },
            { name: '材料学院', value: 257 },
        ]
        const tableData = [
            { key: '1', college: '建筑学院', grade: 2018, number: 165, total: 788, rate: '5%' },
            { key: '2', college: '建筑学院', grade: 2017, number: 125, total: 788, rate: '5%' },
            { key: '3', college: '建筑学院', grade: 2016, number: 123, total: 788, rate: '5%' },
            { key: '4', college: '建筑学院', grade: 2015, number: 165, total: 788, rate: '5%' },
            { key: '5', college: '建筑学院', grade: 2014, number: 123, total: 788, rate: '5%' },
            { key: '6', college: '计算机学院', grade: 2018, number: 165, total: 788, rate: '5%' },
            { key: '7', college: '计算机学院', grade: 2017, number: 125, total: 788, rate: '5%' },
            { key: '8', college: '计算机学院', grade: 2016, number: 123, total: 788, rate: '5%' },
            { key: '9', college: '计算机学院', grade: 2015, number: 165, total: 788, rate: '5%' },
            { key: '10', college: '计算机学院', grade: 2014, number: 123, total: 788, rate: '5%' },
        ];

        var myArray = new Array(tableData.length);

        var func = (data, key) => {
            //保存上一个name
            var x = "";
            //相同name出现的次数
            var count = 0;
            //该name第一次出现的位置
            var startindex = 0;

            for (var i = 0; i < data.length; i++) {
                //这里是合并name列，根据各自情况大家可以自己完善
                var val = data[(i)][key];
                if (i === 0) {
                    x = val;
                    count = 1;
                    myArray[0] = 1
                } else {
                    if (val === x) {
                        count++;
                        myArray[startindex] = count;
                        myArray[i] = 0
                    } else {
                        count = 1;
                        x = val;
                        startindex = i;
                        myArray[i] = 1
                    }
                }
            }
        }

        func(tableData, 'college')

        const columns = [{
            title: '院系',
            dataIndex: 'college',
            render: (value, row, index) => {
                const obj = {
                    children: value,
                    props: {},
                };
                obj.props.rowSpan = myArray[index];
                return obj
            },
        }, {
            title: '年级',
            dataIndex: 'grade',
        }, {
            title: '人数',
            dataIndex: 'number'
        }, {
            title: '小计',
            dataIndex: 'total',
            render: (value, row, index) => {
                const obj = {
                    children: value,
                    props: {},
                };
                obj.props.rowSpan = myArray[index];
                return obj
            },
        }, {
            title: '占学生总数比例',
            dataIndex: 'rate',
        }];

        return (
            <MainCard
                title={"学生整体分析（学院/专业）"}
                tab={this.state.tab}
                changeTab={this.changeTab}
                downloadChart={{
                    chartIns: this.state.chartIns,
                    title: "学生整体分析（学院/专业）"
                }}
                tableToExcel={{
                    table: 'table-to-xls',
                    filename: 'excel下载'
                }}
            >
                {this.state.tab === '1' ? (
                    <BarChart data={chartData}
                        noLegend
                        onFirstLoad={(chartIns) => {
                            this.setState({ chartIns })
                        }} />
                ) : (
                        <Table dataSource={tableData} ref='table' columns={columns} bordered />
                    )}
            </MainCard>
        )
    }
}

export default ExampleNormal;