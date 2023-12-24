import request from '@/02-utils/request'

//	•	[商户下拉] 商户下拉列表的数据源
export function simpleList() {
  return request({
    url: '/rp_api/merchant/simplelist',
    method: 'get'
  })
}

export function currencyList(data = {}) {
  return request({
    url: '/mc_api/currencylist',
    method: 'post',
    data
  })
}

export function spiderAccountList(data = {
}, extend) {
  return request({
    url: '/rp_api/xpay/spideraccountlist',
    method: 'post',
    data
  })
}

export function qrSpiderAccountList(data = {
}, extend) {
  return request({
    url: '/rp_api/xpay/qrspideraccountlist',
    method: 'post',
    data
  })
}

export function bankcardSpiderAccountList(data = {
}, extend) {
  return request({
    url: '/rp_api/xpay/bankcardspideraccountlist',
    method: 'post',
    data
  })
}

export function trueMoneyAccountList(data = {
}, extend) {
  return request({
    url: '/rp_api/xpay/truemoneyaccountlist',
    method: 'post',
    data
  })
}

export function paytypeList(data = {}) {
  return request({
    url: '/mc_api/paytypelist',
    method: 'post',
    data
  })
}

export function cashoutTypeList(data = {}) {
  return request({
    url: '/mc_api/cashouttypelist',
    method: 'post',
    data
  })
}

export function bankList(data = {}) {
  return request({
    url: '/mc_api/banklist',
    method: 'post',
    data
  })
}

export function check(data = {}, extend) {
  return request({
    url: '/mc_api/access/check',
    method: 'post',
    data,
    ...extend
  })
}

export function logout(data = {}, extend) {
  return request({
    url: '/admin/logout',
    method: 'post',
    data,
    ...extend
  })
}


export function waitRecordCount(data = {}, extend) {
  return request({
    url: '/rp_api/xpay/waitrecordcountget',
    method: 'post',
    data,
    ...extend
  })
}

export function uploadFile(data) {
  return request({
    url: "/admin/upload/img",
    method: "post",
    data,
    isFormRequest: true,
  });
}