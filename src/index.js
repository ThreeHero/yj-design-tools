import {
  getCache,
  getToken,
  getUserinfo,
  setCache,
  setToken,
  setUserinfo,
  clearCache,
  clearToken,
  clearUserinfo
} from './cache'
import { dateJs, formatDate } from './dayjs'
import { md5 } from './crypto'
import { getInstance, noAuthHeaders } from './http'

const http = getInstance()

export {
  getCache,
  getToken,
  getUserinfo,
  setCache,
  setToken,
  setUserinfo,
  clearCache,
  clearToken,
  clearUserinfo,
  formatDate,
  dateJs,
  md5,
  noAuthHeaders,
  getInstance,
  http
}

export default {
  getCache,
  getToken,
  getUserinfo,
  setCache,
  setToken,
  setUserinfo,
  clearCache,
  clearToken,
  clearUserinfo,
  formatDate,
  dateJs,
  md5,
  noAuthHeaders,
  getInstance,
  http
}
