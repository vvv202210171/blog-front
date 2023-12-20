import request from '@/02-utils/request'


// Admin 后台用户登录接口
export function adminLogin(data) {
  return request({
    url: '/admin/login',
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
    url: '/admin/profile',
    method: 'get'
  })
}
export function reg(data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data
  })
}
//	•	当前用户登录密码重置接口
export function changeUserPassword(data) {
  return request({
    url: '/admin/edit_pwd',
    method: 'post',
    data,
    ...extend
  })
}
