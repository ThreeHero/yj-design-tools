// 获取实例的方法
import axios from 'axios'
import NProgress from 'nprogress'
import { decryptAES } from '../crypto'
import App from '../App'

function getInstance(config = {}) {
  let instance = null
  const baseURL = 'http://127.0.0.1:9000'
  const defaultConfig = {
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }

  instance = axios.create({
    ...defaultConfig,
    baseURL,
    ...config
  })

  // 请求拦截器 携带token
  instance.interceptors.request.use(
    config => {
      const token = App.getToken()
      // 开始进度条
      NProgress.start()
      // 如果有token则携带
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 相应拦截器 现在只有成功和失败
  instance.interceptors.response.use(
    response => {
      // 关闭进度条
      NProgress.done()
      if (response.status === 200) {
        // axios 请求成功
        // 解构
        const { code, data, message } = response.data
        if (code === 200) {
          // 服务器请求成功
          // 判断是否使用过aes加密
          let d = null
          // 1. 对象
          if (typeof data !== 'string') {
            // 未加密
            d = data
          } else if (!decryptAES(data)) {
            // 未加密
            d = data
          } else {
            d = decryptAES(data)
          }
          // 返回数据
          return d
        } else {
          // 服务器请求失败
          // 返回错误信息和错误码
          return {
            code,
            message
          }
        }
      } else {
        return {
          code: 500,
          message: '系统内部错误'
        }
      }
    },
    error => {
      NProgress.done()
      return Promise.reject(error)
    }
  )

  return instance
}
export { getInstance }
