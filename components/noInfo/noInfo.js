// components/noShop/noShop.js
import config from '../../utils/config'
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots:true,//开启插槽
  },
  properties: {
    image:String,
    text:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    // hostImage:config.staticUrl,
    hostImage:'../images',
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
