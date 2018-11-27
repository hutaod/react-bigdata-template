import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb, Card, Table, Button } from 'antd';
import ReactHTMLTableToExcel from '../../../common/components/TableToExcel';
// import axios from 'axios'
import {getAction} from '../../../axios'
require('../../../mock');
const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}];

const tmpData=[{
	key: "1",
    name:'测试',
    age:20,
    address:'湖北省武汉市'
},
{
	key: "2",
    name:'测试',
    age:20,
    address:'湖北省武汉市'
},
{
	key: "3",
    name:'测试',
    age:20,
    address:'湖北省武汉市'
},
{
	key: "4",
    name:'测试',
    age:20,
    address:'湖北省武汉市'
},
{
	key: "5",
    name:'测试',
    age:20,
    address:'湖北省武汉市'
}]


class ModalCont extends Component {
    constructor(){
        super()
        this.state={
            data:[]
        }
    }
    componentDidMount() {
        getAction('/get_table').then(res=>{
            // console.log(res)
            const data=res.obj
            this.setState({
                data
            })
        })
        // 批量数据导出excel
        const tableCon = ReactDOM.findDOMNode(this.refs['table'])
        const table = tableCon.querySelector('table')
        table.setAttribute('id', 'table-to-xls')

        // 单页数据导出excel
        const tableCon2 = ReactDOM.findDOMNode(this.refs['tables'])
        const table2 = tableCon2.querySelector('table')
        table2.setAttribute('id', 'table-to-xls-s')
    }
    render() {
        return (
            <div>
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>其他组件</Breadcrumb.Item>
                    <Breadcrumb.Item>Table转Excel</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <Card
                        title={'excel下载'}
                        extra={<ReactHTMLTableToExcel
                            table="table-to-xls-s"
                            filename="excel下载"
                            content={<Button icon={"download"} />} />}
                    >
                        <Table columns={columns} dataSource={tmpData} ref='tables' />
                    </Card>
                    <Card
                        style={{marginTop:20}}
                        title={'批量数据excel下载'}
                        extra={<ReactHTMLTableToExcel
                            table="table-to-xls"
                            filename="excel下载"
                            content={<Button icon={"download"} />} />}
                    >
                        <Table columns={columns} dataSource={this.state.data}  />
                        <Table ref='table' columns={columns} dataSource={this.state.data}  pagination={false} style={{display:'none'}} />
                    </Card>
                </div>

            </div>
        )
    }
}

export default ModalCont;