// pages/index/index.js
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
    tabId:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanners()
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
  //获取类别
  getTypes(){
    let data={
      type:1,
    }
    indexModel.getTypes(data,'').then(res=>{
      var data=res.returnValue
      if (data) {
        
      }
    })
  },
  //搜索
  onConfirm(e){
    let word=e.detail.value || e.currentTarget.dataset.item;
    this.setData({
      keyword: word
    });
  },
  //取消
  onDelete(){
    this.setData({
      keyword:''
    })
  }
})