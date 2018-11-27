import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from "bizcharts"
import { DataSet } from '@antv/data-set';
import NoData from '../../NoData/NoDataComponent';

// 双轴柱状折线图
class BiaxialChart extends Component {
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
         * LineDataKey 配置折线图对象字段,单个-字符串形式，多个-数组形式
         * visibleLineAxis 是否显示右侧Y轴刻度
         * lineLabel 配置Y轴刻度显示数据
         * LegendClick Legend点击事件
         * barTooltip 柱状图提示配置，单个配置，格式参考Bizchart文档
         * lineTooltip 折线图提示配置，多个配置，需要在基础上在嵌套一层，形成二维数组格式
         * axisGrid 配置grid样式
         */

        const height = this.props.height || 350; // 高度设置，默认值
        const data = this.props.data || []; // 数据
        const ds = new DataSet(); // dateset数据集方法
        const dv = ds.createView().source(data);// 数据转换
        let fields=[], nameKey, LineDataKey=[]; // 获取关键字
        if(typeof this.props.LineDataKey === 'string'){
            LineDataKey[0] = this.props.LineDataKey;
        } else {
            LineDataKey=this.props.LineDataKey || [];
        }
        if (data && data[0]) {
            nameKey = Object.keys(data[0])[0];// 获取json第一个对象的第一个键名称
            // 获取json对象子节点除去第一个键的其他键字段集合
            Object.keys(data[0]).forEach((item,index)=>{
                if(index!==0 && !LineDataKey.some(a=>a===item)){
                    fields.push(item);
                }
            })
        } else {
            // 无数据时
            return (<NoData height={height} data={'nodata'}/>);
        }
        // 初始化参数
        dv.source(data).transform({
            type: 'fold',
            fields: fields.length>0?fields:['null'],
            key: 'type',
            value: 'value'
        });
        //颜色值
        let colors = this.props.colors || ['#1890ff','#13c2c2','#52c41a','#a0d911','#fadb14','#faad14','#722ed1','#eb2f96','#fa8c16'];
        // 自定义Legend
        let LegendItems = fields.map((item,index)=>{
            return {
                value: item,
                marker: { symbol: 'square', fill: colors[index], radius: 5 }
            }
        })
        let len = LegendItems.length;
        LineDataKey.forEach((item,index)=>{
            LegendItems.push({
                value: item,
                marker: { symbol: 'hyphen', stroke: colors[len+index], radius: 5, lineWidth: 3 }
            })
        })
        // 定义scale
        // let scale = this.props.lineScale
        // tooltip
        // const percentRate = [LineDataKey+'*percent', (item) => {
        //     return {
        //         name: LineDataKey,
        //         value: item + '%'
        //     };
        // }]
        // let chartIns = null;
        // console.log(dv)
        return (
            <Chart height={height} data={dv} scale={this.props.lineScale} padding={this.props.padding} forceFit
                onGetG2Instance={(ev)=>{
                    // chartIns=ev;
                    this.onFirstLoad(ev)
                }}
                >
                {this.props.transpose?<Coord transpose />:null}
                <Axis name={nameKey} />
                <Axis name="value" grid={this.props.axisGrid} />
                {LineDataKey.map((item,index)=>(
                    <Axis key={item} name={item} grid={this.props.axisGrid} visible={index===0 && this.props.visibleLineAxis!==false} label={this.props.lineLabel}/>
                ))}
                {this.props.noLegend?null:(
                    <Legend marker={'circle'}
                        custom={true}
                        items={LegendItems}
                        clickable={true}
                        onClick={this.props.LegendClick}
                    />
                )}
                <Tooltip crosshairs={{type : "y"}}/>
                <Geom 
                    type={this.props.geomType || 'interval'} 
                    position={nameKey+"*value"} 
                    color={['type',colors]} 
                    adjust={[{type: 'dodge',marginRatio: 1/32}]} 
                    tooltip={this.props.barTooltip} />
                {LineDataKey.map((item,index)=>(
                    <React.Fragment key={index}>
                        <Geom 
                            type="line" 
                            position={nameKey+"*"+item} 
                            color={colors[len+index]} tooltip={this.props.lineTooltip?this.props.lineTooltip[index]:undefined} />
                        <Geom 
                            type={'point'} 
                            position={nameKey+"*"+item} 
                            shape={'circle'} 
                            color={colors[len+index]} tooltip={this.props.lineTooltip?this.props.lineTooltip[index]:undefined}/>
                    </React.Fragment>
                ))}
                {this.props.children}
            </Chart>
        )
    }
}

export default BiaxialChart;