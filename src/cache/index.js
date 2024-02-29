import { TOKEN_KEY, USERINFO } from '../const'

// 设置缓存
export function setCache(key, value, isL = true) {
  if (typeof key !== 'string') return null
  if (value === null || value === undefined || Number.isNaN(value)) {
    return null
  }
  const Storage = isL ? localStorage : sessionStorage
  const v = JSON.stringify(value)
  Storage.setItem(key, v)
}

// 获取缓存
export function getCache(key, isL = true) {
  const Storage = isL ? localStorage : sessionStorage

  if (typeof key === 'string') {
    // 获取值
    const value = Storage.getItem(key)

    if (value === null || value === undefined || Number.isNaN(value)) {
      return null
    }

    const data = JSON.parse(value)
    return data
  }

  // 2. key是数组
  if (Array.isArray(key)) {
    return key.map(k => getCache(k, isL))
  }
}

export function clearCache(key, isL = true) {
  const Storage = isL ? localStorage : sessionStorage
  Storage.removeItem(key)
}

export const getToken = () => {
  return getCache(TOKEN_KEY)
}

export const getUserinfo = () => {
  return getCache(USERINFO)
}

export const setToken = token => {
  setCache(TOKEN_KEY, token)
}

export const setUserinfo = userinfo => {
  setCache(USERINFO, userinfo)
}

export const clearToken = () => {
  clearCache(TOKEN_KEY)
}

export const clearUserinfo = () => {
  clearCache(USERINFO)
}
