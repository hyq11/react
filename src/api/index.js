import http from './http.js'

export const login = (data) => http('/user/login', data, 'post')