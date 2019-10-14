const Validator=require('validator')

class validators{
    constructor(){

    }
    // 校验手机号码
    isMobilePhone(str,msg){
        let result=this.isEmpty(str,'请输入手机号码')
        if(result){
            result=Validator.isMobilePhone(str,"zh-CN")
            if(!result){
                wx.showToast({
                    title: msg,
                    icon:'none'
                });
            }
        }
        return result
    }
    // 校验邮箱
    isEmail(str,msg){
        const result=Validator.isEmail(str)
        if(!result){
            wx.showToast({
                title: msg,
                icon:'none'
            });
        }
        return result
    }
    // 校验空
    isEmpty(str,msg){
        const result=!Validator.isEmpty(str)
        if(!result){
            wx.showToast({
                title: msg,
                icon:'none'
            });
        }
        return result
    }
    // 校验真
    isTrue(str,msg){
        if(str===false){
            wx.showToast({
                title: msg,
                icon:'none'
            });
        }
        return str
    }
}

export {
    validators
}