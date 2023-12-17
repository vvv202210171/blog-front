import request from '@/02-utils/request'

// 在线用户剔线
export function kickUser(data = {
  'SessionKey': '' // 被踢的在线用户SessionKey
}, extend) {
  return request({
    url: '/mc_api/kickuser',
    method: 'post',
    data,
    ...extend
  })
}

// 用户组管理 - 新增用户组
export function addUserGroup(data = {
  'UserGroupName': '' // 用户组名称
}, extend) {
  return request({
    url: '/mc_api/addusergroup',
    method: 'post',
    data,
    ...extend
  })
}

// 用户组管理 - 编辑用户组
export function updateUserGroup(data = {
  'UserGroupId': 0, // 用户组ID
  'UserGroupName': '' // 用户组名称
}, extend) {
  return request({
    url: '/mc_api/updateusergroup',
    method: 'post',
    data,
    ...extend
  })
}

// 用户组管理 - 删除用户组
export function deleteUserGroup(data = {
  'UserGroupId': 0 // 用户组ID
}, extend) {
  return request({
    url: '/mc_api/deleteusergroup',
    method: 'post',
    data,
    ...extend
  })
}

// 用户列表 - 重置其他用户密码
export function resetUserPassword(data = {
  'UserName': '', // 被重置密码的用户名
  'Password': '', // 新密码
  'GoogleVerifyCode': '' // OTP验证码
}, extend) {
  return request({
    url: '/mc_api/resetuserpassword',
    method: 'post',
    data,
    ...extend
  })
}

// 用户组管理 - 查询用户组列表
export function getUserGroupList(data = {
  'MerchantAlias': '' // 商户编码
}) {
  return request({
    url: '/rp_api/usergroup/list',
    method: 'post',
    data
  })
}

// 用户组管理 - 查询用户组权限
export function getPermissionList(data = {
  'UserGroupID': 0 // 用户组ID
}) {
  return request({
    url: '/rp_api/usergroup/permissionlist',
    method: 'post',
    data
  })
}

// 用户列表 - 查询Google验证器信息
export function getValidatorInfo(data = {
  'UserName': '', // 被查看的用户名
  'LoginPassword': '' // 当前用户登录密码
}, extend) {
  return request({
    url: '/mc_api/getvalidatorinfo',
    method: 'post',
    data,
    ...extend
  })
}

// 用户管理 - 用户组下拉数据
export function getUserGroupSimpleList(data = {
  'MerchantAlias': '' // 商户编码
}) {
  return request({
    url: '/rp_api/usergroup/simplelist',
    method: 'post',
    data
  })
}

// 用户管理 - 查询用户列表
export function getUserList(data = {
  'MerchantAlias': '', // 商户编码
  'UserName': '' // 用户名
}) {
  return request({
    url: '/rp_api/user/list',
    method: 'post',
    data
  })
}

// 用户组管理 - 编辑用户组权限
export function modifyUserGroupPermission(data = {
  'UserGroupId': '', // 用户组ID
  'PagePermissionCode': [], // 父权限CODE
  'PageFunctionCode': [] // 子权限CODE
}, extend) {
  return request({
    url: '/mc_api/modifyusergrouppermission',
    method: 'post',
    data,
    ...extend
  })
}

// 用户列表 -新增用户
export function addUser(data = {
  'UserName': '', // 用户名
  'MerchantAlias': '', // 商户编号
  'UserGroupId': 0, // 用户组ID
  'Enable': true, // 用户状态   true：启用   false：禁用
  'Password': '' // 登录密码
}, extend) {
  return request({
    url: '/mc_api/adduser',
    method: 'post',
    data,
    ...extend
  })
}

// 用户列表 - 编辑用户
export function updateUser(data = {
  'UserName': '', // 用户名
  'UserGroupId': 1, // 用户组ID
  'Enable': true // 用户状态   true：启用   false：禁用
}, extend) {
  return request({
    url: '/mc_api/updateUser',
    method: 'post',
    data,
    ...extend
  })
}

// 在线用户列表
export function getOnlineUserList(data = {
  'MerchantAlias': '', // 商户编号
  'UserName': '', // 用户名
  'LoginIp': '' // 登录IP
}, extend) {
  return request({
    url: '/mc_api/getonlineuserlist',
    method: 'post',
    data
  })
}

