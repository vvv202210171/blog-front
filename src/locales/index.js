import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'
// import enLang from 'element-ui/lib/locale/lang/en'

Vue.use(VueI18n)

export const LANGLIST = {
  enUS: { key: 'en', code: 'enUS', name: 'English', local: require('./enUS.json'), elLocal: enLocale },
  // thTH: { key: 'th', code: 'thTH', name: 'ไทย', local: require('./thTH.json') },
  // viVN: { key: 'vi', code: 'viVN', name: 'Tiếng Việt', local: require('./viVN.json') },
  // idID: { key: 'id', code: 'idID', name: 'Indonesia', local: require('./idID.json') },
  // msMY: { key: 'ms', code: 'msMY', name: 'B.Melayu', local: require('./msMY.json') },
  zhCN: { key: 'zh', code: 'zhCN', name: '简体中文', local: require('./zhCN.json'), elLocal: zhLocale }
}

const DEFALUT_ITEM = Object.values(LANGLIST).find(item => navigator.language.includes(item.key))
const DEFAULT_LANG = DEFALUT_ITEM ? DEFALUT_ITEM.code : 'enUS'
const LOCALE_KEY = 'lang'

const locales = Object.values(LANGLIST).reduce((curr, prev) => {
  curr[prev.code] = { ...prev.local, ...prev.elLocal }
  return curr
}, {})

const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: locales
})
ElementLocale.i18n((key, value) => i18n.t(key, value))

export const setup = lang => {
  if (lang === undefined) {
    lang = Cookies.get(LOCALE_KEY)
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }
  Cookies.set(LOCALE_KEY, lang)

  Vue.config.lang = lang
  i18n.locale = lang
}
setup()
export default i18n
