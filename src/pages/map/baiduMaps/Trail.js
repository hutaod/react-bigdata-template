import React, { Component } from 'react';
import PathMap from '../../../common/components/Bmap/PathMap';
import { Button } from 'antd';

class Trail extends Component {
    state = {
        data: [],
    }
    getData = () => {
        const data = [
            { "id": "e7cc29963a524f79acf1586946f01001", "studentNo": "131594206", "address": "南京工程大学食堂", "startTime": "2018-08-29 00:10:00", "endTime": "2018-08-29 00:11:00", "stayTime": "1", "longitude": 118.88795, "latitude": 31.935234 },
            { "id": "e7cc29963a524f79acf1586946f01002", "studentNo": "131594206", "address": "南京工程大学食堂", "startTime": "2018-08-29 00:12:00", "endTime": "2018-08-29 00:13:00", "stayTime": "2", "longitude": 118.885255, "latitude": 31.932775 },
            { "id": "e7cc29963a524f79acf1586946f01004", "studentNo": "131594206", "address": "南京工程大学食堂", "startTime": "2018-08-29 00:16:00", "endTime": "2018-08-29 00:17:00", "stayTime": "4", "longitude": 118.899282, "latitude": 31.932679 },
            { "id": "e7cc29963a524f79acf1586946f01005", "studentNo": "131594206", "address": "南京工程大学食堂", "startTime": "2018-08-29 00:18:00", "endTime": "2018-08-29 00:19:00", "stayTime": "5", "longitude": 118.886036, "latitude": 31.926738 },
            { "id": "e7cc29963a524f79acf1586946f01006", "studentNo": "131594206", "address": "南京工程大学食堂", "startTime": "2018-08-29 00:20:00", "endTime": "2018-08-29 00:21:00", "stayTime": "6", "longitude": 118.895352, "latitude": 31.927519 },
            { "id": "e7cc29963a524f79acf1586946f01003", "studentNo": "131594206", "address": "南京工程大学食堂", "startTime": "2018-08-29 00:22:00", "endTime": "2018-08-29 00:23:00", "stayTime": "3", "longitude": 118.891839, "latitude": 31.929151 }
        ]
        let newData = []; // 后端数据有出入， 循环遍历一下
        data.forEach((item) => {
            newData.push(
                {
                    lng: item.longitude,
                    lat: item.latitude,
                    stay: item.stayTime,
                    address: item.address
                }
            )
        })
        this.setState({data: newData});
    }
    render() {
        
        return (
            <React.Fragment>
                <div style={{marginBottom:20}}>
                    <Button onClick={this.getData}>获取数据</Button>
                </div>
                <PathMap data={this.state.data} name={'123'} initMap={(map)=>{
                    map.enableScrollWheelZoom(true);
                    map.centerAndZoom(new window.BMap.Point(118.888506, 31.928563),18);
                    map.setCurrentCity("南京");
                }}/>
            </React.Fragment>
        )
    }
}

export default Trail;