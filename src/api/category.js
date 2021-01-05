import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/categories',
    method: 'get',
    params: data
  })
}
export function childListByPid(data) {
  return request({
    url: '/categories',
    method: 'get',
    params: data
  })
}
export function add(data) {
  return request({
    url: '/categories',
    method: 'post',
    data
  })
}
