import { encryptAES, decryptAES } from '../crypto'

// 设置缓存
function setCache(key, value, isL = true) {
  if (typeof key !== 'string') return void 0
  if (value === null || value === undefined || Number.isNaN(value)) {
    return void 0
  }
  const Storage = isL ? localStorage : sessionStorage
  const v = JSON.stringify(value)
  const cryptV = encryptAES(v)
  Storage.setItem(key, cryptV)
}

// 获取缓存
function getCache(key, isL = true) {
  // 1. key 是字符串
  const Storage = isL ? localStorage : sessionStorage

  if (typeof key === 'string') {
    // 获取值
    const value = Storage.getItem(key)

    if (value === null || value === undefined || Number.isNaN(value)) {
      return null
    }

    // 获取到值
    const v = decryptAES(value)

    // 对解密的值进行解析
    try {
      const data = JSON.parse(v)
      return data
    } catch {
      return v
    }
  }

  // 2. key是数组
  if (Array.isArray(key)) {
    return key.map(k => getCache(k, isL))
  }
}

function clearCache(key, isL = true) {
  const Storage = isL ? localStorage : sessionStorage
  Storage.removeItem(key)
}

export { setCache, getCache, clearCache }
