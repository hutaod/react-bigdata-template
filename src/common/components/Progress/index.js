import React, {Component} from 'react';
import './Progress.less'

/**
 * 进度条
 * widthAuto  宽度是否自适应
 * width  宽度设置，默认300
 * maxWidth  最大宽度设置 默认无
 * silderWidth  进度条两边内容占据宽度  默认40
 * processWidth  进度条宽度  默认30
 * process  进度 0-100  表示0%-100%
 * bgColor  进度条底色  默认'#e9e9e9'
 * color  进度条颜色  默认'#4ed8da'
 * left  左侧显示内容  默认0
 * right  右侧显示内容  默认100%
 * title  标题
 * desc  描述
 */
class Progress extends Component {
    state = {
        processBox:'processBox',
        pwidth:null
    }
    constructor(props) {
        super(props);
        this.resize.bind(this);
    }
    componentDidMount(){
        if(this.props.widthAuto){
            this.resize();
            window.addEventListener('resize', this.resize.bind(this));
        }
    }
    resize(){
        if(this.refs.processBox && this.refs.processBox.parentNode){
            this.setState({
                pwidth: this.refs.processBox.parentNode.clientWidth || 300
            })
        }
    }
    componentWillUnmount(){
        if(this.props.widthAuto){
            window.removeEventListener('resize', this.resize.bind(this));
        }
    }
    render() {
        let silderWidth,width,processWidth,curProcess,boxStyle,bigCircleStyle,circleStyle,processStyle;
        width = this.state.pwidth || (this.props.width || 300);
        silderWidth = this.props.silderWidth || 40;
        if(this.props.maxWidth && width>this.props.maxWidth){
            width = this.props.maxWidth;
        }
        processWidth = this.props.processWidth || 30;
        curProcess = this.props.process || 50;
        //盒子样式
        boxStyle = {
            width,
            height:(width-silderWidth*2)/2,
            padding:`0 ${silderWidth}px`
        };
        //外圈样式
        bigCircleStyle = {
            width:width-silderWidth*2,
            height:(width-silderWidth*2)/2,
            borderTopLeftRadius:(width-silderWidth*2)/2,
            borderTopRightRadius:(width-silderWidth*2)/2,
            padding:`${processWidth}px ${processWidth}px 0 ${processWidth}px`,
            backgroundColor: this.props.bgColor || '#e9e9e9',
        }
        //内圈样式
        circleStyle = {
            width:width-silderWidth*2-processWidth*2,
            height:(width-silderWidth*2-processWidth*2)/2,
            borderTopLeftRadius:(width-silderWidth*2-processWidth*2)/2,
            borderTopRightRadius:(width-silderWidth*2-processWidth*2)/2
        }
        //进度样式
        processStyle = {
            width:width-silderWidth*2,
            height:(width-silderWidth*2)/2,
            borderTopLeftRadius:(width-silderWidth*2)/2,
            borderTopRightRadius:(width-silderWidth*2)/2,
            backgroundColor: this.props.color || '#4ed8da',
            transform: `rotateZ(${180+(curProcess*1.8)}deg)`
        }

        let left = this.props.left || 0; // 左侧显示内容
        let right = this.props.right || '100%'; // 右侧显示内容
        let title = this.props.title; // 标题
        let desc = this.props.desc; // 描述
        return (
            <div className={"compt-progress"} style={boxStyle} ref={this.state.processBox}>
                <div className={"main"} style={bigCircleStyle}>
                    <div className={"processBar"} style={processStyle}></div>
                    <div className={"cont"} style={circleStyle}>
                        <p className={"title"}>{title}</p>
                        <p className={"desc"}>{desc}</p>
                    </div>
                </div>
                <div className={"left"} style={{width:silderWidth}}>{left}</div>
                <div className={"right"} style={{width:silderWidth}}>{right}</div>
            </div>
        )
    }
}

export default Progress