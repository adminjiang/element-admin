import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/me',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function change_pwd(data) {
  return request({
    url: '/change_pwd',
    method: 'post',
    data
  })
}

export function refresh() {
  return request({
    url: '/refresh',
    method: 'get'
  })
}
