// pages/accredit/accredit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //登录
  bindgetuserinfoLogin:function(res){
    if(res.detail.userInfo){
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
  //注册
  bindgetuserinfo:function(res){
    if(res.detail.userInfo){
      wx.navigateTo({
        url: '/pages/register/register'
      })
    }
  }
})