import i18n from '@/locales/index'
export const search = {
  'PayProviderCode': '' // 供应商编号
}

export const filters = [
  [
    { key: 'PayProviderCode', label: i18n.t('report_0099'), type: 'string', elemName: 'input', enterTrigger: true, clear: true },
    { elemName: 'actions' }
  ]
]

export const actions = [
  { key: 'search', elemName: 'button', label: i18n.t('report_0023'), type: 'primary', icon: 'el-icon-search', actionName: 'search' }
]

export const report = {
  expand: [],
  items: [
    { label: i18n.t('report_0068'), key: 'PayProviderCode', align: 'left', width: 100 },
    { label: i18n.t('report_0069'), key: 'PayProviderName', align: 'left' },
    { label: i18n.t('report_0100'), key: 'IsSourceProvider', align: 'left', slot: 'IsSourceProvider', width: 150 },
    { label: i18n.t('report_0101'), key: 'PayTypeMappingList', align: 'left', slot: 'PayTypeMappingList' },
    { label: i18n.t('report_0098'), key: 'BankMappingList', align: 'left', slot: 'BankMappingList' },
    // { label: i18n.t('report_0102'), key: 'EnableMerchantList', align: 'left', slot: 'EnableMerchantList' },
    { label: i18n.t('report_0031'), key: 'PayProviderStatus', align: 'left', slot: 'PayProviderStatus', width: 150 },
    { label: i18n.t('common_0043'), key: 'action', align: 'center', width: '400' }
  ],
  actions: [
    { role: '0301_0002', code: 'editorPayType' },
    { role: '0301_0003', code: 'editorPayBank' }
    // { role: '0301_0004', code: 'editorRemark' },
    // { role: '0301_0005', code: 'editorMerchantList' }
  ]
}

export default { filters, actions, report }

