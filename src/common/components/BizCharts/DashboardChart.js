import React, { Component } from 'react';
import { Chart, Geom, Axis, Coord, Guide, Shape } from "bizcharts"
const { Html, Arc } = Guide;

class DashboardChart extends Component {
    onFirstLoad(ev) {
        if (this.props.onFirstLoad) {
            this.props.onFirstLoad(ev);
        }
    }
    onClickAction(ev) {
        if (this.props.onClickAction) {
            this.props.onClickAction(ev);
        }
    }
    render() {
        Shape.registerShape('point', 'pointer', {
            drawShape(cfg, group) {
                let point = cfg.points[0]; // 获取第一个标记点
                point = this.parsePoint(point);
                const center = this.parsePoint({ // 获取极坐标系下画布中心点
                    x: 0,
                    y: 0
                });
                // 绘制指针
                group.addShape('line', {
                    attrs: {
                        x1: center.x,
                        y1: center.y,
                        x2: point.x,
                        y2: point.y,
                        stroke: cfg.color,
                        lineWidth: 5,
                        lineCap: 'round'
                    }
                });
                return group.addShape('circle', {
                    attrs: {
                        x: center.x,
                        y: center.y,
                        r: 8,
                        stroke: cfg.color,
                        lineWidth: 4.5,
                        fill: '#fff'
                    }
                });
            }
        });

        const data = [
            { value: this.props.value || 90 }
        ];
        const cols = {
            'value': {
                min: 0,
                max: 100,
                tickInterval: 10,
                nice: false
            }
        }
        return (
            <Chart height={this.props.height || 300} data={data} scale={cols} padding={this.props.padding || [0, 0, 50, 0]} forceFit
                onGetG2Instance={(ev) => this.onFirstLoad(ev)}
                onPlotClick={(ev) => this.onClickAction(ev)}
            >
                <Coord type='polar' startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={this.props.radius || 0.85} />
                <Axis name='value'
                    zIndex={2}
                    line={null}
                    label={{
                        offset: -16,
                        textStyle: {
                            fontSize: 12,
                            fill: 'rgba(0, 0, 0, 0.45)',
                            textAlign: 'center',
                            textBaseline: 'middle'
                        }
                    }}
                    subTickCount={4}
                    subTickLine={{
                        length: -8,
                        stroke: '#fff',
                        strokeOpacity: 1
                    }}
                    tickLine={{
                        length: -18,
                        stroke: '#fff',
                        strokeOpacity: 1
                    }}
                />
                <Axis name="1" visible={false} />
                <Guide  >
                    <Arc zIndex={0} start={[0, 0.965]} end={[cols['value'].max, 0.965]}
                        style={{ // 底灰色
                            stroke: '#000',
                            lineWidth: 18,
                            opacity: 0.15
                        }} />
                    <Arc zIndex={1} start={[0, 0.965]} end={[data[0].value, 0.965]}
                        style={{ // 底灰色
                            stroke: this.props.color || '#4ed8da',
                            lineWidth: 18,
                        }} />
                    <Html position={this.props.position || ['50%', '95%']}
                        html={() => { 
                            return (`
                                <div style="width: 300px;text-align: center;font-size: 12px!important;">
                                    ${this.props.title || '<p style="font-size: 20px; color: rgba(0,0,0,0.45);margin: 0;">通过率</p>'}
                                    <p style="font-size: 20px;color: rgba(0,0,0,0.85);margin: 0;">${data[0].value}%</p>
                                </div>
                            `) }} />
                </Guide>
                <Geom type="point" position="value*1" shape='pointer' color={this.props.color || '#4ed8da'}
                    active={false}
                    style={{ stroke: '#fff', lineWidth: 1 }}
                />
            </Chart>
        )
    }
}

export default DashboardChart;