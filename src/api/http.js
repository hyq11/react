/**
 * 发送ajax请求的模块
 * 返回一个Promise对像
 */
import axios from 'axios'
import {  Message } from "antd";
const api= axios.create({
    baseURL: 'http://172.18.3.122:9527',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'timeout': 1000
    }
})
function http(url, data={}, method="GET") {
    return new Promise((resolve, reject) => {
        let promise
        // 1。执行Ajax请求
        if(method === 'GET') {
            promise = api.get(url, {
                params: data
            })
        } else {
            promise = api.post(url, data)
        }
        // 2.成功了执行resolve
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            // 3.错误执行,不用调用reject(json), 而是提示异常信息
             Message.error('请求出错' + error) // 同意异常处理404出现报错
        })
    })
    if(method === 'GET') {
        return api.get(url, {
            params: data
        })
    } else {
        return api.post(url, data)
    }
}


export default http