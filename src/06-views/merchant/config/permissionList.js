import i18n from '@/locales/index'
export const search = {
  'MerchantAlias': ''
}

export const filters = [
]

export const actions = [
]

export const report = {
  expand: [],
  items: [
    { label: i18n.t('report_0038'), key: 'MerchantAlias', align: 'left' },
    { label: i18n.t('report_0039'), key: 'MerchantName', align: 'left' },
    { label: i18n.t('report_0019'), key: 'CurrencyCode', align: 'left' },
    { label: i18n.t('report_0052'), key: 'TimezoneDiffMinutes', align: 'left', isAmount: true },
    { label: i18n.t('report_0056'), key: 'IsSuper', align: 'left', slot: 'merchantType' },
    { label: i18n.t('report_0066'), key: 'CreateUser', align: 'left' },
    { label: i18n.t('report_0067'), key: 'CreateTS', align: 'left' },
    { label: i18n.t('common_0043'), key: 'action', align: 'center', width: '400' }
  ],
  actions: [
  ]
}

export default { filters, actions, report }

