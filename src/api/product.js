import http from './http'

const url = 'http://172.18.12.90:9527'; //  IPv4 地址(本地起的服务)
export const baseURL = `${url}/public/upload/`

export const productList = (params) => http('/product/list', params)
export const productAddOrUpdate = (params) => http('/product/addOrUpdate', params, 'post')
export const productDetail = (params) => http('/product/detail', params)
export const productSetPrice = (params) => http('/product/setPrice', params, 'post')
export const productDel = (params) => http('/product/del', params, 'post')