class Pagination{
    constructor(page=1,size=20){
        this.page=page  //页码
        this.size=size  //条数
        this.dataArray=[] //数据
        this.empty=true //无数据
        this.searchEnding=false //没有更多了
    }
    //初始化
    initPagination(page=1,size=20){
        this.page=page  //页码
        this.size=size  //条数
        this.dataArray=[] //数据
        this.empty=true //无数据
        this.searchEnding=false //没有更多了
    }
    //加载更多数据
    setMoreData(dataArray){
        if (dataArray==false || dataArray.length<this.size) {
            //传进来的值是空 或者小于条数
            this.searchEnding=true
        }
        let temp=this.dataArray.concat(dataArray)
        let page=this.page
        page++
        this.dataArray=temp
        this.page=page
        if(this.dataArray==false){
            //整个列表为空 没有数据
            this.empty=false
        }
    }
    //获取当前页码
    getCurrentPage(){
        return this.page
    }
    //获取当前条数
    getCurrentSize(){
        return this.size
    }
    //获取当前数据
    getCurrentData(){
        return this.dataArray
    }
    //获取empty
    getCurrentEmpty(){
        return this.empty
    }
    //获取searchEnding
    getCurrentEnding(){
        return this.searchEnding
    }
}

export {
    Pagination
}