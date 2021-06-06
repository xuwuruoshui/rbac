const Mock = require("mockjs")

const random = Mock.Random

let result = {
    code: 200,
    msg: "操作成功",
    data:null
}

Mock.mock("/captcha","post",()=>{
    result.data = {
        token: random.string(32),
        captchaImg: random.dataImage('120x40','as24a')
    }
    return result
})

Mock.mock("/login","post",()=>{
    
    return result
})