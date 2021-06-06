const Mock = require('mockjs')

const Random = Mock.Random

let result = {
	code: 200,
	msg: '操作成功',
	data: null
}

Mock.mock('/captcha', 'get', () => {

	result.data = {
		token: Random.string(32),
		captchaImg: Random.dataImage('120x40', 'p7n5w')
	}
	return result
})

Mock.mock('/login', 'post', () => {

	// 无法在header中传入数jwt

	// result.code = 400
	// result.msg = "验证码错误"

	return result
})