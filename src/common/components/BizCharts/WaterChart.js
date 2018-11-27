import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
const { Html, Arc } = Guide;

class WaterChart extends Component {
    render(){
        const data = [
            { name:'a',value: 0 }
        ];
        const cols = {
            value: {
                min: 0,
                max: 100,
                tickInterval: 1,
                nice: false
            }
        }
        return (
            <Chart height={this.props.height || 300} 
                data={data} 
                scale={cols} 
                padding={this.props.padding || [0,0,0,0]} 
                forceFit>
                <Coord type='polar' startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={this.props.radius || 0.85} />
                <Guide  >
                    <Html position={['50%', '40%']}
                        html={() => { 
                            return (`
                                <div style="width: 300px;text-align: center;font-size: 12px!important;">
                                    <p style="font-size: 1.5em; color: rgba(0,0,0,0.45);margin: 0;">${this.props.title || '通过率'}</p>
                                    <p style="font-size: 1.5em;color: rgba(0,0,0,0.85);margin: 0;">${data[0].value}%</p>
                                </div>
                            `) }} />
                </Guide>
                <Geom type="interval" position="a*value" shape='liquid-fill-gauge' color={this.props.color || '#4ed8da'}
                    active={false}
                    style={{ opacity: 0.75, lineWidth: 3 }}
                />
            </Chart>
        )
    }
}

export default WaterChart;