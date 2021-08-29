import request from '@/request'


const user = {

    fetchCaptcha() {
        return request.get("/captcha")
    },
    // 登录
    login(loginData) {
        return request.post('/login', loginData)
    },
    // 获取用户信息
    fetchUserInfo() {
        return request.get("/sys/userInfo");
    }
}

export default user