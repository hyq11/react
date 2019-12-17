import http from './http'

export const skillList = (params) => http('/skill/list', params)
export const skillAdd = (params) => http('/skill/add', params, 'post')
export const skillDel = (params) => http('/skill/del', params, 'post')
export const skillUpdate = (params) => http('/skill/update', params, 'post')
export const skillInfo = (params) => http('/skill/info', params)