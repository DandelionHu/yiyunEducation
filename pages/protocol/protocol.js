// pages/protocol/protocol.js
import {UserModel} from '../../models/userModel'
const userModel=new UserModel()
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canRichTextUse: wx.canIUse('rich-text'),
    protocol: null,
    value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    if(options.value){
      // 1 注册协议  2积分规则
      this.setData({
        value:options.value
      });
      this.getPerformSetting();
    }
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
  //获取平台协议
  getPerformSetting:function(){
    var data
    if(this.data.value==1){
      //注册协议
      data={
        key:'Registration_Protocol'
      }
    }
    if(this.data.value==2){
      //积分规则
      data={
        key:'Registration_Protocol'
      }
    }
    userModel.getByKey(data,'').then(res=>{
        if(res.returnValue){
          this.setData({
            protocol:res.returnValue[0].paraValue
          })
        }
    })
  }
})