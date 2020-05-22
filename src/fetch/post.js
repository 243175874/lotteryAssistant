// post.js
import { browserHistory } from 'react-router'
import { api } from './api.js'
import { Toast } from 'antd-mobile'

/**
 *  设置form-data请求数据格式
 */
function params(data) {
    let ret = "";
    for (let it in data) {
        ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;
    }
    return ret;
}
// 发送 post 请求
export function post(url, paramsObj = {}) {
    return new Promise(resolve => {
        fetch(api + url, {
            method: 'POST',
            //credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'token': localStorage.getItem("cs_token"),
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params(paramsObj)
        }).then(response => {
            return response.json();
        }).then(response => {
            if (response.code != 200) {
                Toast.info(response.msg, 2, null, false);
                if (response.code == 1002) {
                    localStorage.removeItem("cs_token");
                    localStorage.removeItem("userInfo");
                    Toast.info('请先登录！', 2, null, false);
                }
            }
            resolve(response);
        }).catch(error => {
            Toast.info('访问失败！请联系客服', 2, null, false);
            console.log(error);
        });
    })
}