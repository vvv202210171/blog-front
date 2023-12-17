// import config from '@/02-utils/config'
// import i18n from '@/locales/index'
// export const search = {
//   'MerchantAlias': '',
//   'BankCode': '', // 支付类型，所有=空字符串
//   'FilterParam': '', // 账号/持有人/备注
//   refresh: '15'
// }
// export const filters = [
//   [
//     { key: 'MerchantAlias', label: i18n.t('report_0018'), type: 'string', elemName: 'select', enterTrigger: true, active: search.MerchantAlias },
//     { key: 'FilterParam', label: i18n.t('report_0344'), type: 'string', elemName: 'input', enterTrigger: true, clear: true, col: 5 }
//   ],
//   [
//     { key: 'refresh', label: '自动刷新', type: 'string', elemName: 'select', enterTrigger: true, options: config.refreshOptions, active: search.refresh, col: 2 },
//     // { key: 'refresh', label: '', type: 'string', elemName: 'select', enterTrigger: true, options: config.refreshOptions, active: search.refresh, col: 2 },
//     { elemName: 'actions' }
//   ]
// ]

// export const actions = [
//   { key: 'search', elemName: 'button', label: i18n.t('report_0023'), type: 'primary', icon: 'el-icon-search', actionName: 'search' }
// ]

// export const report = {
//   expand: [],
//   items: [
//     { label: i18n.t('report_0289'), key: 'BindingMerchantAlias', align: 'left', slot: 'BindingMerchantAlias' },
//     { headerHtml: `${i18n.t('report_0291')}`, key: 'BankName', align: 'left' },
//     { label: i18n.t('report_0293'), key: 'CashoutBankCardNo', align: 'left' },
//     { label: i18n.t('report_0143'), key: 'CashoutBankCardAccount', align: 'left' },
//     { label: i18n.t('report_0144'), key: 'CashoutBankCardHolderName', align: 'left' },
//     { label: i18n.t('report_0274'), key: 'SpiderAccount', align: 'left' },
//     { headerHtml: `${i18n.t('report_0447')}`, key: 'CurrentBalance', slot: 'CurrentBalance', align: 'left' },

//     // { label: i18n.t('report_0031'), key: 'IsMonitor', align: 'left', slot: 'IsMonitor' },
//     { label: i18n.t('report_0030'), key: 'UpdateTSLocal', align: 'left' }
//   ],
//   actions: [
//   ]
// }

// export default { filters, actions, report }

