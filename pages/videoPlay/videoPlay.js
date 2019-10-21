// pages/videos/videos.js
import {IndexModel} from '../../models/indexModel'
import config from '../../utils/config'
const indexModel=new IndexModel()
var that;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    dataObject:'',
    controls:true,
    autoplay:false,
    initialTime:20, //初始播放时长
    baseUrl:config.image_blink_url,
    isFinish:'',//是否观看完毕，0否，1是
    historyTime:'',//播放历史时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    if(options.id){
      this.setData({
        id:options.id
      })
    }
    this.getById()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
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
  //视频开始播放
  play(){
    console.log('视频开始播放')
  },
  //视频暂停播放
  pause(){
    console.log('视频暂停播放')
  },
  //视频播放结束
  ended(){
    console.log('视频播放结束')
  },
  //视频进度变化
  timeupdate(event){
    console.log('视频进度变化')
    console.log(event)
    const currentTime=event.detail.currentTime //播放时间
    const duration=event.detail.duration //视频总时间
  },
  //播放视频
  playVideo(){
    this.videoContext.play()
  },
  //暂停视频
  pauseVideo(){
    this.videoContext.pause()
  },
  //获取视频详情
  getById(){
    const data={
      courseId:this.data.id
    }
    indexModel.getById(data,'加载中').then(res=>{
      if(res.returnValue){
        this.setData({
          dataObject:res.returnValue
        })
      }
    })
  },
  //评论
  onReview(){
    wx.navigateTo({
      url: '/pages/review/review?id='+this.data.id
    })
  },
  //保存课件播放记录
  saveHistory(){
    const data={
      courseId:this.data.id,
      isFinish:this.data.isFinish,
      historyTime:this.data.historyTime
    }
    indexModel.saveHistory(data,'').then(res=>{

    })
  },
  //获取课件播放记录
  getHistory(){
    const data={
      courseId:this.data.id,
    }
    indexModel.getHistory(data,'').then(res=>{
      if(res.returnValue){
        this.setData({
          isFinish:res.returnValue.isFinish,
          historyTime:res.returnValue.historyTime
        })
      }
    })
  }
})