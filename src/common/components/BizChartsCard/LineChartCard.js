import React, {Component} from 'react';
import { Card } from 'antd';
import LineChart from '../BizCharts/LineChart';

class LineChartCard extends Component{
    state = {
        data:[]
    }
    render(){
        const data = this.props.data || [];
        let height = this.props.height || 300;
        return (
            <Card style={this.props.style||{height:height+80}} className={this.props.className}>
                {this.props.title || <div className="common-title">标题</div>}
                <LineChart
                    data={data}
                    height={height}
                    padding={this.props.padding || [20, 20, 60, 30]}
                    colors={this.props.colors}
                    geomType={this.props.geomType} 
                    noLegend={this.props.noLegend}
                />
            </Card>
        )
    }
}

export default LineChartCard