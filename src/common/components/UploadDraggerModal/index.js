import React, { Component } from 'react'
import MainModal from '../MainModal'
import { Upload, Icon, message } from 'antd';

const Dragger = Upload.Dragger;

class ImportModel extends Component {
    state = {
        fileList:[],
        dataLists:[]
    }
    componentWillMount(){
        const options = {
            accept: this.props.accept || 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            action: this.props.action,
            onChange:this.handleChange
        };
        this.setState({options})
    }
    onOk = ()=> {
        if(this.state.dataLists && this.state.dataLists.length>0){
            this.props.onOk(this.state.dataLists);
        } else {
            message.warn('您还未上传文件！');
        }
    }
    handleChange = (info) => {
        let fileList = info.fileList;
        fileList = fileList.filter((file) => {
            if (file.response) {
                return file.response.success;
            }
          return true;
        });

        const status = info.file.status;
        if (status === 'done') {
            if(info.file.response.success){
                // console.log(info.file.response.obj)
                this.setState({dataLists:info.file.response.obj || []})
                message.success(`${info.file.name} 上传成功.`);
            } else {
                message.error(info.fileList[0].response.msg);
            }
        } else if (status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
        this.setState({ fileList });
    }
    render() {
        
        return (
            <MainModal
                title={this.props.title || '导入文件'}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                onOk={this.onOk}
                width={600}
            >
                <div style={{padding:'20px 100px'}}>
                    <Dragger {...this.state.options} fileList={this.state.fileList}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
                        <p className="ant-upload-hint">仅支持Excel文件</p>
                    </Dragger>
                </div>
            </MainModal>
        )
    }
}

export default ImportModel;