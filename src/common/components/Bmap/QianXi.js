import React, { Component } from 'react';
import { DataSet, baiduMapLayer, utilCityCenter,utilCurve, geojson } from 'mapv'
import chinajson from './china'
import { isObjectValueEqual } from '../../../utils'

const styleJson = [{
    "featureType": "water",
    "elementType": "all",
    "stylers": {
        "color": "#031628"
    }
}, {
    "featureType": "land",
    "elementType": "geometry",
    "stylers": {
        "color": "#000102"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#000000"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#147a92"
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#000000"
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#0b3d51"
    }
}, {
    "featureType": "local",
    "elementType": "geometry",
    "stylers": {
        "color": "#000000"
    }
}, {
    "featureType": "railway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#000000"
    }
}, {
    "featureType": "railway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#08304b"
    }
}, {
    "featureType": "subway",
    "elementType": "geometry",
    "stylers": {
        "lightness": -70
    }
}, {
    "featureType": "building",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#000000"
    }
}, {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#857f7f"
    }
}, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#000000"
    }
}, {
    "featureType": "building",
    "elementType": "geometry",
    "stylers": {
        "color": "#022338"
    }
}, {
    "featureType": "green",
    "elementType": "geometry",
    "stylers": {
        "color": "#062032"
    }
}, {
    "featureType": "boundary",
    "elementType": "all",
    "stylers": {
        "color": "#465b6c"
    }
}, {
    "featureType": "manmade",
    "elementType": "all",
    "stylers": {
        "color": "#022338"
    }
}, {
    "featureType": "label",
    "elementType": "all",
    "stylers": {
        "color": "#022338",
        "visibility": "off"
    }
}];

const BMap = window.BMap;

/**
 * datas 地图数据，数据格式 [{ from: '河北', count: 354551, to: to }, { from: '天津', count: 97323, to: to }]
 * styleJson  地图样式设置
 * height: 地图高度， 非必传  默认500
 * 
 */
class QianXi extends Component {
    constructor(props) {
        super(props);
        const mapId = 'map' + new Date().getTime();
        this.state = ({
            mapId
        });
    }
    makeMap = (data) => {
        // 百度地图API功能
        var map = new BMap.Map(this.state.mapId, {
            enableMapClick: false
        });    // 创建Map实例
        map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5);  // 初始化地图,设置中心点坐标和地图级别
        
        map.setMapStyle({
            styleJson: this.props.styleJson || styleJson
        });
        
        var geojsonOptions = {
            gradient: {
                0: 'rgba(55, 50, 250, 0.4)',
                1: 'rgba(55, 50, 250, 1)'
            },
            max: 354551,
            draw: 'intensity'
        }

        var geojsonDataSet = geojson.getDataSet(chinajson);

        // var to = '北京';
        const datas = data || [];

        var qianxi = new DataSet(datas);
        var qianxiData = qianxi.get();
        var lineData = [];
        var pointData = [];
        var textData = [];
        var timeData = [];
        var citys = {}

        for (var i = 0; i < qianxiData.length; i++) {
            var fromCenter = utilCityCenter.getCenterByCityName(qianxiData[i].from);
            var toCenter = utilCityCenter.getCenterByCityName(qianxiData[i].to);
            if (!fromCenter || !toCenter) {
                continue;
            }
            citys[qianxiData[i].from] = qianxiData[i].count;
            citys[qianxiData[i].to] = qianxiData[i].count;
            pointData.push({
                geometry: {
                    type: 'Point',
                    coordinates: [fromCenter.lng, fromCenter.lat]
                }
            });
            pointData.push({
                geometry: {
                    type: 'Point',
                    coordinates: [toCenter.lng, toCenter.lat]
                }
            });
            textData.push({
                geometry: {
                    type: 'Point',
                    coordinates: [fromCenter.lng, fromCenter.lat]
                },
                text: qianxiData[i].from
            });
            textData.push({
                geometry: {
                    type: 'Point',
                    coordinates: [toCenter.lng, toCenter.lat]
                },
                text: qianxiData[i].to
            });

            var curve = utilCurve.getPoints([fromCenter, toCenter]);

            for (let j = 0; j < curve.length; j++) {
                timeData.push({
                    geometry: {
                        type: 'Point',
                        coordinates: curve[j]
                    },
                    count: 1,
                    time: j
                });
            }

            lineData.push({
                geometry: {
                    type: 'LineString',
                    coordinates: curve
                    //coordinates: [[fromCenter.lng, fromCenter.lat], [toCenter.lng, toCenter.lat]]
                },
                count: 30 * Math.random()
            });

        }

        var ds = geojsonDataSet.get({
            filter: function (item) {

                if (!citys[item.name]) {
                    return false;
                }

                item.count = citys[item.name];
                return true;
            }
        });
        geojsonDataSet = new DataSet(ds);

        new baiduMapLayer(map, geojsonDataSet, geojsonOptions);

        var textDataSet = new DataSet(textData);
        
        var textOptions = {
            draw: 'text',
            font: '14px Arial',
            fillStyle: 'white',
            shadowColor: 'yellow',
            shadowBlue: 10,
            zIndex: 11,
            shadowBlur: 10
        }

        new baiduMapLayer(map, textDataSet, textOptions);

        var lineDataSet = new DataSet(lineData);

        var lineOptions = {
            strokeStyle: 'rgba(255, 250, 50, 0.8)',
            shadowColor: 'rgba(255, 250, 50, 1)',
            shadowBlur: 20,
            lineWidth: 2,
            zIndex: 100,
            draw: 'simple'
        }

        new baiduMapLayer(map, lineDataSet, lineOptions);

        var pointOptions = {
            fillStyle: 'rgba(254,175,3,0.7)',
            shadowColor: 'rgba(55, 50, 250, 0.5)',
            shadowBlur: 10,
            size: 5,
            zIndex: 10,
            draw: 'simple'
        }

        
        var pointDataSet = new DataSet(pointData);

        new baiduMapLayer(map, pointDataSet, pointOptions);


        var timeDataSet = new DataSet(timeData);

        var timeOptions = {
            fillStyle: 'rgba(255, 250, 250, 0.5)',
            zIndex: 200,
            size: 2.5,
            animation: {
                type: 'time',
                stepsRange: {
                    start: 0,
                    end: 50
                },
                trails: 10,
                duration: 2,
            },
            draw: 'simple'
        }

        new baiduMapLayer(map, timeDataSet, timeOptions);
    }
    componentDidMount() {
        this.makeMap(this.props.datas);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.datas && !isObjectValueEqual(nextProps.datas,this.props.datas)) {
            setTimeout(() => {
                // 根据停留点，计算移动点，最终生成所有点的百度坐标， 开始路书配置...
                this.makeMap(nextProps.datas)
            },50)
        }
    }
    render(){
        return (
            <div id={this.state.mapId} style={this.props.style || {height: this.props.height || 500 }}></div>
        )
    }
}

export default QianXi;