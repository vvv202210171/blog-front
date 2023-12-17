import store from '@/04-store/index'
import i18n from '@/locales/index'
export const search = {
  'MerchantAlias': store.getters.user.MerchantAlias,
  'UserName': '' // 用户名
}

export const filters = [
  [
    { key: 'MerchantAlias', label: i18n.t('report_0018'), type: 'string', elemName: 'select', enterTrigger: true, active: search.MerchantAlias },
    { key: 'UserName', label: i18n.t('report_0115'), type: 'string', elemName: 'input', enterTrigger: true, clear: true },
    { elemName: 'actions' }
  ]
]

export const actions = [
  { key: 'search', elemName: 'button', label: i18n.t('report_0023'), type: 'primary', icon: 'el-icon-search', actionName: 'search' },
  { key: 'create', role: '0101_0001', elemName: 'button', label: i18n.t('report_0121'), type: 'primary', icon: 'el-icon-user', actionName: 'create' }
]

export const report = {
  expand: [],
  items: [
    { label: i18n.t('report_0038'), key: 'MerchantAlias', align: 'left' },
    { label: i18n.t('report_0039'), key: 'MerchantName', align: 'left' },
    { label: i18n.t('report_0115'), key: 'UserName', align: 'left' },
    { label: i18n.t('report_0123'), key: 'UserGroupName', align: 'left' },
    { label: i18n.t('report_0128'), key: 'RealName', align: 'left' },
    { label: i18n.t('report_0129'), key: 'IsDefault', align: 'left', slot: 'IsDefault' },
    { label: i18n.t('report_0031'), key: 'Enable', align: 'left', slot: 'Enable' },
    { label: i18n.t('report_0067'), key: 'CreateTS', align: 'left', width: 135 },
    { label: i18n.t('report_0130'), key: 'LastLoginTS', align: 'left', width: 135 },
    { label: i18n.t('report_0131'), key: 'LastLoginIP', align: 'left', width: 110 },
    { label: i18n.t('report_0132'), key: 'LastLoginLocation', align: 'left' },
    { label: i18n.t('common_0043'), key: 'action', align: 'center', width: '300' }
  ],
  actions: [
    { role: '0202_0002', code: 'editor' },
    { role: '0202_0003', code: 'showGoogleCode' },
    { role: '0202_0004', code: 'reset' }
  ]
}

export default { filters, actions, report }

