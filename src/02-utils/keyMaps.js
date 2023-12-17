
import i18n from '@/locales/index'

// 获得某月的天数
function getMonthDays(month) {
  const monthStartDate = new Date(new Date().getYear(), month, 1)
  const monthEndDate = new Date(new Date().getYear(), month + 1, 1)
  const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
  return days
}
export const dateOptions = {
  shortcuts: [
    {
      text: i18n.t('common_0021'),
      onClick(picker) {
        const d = new Date(new Date().toLocaleDateString()).getTime()
        const start = new Date(d)
        const end = new Date(d + 3600 * 1000 * 24 - 1)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: i18n.t('common_0022'),
      onClick(picker) {
        const d = new Date(new Date().toLocaleDateString()).getTime()
        const start = new Date(d)
        start.setTime(start.getTime() - 3600 * 1000 * 24)
        const end = new Date(d - 1)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: i18n.t('common_0080'),
      onClick(picker) {
        const now = new Date() // 当前日期
        const nowMonth = now.getMonth() // 当前月
        let nowYear = now.getYear() // 当前年
        nowYear += (nowYear < 2000) ? 1900 : 0
        const start = new Date(nowYear, nowMonth, 1)
        const end = new Date(nowYear, nowMonth, getMonthDays(nowMonth), 23, 59, 59)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: i18n.t('common_0081'),
      onClick(picker) {
        const lastMonthDate = new Date() // 上月日期
        lastMonthDate.setDate(1)
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
        const lastMonth = lastMonthDate.getMonth()
        let nowYear = lastMonthDate.getYear()
        // let lastYear = lastMonthDate.getYear()
        nowYear += (nowYear < 2000) ? 1900 : 0
        // lastYear += (lastYear < 2000) ? 1900 : 0
        const start = new Date(nowYear, lastMonth, 1)
        const end = new Date(nowYear, lastMonth, getMonthDays(lastMonth), 23, 59, 59)
        picker.$emit('pick', [start, end])
      }
    }
  ]
}



export const PaymentOrderStatus = {
  '-1': i18n.t('common_0086'),
  0: i18n.t('common_0084'),
  1: i18n.t('common_0092'),
  2: i18n.t('common_0093'),
  999: i18n.t('common_0094')
}



export default {
  PaymentOrderStatus
}
