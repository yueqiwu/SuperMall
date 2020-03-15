import request from './request1'

/**
 * 登录
 */
export function loginApi (data) {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

/**
 * 获取验证码
 */
export function sendSmsCode (mobile) {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}