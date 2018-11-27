import React, { Component } from 'react';
import { Card, Radio, Icon, Button } from 'antd';
import DownloadChart from '../BizCharts/DownloadChart'
import ReactHTMLTableToExcel from '../TableToExcel';

class MainCard extends Component {
    render () {
        return (
            <Card 
                title={<div style={{lineHeight:'34px'}}>{this.props.title}</div>}
                extra={this.props.extra || <React.Fragment>
                    <Radio.Group value={this.props.tab || '1'} style={{marginRight:20}} onChange={this.props.changeTab} >
                        <Radio.Button value="1"><Icon type="bar-chart" theme="outlined" /></Radio.Button>
                        <Radio.Button value="2"><Icon type="ordered-list" theme="outlined" /></Radio.Button>
                    </Radio.Group>
                    {this.props.tab==='1'?(
                        <DownloadChart {...(this.props.downloadChart || {})}>
                            <Button type="primary">导 出</Button>
                        </DownloadChart>
                    ):(
                        <ReactHTMLTableToExcel
                            {...(this.props.tableToExcel || {})}
                            content={<Button type="primary">导 出</Button>} />
                    )}
                    
                </React.Fragment>}
            >
                {this.props.children}
            </Card>
        )
    }
}

export default MainCard;