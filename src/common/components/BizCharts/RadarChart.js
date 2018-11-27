import React, { Component } from 'react';
import { Chart, Geom, Axis, Coord, Legend } from "bizcharts"
import { DataSet } from '@antv/data-set'

class RadarChart extends Component {
    onFirstLoad(ev){
        if(this.props.onFirstLoad){
            this.props.onFirstLoad(ev);
        }
    }
    onClickAction(ev){
        if(this.props.onClickAction){
            this.props.onClickAction(ev);
        }
    }
    render() {
        const { DataView } = DataSet;
        const data = this.props.data || [
            { item: 'Design', a: 70, b: 30 },
            { item: 'Development', a: 60, b: 70 },
            { item: 'Marketing', a: 50, b: 60 },
            { item: 'Users', a: 40, b: 50 },
            { item: 'Test', a: 60, b: 70 },
            { item: 'Language', a: 70, b: 50 },
            { item: 'Technology', a: 50, b: 40 },
            { item: 'Support', a: 30, b: 40 },
            { item: 'Sales', a: 60, b: 40 },
            { item: 'UX', a: 50, b: 60 }
  
          ];
        const dv = new DataView().source(data);
        let fields=[], dimension;
        if (data && data[0]) {
            dimension = Object.keys(data[0])[0];
            Object.keys(data[0]).forEach((item,index)=>{
                if(index>0){
                    fields.push(item)
                }
            })
        } else {
            return (<div></div>);
        }
        
        dv.transform({
            type: 'fold',
            fields: fields,
            key: 'user', // key字段
            value: 'score', // value字段
        });
        const cols = {
            score: {
                min: 0,
                max: 80
            }
        }
        return (
            <Chart height={this.props.height || 350} data={dv} scale={cols} padding={this.props.padding} forceFit
                onGetG2Instance={(ev)=>this.onFirstLoad(ev)}
                onPlotClick={(ev)=>this.onClickAction(ev)}
                >
                <Coord type='polar' radius={this.props.radius || 0.75} />
                <Axis name={dimension} line={null} tickLine={null} grid={{lineStyle: {
                    lineDash: null
                },
                hideFirstLine: false}} />
                <Axis name="score" line={null} tickLine={null} grid={{type: 'polygon',
                    lineStyle: {
                        lineDash: null
                    },
                    alternateColor: 'rgba(0, 0, 0, 0.04)'}} />
                <Legend name="user" marker="circle" 
                    g2-legend = {this.props.g2Legend || {}}
                    useHtml={true} />
                <Geom type='area' position={dimension+"*score"} color={['user',this.props.colors]}/>
                <Geom type='line' position={dimension+"*score"} color={['user',this.props.colors]} size={2}/>
                <Geom type='point' position={dimension+"*score"} color={['user',this.props.colors]} shape="circle" size={4} style={{stroke: '#fff',
                lineWidth: 1,
                fillOpacity: 1}} />
            </Chart>
        )
    }
}

export default RadarChart;