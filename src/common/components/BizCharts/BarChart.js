import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend, Shape } from "bizcharts"
import { DataSet } from '@antv/data-set';
import NoData from '../NoData/NoDataComponent';

// 柱状图
class BarChart extends Component {
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
         * colors  颜色设置 数组格式
         * geomType  设置Geom的type类型:
         *              interval(默认)
         *              intervalStack(层叠柱状图)
         *              intervalDodge(分组柱状图)
         *              intervalSymmetric(对称柱状图)
         * transpose  设置是否横向
         * onFirstLoad  第一次加载完触发事件
         * onClickAction  点击事件
         * children  内容部分
         * 
         * 2018/10/23
         * geomSize 设置柱状图柱子宽度，Number类型
         * geomTooltip 配置geom tooltip
         * 
         * 2018/10/29
         * isBase 是否是基础柱状图，单柱状图
         * shape 设置geom的shape属性
         * adjust 设置geom的adjust属性
         * scales 设置chart组件的scale属性 (参考链接https://bizcharts.net/products/bizCharts/api/chart#scale)
         * keyLabel 设置主轴label (参考链接https://bizcharts.net/products/bizCharts/api/axis#label)
         */

        const height = this.props.height || 350; // 高度设置，默认值
        const data = this.props.data || []; // 数据
        const isBase = this.props.isBase || false; //是否是基础图表
        let fields=[], nameKey; // 获取关键字
        if (data && data[0]) {
            nameKey = Object.keys(data[0])[0];// 获取json第一个对象的第一个键名称
            // 获取json对象子节点除去第一个键的其他键字段集合
            Object.keys(data[0]).forEach((item,index)=>{
                if(index!==0){
                    fields.push(item);
                }
            })
        } else {
            // 无数据时
            return (<NoData height={height} data={'nodata'}/>);
        }
        // 如果是基础图表（非分组柱状图）
        if(isBase){
            return (
                <Chart height={height} data={data} scale={this.props.scales} padding={this.props.padding} forceFit
                    onGetG2Instance={(ev)=>this.onFirstLoad(ev)}
                    onPlotClick={(ev)=>this.onClickAction(ev)}
                    >
                    {this.props.transpose?<Coord transpose />:null}
                    <Axis name={nameKey} label={this.props.keyLabel} />
                    <Axis name={fields[0]} />
                    {this.props.noLegend?null:<Legend marker={'circle'}/>}
                    <Tooltip crosshairs={{type : "y"}}/>
                    <Geom 
                        type={this.props.geomType || 'interval'} 
                        position={nameKey+"*"+fields[0]} 
                        size={this.props.geomSize}
                        color={[nameKey,this.props.colors]} 
                        shape={this.props.shape}
                        adjust={this.props.adjust} tooltip={this.props.geomTooltip} />
                    {this.props.children}
                </Chart>
            )
        }
        // 分组图
        const ds = new DataSet(); // dateset数据集方法
        const dv = ds.createView().source(data);// 数据转换
        // 初始化参数
        dv.source(data).transform({
            type: 'fold',
            fields: fields.length>0?fields:['null'],
            key: 'type',
            value: 'value'
        });
        return (
            <Chart height={height} data={dv} scale={this.props.scales} padding={this.props.padding} forceFit
                onGetG2Instance={(ev)=>this.onFirstLoad(ev)}
                onPlotClick={(ev)=>this.onClickAction(ev)}
                >
                {this.props.transpose?<Coord transpose />:null}
                <Axis name={nameKey} label={this.props.keyLabel} />
                <Axis name="value" />
                {this.props.noLegend?null:<Legend marker={'circle'}/>}
                <Tooltip crosshairs={{type : "y"}}/>
                <Geom 
                    type={this.props.geomType || 'interval'} 
                    position={nameKey+"*value"} 
                    size={this.props.geomSize}
                    color={['type',this.props.colors]} 
                    shape={this.props.shape}
                    adjust={this.props.adjust || [{type: 'dodge',marginRatio: 1/32}]} tooltip={this.props.geomTooltip} />
                {this.props.children}
            </Chart>
        )
    }
}

// 自定义shape - 三角形
Shape.registerShape('interval', 'triangle', {
    getPoints(cfg) {
      const x = cfg.x;
      const y = cfg.y;
      const y0 = cfg.y0;
      const width = cfg.size;
      return [
        { x: x - width / 2, y: y0 },
        { x: x, y: y },
        { x: x + width / 2, y: y0 }
      ]
    },
    draw(cfg, container) {
      const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
      const polygon = container.addShape('polygon', {
        attrs: {
          points: [
            [ points[0].x, points[0].y ],
            [ points[1].x, points[1].y ],
            [ points[2].x, points[2].y ]
          ],
          fill: cfg.color
        }
      });
      return polygon; // 将自定义Shape返回
    }
});

export default BarChart;