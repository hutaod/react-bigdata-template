import React from "react";
import {
  Chart,
  Geom,
  Tooltip,
  Coord,
  Shape,
} from "bizcharts";
import DataSet from "@antv/data-set";
import NoData from '../NoData/NoDataComponent';

class WordCloudChart extends React.Component {
  // 第一次加载完触发事件
  onFirstLoad(ev) {
    if (this.props.onFirstLoad) {
      this.props.onFirstLoad(ev);
    }
  }
  // 点击事件
  onClickAction(ev) {
    if (this.props.onClickAction) {
      this.props.onClickAction(ev);
    }
  }
  render() {
    /**
         * 可接受参数设置
         * height  高度，默认350
         * data  数据，json格式
         * padding  设置内边距 数组格式，默认[30, 20, 60, 50]
         * onFirstLoad  第一次加载完触发事件
         * onClickAction  点击事件
         */
    function getTextAttrs(cfg) {
      return Object.assign(
        {},
        {
          fillOpacity: cfg.opacity,
          fontSize: cfg.origin._origin.size,
          rotate: cfg.origin._origin.rotate,
          text: cfg.origin._origin.text,
          textAlign: "center",
          fontFamily: cfg.origin._origin.font,
          fill: cfg.color,
          textBaseline: "Alphabetic"
        },
        cfg.style
      );
    } // 给point注册一个词云的shape

    Shape.registerShape("point", "cloud", {
      drawShape(cfg, container) {
        const attrs = getTextAttrs(cfg);
        return container.addShape("text", {
          attrs: Object.assign(attrs, {
            x: cfg.x,
            y: cfg.y
          })
        });
      }
    });
    const height = this.props.height || 350; // 高度设置，默认值
    const data = this.props.data || []; // 数据
    const dv = new DataSet.View().source(data);
    let fields = []; // 获取关键字
    const range = dv.range("value");
    const min = range[0];
    const max = range[1];
    if (data && data[0]) {
      // 获取json对象子节点除去第一个键的其他键字段集合
      Object.keys(data[0]).forEach((item, index) => {
        if (index === 0 || index === 1) {
          fields.push(item);
        }
      })
    } else {
      // 无数据时
      return (<NoData height={height} data={'nodata'} />);
    }
    dv.transform({
      type: "tag-cloud",
      fields: fields.length > 0 ? fields : ['null'],
      font: "Verdana",
      padding: 0,
      timeInterval: 5000,

      // max execute time
      rotate() {
        let random = ~~(Math.random() * 4) % 4;

        if (random === 2) {
          random = 0;
        }

        return random * 90; // 0, 90, 270
      },

      fontSize(d) {
        if (d.value) {
          return ((d.value - min) / (max - min)) * (80 - 24) + 24;
        }

        return 0;
      }
    });
    const scale = {
      x: {
        nice: false
      },
      y: {
        nice: false
      }
    };
    return (
      <div>
        <Chart
          height={height}
          data={dv}
          scale={scale}
          padding={this.props.padding || [30, 20, 60, 50]}
          forceFit
          onGetG2Instance={(ev) => this.onFirstLoad(ev)}
          onPlotClick={(ev) => this.onClickAction(ev)}
        >
          <Tooltip showTitle={false} />
          <Coord reflect="y" />
          <Geom
            type="point"
            position="x*y"
            color="category"
            shape="cloud"
            tooltip="value*category"
          />
        </Chart>
      </div>
    );
  }
}

export default WordCloudChart;
