import i18n from '@/locales/index'
export const search = {
  'MerchantAlias': ''
}

export const filters = []

export const actions = []

export const report = {
  expand: [],
  items: [
    { label: i18n.t('report_0058'), key: 'CashoutTypeCode', align: 'left' },
    { label: i18n.t('report_0059'), key: 'CashoutTypeName', align: 'left' },
    { label: i18n.t('report_0031'), key: 'Enable', align: 'left', slot: 'Enable' },
    { label: i18n.t('report_0060'), key: 'ServiceFee', align: 'left', slot: 'ServiceFee' },
    { label: i18n.t('report_0061'), key: 'MinServiceFeeAmount', align: 'left', slot: 'MinServiceFeeAmount' },
    { label: i18n.t('report_0062'), key: 'MaxServiceFeeAmount', align: 'left', slot: 'MaxServiceFeeAmount' }
  ],
  actions: []
}

export default { filters, actions, report }

