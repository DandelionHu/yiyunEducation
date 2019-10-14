import {Token} from '/models/token.js'
App({
    onLaunch:function(){
        const token = new Token()
        //自动登录
        token.verify()
    }
}) 