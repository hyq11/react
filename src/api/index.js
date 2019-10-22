import http from './http.js'

export const login = (username, password) => http('/login',{username, password}, 'POST')
export const addUser = (user) => http('/manage/user/add', user, 'POST')