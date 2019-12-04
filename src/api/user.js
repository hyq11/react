import http from './http'

export const userList = (params) => http('/user/list', params)
export const userUpdate = (params) => http('/user/update', params, 'post')
export const userAdd = (params) => http('/user/reg', params, 'post')
export const userInfo = (params) => http('/user/info', params)