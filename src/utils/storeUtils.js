/**
 * 进行localstorage的使用模块
 */
const USER_KEY = 'user_key'
export default {
    // 设置
   saveUser (value) {
       localStorage.setItem(USER_KEY, JSON.stringify(value))
   },
   // 读取
   getUser() {
        return JSON.parse(localStorage.getItem(USER_KEY)) || {}
   },
   // 删除
   removeUser() {
        localStorage.removeItem(USER_KEY)
   }
}