import request from '@/utils/request'

export function service_list(data) {
  return request({
    url: '/service/service_list',
    method: 'get',
    params: data
  })
}
