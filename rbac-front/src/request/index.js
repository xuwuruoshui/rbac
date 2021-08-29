import axios from 'axios'
import router from '../router'
import qs from 'qs'
import Element from 'element-ui'

//axios.defaults.baseURL = "http://localhost:8081"

const instance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  config.headers['Authorization'] = localStorage.getItem('token')
  return config
})

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    let res = response.data

    if (res.code === 200) {
      return res.data
    } else {
      Element.Message.error(res.msg ? res.msg : '系统异常')
      return Promise.reject(response.data.msg)
    }
  },
  (error) => {
    console.log(error)

    // 获取后端出错信息
    if (error.response.data) {
      error.massage = error.response.data.msg
    } else {
      errorMsg(error)
    }

    if (error.response.status === 401) {
      router.push('/login')
    }

    Element.Message.error(error.massage, { duration: 3000 })
    return Promise.reject(error)
  }
)

// 后端没传数据，默认响应错误
let errorMsg = error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = "请求错误(400)"
        break
      case 401:
        error.message = "未授权,请登录(401)"
        break
      case 403:
        error.message = "拒绝访问(403)"
        break
      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`
        break
      case 405:
        error.message = "请求方法未允许(405)"
        break
      case 408:
        error.message = "请求超时(408)"
        break
      case 500:
        error.message = "服务器内部错误(500)"
        break
      case 501:
        error.message = "服务未实现(501)"
        break
      case 502:
        error.message = "网络错误(502)"
        break
      case 503:
        error.message = "服务不可用(503)"
        break
      case 504:
        error.message = "网络超时(504)"
        break
      case 505:
        error.message = "HTTP版本不受支持(505)"
        break
      default:
        error.message = `连接错误: ${error.message}`
    }
  }
}

const request = {
  get(url, data) {
    return instance.get(url, { params: data })
  },
  post(url, data) {
    return instance.post(url, qs.stringify(data))
  },
  doGet(url, data) {
    return instance.get(url, { params: data })
  },
  doPost(url, data) {
    return instance.post(url, qs.stringify(data))
  }
}

export default request

