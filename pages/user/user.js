// pages/user/user.js
import {UserModel} from '../../models/userModel'
const userModel=new UserModel()
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customServicePhone:'',
    userImage:'../../images/userImage.png',
    userNickName:'注册/登录',
    name:'', //姓名
    phone:'', //手机号
    sex:'', //性别
    state:'', // 状态 0通过，1待审，2不通过 
    type:'', // 1普通用户，2经销商，3内部员
    integral:'0', // 积分，默认为0
    integralTitle:'', // 积分等级名称 
    province:'', // 省
    city:'', // 市
    area:'', // 区
    address:'', // 详细地址 
    integralLevel:'', //  积分等级 
    nextIntegralTitle:'', // 下一积分等级
    rnextIntegral:'', // 下一积分等级升级所需积分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    this.authorize();
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
    this.getServicePhone();
    if(this.isLogin()){
      //登录成功
      this.getUserInfo();
    }else{
      let userNickName='注册/登录';
      const state=wx.getStorageSync('state')
      if(state==1){
        userNickName='审核中'
      }
      if(state==2){
        userNickName='审核不通过'
      }
      this.setData({
        userImage:'../../images/userImage.png',
        userNickName:userNickName,
      })
    }
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
  //检测是否登录
  isLogin(){
    var value = wx.getStorageSync('token');
    return value;
  },
  //用户授权
  authorize(){
    wx.getSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) {
          //已授权
          wx.getUserInfo({
            success: function(res) {
              const userInfo = res.userInfo
              const nickName = userInfo.nickName
              const avatarUrl = userInfo.avatarUrl
              that.setData({
                userImage:avatarUrl,
                // userNickName:nickName
              })
            }
          })
        }
      }
    })
  },
  //用户信息
  getUserInfo(){
    const data={}
    userModel.getByUserId(data,'加载中').then((res)=>{
      const data=res.returnValue
      if(data){
        let userNickName='注册/登录';
        if(data.state==0){
          userNickName=data.phone
        }
        if(data.state==1){
          userNickName='审核中'
        }
        if(data.state==2){
          userNickName='审核不通过'
        }
        this.setData({
          name:data.name,
          phone:data.phone,
          sex:data.sex,
          state:data.state,
          type:data.type,
          integral:data.integral,
          integralTitle:data.integralTitle,
          province:data.province,
          city:data.city,
          area:data.area,
          address:data.address,
          integralLevel:data.integralLevel,
          nextIntegralTitle:data.nextIntegralTitle,
          rnextIntegral:data.rnextIntegral,
          userNickName:userNickName
        })
      }
    })
  },
  //个人资料
  personalInfo(){
    if(this.isLogin()){
      //已经登录
      wx.navigateTo({
        url: '/pages/personal/personal'
      })
    }else{
      //授权页面
      wx.navigateTo({
        url: '/pages/accredit/accredit'
      })
    }
  },
  //退出登录
  logout(){
    let data={}
    userModel.logout(data,'退出中').then(res=>{
      if(res.returnValue){
        wx.showToast({
          title: '退出成功',
          icon:'success'
        });
        wx.removeStorageSync('token');
        this.setData({
          name:'',
          phone:'',
          sex:'',
          state:'',
          type:'',
          integral:'',
          integralTitle:'',
          province:'',
          city:'',
          area:'',
          address:'',
          integralLevel:'',
          nextIntegralTitle:'',
          rnextIntegral:'',
          userNickName:'注册/登录'
        })
      }
    })
  },
  //平台客服电话
  getServicePhone(){
    let data={
      key:'Customer_Service_Phone'
    }
    userModel.getByKey(data,'').then(res=>{
        if(res.returnValue){
          this.setData({
            customServicePhone:res.returnValue[0].paraValue
          })
        }
    })
  },
  //拨打电话
  callCustomService(){
    if (this.data.customServicePhone) {
      wx.makePhoneCall({
        phoneNumber: this.data.customServicePhone,
      })
    }
  },
  //积分等级提升
  upgraded(){
    if(this.data.integral>this.data.rnextIntegral){
      //当前积分大于下一等级所需积分
      let data={}
      userModel.upgraded(data,'升级为'+this.data.nextIntegralTitle).then(res=>{
          if(res.returnValue){
            wx.showToast({
              title: '升级成功',
              icon:'success'
            });
            this.getUserInfo();
          }
      })
    }else{
      wx.showToast({
        title: '积分不足',
        icon:'none'
      });
    }
  },
  //积分记录
  creditslog(){
    if(this.isLogin()){
      //已经登录
      wx.navigateTo({
        url: '/pages/creditslog/creditslog'
      })
    }else{
      //授权页面
      wx.navigateTo({
        url: '/pages/accredit/accredit'
      })
    }
  }
})