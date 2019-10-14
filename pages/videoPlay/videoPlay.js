// pages/videos/videos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    controls:true,
    autoplay:false,
    initialTime:20, //初始播放时长
    srcUrl:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  }
})