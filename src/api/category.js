import http from './http'

export const categoryList = (params) => http('/category/list', params)
export const categoryUpdate = (params) => http('/category/update', params, 'post')
export const categoryAdd = (params) => http('/category/add', params, 'post')
export const categoryDel = (params) => http('/category/del', params, 'post')