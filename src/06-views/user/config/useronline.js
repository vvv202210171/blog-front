import i18n from '@/locales/index'
export const search = {
  'MerchantAlias': '',
  'UserName': '', // 用户名
  'LoginIp': '' // 登录IP
}

export const filters = [
  [
    { key: 'MerchantAlias', label: i18n.t('report_0018'), type: 'string', elemName: 'select', enterTrigger: true, active: search.MerchantAlias },
    { key: 'UserName', label: i18n.t('report_0115'), type: 'string', elemName: 'input', enterTrigger: true, clear: true },
    { key: 'LoginIp', label: i18n.t('common_0038'), type: 'string', elemName: 'input', enterTrigger: true, clear: true },

    { elemName: 'actions' }
  ]
]

export const actions = [
  { key: 'search', elemName: 'button', label: i18n.t('report_0023'), type: 'primary', icon: 'el-icon-search', actionName: 'search' }
]

export const report = {
  expand: [],
  items: [
    { label: i18n.t('report_0038'), key: 'MerchantAlias', align: 'left' },
    { label: i18n.t('report_0039'), key: 'MerchantName', align: 'left' },
    { label: i18n.t('report_0115'), key: 'UserName', align: 'left' },
    { label: i18n.t('common_0037'), key: 'LoginTS', align: 'left', width: 135 },
    { label: i18n.t('common_0038'), key: 'LoginIP', align: 'left' },
    { label: i18n.t('common_0039'), key: 'LoginLocation', align: 'left' },
    { label: i18n.t('common_0040'), key: 'LastActiveTS', align: 'left', width: 135 },
    { label: i18n.t('common_0041'), key: 'BrowserUserAgent', align: 'left', width: 750 },
    { label: i18n.t('common_0043'), key: 'action', align: 'center' }
  ],
  actions: [
    { role: '0203_0001', code: 'kickUser' }
  ]
}

export default { filters, actions, report }

