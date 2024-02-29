import axios from 'axios'
import NProgress from 'nprogress'
import { BASEURL } from '../const/index'
import { getToken } from '../cache'

/**
 * 获取请求实例
 * @param {Object} [config = {}] 配置对象
 * @param {string} [config.baseURL=BASEURL] 基本地址
 * @param {function} [callback] 失败的函数 可以用message.error
 * @param {number} [successCode=200] 前后端约定的成功状态码
 * @returns
 */
export const getInstance = (config = {}, callback = () => {}, successCode = 200) => {
  /**
   * 实例对象
   */
  let instance = null

  const defaultConfig = {
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }

  instance = axios.create({
    ...defaultConfig,
    baseURL: BASEURL,
    ...config
  })

  /**
   * 请求拦截器
   */
  instance.interceptors.request.use(
    config => {
      NProgress.start()
      const token = getToken()
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    error => {
      console.error(error)
      return Promise.reject(error)
    }
  )

  /**
   * 响应拦截器
   */
  instance.interceptors.response.use(
    response => {
      NProgress.done()
      // 判断axios自带封装
      if (response.status === 200) {
        const { code, data, message: msg } = response.data
        if (code === successCode) {
          return data
        } else {
          callback?.(msg)
          return null
        }
      } else {
        return null
      }
    },
    error => {
      NProgress.done()
      console.error(error)
      return Promise.reject(error)
    }
  )

  return instance
}

/**
 * 不需要验证的请求头
 */
export const noAuthHeaders = {
  No_auth: 'YES'
}

/**
 * 拼接路径
 * @param {string} path 路径
 * @param {string} [baseUrl=BASEURL] 基本地址
 * @returns
 */
export const addPath = (path, baseUrl = BASEURL) => {
  if (path === undefined || path === null) {
    return null
  }
  return baseUrl + path
}
