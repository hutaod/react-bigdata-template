import axios from 'axios';
import Qs from "qs";
import store from './redux/store';
import { message } from 'antd';
import { loadingAction } from './redux/actions/loadingAction';
import { loginAction } from './redux/actions/loginAction'
import { clearLocal } from './utils';
// require('./mock/index.js');

//请求 头contentTpye类型
const contentTpyeArrs = [
	"application/x-www-form-urlencoded;charset=UTF-8",
	"application/json"
]

//基本设置
let options = {
    baseURL: "",
    timeout: 10000,
    headers: {
        post: {
            'Content-Type': contentTpyeArrs[0]
        }
    }
}

// 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            
const ajax = axios.create(options);

let reqNumer = 0; // 发起请求的数量, 只要大于0,显示loading动画(前提是num = 0);请勿改动;
let showloading = true; // 定义全局变量用于控制loading局部的使用;请勿改动;
let defaultContentType = contentTpyeArrs[0]; // 默认的请求头信息,根据实际情况可做更改

ajax.interceptors.request.use((config) => {  //在请求发出之前进行一些操作
    //在请求发出之前进行一些操作, 比如加载动画
	if (showloading) {
        reqNumer++;
    };
    if (reqNumer > 0) {
        // 显示加载动画
        const action = loadingAction(true);
        store.dispatch(action);
    }
    
    return config;
},(err) => {
    //Do something with request error
    return Promise.reject(err);
})

ajax.interceptors.response.use((response) => {  // 接受请求后reqNumer--，判断请求所有请求是否完成
    if (showloading) {
        reqNumer--;
    };
    if (reqNumer <= 0) {
        reqNumer = 0;
        // 隐藏加载动画
        const action = loadingAction(false);
        store.dispatch(action);
    } else {
        const action = loadingAction(true);
        store.dispatch(action);
    }
    //统一处理返回数据
    const useResponse = response.data;
    if (useResponse.success) {
        return { "success": true, "obj": useResponse["obj"] };
    } else {
        if (useResponse.errorCode === 403) {
            clearLocal();
            const action = loginAction(false);
            store.dispatch(action);
            return { "success": false };
            // step1：退出登录(后台);
            // step2：前端(重写本地存储);
            // step3：页面(重定向至登录注册页面)
        } else {
            return { "success": false, "obj": useResponse["msg"] };
        }
    }
}, function (error) {
    // 对响应错误做点什么
    if (error && error.response) {
        switch (error.response.status) {
            case 400: message.warn('请求错误') ; break;
            case 401: message.warn('未授权，请重新登录'); break;
            case 403: message.warn('拒绝访问'); break;
            case 404: message.warn('请求出错'); break;
            case 408: message.warn('请求超时'); break;
            case 500: message.warn('服务器错误'); break;
            case 501: message.warn('服务未实现'); break;
            case 502: message.warn('网络错误'); break;
            case 503: message.warn('服务不可用'); break;
            case 504: message.warn('网络超时(504)'); break;
            case 505: message.warn('HTTP版本不受支持'); break;
            default: message.warn(`连接出错!`);
        }
        reqNumer--;
        if (reqNumer <= 0) {
            const action = loadingAction(false);
            store.dispatch(action);
        }
        return Promise.reject(error);

    } else {
        message.warn("请求超时");
        reqNumer--;
        if (reqNumer <= 0) {
            const action = loadingAction(false);
            store.dispatch(action);
        }
        return Promise.reject(error);
    }
})

const getAction = function (url, data={}, isShowloading) {

    // 判断当前请求是否显示loading, 默认显示
	if (isShowloading && isShowloading === 1){ 
		showloading = false // 不显示loading
	} else {
		showloading = true // 显示
	}

    return ajax.get(url, {
        params: data
    });
}

const postAction = function (url, data={}, isShowloading, contentTpyeIndex=0) {
    // 判断当前请求是否显示loading, 默认显示,isShowloading===1为不显示，contentTpyeIndex=0为contentTpyeArrs索引，默认为0
	if (isShowloading && isShowloading === 1){ 
		showloading = false // 不显示loading
	} else {
		showloading = true // 显示
	}
	
	// 判断当前请求类型，确定向后端传递数据的方式,前后端沟通后按约定改动
    let _contentTpye = contentTpyeArrs[contentTpyeIndex] || defaultContentType;
    
    let _data;
	
	if (_contentTpye === contentTpyeArrs[1]) {
		_data = JSON.stringify(data)
	} else if (_contentTpye === contentTpyeArrs[0]){
		_data = Qs.stringify(data)
	}
    console.log(_contentTpye)
    return ajax.post(url, _data, {
        headers: {
            'Content-Type': _contentTpye
        }
    });
}

export {
    getAction,
    postAction
}