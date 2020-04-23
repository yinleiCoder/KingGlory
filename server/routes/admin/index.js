// 写具体的路由

module.exports = app =>{
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')

    const router = express.Router({
        mergeParams:true
    })
    // const req.Model = require('../../models/req.Model')

    //创建资源
    router.post('/',async (req,res)=>{
        // console.log(req.body)
        // const Model = require(`../../models/${req.params.resource}`)
        const model =await req.Model.create(req.body)
        res.send(model)
    })

    // 修改更新资源
    router.put('/:id',async (req,res)=>{
        console.log(req.body)
        await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send({
            success: true
        })
    })

    //删除资源
    router.delete('/:id',async (req,res)=>{
        console.log(req.body)
        const model =await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send(model)
    })

    //资源列表接口
    router.get('/',async (req,res)=>{
        // console.log(req.user)
        // console.log(req.body)
        // const items =await req.Model.find().populate('parent').limit(20)
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate= 'parent'
        }
        const items =await req.Model.find().setOptions(queryOptions).limit(20)
        res.send(items)
    })

    //资源详情
    router.get('/:id',async (req,res)=>{
        console.log(req.body)
        const model =await req.Model.findById(req.params.id)
        res.send(model)
    })

    //jwt认证中间件[登录校验中间件]
    const authMiddleware = require('../../middleware/auth')
    // const authMiddleware= async(req,res,next)=>{
    //     const token = String(req.headers.authorization || '').split(' ').pop()
    //     assert(token, 401, '请提供jwt token')//抛异常，交给错误处理中间件函数
    //     // const tokenData = jwt.verify(token,app.get('secret'))
    //     // console.log(tokenData)
    //     const {id} = jwt.verify(token,app.get('secret'))
    //     assert(id, 401, '无效的jwt token')//抛异常，交给错误处理中间件函数
    //     req.user = await AdminUser.findById(id)//把查到的user对象挂载到req请求对象上
    //     assert(req.user, 401, '请先登录')//抛异常，交给错误处理中间件函数
    //     // console.log(req.user)
    //     await next()
    // }
    
    //获取model中间件
    const resoureceMiddle = require('../../middleware/resource')
    // const resoureceMiddle = async(req,res,next)=>{
    //     const modelName= require('inflection').classify(req.params.resource)
    //     // return res.send(modelName)
    //     req.Model = require(`../../models/${modelName}`)
    //     next()
    // }
    app.use('/admin/api/rest/:resource',authMiddleware(),resoureceMiddle(),router)


    const multer= require('multer')
    const upload = multer({dest: __dirname+'/../../uploads'})
    app.post('/admin/api/upload',authMiddleware(),upload.single('file'), async(req,res)=>{
        const file =req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login',async(req,res)=>{
        const {username,password} = req.body
        //1.根据用户名找用户
        const user = await AdminUser.findOne({username}).select('+password')
        assert(user, 422, '用户不存在')//抛异常，交给错误处理中间件函数
        // if(!user){
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }
        //2.校验密码
        const isValid = password == user.password
        assert(isValid, 422, '密码错误')//抛异常，交给错误处理中间件函数
        // if(!isValid){
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        //3.返回token
        const token = jwt.sign({
            id: user._id,
            // _id: user._id,
            // username: user.username,
        },app.get('secret'))
        res.send({token})
    })

    //错误处理函数
    app.use(async (err,req,res,next)=>{
        return res.status(err.statusCode || 500).send({
                    message: err.message
                })
    })
}