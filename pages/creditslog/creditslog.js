// pages/creditslog/creditslog.js
import {UserModel} from '../../models/userModel'
import {Pagination} from '../../models/pagination'
const userModel=new UserModel()
var that;
var pagination;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    size:1,
    keyword:'',
    dataArray:[],
    type1:'',//获取合计
    type2:'',//使用合计
    loading:false,//分页加载
    loadingCenter:false,//首次加载
    empty:true, //无数据
    searchEnding:false //没有更多了
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    //首次加载
    this.setData({
      loadingCenter:true
    })
    pagination=new Pagination(this.data.page,this.data.size)
    this.getIntegralRecord()
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

  //监听下拉刷新
  onPullDownRefresh: function () {
    //正在加载
    if(this.data.loadingCenter){
        return
    }
    this.setData({
      loadingCenter:true,
      dataArray:[]
    })
    //初始化
    pagination.initPagination(1,this.data.size)
    this.getIntegralRecord();
    wx.stopPullDownRefresh()
  },
  //监听用户上拉触底事件
  onReachBottom: function () {
    //没有更多
    if(this.data.searchEnding){
        return
    }
    //正在加载
    if(this.data.loading){
        return
    }
    this.setData({
      loading:true
    })

    this.getIntegralRecord();
    wx.stopPullDownRefresh()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取积分记录
  getIntegralRecord(){
    let data={
      page:pagination.getCurrentPage(),
      size:pagination.getCurrentSize(),
      keyword:this.data.keyword,
      type:1
    }
    userModel.getIntegralRecord(data,'').then(res=>{
      const data=res.returnValue
      if(data){
        pagination.setMoreData(data)
        this.setData({
          dataArray:pagination.getCurrentData(),
          empty:pagination.getCurrentEmpty(),
          searchEnding:pagination.getCurrentEnding(),
          loading:false,
          loadingCenter:false
        })
      }
      if(res.returnObject){
        this.setData({
          type1:res.returnObject.type1,
          type2:res.returnObject.type2
        })
      }
    })
  }
})