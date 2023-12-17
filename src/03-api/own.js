import request from '@/02-utils/request'



export function addTraderRemark(data = {
}, extend) {
  return request({
    url: '/mc_api/traderlist/addtraderremark',
    method: 'post',
    data,
    ...extend
  })
}

// 新增或者更新广告
export function mergeAdvertise(data = {
}, extend) {
  return request({
    url: '/mc_api/advertise/advertise_merge',
    method: 'post',
    data,
    ...extend
  })
}
// 广告列表
export function listAdvertise(data = {
}, extend) {
  return request({
    url: '/rp_api/advertise/advertise_list',
    method: 'post',
    data,
    ...extend
  })
}
// 广告单条查询
export function getAdvertise(data = {
}, extend) {
  return request({
    url: '/rp_api/advertise/advertise_get',
    method: 'post',
    data,
    ...extend
  })
}

// 文章单条查询
export function getArticle(data = {
}, extend) {
  return request({
    url: '/rp_api/article/article_get',
    method: 'post',
    data,
    ...extend
  })
}

// 文章单条查询
export function listArticle(data = {
}, extend) {
  return request({
    url: '/rp_api/article/article_list',
    method: 'post',
    data,
    ...extend
  })
}



// // 查询线下二维码监控列表
// export function queryCashoutBankCardMonitorList(data = {
//   'CurrencyCode': '', // 币种，所有=空字符串
//   'BankCode': '', // 银行Code，所有=空字符串
//   'FilterParam': '' // 账号/持有人/备注
// }) {
//   return request({
//     url: '/rp_api/originalcashoutbankcardmonitor/querylist',
//     method: 'post',
//     data
//   })
// }
