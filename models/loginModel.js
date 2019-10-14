import {HTTP} from '../utils/http'

class LoginModel extends HTTP{
    constructor(){
        super()
    }
    //发送验证码
    sendCode(data,message){
        return this.request({
            url: '/user/sendVerifyCode',
            isToken:false,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    //注册
    register(data,message){
        return this.request({
            url: '/register',
            isToken:false,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    //登录
    loginForPhone(data,message){
        return this.request({
            url: '/loginForPhone',
            isToken:false,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
}

export {
    LoginModel
}