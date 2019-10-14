import {HTTP} from '../utils/http'

class IndexModel extends HTTP{
    constructor(){
        super()
    }
    //获取广告图
    getBanners(data,message){
        return this.request({
            url: '/banner/findBanners',
            isToken:false,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    //查询类别
    getTypes(data,message){
        return this.request({
            url: '/sysType/findTypes',
            isToken:false,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
}

export {
    IndexModel
}