import React from 'react';
import NoData from '../NoData/NoDataComponent'; //暂无数据组件
import { isObjectValueEqual } from '../../../utils'

/**
 * 可接收数据
 * data  数据格式[{"lng":'12222',"lat":'2211',"count":'2212'},{"lng":'12222',"lat":'2211',"count":'2212'}]
 *          lng: 经度，lat: 纬度， count: 数量
 * height: 地图高度， 非必传  默认400
 * initMap  百度地图初始化组件 数据格式： function
 */

let BMap = window.BMap; //  全局获取BMap
let BMapLib = window.BMapLib; // 全局获取BMapLib

class HotMap extends React.Component {
	
	constructor(props){
		super(props);
		const mapId = 'map' + new Date().getTime();
		this.state={
			mapId
		}
	}
	
	initMap = () => {
        //无BMap时，比如无网络情况下
        if(!BMap){
            return;
        }
        if(typeof this.props.initMap === 'function'){
            let map = new BMap.Map(this.state.mapId);
            this.props.initMap(map);
        }
    }
	makeMap = (data) => {
		//无BMap时，比如无网络情况下
        if(!BMap){
            return;
        }
		let map = new BMap.Map(this.state.mapId);
	    let point = new BMap.Point(data[0].lng, data[0].lat);
	    map.centerAndZoom(point, 17);
	    map.enableScrollWheelZoom();
		let heatmapOverlay = new BMapLib.HeatmapOverlay({
            "radius":30,
            "gradient":{
                .1:'rgb(136, 141, 249)',
                .2:'rgb(115, 233, 250)',
                  .3:'rgb(94, 245, 67)',
                  .4:'rgb(255, 249, 11)',
                  .5:'rgb(255, 10, 0)'
            }
        });
        map.addOverlay(heatmapOverlay);
        
        let average;
		let total = 0;
		data.forEach(
			(item) => {
				total = total + (item.count - 0)
			}
		);
        average = Math.ceil(total / data.length);
        
		heatmapOverlay.setDataSet({data:data,max:average});
		heatmapOverlay.show();
	}
	
	componentWillReceiveProps(nextProps) {
        if (nextProps.data && !isObjectValueEqual(nextProps.data,this.props.data)) {
            setTimeout(() => {
                // 根据停留点，计算移动点，最终生成所有点的百度坐标， 开始路书配置...
                this.makeMap(nextProps.data)
            },50)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (isObjectValueEqual(nextProps.data,this.props.data)) {
            return false;
        } else {
            return true;
        }
    }
	
	componentDidMount(){
        setTimeout(() => {
            // 显示初始化地图方法
            this.initMap()
        },50)
    }
	
	render () {
		if (!BMap) {
			return (
                <div style={{ backgroundColor: '#fff' }}><NoData data={'nodata'} height={this.props.height || 400}/></div>
            )
		} else{
			return (
				<div id={this.state.mapId} style={{width: "100%", height: this.props.height || 400}}></div>
			)
		}
	}
}

export default HotMap;