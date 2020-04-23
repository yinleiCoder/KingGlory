module.exports = options=>{//加个options外面调用处就可以随意配置
    return async(req,res,next)=>{
        const modelName= require('inflection').classify(req.params.resource)
        // return res.send(modelName)
        req.Model = require(`../models/${modelName}`)
        next()
    }
}