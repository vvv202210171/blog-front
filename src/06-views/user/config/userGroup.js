import store from '@/04-store/index'
import i18n from '@/locales/index'
export const search = {
  'MerchantAlias': store.getters.user.MerchantAlias
}

export const filters = [
  [
    { key: 'MerchantAlias', label: i18n.t('report_0018'), type: 'string', elemName: 'select', enterTrigger: true, active: search.MerchantAlias },
    { elemName: 'actions' }
  ]
]

export const actions = [
  { key: 'search', elemName: 'button', label: i18n.t('report_0023'), type: 'primary', icon: 'el-icon-search', actionName: 'search' },
  { key: 'create', role: '0202_0001', elemName: 'button', label: i18n.t('report_0125'), type: 'primary', icon: 'el-icon-s-custom', actionName: 'create' }
]

export const report = {
  expand: [],
  items: [
    { label: i18n.t('report_0038'), key: 'MerchantAlias', align: 'left' },
    { label: i18n.t('report_0039'), key: 'MerchantName', align: 'left' },
    { label: i18n.t('report_0126'), key: 'UserGroupName', align: 'left' },
    { label: i18n.t('report_0127'), key: 'IsDefault', align: 'left', slot: 'IsDefault' },
    // { label: '创建人', key: 'CreateUser', align: 'left' },
    { label: i18n.t('report_0067'), key: 'CreateTS', align: 'left' },
    { label: i18n.t('common_0043'), key: 'action', align: 'center', width: 300 }
  ],
  actions: [
    { role: '0201_0002', code: 'editor' },
    { role: '0201_0003', code: 'roleSetting', hideForDefaultUser: true },
    { role: '0201_0004', code: 'delete' }
  ]
}

export default { filters, actions, report }

