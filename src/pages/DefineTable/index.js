import React from 'react'
import { Row, Col } from 'antd'
import DynamicTable from './DynamicTable'
import DynamicTree from './DynamicTree'

class DefineTable extends React.Component{
    
	state = {
		columns: ""
	}
	
	getColumns = ary => {
		this.setState({
			columns: ary
		})
	}

    render () {
        return (
            <div className="common-content" style={{height: "100%"}}>
                    <Row  style={{height: "100%"}}>
                        <Col span="6"  style={{height: "100%"}}>
                                
                                <DynamicTree getColumns={this.getColumns} />

                        </Col>
                        <Col span="18" style={{height: "100%"}}>

                                <DynamicTable columns={this.state.columns} />
                            
                        </Col>
                    </Row>
            </div>
        )
    }
}

export default DefineTable