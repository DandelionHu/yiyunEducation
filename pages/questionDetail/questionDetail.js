// pages/questionDetail/questionDetail.js
import {QuestionModel} from '../../models/questionModel'
import {formatDate} from '../../utils/util'
const questionModel=new QuestionModel()
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    newsContent:'',
    createTime:'',
    canRichTextUse: wx.canIUse('rich-text'),
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    if(options){
      this.setData({
        id:options.id
      })
    }
    this.getById();
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
  //获取详情
  getById(){
    const data={
      questionsId:this.data.id
    }
    questionModel.getById(data,'加载中').then(res=>{
      const data=res.returnValue
      if(data){
        let result = data.answer;
        const regex = new RegExp('<img', 'gi');
        result = result.replace(regex, `<img style="max-width: 100%;height:auto"`);
        this.setData({
          title:data.questions,
          createTime:formatDate(new Date(data.createTime),'yyyy-MM-dd'),
          newsContent:result
        })
      }
    })
  }
})