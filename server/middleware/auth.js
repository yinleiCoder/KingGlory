module.exports = options =>{
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')
    return async(req,res,next)=>{
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请提供jwt token')//抛异常，交给错误处理中间件函数
        // const tokenData = jwt.verify(token,app.get('secret'))
        // console.log(tokenData)
        const {id} = jwt.verify(token,req.app.get('secret'))
        assert(id, 401, '无效的jwt token')//抛异常，交给错误处理中间件函数
        req.user = await AdminUser.findById(id)//把查到的user对象挂载到req请求对象上
        assert(req.user, 401, '请先登录')//抛异常，交给错误处理中间件函数
        // console.log(req.user)
        await next()
    }
}