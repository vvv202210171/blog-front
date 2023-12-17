import request from '@/02-utils/request'

// 获取当前登陆用户的权限详情
export function getUserCurrentPermission() {
  return request({
    url: '/rp_api/user/currentpermission',
    method: 'get'
  })
}
// Admin 后台用户登录接口
export function adminLogin(data = {
  'MerchantAlias': '', // 商户编号
  'UserName': '', // 用户名
  'Password': '', // 登录密码
  'GoogleVerifyCode': '' // google验证码
}) {
  return request({
    url: '/mc_api/login',
    method: 'post',
    data
  })
}

//	•	CheckSession 接口
export function checkSession() {
  return request({
    url: '/mc_api/checksession',
    method: 'get'
  })
}

//	•	获取用户在线登录终端详情列表接口
export function getLoginInfo() {
  return request({
    url: '/mc_api/logininfo',
    method: 'get'
  })
}

//	•	当前用户登录密码重置接口
export function changeUserPassword(data = {
  OldPassword: '', // 旧密码
  NewPassword: '', // 新密码
  GoogleVerifyCode: '' // OPT验证码
}, extend) {
  return request({
    url: '/mc_api/userpasswordchange',
    method: 'post',
    data,
    ...extend
  })
}
