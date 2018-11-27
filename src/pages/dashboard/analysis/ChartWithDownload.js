import React, { Component } from 'react';
import { Card,Button } from 'antd';
import BarChart from '../../../common/components/BizCharts/BarChart';

class ChartWidthDownload extends Component {
    state = {
        chartIns: {},
    }
    handleClick = () => {
        const chartIns = this.state.chartIns;
        const canvas = document.createElement('canvas');
        canvas.height = 350;
        canvas.width = 1000;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(chartIns.get('canvas')._cfg.el, 0, 0);
        var image = canvas.toDataURL("image/jpeg");
        var $a = document.createElement('a');
        $a.setAttribute("href", image);
        $a.setAttribute("download", this.props.title);
        $a.click();
    }
    render() {

        return (
            <React.Fragment>
                <Card title={this.props.title} style={{ marginTop: 20 }} extra={<Button onClick={this.handleClick}>下载</Button>}>
                    <BarChart
                        data={this.props.data}
                        onFirstLoad={chartIns => {
                            this.setState({ chartIns });
                        }}
                    />
                </Card>
            </React.Fragment>
        )
    }
}

export default ChartWidthDownload;