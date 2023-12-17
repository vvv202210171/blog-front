import Vue from 'vue'
import VueClipboards from 'vue-clipboards'
import Cookies from 'js-cookie'
import LocalStore from '@/02-utils/localStorage'
import FitColumns from '@/directive/v-fit-columns/src/index'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/02-utils/math'
import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './04-store'
import router from './05-router'
import i18n from './locales'

import './icons' // icon
import './permission' // permission control
// import './02-utils/error-log' // error log

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: Cookies.get('size') || 'mini' // set element-ui default size
})
Vue.use(VueClipboards)
Vue.use(FitColumns)

Vue.prototype.LocalStore = LocalStore

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

window.app = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
