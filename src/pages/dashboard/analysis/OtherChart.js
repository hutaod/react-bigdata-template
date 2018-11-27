import React, { Component } from 'react';
import { Card } from 'antd';
import BarChart from '../../../common/components/BizCharts/BarChart';

class BizChart extends Component {
    render() {
        const data = [
            { genre: 'Sports', value: 275 },
            { genre: 'Strategy', value: 115 },
            { genre: 'Action', value: 120 },
            { genre: 'Shooter', value: 350 },
            { genre: 'Other', value: 150 }
          ];
          
        return (
            <React.Fragment>
                <Card title={'颜色设置'}>
                    <BarChart data={data} isBase colors={["#7f8da9", "#fec514", "#db4c3c", "#daf0fd", "#2288ee"]} />
                </Card>
                <Card title={'自定义图形的形状'} style={{marginTop:20}}>
                    <BarChart data={data} isBase colors={["#7f8da9", "#fec514", "#db4c3c", "#daf0fd", "#2288ee"]} shape="triangle" />
                </Card>
            </React.Fragment>
        )
    }
}

export default BizChart;