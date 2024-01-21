// 设置缓存
function setCache(key, value, isL = true) {
  if (typeof key !== 'string') null
  if (value === null || value === undefined || Number.isNaN(value)) {
    return null
  }
  const Storage = isL ? localStorage : sessionStorage
  const v = JSON.stringify(value)
  Storage.setItem(key, v)
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

    const data = JSON.parse(value)
    return data
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
