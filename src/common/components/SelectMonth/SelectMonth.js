import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Select } from 'antd';
const Option = Select.Option;

class SelectMonth extends Component {
    state = {
        data:[]
    }
    componentWillMount(){
        let data = [];
        for (let i=1;i<=12;i++){
            data.push(i)
        }
        this.setState({data});
    }
    handleChange(value){
        if(this.props.handleChange) this.props.handleChange(value);
    }
    render(){
        let data = this.state.data;
        return (
            <Select style={this.props.style || {width: 120}} placeholder="选择月份" onChange={(...data)=>this.handleChange(...data)}>
                {data.map((item)=><Option value={item} key={item} >{item}</Option>)}
            </Select>
        )
    }
}

export default withRouter(SelectMonth);