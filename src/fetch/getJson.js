import { jsonApi } from './api.js'
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
export function getJson(url) {
    return new Promise(resolve => {
        fetch(jsonApi + url, {
            method: 'GET',
            //credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'token': localStorage.getItem("cs_token") || '',
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(response => {
            return response.json();
        }).then(response => {
            resolve(response.data)
        }).catch(error => {
            Toast.info('访问失败！请联系客服', 2, null, false);
            console.log(error);
        });
    })

}