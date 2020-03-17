import axios from 'axios'
import {Message} from 'element-ui';
import router from '../router'
import db from '../utils/sessionStorage'
import * as config from '../utils/config'

//axios.defaults.withCredentials = true;
axios.interceptors.response.use(success => {
    if (success.status && success.status == 200 && success.data.status == 500) {
        Message.error({message: success.data.msg})
        return;
    }
    if (success.data.msg) {
        if(success.data.code == 200){
            Message.success({message: success.data.msg})
        }else{
            Message.warning({message: success.data.msg})
        }
    }
    return success.data;
}, error => {
    if (error.response.status == 504 || error.response.status == 404) {
        Message.error({message: '服务器被吃了( ╯□╰ )'})
    } else if (error.response.status == 403) {
        Message.error({message: '权限不足，请联系管理员'})
    } else if (error.response.status == 401) {
        // 防止重复弹出消息
        if(db.get("LOGINFLAG") == "0"){
            Message.error({message: '尚未登录或登录状态已过期，请登录'})
            db.remove("LOGINFLAG")
            db.save("LOGINFLAG","1")
        }
        router.replace('/');
    } else {
        if (error.response.data.msg) {
            Message.error({message: error.response.data.msg})
        } else {
            Message.error({message: '未知错误!'})
        }
    }
    return;
})

let base = config.baseApi;

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
export const getRequest = (url, params) => {
    let apiUrl = `${base}${url}`;
    apiUrl = getApiUrl(apiUrl,params);
    // 请求
    return axios({
        method: 'get',
        url: apiUrl,
        data: params
    })
}
export const deleteRequest = (url, params) => {
    let apiUrl = `${base}${url}`;
    apiUrl = getApiUrl(apiUrl,params);
    return axios({
        method: 'delete',
        url: apiUrl,
        data: params
    })
}

// 处理参数转换
function getApiUrl(url,params){
    let apiUrl = url;
    let i = 0;
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key];
            const param = key+"="+value;
            let s = '?';
            if ( i > 0 ){
                s = '&';
            }
            apiUrl = apiUrl+s+param;
            i++;
        }
    }
    return apiUrl;
}