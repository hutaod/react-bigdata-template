import React from "react"
import { Button } from "antd";

let editor;

class Ueditor extends React.Component{
	
	componentDidMount(){
        const option={
			lang:"zh-cn" ,
			initialFrameWidth: '100%',
			initialFrameHeight:350
			//图片上传配置区
			// serverUrl:"/api",
			// imageUrl:"/api/upload",          //图片上传提交地址
			// imagePath:"/api/upload/test"                      //图片修正地址，引用了fixedImagePath,如有特殊需求，可自行配置
		}
        editor = window.UE.getEditor('editorBox',option);

        editor.ready(( ueditor ) => {
            editor.setContent('<p>初始化标题</p>');
        });
    }
	
	componentWillUnmount() {
        window.UE.getEditor('editorBox').destroy()
    }
	handleUploadImg=()=>{
		var dialog = editor.getDialog("insertimage");
		dialog.title = '多图上传';
		dialog.render();
		dialog.open();
	}
    render(){
        return (
			<React.Fragment>
				<div style={{marginBottom:20}}>
					<Button type='primary' onClick={this.handleUploadImg} style={{marginRight:20}}>插入图片</Button>
				</div>
				<div id="editorBox"></div>
			</React.Fragment>
            
        )
    }
}

export default Ueditor
