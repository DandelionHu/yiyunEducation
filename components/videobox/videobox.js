// components/videobox/videobox.js
import config from '../../utils/config'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrl:String, //封面
    isType:Number, //课程类型 1 文件 2视频
    title:String, //课程标题 
    showLevel:String, //课程等级
    clickNumbe:Number //点击次数
  },

  /**
   * 组件的初始数据
   */
  data: {
    baseUrl:config.image_blink_url,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
