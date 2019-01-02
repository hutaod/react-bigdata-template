import React from 'react'
import { Table, Card } from "antd"
import Guid from './guide.png'

let obj={
	key: "0"
};

class DynamicTable extends React.Component{
    constructor (props) {
        super (props);
        this.state={
            columns:[
//                 {
//                     title: '采集人',
//                     dataIndex: 'A',
//                     width: 80,
//                     fixed: 'left'
//                 }
            ],
            data: [
// 				{
// 					key: "0",
// 					A: "123"
// 				}
			],
			width: "100%"
        }
    }
	
	getData = (ary) => {
		ary.forEach(
			(item, index) => {
				if (item.children && item.children[0]) { // 有子集， 代表有跨列，不取索引值
					this.getData(item.children)
				} else{
					obj={
						...obj,
						[`columns_${item.key}`]: "-"
					}
				}
			}
		)
	}
	
	getColumns = (ary) => {
		ary.forEach(
			(item, index) => {
				item.dataIndex = "columns_" + item.key;
				if (item.children && item.children[0]) {
					item.children = this.getColumns(item.children)
				}
			}
		)
		return ary
	}
	
	componentWillReceiveProps (nextProps) {
		obj={
			key: "0"
		};
		if (nextProps.columns && nextProps.columns[0]) {
			
			let _columns = this.getColumns(nextProps.columns);
			sessionStorage.setItem("colums", JSON.stringify(_columns))
			
			this.getData(nextProps.columns)
			let arr = Object.keys(obj); 
			let _width = "100%"; // 根据列的个数调整table的宽度
			if (arr.length >= 6) {
				_width = ((arr.length -1) / 5 - 1 ) * 50 + 100 + "%"
			}
			
			this.setState({
				columns: _columns,
				data: [obj],
				width: _width
			})
			
		} else {
			sessionStorage.setItem("colums", null)
			this.setState({
				columns: [],
				data: [],
				width: "100%"
			})
		}
		
	}
	
    render () {
        return (
            <Card style={{height: "100%", overflow: "hidden"}} bodyStyle={{height: "100%",overflow: "auto",marginBottom: "-56px",paddingBottom: "-56px"}} title="预览">
				{
					this.state.columns && this.state.columns[0]
					?
					<Table
						columns={this.state.columns}
						dataSource={this.state.data}
						bordered
						scroll={{ x: this.state.width, y: 600 }}
					/>
					:
					<p style={{textAlign: "center",paddingTop: "50px"}}>
						<img src={Guid} alt="" />
					</p>
				}
            </Card>
        )
    }
}

export default DynamicTable