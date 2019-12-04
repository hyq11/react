import http from './http'

export const roleList = (params) => http('/role/list', params)
export const roleAdd = (params) => http('/role/add', params, 'post')
export const roleSetProperty = (params) => http('/role/setProperty', params, 'post')
export const roleGetProperty = (params) => http('/role/getProperty', params)