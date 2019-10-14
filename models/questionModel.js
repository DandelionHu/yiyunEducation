import {HTTP} from '../utils/http'

class QuestionModel extends HTTP{
    constructor(){
        super()
    }
    //问答列表
    getQuestionsList(data,message){
        return this.request({
            url: '/questions/findQuestionss',
            isToken:false,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    //根据id获取问答
    getById(data,message){
        return this.request({
            url: '/wxmini/questions/findById',
            isToken:true,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
    //获取问答类别
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
    QuestionModel
}