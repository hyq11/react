var Mock = require('mockjs')

export default Mock.mock('/login', 'POST', {
    "code": 200,
    "message": '登录成功'
})