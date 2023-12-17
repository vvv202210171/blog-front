import i18n from '@/locales/index'
export const search = {
  'MerchantAlias': '',
  'CurrencyCode': '', // 币种，所有=空字符串
  'PayTypeCode': '', // 支付类型，所有=空字符串
  'FilterParam': '', // 账号/持有人/备注
  'Enable': -1
}

// 状态 禁用/启用
const enableOptions = [
  { value: -1, label: i18n.t('common_0086') },
  { value: 0, label: i18n.t('common_0049') },
  { value: 1, label: i18n.t('common_0048') }
]

export const filters = [
  [
    { key: 'MerchantAlias', label: i18n.t('report_0018'), type: 'string', elemName: 'select', enterTrigger: true, active: search.MerchantAlias, col: 3 },
    { key: 'CurrencyCode', label: i18n.t('report_0019'), type: 'string', elemName: 'select', enterTrigger: true, active: '', col: 2 },
    { key: 'PayTypeCode', label: i18n.t('report_0141'), type: 'string', elemName: 'select', enterTrigger: true, active: '' },
    { key: 'Enable', label: i18n.t('report_0031'), type: 'string', elemName: 'select', enterTrigger: true, clear: true, options: enableOptions, active: -1, col: 2 }
  ],
  [
    { key: 'FilterParam', label: i18n.t('report_0163'), type: 'string', elemName: 'input', enterTrigger: true, clear: true, col: 5 },
    { elemName: 'actions' }
  ]
]

export const actions = [
  { key: 'search', elemName: 'button', label: i18n.t('report_0023'), type: 'primary', icon: 'el-icon-search', actionName: 'search' },
  { key: 'create', role: '0401_0001', elemName: 'button', label: i18n.t('common_0063'), type: 'primary', icon: 'el-icon-mobile', actionName: 'create' }
]

export const report = {
  expand: [],
  items: [
    { label: i18n.t('report_0019'), key: 'CurrencyCode', align: 'left' },
    { headerHtml: `${i18n.t('report_0141')}<br />${i18n.t('report_0289')}`, key: 'PayTypeName', align: 'left', slot: 'PayTypeName' },
    { label: i18n.t('report_0152'), key: 'OfflineQRUrl', align: 'left', image: true, cellWidth: 100, width: 121 },
    { headerHtml: i18n.t('report_0164'), key: 'OfflineQRInfo', align: 'left', slot: 'OfflineQRInfo', width: 150 },
    { headerHtml: `${i18n.t('report_0165')}<br />${i18n.t('report_0145')}`, key: 'amount', align: 'left', slot: 'amount' },
    { label: `${i18n.t('report_0166')}`, key: 'amountDiff', align: 'left', slot: 'amountDiff' },
    { label: i18n.t('report_0168'), key: 'EnableRandomRemarkCode', align: 'left', slot: 'EnableRandomRemarkCode' },
    { label: i18n.t('report_0074'), key: 'SortIndex', align: 'left' },
    { label: i18n.t('report_0273'), key: 'SpiderSetting', align: 'left', slot: 'SpiderSetting' },
    { label: i18n.t('report_0031'), key: 'Enable', align: 'left', slot: 'Enable' },
    { label: i18n.t('common_0043'), key: 'action', align: 'center', width: '300' }
  ],
  actions: [
    { role: '0401_0002', code: 'editor' },
    { role: '0401_0003', code: 'delete' },
    { role: '0401_0004', code: 'updateSpider' },
    { role: '0401_0005', code: 'bindingMerchantAlias' }
    // { role: '0401_0006', code: 'timePeriod' }
  ]
}

export default { filters, actions, report }

