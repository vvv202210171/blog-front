import { dateTime, monthDateTime, monthDateTime2, dateTime3 } from './index'
import i18n from '@/locales/index'

// const _month = monthDate()

export const params = {
  page: {
    PageNumber: 0,
    PageSize: 20
  },

  dateTime: {
    today: () => {
      const [StartDate, EndDate] = dateTime()
      return { StartDate, EndDate }
    },
    today3: () => {
      const [StartDate, EndDate] = dateTime3()
      return { StartDate, EndDate }
    },
    month: () => {
      const [StartDate, EndDate] = monthDateTime()
      return { StartDate, EndDate }
    },
    currMonth: () => {
      const [StartDate, EndDate] = monthDateTime2()
      return { StartDate, EndDate }
    }
  },

  date: () => {
    const [StartDate, EndDate] = dateTime()
    return [StartDate, EndDate]
  }
}

export const options = function(obj) {
  let options = []
  for (const [key, item] of Object.entries(obj)) {
    options.push({ value: Number(key), label: item.text || item })
  }
  options = options.sort((a, b) => a.value - b.value)
  return options
}

export const optionsCheckbox = function(obj) {
  let options = []
  for (const [key, item] of Object.entries(obj)) {
    options.push({ key: Number(key), label: item.text || item })
  }
  options = options.sort((a, b) => a.key - b.key)
  return options
}

export const refreshOptions = [
  { value: 0, label: i18n.t('common_0010') },
  { value: '15', label: i18n.t('common_116') },
  { value: '30', label: i18n.t('common_0011') },
  { value: '60', label: i18n.t('common_0012') }
]

export default { params, options, refreshOptions, optionsCheckbox }
