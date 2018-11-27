import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Select } from 'antd';
const Option = Select.Option;

class SelectYear extends Component {
    state = {
        data:[]
    }
    componentWillMount(){
        let data = [];
        let year = new Date().getFullYear();
        let years = this.props.years || 5;
        for (var i=year;i>year-years;i--){
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
            <Select style={this.props.style || {width: 120}} className={this.props.className}
                placeholder={this.props.placeholder || "选择年份"} 
                defaultValue={this.props.defaultYear} 
                onChange={(...data)=>this.handleChange(...data)}>
                {data.map((item)=><Option value={item} key={item} >{item}{this.props.unit || '年'}</Option>)}
            </Select>
        )
    }
}

export default withRouter(SelectYear);