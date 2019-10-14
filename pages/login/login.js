// pages/login/login.js
import {validators} from '../../utils/validators'
import {LoginModel} from '../../models/loginModel'
const validator=new validators()
const loginModel=new LoginModel()
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    code:'',
    sendCodeDisabled:false,
    verificationText:'获取验证码',
    currentTime:60,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //手机号
  bindPhoneInput(e){
    this.setData({
      phone: e.detail.value
    });
  },
  //验证码
  bindCodeInput(e){
    this.setData({
      code: e.detail.value
    });
  },
  //发送验证码
  sendCode(){
    const v=validator.isMobilePhone(this.data.phone,'手机号码格式有误')
    if(v){
      const data = {
        phone: this.data.phone,
        type:1
      };
      loginModel.sendCode(data,'发送中').then(res=>{
        if(res.returnValue){
          wx.showToast({
            title: '验证码发送成功',
            icon:'none'
          });
          this.getCode();
        }
      })
    }
    
  },
  //倒计时
  getCode: function () {
    let currentTime = this.data.currentTime;
    this.setData({
      verificationText: currentTime + 's后重新获取',
      sendCodeDisabled: true
    })
    let interval = setInterval(function () {
      that.setData({
        verificationText: (currentTime - 1) + 's后重新获取'
      })
      currentTime--;
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          verificationText: '获取验证码',
          currentTime: 60,
          sendCodeDisabled: false
        })
      }
    }, 1000)
  },
  //登录
  bindSubmit(){
    const v=validator.isMobilePhone(this.data.phone,'手机号码格式有误')
    if(!v){
      return false
    }
    const n=validator.isEmpty(this.data.code,'请输入短信验证码')
    if(!n){
      return false
    }
    if(v && n){
      // 登录
      wx.login({
        success: reslog => {
          let data = {
            phone: this.data.phone,
            verifyCode: this.data.code, //验证码
            code:reslog.code,
          };
          loginModel.loginForPhone(data,'提交中').then(res=>{
            if(res.returnValue){
              const token=res.returnValue.token;
              wx.setStorageSync('token', token);
              wx.showToast({
                title: '登录成功',
                icon:'success'
              });
              setTimeout(function(){
                wx.switchTab({
                  url: "/pages/index/index"
                });
              },2000)
            }
          })
        }
      })
    }
  }
})