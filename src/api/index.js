import http from './http.js'

export const login = (username, password) => http('/user/login',{username, password}, 'POST')