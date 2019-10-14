import config from './config'
import {Token} from '../models/token'
var requestList = {} //api请求记录
class HTTP{
    constructor(){
        this.baseUrl=config.baseUrl
    }
    //外部调用request
    request({url,isToken=true,message='',data={},method='GET'}){
        return new Promise((resolve,reject)=>{
            this._requset(url,isToken,message,data,method,resolve,reject)
        })
    }
    //私有request
    _requset(url,isToken,message,data,method,resolve,reject,noRefetch = false){
        const URL=this.baseUrl+url
        //检测是否重复请求
        if(this._hitRequestKey(URL)){
            console.log("重复提交请求");
            return;
        }
        wx.showNavigationBarLoading();//显示头部动画
        if(message){
            wx.showLoading({
                title: message,
            })
        }
        let token='';
        if(isToken){
            token=wx.getStorageSync('token')
        }
        this._addRequestKey(URL); //添加请求
        wx.request({
            url: URL,
            header:{
                'content-type':'application/json',
                'token':token
            },
            data: data,
            method: method, 
            success: (res)=>{
                const code=res.statusCode.toString()
                const startChar=code.charAt(0)
                if(startChar=='2' || code=='304'){
                    //执行正常
                    if(res.data.isSuccess){
                        //获取业务成功
                        resolve(res.data)
                    }else if(res.data.code==10002){
                        //登录失效
                        if (!noRefetch) {
                            //获取新的token再请求
                            this._refetch(url,isToken,message,data,method,resolve,reject)
                        }else{
                            reject(res.data)
                            this._show_error(res) 
                            wx.removeStorageSync('token');//清除缓存
                            setTimeout(function(){
                                wx.reLaunch({//关闭所有页面，打开某个页面
                                    url: '/pages/login/login'
                                })
                            },2000)
                        }
                    }else{
                        reject(res.data)
                        this._show_error(res) 
                    }
                }else{
                    reject(res.data);
                    this._show_error(1)
                }
            },
            fail: (err)=> {
                reject(err);
                this._show_error(1)
            },
            complete: ()=> {
                wx.hideNavigationBarLoading();//隐藏头部请求动画
                if (message) {
                    wx.hideLoading() //隐藏请求提示语
                }
                //请求完成释放
                this._removeRequestKey(URL)
            }
        })
    }
    //错误信息提示
    _show_error(res){
        if(res==1){
            wx.showToast({
                title: '网络连接失败',
                icon: 'none',
                duration: 2000,
                image:'/images/nonetwork.png'
            })
        }else{
            wx.showToast({
                title: res.data.message?res.data.message:'接口错误'+res.statusCode,
                icon: 'none',
                duration: 2000
            })
        }
    }
    //将当前请求的api记录起来
    _addRequestKey(key){
        requestList[key] = true
    }
    //将请求完成的api从记录中移除
    _removeRequestKey(key){
        delete requestList[key]
    }
    //当前请求的api是否已有记录
    _hitRequestKey(key){
        return requestList[key]
    }
    //重新获取token再请求
    _refetch(...param) {
        var token = new Token();
        token.getTokenFromServer((token) => {
          this._request(...param, true);
        });
    }
}

export {
    HTTP
}