/**
 * 进行localstorage的使用模块
 */
const USER_KEY = 'user_key'
export default {
    // 设置
   saveUser (key, value) {
       localStorage.setItem(key, JSON.stringify(value))
   },
   // 读取
   getUser(key) {
        return JSON.parse(localStorage.getItem(key)) || ''
   },
   // 删除
   removeUser(key) {
        localStorage.removeItem(key)
   }
}