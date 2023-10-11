import { setCache, getCache, clearCache } from './cache'
import { TOKEN_KEY } from './const'
import { md5 } from './crypto'
import dayjs from './dayjs'

class App {
  config = null

  static getConfig = () => {
    return this.config
  }

  static setConfig = config => {
    this.config = config
  }

  static setToken = token => {
    setCache(TOKEN_KEY, token)
  }

  static getToken = () => {
    return getCache(TOKEN_KEY)
  }

  static clearToken = () => {
    return clearCache(TOKEN_KEY)
  }

  static setCache = setCache

  static getCache = getCache

  static clearCache = clearCache

  static md5 = md5

  static dayjs = dayjs
}

export default App
