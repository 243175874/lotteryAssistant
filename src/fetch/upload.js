// post.js
import { api } from './api.js'
import { Toast } from 'antd-mobile'


/**
 *  设置form-data请求数据格式
 */

// 发送 post 请求
export function upload(url, form) {
    return new Promise(resolve => {
        fetch(api + url, {
            method: 'POST',
            //credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'token': localStorage.getItem("cs_token") || '',
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: form
        }).then(response => {
            return response.json();
        }).then(response => {
            if (response.code != 200) {
                Toast.info(response.msg, 2, null, false);
                resolve(response)
            } else {
                resolve(response.data)
            }
        }).catch(error => {
            Toast.info('访问失败！请联系客服', 2, null, false);
            console.log(error);
        });
    })
}