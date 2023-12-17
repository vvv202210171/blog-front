import request from '@/02-utils/request'

// 	•	[商户管理] 查询商户列表
export function merchantList(data = {
  MerchantAlias: '' // 商户编码
}) {
  return request({
    url: '/rp_api/merchant/list',
    method: 'post',
    data
  })
}

//	•	[商户管理] 查询商户权限
export function permissionList(data = {
  MerchantAlias: '' // 商户编码
}) {
  return request({
    url: '/rp_api/merchant/permissionlist',
    method: 'post',
    data
  })
}

//  •	新增商户接口
export function addMerchant(data = {
  'MerchantAlias': '', // 商户编号
  'MerchantName': '', // 商户名称
  'MerchantStatus': '', // 商户状态
  'AdminUser': '', // 默认登录账号
  'Password': '', // 密码
  'CurrencyCode': '' // 货币类型
}, extend) {
  return request({
    url: '/mc_api/addmerchant',
    method: 'post',
    data,
    ...extend
  })
}

//	•	API白名单修改接口
export function editorApiIpList(data = {
  'MerchantAlias': '', // 商户编号
  'IpList': '', // API白名单列表，多个IP以英文”,”逗号字符隔开
  'BOIpList': '' // 后台白名单列表，多个IP以英文”,”逗号字符隔开
}, extend) {
  return request({
    url: '/mc_api/apiiplist',
    method: 'post',
    data,
    ...extend
  })
}

//	•	编辑商户接口
export function updateMerchant(data = {
  'MerchantAlias': '', // 商户编号
  'MerchantName': '', // 商户名称
  'MerchantStatus': '' // 商户状态
}, extend) {
  return request({
    url: '/mc_api/updatemerchant',
    method: 'post',
    data,
    ...extend
  })
}

// 	商户列表 - 获取商户API秘钥
export function getPrivateKey(data = {
  'MerchantAlias': '', // 商户编号
  'GoogleVerifyCode': '' // 需要验证google验证码
}, extend) {
  return request({
    url: '/mc_api/getprivatekey',
    method: 'post',
    data,
    ...extend
  })
}

// 商户权限管理 - 编辑商户权限设定
export function updateMerchantPermission(data = {
  'MerchantAlias': '', // 商户编号
  'PagePermissionCode': [] // 权限值
}, extend) {
  return request({
    url: '/mc_api/updatemerchantpermission',
    method: 'post',
    data,
    ...extend
  })
}

// 商户列表 - 获取商户API白名单
export function getMerchantApiList(data = {
  'MerchantAlias': '' // 商户编号
}) {
  return request({
    url: '/mc_api/getmerchantapilist',
    method: 'post',
    data
  })
}

// 商户管理 - 查询商户支付渠道设定
export function getPayChannelList(data = {
  'MerchantAlias': '' // 商户编号
}) {
  return request({
    url: '/rp_api/merchant/paychannel/servicefee/setting/list',
    method: 'post',
    data
  })
}

// 商户管理 - 更新商户支付渠道设定
export function updatePayChannel(data = {
  'MerchantAlias': '', // 商户编号
  'SettingList': [{
    'MerchantPayChannelID': '',
    'PayTypeCode': '',
    'ServiceFee': 0.0,
    'MinServiceFeeAmount': 0.0,
    'MaxServiceFeeAmount': 0.0,
    'SortIndex': 0,
    'Enable': false
  }]
}, extend) {
  return request({
    url: '/mc_api/merchant/paychannel/servicefee/setting/update',
    method: 'post',
    data,
    ...extend
  })
}

// 商户管理 - 查询商户代付渠道设定
export function getCashoutSetting(data = {
  'MerchantAlias': '' // 商户编号
}) {
  return request({
    url: '/rp_api/merchant/cashout/servicefee/setting/list',
    method: 'post',
    data
  })
}

// 商户管理 - 更新商户代付渠道设定
export function updateCashoutSetting(data = {
  'MerchantAlias': '',
  'SettingList': [{
    'CashoutTypeCode': '',
    'ServiceFee': 0.0,
    'MinServiceFeeAmount': 0.0,
    'MaxServiceFeeAmount': 0.0,
    'Enable': false
  }]
}, extend) {
  return request({
    url: '/mc_api/merchant/cashout/servicefee/setting/update',
    method: 'post',
    data,
    ...extend
  })
}


// 商户额度管理 - 手动存取款

export function manualChange(data = {
  'MerchantAlias': '',
  'DiffAmount': 0.00,
  'Remark': '',
  'RemarkForMerchant': '',
  'GoogleVerifyCode': ''
}, extend) {
  return request({
    url: '/mc_api/merchant/balance/manualChange',
    method: 'post',
    data,
    ...extend
  })
}


export function getSystemSetting(data = {
}, extend) {
  return request({
    url: '/mc_api/system/systemsetting/get',
    method: 'post',
    data,
    ...extend
  })
}

export function updateSystemSetting(data = {
  IsPaymentInMaintenance: false,
  PaymentMaintenanceFrom: '',
  PaymentMaintenanceTo: '',
  IsCashoutMaintenance: false,
  CashoutMaintenanceFrom: '',
  CashoutMaintenanceTo: ''
}, extend) {
  return request({
    url: '/mc_api/system/systemsetting/update',
    method: 'post',
    data,
    ...extend
  })
}


export function getMerchantAPIKey(data = {
  'MerchantAlias': 'xpay',
  'GoogleVerifyCode': 1
}, extend) {
  return request({
    url: '/mc_api/merchant/key/get',
    method: 'post',
    data,
    ...extend
  })
}

export function apiDataManagementInfo(data = {
  'MerchantAlias': ''
}, extend) {
  return request({
    url: '/rp_api/mc/apiDataManagement/list',
    method: 'post',
    data,
    ...extend
  })
}

export function verifyMerchantWithdraw(data = {
  'MerchantWithdrawOrderNo': '',
  'Confirm': true,
  'VerifyRemark': '',
  'VerifyRemarkToMerchant': ''
}, extend) {
  return request({
    url: '/mc_api/withdraw/order/verify',
    method: 'post',
    data,
    ...extend
  })
}


export function resetWithdrawPassword(data = {
  'MerchantAlias': '',
  'OldWithdrawPassword': '',
  'NewWithdrawPassword': '',
  'GoogleVerifyCode': ''
}, extend) {
  return request({
    url: '/mc_api/merchant/withdraw/password/reset',
    method: 'post',
    data,
    ...extend
  })
}

export function editorSelfWithdrawPassword(data = {
  'MerchantAlias': '',
  'OldWithdrawPassword': '',
  'NewWithdrawPassword': '',
  'GoogleVerifyCode': ''
}, extend) {
  return request({
    url: '/mc_api/merchant/withdraw/password/change',
    method: 'post',
    data,
    ...extend
  })
}

