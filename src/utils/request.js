import axios from 'axios'

import { getToken, getTokenExpireTime, setToken, setTokenExpireTime, removeToken, removeTokenExpireTime } from './auth'

import { refresh } from '@/api/user'

import { MessageBox, Message } from 'element-ui'

// create an axios instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 防止重复刷新
let isRefreshing = false

instance.interceptors.request.use(config => {
  const token_expire_time = getTokenExpireTime()
  const token = getToken()
  config.headers['Content-Type'] = 'application/json'
  config.headers['Authorization'] = 'Bearer ' + getToken()
  // 登录、刷新、登出、token接口绕过
  if (config.url.indexOf('/refresh') >= 0 || config.url.indexOf('/login') >= 0 || config.url.indexOf('/logout') >= 0) {
    return config
  }
  if (token && token_expire_time) {
    const now = Date.now()
    if (now >= token_expire_time) {
      // 立即刷新token
      let requests = []
      if (!isRefreshing) {
        console.log('刷新token ing')
        isRefreshing = true
        refresh().then(res => {
          const { access_token, token_expire_time } = res.data.data
          setToken(access_token) // 存token到localStorage
          setTokenExpireTime(token_expire_time)
          config.headers['Authorization'] = 'Bearer ' + getToken() // 将最新的token放到请求头
          isRefreshing = false // 刷新成功，恢复标志位
          return access_token
        }).then((token) => {
          console.log('刷新token成功，执行队列')
          requests.forEach(cb => cb(token))
          // 执行完成后，清空队列
          requests = []
        }).catch(error => {
          removeToken()
          removeTokenExpireTime()
          MessageBox.confirm('你已经注销，你可以取消继续留在这个页面上，或者重新登录。', '确认登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            location.reload()
          })
          return Promise.reject(error.response.data.message)
        })

        const retryOriginalRequest = new Promise((resolve) => {
          requests.push((token) => {
            // 因为config中的token是旧的，所以刷新token后要将新token传进来
            config.headers['Authorization'] = 'Bearer ' + token
            resolve(config)
          })
        })
        return retryOriginalRequest
      }
    }
  }
  return config
})

instance.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status !== 401) {
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 1000
    })
  }
  return Promise.reject(error)
})

export default instance
