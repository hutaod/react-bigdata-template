import React, { Component } from 'react';

/**
 * chartIns BizChart实例
 * title 图片下载名称
 * imageType 图片类型 默认"image/jpeg"
 * fillStyle 图片背景填充颜色 默认#fff白色
 */
class DownloadChart extends Component {
    handleClick = () => {
        const { chartIns, title, imageType, fillStyle } = this.props;
        if(!chartIns){
            console.error('下载组件缺少参数chartIns');
            return;
        }
        const canvas = document.createElement('canvas');
        canvas.height = chartIns.get('canvas')._cfg.el.height;
        canvas.width = chartIns.get('canvas')._cfg.el.width;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = fillStyle || "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(chartIns.get('canvas')._cfg.el, 0, 0);
        var image = canvas.toDataURL(imageType || "image/jpeg");
        var $a = document.createElement('a');
        $a.setAttribute("href", image);
        $a.setAttribute("download", title);
        $a.click();
    }
    render() {

        return (
            <span onClick={this.handleClick}>
                {this.props.children}
            </span>
        )
    }
}

export default DownloadChart;