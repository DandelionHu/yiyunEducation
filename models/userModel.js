import {HTTP} from '../utils/http'

class UserModel extends HTTP{
    constructor(){
        super()
    }
    //获取学员资料
    getByUserId(data,message){
        return this.request({
            url: '/wxmini/user/findByUserId',
            isToken:true,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    //根据key获取系统设置
    getByKey(data,message){
        return this.request({
            url: '/sysConfig/findByKey',
            isToken:false,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    //学员积分等级提升
    upgraded(data,message){
        return this.request({
            url: '/wxmini/user/upgraded',
            isToken:true,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    //退出登录
    logout(data,message){
        return this.request({
            url: '/wxmini/logout',
            isToken:true,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    //和获取积分记录
    getIntegralRecord(data,message){
        return this.request({
            url: '/wxmini/integralRecord/findPage',
            isToken:true,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    
}

export {
    UserModel
}