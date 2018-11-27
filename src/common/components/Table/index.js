import React, { Component } from 'react';
import { Table, Pagination } from 'antd';

class TableComp extends Component {
    changePage(page){
        if(this.props.changePage){
            this.props.changePage(page)
        }
    }
    render() {
        let props = Object.assign({},this.props,{
            pagination:false
        })
        let paginationStyle = Object.assign({},{marginTop:20,textAlign:'right'},(this.props.paginationStyle || {}))
        return (
            <div>
                <Table {...props} />
                {(this.props.pagination && this.props.total)?(<Pagination 
                    style={paginationStyle}
                    showQuickJumper 
                    defaultCurrent={1}
                    current={this.props.current}
                    defaultPageSize={this.props.defaultPageSize || 10}
                    pageSize={this.props.pageSize || 10}
                    showTotal={(total) => `共${total}条数据`}
                    total={this.props.total}
                    onChange={this.changePage.bind(this)}/>):undefined}
            </div>
        )
    }
}

export default TableComp;