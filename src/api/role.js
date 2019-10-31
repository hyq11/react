import http from './http'

export const roleList = (params) => http('/role/list', params)
export const roleUpate = (params) => http('/role/update', params, 'post')
export const roleAdd = (params) => http('/role/add', params, 'post')
export const roleDel = (params) => http('/role/del', params, 'post')