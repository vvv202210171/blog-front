import request from '@/02-utils/request'



// [支付供应商管理] 查询可用商户设定
export function getEnableMerchantList(data = {
  'PayProviderCode': '' // 支付供应商编号
}) {
  return request({
    url: '/rp_api/payprovider/enablemerchantlist',
    method: 'post',
    data
  })
}

// [支付供应商管理] 查询供应商描述
export function getPayProviderDesc(data = {
  'PayProviderCode': '' // 支付供应商编号
}) {
  return request({
    url: '/rp_api/payprovider/settingdesc',
    method: 'post',
    data
  })
}

// 支付供应商管理 - 编辑供应商
export function updatePayProvider(data = {
  'PayProviderCode': '', // 支付供应商编号
  'PayProviderStatus': 0 // 供应商状态    1 : 启用    2 : 停用    3 : 下架
}) {
  return request({
    url: '/mc_api/updatepayprovider',
    method: 'post',
    data
  })
}

// 支付供应商管理 - 编辑支付供应商可用商户列表
export function updatePayProviderMerchantStatus(data = {
  'PayProviderCode': '', // 支付供应商编号
  'MerchantList': [] // 商户编号(勾选的商户)
}) {
  return request({
    url: '/mc_api/updatepayproviderenablemerchant',
    method: 'post',
    data
  })
}

// 支付供应商管理 - 编辑支付供应商描述
export function updatePayproviderSettingDesc(data = {
  'PayProviderCode': '', // 供应商编号
  'TitlePublicKey': '', // 公钥设定描述
  'ShowPublicKey': true, // 公钥设定是否显示
  'TitlePrivateKey': '', // 私钥设定描述
  'ShowPrivateKey': true, // 私钥设定是否显示
  'TitleSettingA': '', // 设定A描述
  'ShowSettingA': true, // 设定A是否显示
  'TitleSettingB': '',
  'ShowSettingB': true,
  'TitleSettingC': '',
  'ShowSettingC': true,
  'TitleSettingD': '',
  'ShowSettingD': true
}) {
  return request({
    url: '/mc_api/updatepayprovidersettingdesc',
    method: 'post',
    data
  })
}
