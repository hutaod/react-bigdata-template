import React, { Component } from 'react';
import { Breadcrumb, Card } from 'antd';
import PeopleRelation from '../../../common/components/D3/PeopleRelation';

class Relation extends Component {
    render() {
        const relationInfo = {
            "nodes": [
                { "image": "", "role": "female", "name": "吴智蕾" },
                { "image": "", "role": "male", "name": "季刚波" },
                { "image": "", "role": "male", "name": "傅欣" },
                { "image": "", "role": "female", "name": "王潘潘" },
                { "image": "", "role": "female", "name": "张旭" },
                { "image": "", "role": "male", "name": "赵海晶" }
            ],
            "edges": [
                { "source": 0, "target": 1, "relation": "老师" },
                { "source": 0, "target": 2, "relation": "老师" },
                { "source": 0, "target": 3, "relation": "老师" },
                { "source": 0, "target": 4, "relation": "老师" },
                { "source": 0, "target": 5, "relation": "老师" }
            ]
        };
        return (
            <div>
                <Breadcrumb  className="breadcrumb">
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>关系页</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <Card title="D3关系图">
                        <PeopleRelation
                            height={500}
                            data={relationInfo}
                        />
                    </Card>
                </div>
            </div>
            
        )
    }
}

export default Relation;