import React, { Component } from 'react';
import { Card } from 'antd';
import Progress from '../../../common/components/Progress';
import girlPng from './img/people-g.png';
import boyPng from './img/people-b.png';
import Yprogress from '../../../common/components/Progress/yProgress';

class ProgressCont extends Component {
    render() {
        return (
            <React.Fragment>
                <Card title={'学习进度'}>
                    <Progress width={340}
                        processWidth={30}
                        color={'#e06950'}
                        process={20}
                        title={'20%'}
                        desc={'学习进度'} />
                </Card>
                <Card title={'男女比例'} style={{ marginTop: 20 }}>
                    <Progress width={440}
                        processWidth={25}
                        silderWidth={100}
                        color={'#c04dd8'}
                        bgColor={'#f0c757'}
                        process={40}
                        title={<span style={{ fontSize: 35, color: '#9b9b9b' }}>100</span>}
                        desc={<span style={{ fontSize: 12, color: '#9b9b9b' }}>人</span>}
                        left={<img src={girlPng} style={{ marginRight: 30 }} alt="girl" />}
                        right={<img src={boyPng} style={{ marginLeft: 30 }} alt="boy" />}
                    />
                </Card>
                <Card title={'进度条'} style={{ marginTop: 20 }}>
                    <Yprogress
                        value={10}
                        total={100}
                        color={'rgb(224, 105, 80)'}
                        bgColor={'rgb(233, 233, 233)'}
                    />
                </Card>
            </React.Fragment>
        )
    }
}

export default ProgressCont;