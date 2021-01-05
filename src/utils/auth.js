/**
 *  Token
 */
export function getToken() {
  const token = window.localStorage.getItem('token')
  return token
}

export function setToken(token) {
  window.localStorage.setItem('token', token)
}

export function removeToken() {
  return window.localStorage.removeItem('token')
}

/**
 * 过期时间
 */
export function getTokenExpireTime() {
  const expires = window.localStorage.getItem('token_expire_time')
  return expires
}

export function setTokenExpireTime(token_expire_time) {
  window.localStorage.setItem('token_expire_time', token_expire_time * 1000)
}

export function removeTokenExpireTime() {
  return window.localStorage.removeItem('token_expire_time')
}

