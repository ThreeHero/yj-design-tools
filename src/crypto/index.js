import CryptoJS from 'crypto-js'

/**
 * md5加密
 * @param {string} str
 * @returns
 */
export function md5(str) {
  return CryptoJS.MD5(str).toString()
}
