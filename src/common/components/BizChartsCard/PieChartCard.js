import React, {Component} from 'react';
import { Card } from 'antd';
import PieChart from '../BizCharts/PieChart';

class PieChartCard extends Component{
    state = {
        data:[]
    }
    render(){
        const data = this.props.data || [];
        let height = this.props.height || 300;
        return (
            <Card className={this.props.className} style={this.props.style||{height:height+80}}>
                {this.props.title || <div className="common-title">标题</div>}
                <PieChart
                    data={data}
                    height={height}
                    padding={this.props.padding || [0, 30, 40, 30]}
                    radius={this.props.radius || 0.65}
                    colors={this.props.colors}
                    g2Legend = {this.props.g2Legend || {}}
                    position={this.props.position}
                    offsetY={this.props.offsetY}
                    offsetX={this.props.offsetX}
                    innerRadius={this.props.innerRadius}
                />
            </Card>
        )
    }
}

export default PieChartCard