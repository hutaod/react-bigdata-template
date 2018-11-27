import React, { Component } from 'react';

class Index extends Component {
    // 参数
    // value={10} 当前值
    // total={100} 总值
    // color={'rgb(224, 105, 80)'} 当前值对应颜色
    // bgColor={'rgb(233, 233, 233)'} 背景颜色
    render() {
        const { value, total, color, bgColor } = this.props;
        const style = {
            positon: 'relative',
            width: '100%',
            height: '20px',
            borderRadius: '10px',
            background: `linear-gradient(to right,${color}, ${color} ${value / total * 100}%, ${bgColor} ${value / total * 100}%)`,
        }
        const textStyle = {
            position: 'absolute',
            right: `${(1 - value / total) * 100}%`,
            color: '#fff',
            padding: '0px 5px',
        }
        return (
            <div>
                <div style={style}><span style={textStyle}>{this.props.value || 0}本</span></div>
            </div>
        )
    }
}

export default Index;
