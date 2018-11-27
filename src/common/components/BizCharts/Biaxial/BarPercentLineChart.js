import React, { Component } from 'react';
import BarLineChart from './BarLineChart'

class BarPercentLineChart extends Component {
    render () {
        /**
         * 2018/10/23
         * LineDataKey 配置折线图对象字段,只支持单折线
         * lineLabel 配置Y轴刻度显示数据
         * lineTooltip 折线图提示配置
         */

        // 定义scale
        let LineDataKey = this.props.LineDataKey;
        let scale = this.props.lineScale || {
            [LineDataKey]: {
                min: 0, max: 100, ticks: [0, 20, 40, 60, 80, 100]
            }
        }
        // tooltip
        const lineRate = [LineDataKey+'*percent', (item) => {
            return {
                name: LineDataKey,
                value: item + '%'
            };
        }]
        return (
            <BarLineChart {...this.props} 
                lineTooltip={this.props.lineTooltip || [lineRate]} 
                lineScale={this.props.lineScale || scale}
                lineLabel={this.props.lineLabel || {formatter: val => `${val}%`}}/>
        )
    }
}

export default BarPercentLineChart