import request from '@/request'


const user = {

  fetchCaptcha () {
    return request.get("/captcha")
  },
  // 登录
  login (loginData) {
    return request.post('/login', loginData)
  },
  // 获取用户信息
  fetchUserInfo () {
    return request.get("/sys/userInfo");
  },
  // 获取用户信息
  fetchUserList () {
    return request.get("/sys/user")
  }
}

export default user