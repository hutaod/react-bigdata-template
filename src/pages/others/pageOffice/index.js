import React, { Component } from 'react';
import { Breadcrumb, Card, Row, Col,Button} from 'antd';
let POBrowser
class PageOffice extends Component {    
    componentDidMount() {       
        POBrowser=window.POBrowser
    }
    openWord=()=>{
        POBrowser.openWindowModeless('http://192.168.102.119:8001/word?name=zhouqinghui','width=1200px;height=800px;')
    }    
    render() {
        return (
            <React.Fragment>
                <Breadcrumb  className="breadcrumb">
                    <Breadcrumb.Item>其他组件</Breadcrumb.Item>
                    <Breadcrumb.Item>PageOffice</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <Row>
                        <Col span={24}>
                            <Card title="PageOffice">
                                <Button onClick={this.openWord}>打开word</Button>
                            </Card>
                        </Col>
                       
                    </Row>                    
                </div>
            </React.Fragment>
        );
    }
}

export default PageOffice;