import React from 'react'
import {Table, Card} from 'antd'

const columns = [
    {
        title: '采集人',
        dataIndex: 'A',
        width: 80,
        fixed: 'left'
    }, 
    {
        title: '审核人',
        dataIndex: 'B'
    },
    {
        title: '审核状态',
        dataIndex: 'C'
    },
    {
        title: "占地面积",
        children:[
            {
                title: "合计",
                dataIndex: "D"
            },
            {
                title: "其中：绿化用地面积",
                dataIndex: "E"
            }
        ]
    },
    {
        title: '校舍总建筑面积',
        dataIndex: 'F'
    },  
    {
        title: '其他用房',
        dataIndex: 'other',
        width: 80,
        fixed: 'right',
    }
];

const data = [
    {
        key: "0",
        A: "郑雄",
        B: "曾珍",
        C: "通过",
        D: "10000.000",
        E: "888.000",
        F: "684.065.000",
        other: "0.0"
    }
];


class dynamicTable extends React.Component{
    render () {
        return (
            <div className="common-content">
                <Card>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        size="middle"
                        scroll={{ x: '130%', y: 400 }}
                    />
                </Card>
            </div>
        )
    }
}

export default dynamicTable