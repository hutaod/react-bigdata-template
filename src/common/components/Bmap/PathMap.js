import React from 'react';
import Red from './img/red.png'; // 移动中的红色箭头
import StopMark from './img/stop.png'; // 停留点图标
import Start from './img/start.png'; // 起始点图标
import End from './img/end.png'; // 终点图标
import NoData from '../NoData/NoDataComponent'; //暂无数据组件
import { isObjectValueEqual } from '../../../utils'

// 在index.html中引入百度地图以及路书
// <script src="http://api.map.baidu.com/api?v=2.0&ak=moMIflSL2yGiq3VwQ3bynEKE7gl2cjQw"></script>
// <script type="text/javascript" src="http://api.map.baidu.com/library/LuShu/1.2/src/LuShu_min.js"></script>
// 没有import引入， 通过window全局拿取BMap，BMapLib;
const BMap = window.BMap;
const BMapLib = window.BMapLib;
/**
 * 可接收数据 
 * data  数据格式[{"lng":118.88795,"lat":31.935234 ,"stay":'4',"address":"南京工程大学食堂"}]
 *          lng: 经度，lat: 纬度， stay: 停留时间， address: 地址
 * name  人物姓名
 * height: 地图高度， 非必传  默认400
 * initMap  百度地图初始化组件 数据格式： function
 */
class PathMap extends React.Component {

    constructor(props) {
        super(props);
        const mapId = 'map' + new Date().getTime();
        this.state = {
        	mapId,
            allpoints: [] // 后端传递的只是停留点， 路径点的坐标需要百度api计算， 最后按顺序合并所有的点，存储在这个位置
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
    // 根据后端传递过来的停留点， 以及百度api，计算所有渲染地图所需要的坐标点
    // 转换数据， 从“请求获得的数据” =》 转换为 “请求的数据（停留点） + 百度地图计算获得的移动点数据”
    // 这里有个惊天dabug， 请注意， setSearchCompleteCallback方法为异步。 并且会无序执行多次；
    makeMapData = (record) => {
        //无BMap时，比如无网络情况下
        if(!BMap){
            return;
        }
        // 实例化一开始的地图， 主要用于百度地图计算无法获取的移动点的数据
        let map = new BMap.Map(this.state.mapId);
        map.enableScrollWheelZoom();
        map.centerAndZoom();
        let data = record;
        let ary = [];// 为以上所说bug准备，存储获得的移动点数据
        data.forEach((item, index) => {
            if (index !== (data.length - 1)) { // 最后一个点为终点， 不需要计算移动点数据
                // 百度walking， 自动计算移动点数据
                var walking = new BMap.WalkingRoute(map, { renderOptions: { map: map, autoViewport: true } });
                walking.search(new BMap.Point(data[index].lng, data[index].lat), new BMap.Point(data[index - 0 + 1].lng, data[index - 0 + 1].lat));
                // 异步， 多次调用， 上面说的bug就是在这个位置
                walking.setSearchCompleteCallback(() => {
                    let pts = walking.getResults().getPlan(0).getRoute(0).getPath();
                    // 先将停留点数据注入
                    let ptsObj = [
                        {
                            lng: item.lng + "",
                            lat: item.lat + "",
                            stay: item.stay,
                            address: item.address
                        }
                    ];
                    // 再将计算得到的移动点数据注入
                    pts.forEach((unit) => {
                        ptsObj.push({
                            lng: unit.lng + "",
                            lat: unit.lat + "",
                            stay: "",
                            address: ""
                        })
                    })
                    ary[index] = ptsObj;
                })
            } else if (index === (data.length - 1)) { // 计算最后一个点时
                setTimeout(() => { // 注意  上方的回调setSearchCompleteCallback是异步， 这里也必须是异步
                    let allPoints = []; // 合并所有停留点以及移动点数据
                    ary.forEach((aryitem) => {
                        allPoints = allPoints.concat(aryitem);
                    })
                    allPoints.push({
                        lng: item.lng + "",
                        lat: item.lat + "",
                        stay: item.stay,
                        address: item.address
                    })
                    this.start(allPoints); // 调用此方法，渲染最终想要的效果页面
                    this.setState({
                        allpoints: allPoints
                    })
                }, 500)
            }
        })
    }

    // 所有坐标点就位后，开始绘制地图
    start = (arrPoisData) => {
        // 获取所有点的数据后， 重新实例化百度地图
        let map = new BMap.Map(this.state.mapId);
        map.enableScrollWheelZoom();
        map.centerAndZoom();
        let lushu; // 定义路书

        // 设置添加路线
        let arrPois = []; // 将所有传进来的数据点转换成百度坐标点 new BMap.point(lng: "xx", lat: "xx");
        arrPoisData.forEach((item) => {
            arrPois.push(new BMap.Point(item.lng, item.lat))
        });
        // 初始线路样式(移动之前的浅颜色线条)
        map.addOverlay(
            new BMap.Polyline(
                arrPois, {
                    strokeColor: '#10c55b',
                    strokeWeight: 4,
                    strokeOpacity: 0.4
                }
            )
        );
        map.setViewport(arrPois);

        // 设置停留点数据
        let landmarkPoisData = [];
        arrPoisData.forEach((item, index) => {
            if (item.stay && index !== 0) { // 存在停留时间时添加停留点并且起始点不停留
                landmarkPoisData.push({
                    lng: item.lng, // 停留点经度
                    lat: item.lat, // 停留点纬度
                    // 移动到停留点时需要显示的信息
                    html: `<table class='maplable'>
									<tr>
										<td>姓名：</td>
										<td>${this.props.name}</td>
									</tr>
									<tr>
										<td>状态：</td>
										<td>停留${item.stay}小时</td>
									</tr>
									<tr>
										<td>地址：</td>
										<td>${item.address}</td>
									</tr>
								</table>`,
                    pauseTime: 2 // 停留时间
                })
            }
        });

        // 设置起始位置覆盖物maker
        let startMarker = new BMap.Marker(
            arrPois[0],
            {
                icon: new BMap.Icon(
                    Start,
                    new BMap.Size(24, 24), {
                        anchor: new BMap.Size(12, 24)
                    }
                )
            }
        );
        map.addOverlay(startMarker);

        // 设置结束位置覆盖物maker
        let endMarker = new BMap.Marker(
            arrPois[arrPois.length - 1],
            {
                icon: new BMap.Icon(
                    End,
                    new BMap.Size(24, 24), {
                        anchor: new BMap.Size(12, 24)
                    }
                )
            }
        );
        map.addOverlay(endMarker);

        // 设置停留点覆盖物maker以及点击事件
        arrPoisData.forEach((item, index) => {
            if (item.stay && index !== 0 && index !== (arrPoisData.length - 1)) { // 去掉起始结束位置（已有图标）
                // 停留点覆盖物maker图标以及偏移量
                let stopMarker = new BMap.Marker(
                    arrPois[index],
                    {
                        icon: new BMap.Icon(
                            StopMark,
                            new BMap.Size(16, 16), {
                                anchor: new BMap.Size(8, 16)
                            }
                        )
                    }
                );

                // 停留点覆盖物信息窗口配置
                let opts = {
                    width: 180,     // 信息窗口宽度
                    overflow: "hidden",     // 信息窗口高度
                    title: "", // 信息窗口标题
                    enableMessage: true,//设置允许信息窗发送短息
                    message: ""
                };

                // 创建信息窗口对象
                let infoWindow = new BMap.InfoWindow(
                    `<table style='font-size: 12px;line-height: 20px;'>
								<tr>
									<td>姓名：</td>
									<td>${this.props.name}</td>
								</tr>
								<tr>
									<td>状态：</td>
									<td>停留${item.stay}小时</td>
								</tr>
								<tr>
									<td>地址：</td>
									<td>${item.address}</td>
								</tr>
							</table>`,
                    opts
                );

                // 停留点覆盖物监听事件
                stopMarker.addEventListener("click", () => {
                    //开启信息窗口
                    map.openInfoWindow(infoWindow, arrPois[index]);
                });
                // 添加停留点覆盖物maker
                map.addOverlay(stopMarker);
            }
        })

        // 路书原型设置
        BMapLib.LuShu.prototype._move = function (initPos, targetPos, effect) {// 不要使用箭头函数
            let pointsArr = [initPos, targetPos]; //点数组
            let me = this, //当前的帧数
                currentCount = 0, //步长，米/秒
                timer = 10,
                step = this._opts.speed / (1000 / timer), //初始坐标
                init_pos = this._projection.lngLatToPoint(initPos), //获取结束点的(x,y)坐标
                target_pos = this._projection.lngLatToPoint(targetPos), //总的步长
                count = Math.round(me._getDistance(init_pos, target_pos) / step);

            // 移动过后的折线 
            this._map.addOverlay(new BMap.Polyline(pointsArr, {
                strokeColor: "#10c55b",
                strokeWeight: 5,
                strokeOpacity: 0.8
            }));

            //如果小于1直接移动到下一点
            if (count < 1) {
                me._moveNext(++me.i);
                return;
            }

            me._intervalFlag = setInterval(
                () => {
                    //两点之间当前帧数大于总帧数的时候，则说明已经完成移动
                    if (currentCount >= count) {
                        clearInterval(me._intervalFlag);
                        //移动的点已经超过总的长度
                        if (me.i > me._path.length) {
                            return;
                        }
                        //运行下一个点
                        me._moveNext(++me.i);
                    } else {
                        currentCount++;
                        let x = effect(init_pos.x, target_pos.x, currentCount, count),
                            y = effect(init_pos.y, target_pos.y, currentCount, count),
                            pos = me._projection.pointToLngLat(new BMap.Pixel(x, y));
                        //设置移动的maker
                        if (currentCount === 1) {
                            let proPos = null;
                            if (me.i - 1 >= 0) {
                                proPos = me._path[me.i - 1];
                            }
                            if (me._opts.enableRotation === true) {
                                me.setRotation(proPos, initPos, targetPos);
                            }
                            if (me._opts.autoView) {
                                if (!me._map.getBounds().containsPoint(pos)) {
                                    me._map.setCenter(pos);
                                }
                            }
                        }
                        // 正在移动
                        me._marker.setPosition(pos);
                        //设置自定义overlay的位置
                        me._setInfoWin(pos);

                        // 当移动点到达目的地时，重置并且循环
                        if (me.i >= arrPois.length - 2) {
                            setTimeout(function () {
                                clearInterval(me._intervalFlag);
                                currentCount = 0;
                                me.i = 0;
                                lushu.start();
                            }, 2000)
                        }
                    }
                },
                timer
            );
        };

        // 路书
        lushu = new BMapLib.LuShu(
            map,
            arrPois, {
                // 移动点上方， 默认显示的信息
                defaultContent: `<table class='maplable'>
										<tr>
											<td>姓名：</td>
											<td>${this.props.name}</td>
										</tr>
										<tr>
											<td>状态：</td>
											<td>移动中</td>
										</tr>
									</table>`,
                autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                icon: new BMap.Icon(
                    Red,
                    new BMap.Size(24, 22), {
                        anchor: new BMap.Size(12, 11)
                    }
                ),
                speed: 200,
                enableRotation: true, //是否设置移动的marker随着道路的走向进行旋转
                landmarkPois: landmarkPoisData
            }
        );

        lushu.start();

    }

    componentDidMount(){
        setTimeout(() => {
            // 显示初始化地图方法
            this.initMap()
        },50)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && !isObjectValueEqual(nextProps.data,this.props.data)) {
            setTimeout(() => {
                // 根据停留点，计算移动点，最终生成所有点的百度坐标， 开始路书配置...
                this.makeMapData(nextProps.data)
            },50)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (isObjectValueEqual(nextProps.data,this.props.data) && nextProps.name === this.props.name) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        if (!BMap) {
            return (
                <div style={{ backgroundColor: '#fff' }}><NoData data={'nodata'} height={this.props.height || 400}/></div>
            )
        } else {
            return (
                <div id={this.state.mapId} style={{ width: "100%", height: this.props.height || 400 }}></div>
            )
        }
    }
}

export default PathMap;

