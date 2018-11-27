import React, { Component } from 'react';
import { Card, Table, Button } from 'antd';
import ReactHTMLTableToExcel from '../../../common/components/TableToExcel';
import './style.less'

const columns = [{
    title: '院系',
    dataIndex: 'college'
  }, {
    title: '年级',
    children: [{
        title: '2016',
        dataIndex: '2016',
    }, {
        title: '2017',
        dataIndex: '2017',
    }, {
        title: '2018',
        dataIndex: '2018',
    }],
  }];

class ExampleTablesDL extends Component {
    render() {
        const data = [];
        for (let i = 0; i < 5; i++) {
            data.push({
                key: i,
                college: '计算机学院',
                '2016': i + 1,
                '2017': i + 2,
                '2018': i + 3,
            });
        }
        const tableData = [{
            typeName: '高校专项',
            data: data
        },{
            typeName: '国家专项',
            data: data
        }]
        return (
            <Card
                className="example-tables-dl"
                style={this.props.style}
                title={'复杂table转excel'}
                extra={<ReactHTMLTableToExcel
                    table="table-to-xls2"
                    filename="excel下载"
                    content={<Button icon={"download"} />} />}
            >
                <table id="table-to-xls2" className="border-table table-center">
                    <tbody>
                        {tableData.map((item,index)=>(
                            <tr key={index}>
                                <td style={{width: 150}}>
                                    {item.typeName}
                                </td>
                                <td className="border-bottom-none">
                                    <Table columns={columns} dataSource={item.data} pagination={false} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </Card>
        )
    }
}

export default ExampleTablesDL;