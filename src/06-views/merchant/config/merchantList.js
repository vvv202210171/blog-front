import i18n from '@/locales/index'
export const search = {
  'MerchantAlias': ''
}

export const filters = [
  [
    { key: 'MerchantAlias', label: i18n.t('report_0038'), type: 'string', elemName: 'input', enterTrigger: true, clear: true },
    { elemName: 'actions' }
  ]
]

export const actions = [
  { key: 'search', elemName: 'button', label: i18n.t('report_0023'), type: 'primary', icon: 'el-icon-search', actionName: 'search' },
  { key: 'create', role: '0101_0001', elemName: 'button', label: i18n.t('report_0050'), type: 'primary', icon: 'el-icon-s-shop', actionName: 'create' }
]

export const report = {
  expand: [],
  items: [
    { label: i18n.t('report_0038'), key: 'MerchantAlias', align: 'left' },
    { headerHtml: `${i18n.t('report_0039')}(${i18n.t('report_0056')})`, key: 'MerchantName', align: 'left', slot: 'merchantName' },
    { label: i18n.t('report_0361'), key: 'CashoutOrderAutoConfirm', align: 'left', width: 200, slot: 'CashoutOrderAutoConfirm' },
    // { label: i18n.t('report_0352'), key: 'TelegramNotifyChannel', align: 'left', width: 100, slot: 'TelegramNotifyChannel' },
    { label: i18n.t('report_0019'), key: 'CurrencyCode', align: 'left', width: 100 },
    { label: i18n.t('report_0052'), key: 'TimezoneDiffMinutes', align: 'left' },
    { label: i18n.t('report_0066'), key: 'CreateUser', align: 'left' },
    { label: i18n.t('report_0051'), key: 'MerchantStatus', align: 'left', slot: 'MerchantStatus' },
    { label: i18n.t('report_0067'), key: 'CreateTS', align: 'left', width: 135 },
    { label: i18n.t('common_0043'), key: 'action', align: 'center', width: '500' }
  ],
  actions: [
    { role: '0101_0002', code: 'editor', hideForSuperMerchant: true },
    { role: '0101_0003', code: 'apiWhiteIP' },
    { role: '0101_0004', code: 'showPrivateKeyModel', hideForSuperMerchant: true },
    { role: '0101_0005', code: 'payChannelSetting', hideForSuperMerchant: true },
    { role: '0101_0006', code: 'cashoutSetting', hideForSuperMerchant: true },
    { role: '0101_0007', code: 'resetWithdrawPassword', hideForSuperMerchant: true }
  ]
}

export default { filters, actions, report }
