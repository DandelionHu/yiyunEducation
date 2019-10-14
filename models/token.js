import config from '../utils/config'

class Token{
    constructor(){
        this.tokenUrl=config.baseUrl+'/login'  //自动登录
    }
    verify(){
        var token=wx.getStorageSync('token')
        if(!token){
            this.getTokenFromServer();
        }
    }
    getTokenFromServer(callBack) {
      var that = this;
      wx.login({
        success: function(res) {
          wx.request({
            url: that.tokenUrl,
            method: 'GET',
            data: {
              code: res.code,
            },
            success: function(res) {
              if(res.data.returnValue){
                wx.setStorageSync('state', res.data.returnValue.state);
                if(res.data.returnValue.token){
                  wx.setStorageSync('token', res.data.returnValue.token);
                  callBack && callBack(res.data.returnValue.token);
                }
              }
            }
          })
        }
      })
    }
    getInfo(callBack){
      var that = this;
      wx.login({
        success: function(res) {
          wx.request({
            url: that.tokenUrl,
            method: 'GET',
            data: {
              code: res.code,
            },
            success: function(res) {
                callBack && callBack(res.data);
            }
          })
        }
      })
    }
}

export {
    Token
}