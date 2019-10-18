// pages/allVideo/allVideo.js
import {IndexModel} from '../../models/indexModel'
import {Pagination} from '../../models/pagination'
const indexModel=new IndexModel()
var that;
var pagination;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    size:14,
    classify:[],//分类
    typeId:'',//选中的id
    dataArray:[],
    loading:false,//分页加载
    loadingCenter:false,//首次加载
    empty:true, //无数据
    searchEnding:false, //没有更多了
    type:'',//类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    if(options.type){
      this.setData({
        type:options.type
      })
    }
    pagination=new Pagination(this.data.page,this.data.size)
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
    this.getCourseList();
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

    this.getCourseList();
    wx.stopPullDownRefresh()
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
  //获取类别
  getTypes(){
    const data={
      type:1
    }
    indexModel.getTypes(data,'').then(res=>{
      var data=res.returnValue
      if (data) {
        this.setData({
          classify:data,
          typeId:data[0].id
        })
        this.getInit()
      }
    })
  },
  //改变类型
  onType(e){
    console.info(e)
    let typeId=e.detail.typeId;
    this.setData({
      typeId
    })
    this.getInit()
  },
  //首次加载
  getInit(){
    this.setData({
      loadingCenter:true,
      dataArray:[]
    })
    //初始化
    pagination.initPagination(1,this.data.size)
    this.getCourseList()
  },
  //获取课程列表
  getCourseList(){
    const data={
      page:pagination.getCurrentPage(),
      size:pagination.getCurrentSize(),
      courseTypeId:this.data.typeId,
      type:this.data.type
    }
    indexModel.getCourseList(data,'').then(res=>{
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
    })
  },
  //视频课程详情
  courseDetail(e){
    if(!this.isLogin()){
      wx.showModal({
        title: '提示',
        content: '查看详情需要登录，是否去登录？',
        confirmText:'去登录',
        confirmColor:'#00b38b',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      })
      return false;
    }
    const item=e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/videoPlay/videoPlay?id='+item.id
    })
  },
})