import i18n from '@/locales/index'
export const search = {
  'MerchantAlias': ''
}

export const filters = [
  [
    { key: 'MerchantAlias', label: i18n.t('report_0038'), type: 'string', elemName: 'select', enterTrigger: true },
    { elemName: 'actions' }
  ]
]

export const actions = [
  { key: 'search', elemName: 'button', label: i18n.t('report_0023'), type: 'primary', icon: 'el-icon-search', actionName: 'search' },
  { key: 'editor', elemName: 'button', label: i18n.t('report_0263'), type: 'primary', icon: 'el-icon-edit', actionName: 'editor', role: '0505_0002', hideForSuperMerchant: true }
]

export const report = {
  expand: [],
  items: [
    { label: i18n.t('report_0038'), key: 'MerchantAlias', align: 'left' },
    { label: i18n.t('report_0019'), key: 'CurrencyCode', align: 'left' },
    { label: i18n.t('report_0058'), key: 'CashoutTypeCode', align: 'left' },
    { label: i18n.t('report_0059'), key: 'CashoutTypeName', align: 'left' },
    { label: `${i18n.t('report_0224')}(%)`, key: 'ServiceFee', align: 'left', suffix: '%' },
    { label: i18n.t('report_0061'), key: 'MinServiceFeeAmount', align: 'left' },
    { label: i18n.t('report_0062'), key: 'MaxServiceFeeAmount', align: 'left' }

  ],
  actions: []
}

export const report2 = {
  expand: [],
  items: [
    { label: i18n.t('report_0038'), key: 'MerchantAlias', align: 'left' },
    { label: i18n.t('report_0019'), key: 'CurrencyCode', align: 'left' },
    { label: i18n.t('report_0225'), key: 'PayTypeCode', align: 'left' },
    { label: i18n.t('report_0226'), key: 'PayTypeName', align: 'left' },
    { label: i18n.t('report_0211'), key: 'MerchantPayChannelID', align: 'left' },
    { label: i18n.t('report_0074'), key: 'SortIndex', align: 'left' },
    { label: `${i18n.t('report_0224')}(%)`, key: 'ServiceFee', align: 'left', suffix: '%' },
    { label: i18n.t('report_0061'), key: 'MinServiceFeeAmount', align: 'left' },
    { label: i18n.t('report_0062'), key: 'MaxServiceFeeAmount', align: 'left' }

  ],
  actions: []
}

export default { filters, actions, report, report2 }

