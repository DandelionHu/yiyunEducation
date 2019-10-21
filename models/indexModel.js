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
    //课件列表
    getCourseList(data,message){
        return this.request({
            url: '/course/findCourses',
            isToken:false,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    //热门课件列表
    getHotCourseList(data,message){
        return this.request({
            url: '/course/hotCourses',
            isToken:false,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    //推荐课件列表
    getRecommendCourseList(data,message){
        return this.request({
            url: '/course/recommendCourses',
            isToken:false,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    //根据id获取课件
    getById(data,message){
        return this.request({
            url: '/wxmini/course/findById',
            isToken:true,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    //评论
    review(data,message){
        return this.request({
            url: '/wxmini/courseReview/review',
            isToken:true,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    //获取课件播放记录
    getHistory(data,message){
        return this.request({
            url: '/wxnimi/courseHistory/findHistory',
            isToken:true,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    //保存课件播放记录
    saveHistory(data,message){
        return this.request({
            url: '/wxnimi/courseHistory/saveHistory',
            isToken:true,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
}

export {
    IndexModel
}