// components/classify/classify.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    typeData:Array,
    typeId:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    unfold:false
  },
  attached(){
    console.log(this.data)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //选中类型
    chooseClassify(e){
      const item=e.currentTarget.dataset.items;
      this.setData({
        typeId:item.id,
      })
      this.triggerEvent('type',{
        typeId:item.id
      },{})
    },
    //更多
    showMoreType(){
      this.setData({
        unfold:true
      })
    },
    //收起
    upType(){
      this.setData({
        unfold:false
      })
    }
  }
})
