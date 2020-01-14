import http from './http'

export const baseURL = 'http://172.18.12.144:9527/public/upload/'

// export const baseURL = 'http://192.168.1.8:9527'
export const productList = (params) => http('/product/list', params)
export const productAddOrUpdate = (params) => http('/product/addOrUpdate', params, 'post')
export const productDetail = (params) => http('/product/detail', params)
export const productSetPrice = (params) => http('/product/setPrice', params, 'post')
export const productDel = (params) => http('/product/del', params, 'post')