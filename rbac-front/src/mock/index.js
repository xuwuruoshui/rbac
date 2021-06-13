const Mock = require('mockjs')

const Random = Mock.Random

let result = {
  code: 200,
  msg: '操作成功',
  data: null,
}

Mock.mock('/captcha', 'get', () => {
  result.data = {
    token: Random.string(32),
    captchaImg: Random.dataImage('120x40', 'p7n5w'),
  }
  return result
})

Mock.mock('/login', 'post', () => {
  // 无法在header中传入数jwt

  // result.code = 400
  // result.msg = "验证码错误"

  return result
})

Mock.mock('/sys/userInfo', 'get', () => {
  result.data = {
    id: 1,
    username: 'xuwuruoshui',
    avatar:
      'https://lh3.googleusercontent.com/a-/AOh14GhddEhe0Z-13D2_uMWfLtKcoAOKyyXIqecKI_79=s96-c-rg-br100',
  }

  return result
})
