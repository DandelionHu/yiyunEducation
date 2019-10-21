// pages/review/review.js
import {IndexModel} from '../../models/indexModel'
const indexModel=new IndexModel()
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    dataArray:[],
    itemId:'',
    contents:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    if(options.id){
      this.setData({
        id:options.id
      })
    }
    this.getTypes()
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
  //获取评论类别
  getTypes(){
    const data={
      type:3
    }
    indexModel.getTypes(data,'').then(res=>{
      if(res.returnValue){
        this.setData({
          dataArray:res.returnValue
        })
      }
    })
  },
  //选择
  radioChange(e){
    const id=e.detail.value
    const dataArray=this.data.dataArray
    var contents
    for(let i in dataArray){
      if(dataArray[i].id==id){
        contents=dataArray[i].name
      }
    }
    this.setData({
      itemId: id,
      contents:contents
    })
  },
  //评论
  onConfirm(){
    const data={
      courseId:this.data.id,
      contents:this.data.contents
    }
    indexModel.review(data,'提交中').then(res=>{
      if(res.returnValue){
        wx.navigateBack({
          delta: 1, 
        })
      }
    })
  }
})