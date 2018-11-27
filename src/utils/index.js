import asyncComponent from './asyncComponent';

export {
    asyncComponent // 异步加载组件
};

// 设置本地临时存储
export const setLocal = (key, value) => localStorage.setItem(key, value);

// 读取本地临时存储
export const getLocal = (key) => localStorage.getItem(key);

// 删除本地临时存储
export const removeLocal = (key) => localStorage.removeItem(key);

// clear清除所有的key/value
export const clearLocal = () => localStorage.clear();

// 去除字符串中所有的空格， 返回值：没有空格的字符串
export const Trim = (str, is_global) => {
    let result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if(is_global.toLowerCase() === "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
};

// 判断是否空字符
export const notNull = (str) => str !== undefined && str !== null && str !== '' && str.trim() !== '';

//JS操作cookies方法!
//写cookies
export const setCookie = (name, value) => {
    let Days = 30;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
};

//读取cookies
export const getCookie = (name) => {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if(arr === document.cookie.match(reg))
        return unescape(arr[2]);
    else {
        return null;
    }
};

// 删除cookies

export const delCookie = (name) => {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    if(cval !== null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + "; path=/";
};

//获取地址栏参数
export const getParam = ()=> {
    var res = {};
    window.location.search.substr(1).split('&').forEach(function(i){
        var j = i.split('=');
        res[j[0]]=j[1];
    });
    return res;
}

// 判断是否为手机号  
export const isPoneAvailable = (phone) => {
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if(!myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
}

// 判断是否为电话号码  
export const isTelAvailable = (tel) => {
    let myreg = /^(([0+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    if(!myreg.test(tel)) {
        return false;
    } else {
        return true;
    }
}

// 判断是否为邮箱地址
export const isEmailAvailable = (email) => {
    let myreg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(!myreg.test(email)) {
        return false;
    } else {
        return true;
    }
}

// 判断是否为数字
export const isNum = (num) => {
    let myreg =  new RegExp("^[0-9]*$");
    if (!myreg.test(num)) {
        return false;
    } else {
        return true;
    }
}

//判断是否是对象
export const isObj = obj => {
    return obj && typeof(obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === "[object Object]";
}

//判断是否是数组
export const isArray = obj => {
    return obj && typeof(obj) === 'object' && obj.constructor === Array;
}

//判断对象是否相等
export const isObjectValueEqual = (objA, objB) => {
    return JSON.stringify(objA) === JSON.stringify(objB);
}

//数组数字倒序是否正确
export const ArrayNumSortTure = (arr,order=false) => {
    let flag = false;
    for (let i=0;i<arr.length;i++) {
        for (let j=1;j<arr.length;j++) {
            if(!order){
                if(arr[i] && arr[j] && i<j && arr[i]<=arr[j]){
                    flag = true;
                }
            } else {
                if(arr[i] && arr[j] && i<j && arr[i]>=arr[j]){
                    flag = true;
                }
            }
            
        }
        // if(arr[i] && arr[i+1] && arr[i]<=arr[i+1]){
        //     flag = true;
        // }
    }
    return !flag;
}

export const GetStrActualLength = function(str) {
	///<summary>获得字符串实际长度，中文2，英文1</summary>
	///<param name="str">要获得长度的字符串</param>
	var realLength = 0, len = str.length, charCode = -1;
	for (var i = 0; i < len; i++) {
	  charCode = str.charCodeAt(i);
	  if (charCode >= 0 && charCode <= 128)
		 realLength += 1;
	  else
		 realLength += 2;
	}
	return realLength;
};

//解析hash地址栏
export const getHashParam = function() {
    var res = {};
    var startIndex = window.location.hash.indexOf("?")+1;
    window.location.hash.substr(startIndex).split('&').forEach(function(i){
        var j = i.split('=');
        res[j[0]]=j[1];
    });
    return res;
}
