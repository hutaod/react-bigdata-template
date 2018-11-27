import React, {Component} from 'react';
import { Card } from 'antd';
import BarChart from '../BizCharts/BarChart';

class BarChartCard extends Component{
    state = {
        data:[
            { name:'London', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.' :39.3, 'Apr.': 81.4, 'May': 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
            { name:'Berlin', 'Jan.': 12.4, 'Feb.': 23.2, 'Mar.' :34.5, 'Apr.': 99.7, 'May': 52.6, 'Jun.': 35.5, 'Jul.': 37.4, 'Aug.': 42.4}
        ]
    }
    render(){
        const data = this.props.data || [];
        let height = this.props.height || 300;
        return (
            <Card style={this.props.style||{height:height+80}} className={this.props.className}>
                {this.props.title || <div className="common-title">标题</div>}
                <BarChart
                    data={data}
                    height={height}
                    padding={this.props.padding || [30, 20, 60, 50]}
                    colors={this.props.colors}
                    transpose={this.props.transpose}
                    geomType={this.props.geomType}
                    noLegend={this.props.noLegend}
                />
            </Card>
        )
    }
}

export default BarChartCard