import request from './request1'

export function getSelf () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}