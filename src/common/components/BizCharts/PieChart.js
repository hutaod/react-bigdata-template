import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from "bizcharts"
import { DataSet } from '@antv/data-set';
import NoData from '../NoData/NoDataComponent';

// 饼图
class PieChart extends Component {
    // 第一次加载完触发事件
    onFirstLoad(ev){
        if(this.props.onFirstLoad){
            this.props.onFirstLoad(ev);
        }
    }
    // 点击事件
    onClickAction(ev){
        if(this.props.onClickAction){
            this.props.onClickAction(ev);
        }
    }
    render() {
        /**
         * 可接受参数设置
         * height  高度，默认350
         * data  数据，json格式
         * padding  设置内边距 数组格式，默认[30, 20, 60, 50]
         * noLegend  是否需要Legend，默认为false，显示Legend
         * position  对Legend的position设置 默认bottom，其他可设置值，right，left，top
         * offsetY  y轴偏移距离设置
         * offsetX  x轴偏移距离设置
         * g2Legend  g2Legend设置
         * colors  颜色设置 数组格式
         * onFirstLoad  第一次加载完触发事件
         * onClickAction  点击事件
         * radius  饼图占据区域百分比 默认0.75
         * innerRadius  内部空白区域大小百分比，默认没有
         * children  内容部分
         * geomTooltip 配置geom tooltip
         */

        const height = this.props.height || 350; // 高度设置，默认值
        const { DataView } = DataSet; // 数据视图
        const data = this.props.data; // 数据
        const dv = new DataView();
        let field, dimension; // 获取关键字
        if (data && data[0]) {
            dimension = Object.keys(data[0])[0]; //获取键
            field = Object.keys(data[0])[1]; //获取值
        } else {
            // 无数据时
            return (<NoData height={height} data={'nodata'}/>);
        }
        // 初始化参数
        dv.source(data).transform({
            type: 'percent',
            field: field,
            dimension: dimension,
            as: 'percent'
        });
        const cols = {
            percent: {
                formatter: val => {
                    val = Math.round(val * 100) + '%';
                    return val;
                }
            }
        }
        return (
            <Chart height={height} data={dv} scale={cols} padding={this.props.padding} forceFit
                onGetG2Instance={(ev)=>this.onFirstLoad(ev)}
                onPlotClick={(ev)=>this.onClickAction(ev)}
                >
                <Coord type='theta' radius={this.props.radius || 0.75} innerRadius={this.props.innerRadius}/>
                <Axis name="percent" />
                {this.props.noLegend?null:<Legend 
                    marker={'circle'} 
                    position={this.props.position} 
                    offsetY={this.props.offsetY}
                    offsetX={this.props.offsetX}
                    g2-legend = {this.props.g2Legend || {}}
                    useHtml={true} />}
                {/* 悬浮样式设置 */}
                <Tooltip
                    showTitle={false}
                    itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                />
                <Geom
                    type="intervalStack"
                    position="percent"
                    color={[dimension,this.props.colors]}
                    tooltip={this.props.geomTooltip || [dimension+'*percent*'+field, (item, percent,val) => {
                        percent = Math.round(percent * 100) + '%';
                        return {
                            name: item,
                            value: val + ' (' + percent +')'
                        };
                    }]}
                    style={{ lineWidth: 1, stroke: '#fff' }}
                >
                    <Label content='percent' formatter={(val, item) => {
                        return item.point[dimension] + ': ' + val;
                    }} />
                </Geom>
                {this.props.children}
            </Chart>
        )
    }
}

export default PieChart;