import CryptoJS from 'crypto-js'
import App from '../App'
import { CRYPTO_KEY } from '../const'

function md5(str) {
  return CryptoJS.MD5(str).toString()
}

// 设置加密密钥
function getKey() {
  // 获取到应用名称
  const { name = '后台管理系统' } = App.getConfig() || {}
  const keys = CRYPTO_KEY.split('-')
  keys.splice(1, 0, name)
  return keys.join('-')
}

function encryptAES(str) {
  if (typeof str !== 'string') return ''
  const cipherText = CryptoJS.AES.encrypt(str, getKey()).toString()
  return cipherText
}

function decryptAES(str) {
  if (typeof str !== 'string') return ''
  const bytes = CryptoJS.AES.decrypt(str, getKey())
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8)
  return decryptedText
}

export { md5, encryptAES, decryptAES }
