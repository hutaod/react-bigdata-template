import React, { Component } from 'react';
import HotMap from '../../../common/components/Bmap/HotMap';
import { Button } from 'antd';

class Trail extends Component {
    state = {
        data: [],
    }
    getData = () => {
        const data = [
            {"longitude":118.721777,"latitude":32.209229,"amount":236},
            {"longitude":118.72369,"latitude":32.210791,"amount":16},
            {"longitude":118.722662,"latitude":32.210581,"amount":16},
            {"longitude":118.721642,"latitude":32.209538,"amount":660}
        ]
        let newData = [];
        data.forEach(
            (item) => {
                newData.push({
                    "lng":item.longitude,
                    "lat":item.latitude,
                    "count": item.amount
                })
            }
        );
        this.setState({data: newData});
    }
    render() {
        
        return (
            <React.Fragment>
                <div style={{marginBottom:20}}>
                    <Button onClick={this.getData}>获取数据</Button>
                </div>
                <HotMap data={this.state.data} initMap={(map)=>{
                    map.enableScrollWheelZoom(true);
                    map.centerAndZoom(new window.BMap.Point(118.888506, 31.928563),18);
                    map.setCurrentCity("南京");
                }}/>
            </React.Fragment>
        )
    }
}

export default Trail;