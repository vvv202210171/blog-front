import request from '@/02-utils/request'


// 用户管理 - 查询用户列表
export function getUserList(params) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    params
  })
}
// 用户管理 - 查询用户列表
export function getUserPageList(params) {
  return request({
    url: '/admin/user/page',
    method: 'get',
    params
  })
}

// 用户列表 -新增用户
export function addUser(data, isAction = true) {
  return request({
    url: '/admin/user/add',
    method: 'post',
    data,
    isAction
  })
}
// 用户列表 -新增用户
export function getUser(params) {
  return request({
    url: '/admin/user/get',
    method: 'get',
    params
  })
}
// 用户列表 - 编辑用户
export function updateUser(data, isAction = true) {
  return request({
    url: '/admin/user/update',
    method: 'post',
    data,
    isAction
  })
}

// 用户列表 - 编辑用户
export function deleteUser(params, isAction = true) {
  return request({
    url: '/admin/user/delete',
    method: 'get',
    params,
    isAction
  })
}

