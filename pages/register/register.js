// pages/register/register.js
import {validators} from '../../utils/validators'
import {LoginModel} from '../../models/loginModel'
import {Token} from '../../models/token.js'
const validator=new validators()
const loginModel=new LoginModel()
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    name:'',
    address:'',
    phone:'',
    code:'',
    sendCodeDisabled:false,
    verificationText:'获取验证码',
    currentTime:60,
    agreeProtocol:false, //未同意协议
    selected:'../../images/selected.png',
    unselected:'../../images/unselected.png',
    itemSex: [
      {name: '男', value: '男',checked: true},
      {name: '女', value: '女'},
    ],
    itemSexChecked:'男',
    region: ['广东省', '广州市', '天河区'],
    success:3,// 0通过，1待审，2不通过 3重新申请
    remarks:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    const token = new Token()
    //获取注册信息
    // token.getInfo(res=>{
    //   const data=res.returnValue
    //   if(data){
    //     let itemSex=that.data.itemSex
    //     for(let i in itemSex){
    //       if(itemSex[i].value==data.sex){
    //         itemSex[i].checked=true
    //       }else{
    //         itemSex[i].checked=false
    //       }
    //     }
    //     that.setData({
    //       id:data.id,
    //       name:data.name,
    //       address:data.address,
    //       phone:data.phone,
    //       itemSexChecked:data.sex,
    //       region: [data.province, data.city, data.area],
    //       success:data.state,
    //       remarks:data.remarks,
    //       itemSex:itemSex
    //     })
    //   }else{
    //     that.setData({
    //       success:3
    //     })
    //   }
    // })
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
  //姓名
  bindNameInput(e){
    this.setData({
      name: e.detail.value
    });
  },
  //手机号
  bindPhoneInput(e){
    this.setData({
      phone: e.detail.value
    });
  },
  //验证码
  bindCodeInput(e){
    this.setData({
      code: e.detail.value
    });
  },
  //性别
  radioChange(e){
    console.log(e.detail.value)
    this.setData({
      itemSexChecked: e.detail.value
    })
  },
  //省市区
  bindRegionChange(e){
    this.setData({
      region: e.detail.value
    })
  },
  //乡镇街道
  bindAddressInput(e){
    this.setData({
      address: e.detail.value
    })
  },
  //发送验证码
  sendCode(){
    const v=validator.isMobilePhone(this.data.phone,'手机号码格式有误')
    if(v){
      const data = {
        phone: this.data.phone,
        type:2
      };
      loginModel.sendCode(data,'发送中').then(res=>{
        if(res.returnValue){
          wx.showToast({
            title: '验证码发送成功',
            icon:'none'
          });
          this.getCode();
        }
      })
    }
    
  },
  //倒计时
  getCode: function () {
    let currentTime = this.data.currentTime;
    this.setData({
      verificationText: currentTime + 's后重新获取',
      sendCodeDisabled: true
    })
    let interval = setInterval(function () {
      that.setData({
        verificationText: (currentTime - 1) + 's后重新获取'
      })
      currentTime--;
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          verificationText: '获取验证码',
          currentTime: 60,
          sendCodeDisabled: false
        })
      }
    }, 1000)
  },
  //点击同意
  bindAgreeProtocol:function(){
    this.setData({
      agreeProtocol: !this.data.agreeProtocol
    });
  },
  //注册
  bindSubmit(){
    const g=validator.isEmpty(this.data.name,'请输入姓名')
    if(!g){
      return false
    }
    const h=validator.isEmpty(this.data.address,'请输入乡/镇/街道')
    if(!h){
      return false
    }
    const v=validator.isMobilePhone(this.data.phone,'手机号码格式有误')
    if(!v){
      return false
    }
    const n=validator.isEmpty(this.data.code,'请输入短信验证码')
    if(!n){
      return false
    }
    const m=validator.isTrue(this.data.agreeProtocol,'请同意协议')
    if(g && h && v && n && m){
      // 登录
      wx.login({
        success: reslog => {
          let data = {
            id:this.data.id,
            phone: this.data.phone,
            verifyCode: this.data.code, //验证码
            code:reslog.code,
            name:this.data.name,
            sex:this.data.itemSexChecked,
            province:this.data.region[0],
            city:this.data.region[1],
            area:this.data.region[2],
            address:this.data.address,
          };
          loginModel.register(data,'提交中').then(res=>{
            if(res.returnValue){
              wx.showToast({
                title: '信息已提交，等待审核',
                icon:'none'
              });
              that.setData({
                success:1
              })
            }
          })
        }
      })
    }
  },
  //重新申请
  reapply(){
    this.setData({
      success:3
    })
  }
})