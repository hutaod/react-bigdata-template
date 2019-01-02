import React, { Component } from 'react';
import { Breadcrumb, Card, Row, Col,Button} from 'antd';
let POBrowser

class PageOffice extends Component {  
    constructor(){
        super()
        PageOffice.test=this.test.bind(this)  //方法一，将静态方法绑定到class上
    }  
    componentDidMount() {       
        POBrowser=window.POBrowser
        // window.__react=this   //方法二，将组件实例绑定到window上面
    }
    openWord=()=>{
        POBrowser.openWindowModeless('http://192.168.102.171:8080/word','width=1200px;height=800px;')
    }   
    test(name){
        console.log(name)
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

window.refresh=function(name){
    // console.log(window.__react.test())
    console.log(PageOffice.test(name))
}
export default PageOffice;