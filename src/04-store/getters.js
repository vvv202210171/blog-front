const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  user: state => state.admin.user,
  usergroup: state => state.user.usergroup,
  // introduction: state => state.user.introduction,
  merchantList: state => state.merchant.merchantList,
  currency: state => state.admin.currency,
  spiderAccountList: state => state.admin.spiderAccountList,
  qrSpiderAccountList: state => state.admin.qrSpiderAccountList,
  bankcardSpiderAccountList: state => state.admin.bankcardSpiderAccountList,
  trueMoneyAccountList: state => state.admin.trueMoneyAccountList,
  payTypeList: state => state.admin.payTypeList,
  cashoutTypeList: state => state.admin.cashoutTypeList,
  bankList: state => state.admin.bankList,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  lang: state => state.app.lang,
  roles: state => state.permission.roles
}
export default getters
