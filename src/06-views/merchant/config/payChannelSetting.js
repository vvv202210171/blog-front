import i18n from '@/locales/index'
export const search = {
  'MerchantAlias': ''
}

export const filters = []

export const actions = []

export const report = {
  expand: [],
  items: [

    { label: i18n.t('report_0211'), key: 'MerchantPayChannelID', align: 'left' },
    { label: i18n.t('report_0068'), key: 'PayProviderCode', align: 'left' },
    { label: i18n.t('report_0069'), key: 'PayProviderName', align: 'left' },
    { label: i18n.t('report_0070'), key: 'PayTypeCode', align: 'left' },
    { label: i18n.t('report_0071'), key: 'PayAccountCode', align: 'left' },
    { label: i18n.t('report_0072'), key: 'PayChannelRemark', align: 'left' },
    { label: i18n.t('report_0073'), key: 'PayTypeName', align: 'left' },
    { label: i18n.t('report_0074'), key: 'SortIndex', align: 'left', slot: 'SortIndex' },
    { label: i18n.t('report_0031'), key: 'Enable', align: 'left', slot: 'Enable' },
    { label: i18n.t('report_0060'), key: 'ServiceFee', align: 'left', slot: 'ServiceFee' },
    { label: i18n.t('report_0061'), key: 'MinServiceFeeAmount', align: 'left', slot: 'MinServiceFeeAmount' },
    { label: i18n.t('report_0062'), key: 'MaxServiceFeeAmount', align: 'left', slot: 'MaxServiceFeeAmount' }
  ],
  actions: []
}

export default { filters, actions, report }

