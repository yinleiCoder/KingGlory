import axios from 'axios' 
import Vue from 'vue'
import router from './router'
const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    // baseURL: 'http://localhost:3000/admin/api'
})

//给所有的请求加个请求头
http.interceptors.request.use(config=>{
    if(localStorage.token){
        config.headers.Authorization = 'Bearer '+ localStorage.token
    }
    return config
},err=>{
    return Promise.reject(err)
});

//拦截器:使用通用的错误处理
http.interceptors.response.use(res=>{
    return res 
},err=>{
    // console.log(err.response.data.message)
    if(err.response.data.message){
        Vue.prototype.$message({//element-ui
            type: 'error',
            message: err.response.data.message
        })
        if(err.response.status == 401){
            router.push('/login')//未jwt认证，跳转到登录页
        }
    }
    return Promise.reject(err)
})

export default http