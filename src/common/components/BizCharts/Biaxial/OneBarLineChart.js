import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from "bizcharts"
import NoData from '../../NoData/NoDataComponent';

// 双轴柱状折线图
class OneBarLineChart extends Component {
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
         * BarDataKey 配置柱状图对象字段
         * visibleLineAxis 是否显示右侧Y轴刻度
         * barLabel 配置Y轴刻度显示数据
         * LegendClick Legend点击事件
         * barTooltip 柱状图提示配置，单个配置，格式参考Bizchart文档
         * lineTooltip 折线图提示配置，多个配置，需要在基础上在嵌套一层，形成二维数组格式
         * axisGrid 配置grid样式
         */

        const height = this.props.height || 350; // 高度设置，默认值
        const data = this.props.data || []; // 数据
        let fields=[], nameKey, BarDataKey=this.props.BarDataKey; // 获取关键字
        if (data && data[0]) {
            nameKey = Object.keys(data[0])[0];// 获取json第一个对象的第一个键名称
            // 获取json对象子节点除去第一个键的其他键字段集合
            Object.keys(data[0]).forEach((item,index)=>{
                if(index!==0 && item!==BarDataKey){
                    fields.push(item);
                }
            })
        } else {
            // 无数据时
            return (<NoData height={height} data={'nodata'}/>);
        }
        
        //颜色值
        let colors = this.props.colors || ['#1890ff','#13c2c2','#52c41a','#a0d911','#fadb14','#faad14','#722ed1','#eb2f96','#fa8c16'];
        // 自定义Legend
        let LegendItems = [{
            value: BarDataKey,
            marker: { symbol: 'square', fill: colors[0], radius: 5 }
        }]
        fields.forEach((item,index)=>{
            LegendItems.push({
                value: item,
                marker: { symbol: 'hyphen', stroke: colors[index+1], radius: 5, lineWidth: 3 }
            })
        })
        let chartIns;
        return (
            <Chart height={height} data={data} scale={this.props.barScale} padding={this.props.padding} forceFit
                onGetG2Instance={(ev)=>{
                    chartIns=ev;
                    this.onFirstLoad(ev)
                }}
                >
                {this.props.transpose?<Coord transpose />:null}
                <Axis name={nameKey} label={this.props.barLabel} />
                <Axis name={BarDataKey} grid={this.props.axisGrid}/>
                {fields.map((item,index)=>(
                    <Axis key={index} name={item} grid={this.props.axisGrid} visible={index===0 && this.props.visibleLineAxis!==false}/>
                ))}
                {this.props.noLegend?null:(
                    <Legend marker={'circle'}
                        custom={true}
                        items={LegendItems}
                        clickable={true}
                        onClick={ ev => {
                            const item = ev.item;
                            const value = item.value;
                            const checked = ev.checked;
                            const geoms = chartIns.getAllGeoms();
                            for (let i = 0; i < geoms.length; i++) {
                              
                              const geom = geoms[i];
                              if (geom.getYScale().field === value ) {
                                if (checked) {
                                  geom.show();
                                } else {
                                  geom.hide();
                                }
                              }
                            }
                        }}
                    />
                )}
                <Tooltip crosshairs={{type : "y"}}/>
                <Geom 
                    type={this.props.geomType || 'interval'} 
                    position={nameKey+"*"+BarDataKey} 
                    color={colors[0]} 
                    adjust={[{type: 'dodge',marginRatio: 1/32}]} 
                    tooltip={this.props.barTooltip}/>
                {fields.map((item,i)=>(
                    <React.Fragment key={i}>
                        <Geom
                        type="line" 
                        position={nameKey+"*"+item} 
                        color={colors[i+1]} tooltip={this.props.lineTooltip?this.props.lineTooltip[i]:undefined} />
                        <Geom 
                            type="point" 
                            position={nameKey+"*"+item} 
                            shape={'circle'} 
                            color={colors[i+1]} tooltip={this.props.lineTooltip?this.props.lineTooltip[i]:undefined} />
                    </React.Fragment>
                ))}
                {this.props.children}
            </Chart>
        )
    }
}

export default OneBarLineChart;