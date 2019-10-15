// pages/index/index.js
import {IndexModel} from '../../models/indexModel'
const indexModel=new IndexModel()
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    banner:[],
    tabSwitchArr:[
      {
        name:'最新课程',
        active:true,
        id:1
      },
      {
        name:'最热课程',
        active:false,
        id:2
      },
      {
        name:'推荐课程',
        active:false,
        id:3
      }
    ],
    tabId:1,// 1最新 2 最热 3推荐
    dataArray:[],
    loadingCenter:false,//首次加载
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    this.getBanners()
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
    this.getList()
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

  //切换
  tabSwitch(val){
    const data = val.currentTarget.dataset.tab;
    const tabSwitchArr=this.data.tabSwitchArr
    for(let i in tabSwitchArr){
      if(tabSwitchArr[i].id==data.id){
        tabSwitchArr[i].active=true
      }else{
        tabSwitchArr[i].active=false
      }
    }
    this.setData({
      tabId: data.id,
      tabSwitchArr
    });
    this.getList()
  },
  //获取广告图
  getBanners(){
    let data={}
    indexModel.getBanners(data,'').then(res=>{
      var data=res.returnValue
      if (data.length) {
        var banner = [];
        for (let i = 0; i < data.length; i++) {
          const obj = {
            url: data[i].imgPath
          }
          banner.push(obj);
        }
        this.setData({
          banner: banner,
        })
      }
    })
  },
  //获取课件列表
  getList(){
    if(this.data.tabId==1){
      this.getCourseList()
    }else if(this.data.tabId==2){
      this.getHotCourseList()
    }else if(this.data.tabId==3){
      this.getRecommendCourseList()
    }
  },
  //获取最新课程
  getCourseList(){
    this.setData({
      loadingCenter:true,
      dataArray:[]
    })
    const data={
      page:1,
      size:10,
    }
    indexModel.getCourseList(data,'').then(res=>{
      const data=res.returnValue
      if(data){
        this.setData({
          dataArray:data,
          loadingCenter:false
        })
      }
    })
  },
  //获取热门课件列表
  getHotCourseList(){
    this.setData({
      loadingCenter:true,
      dataArray:[]
    })
    const data={}
    indexModel.getHotCourseList(data,'').then(res=>{
      const data=res.returnValue
      if(data){
        this.setData({
          dataArray:data,
          loadingCenter:false
        })
      }
    })
  },
  //获取推荐课件列表
  getRecommendCourseList(){
    this.setData({
      loadingCenter:true,
      dataArray:[]
    })
    const data={}
    indexModel.getRecommendCourseList(data,'').then(res=>{
      const data=res.returnValue
      if(data){
        this.setData({
          dataArray:data,
          loadingCenter:false
        })
      }
    })
  },
  //全部视频课件
  videoCourse(){
    wx.navigateTo({
      url: '/pages/allCourse/allCourse'
    })
  },
  //全部文件课件
  fileCourse(){
    wx.navigateTo({
      url: '/pages/allCourse/allCourse'
    })
  },
  //搜索
  onSearch(){
    wx.navigateTo({
      url: '/pages/search/search'
    })
  }
})