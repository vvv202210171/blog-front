import { adminLogin, getLoginInfo } from '@/03-api/admin'
import { currencyList, paytypeList, cashoutTypeList, bankList, spiderAccountList, qrSpiderAccountList, bankcardSpiderAccountList, trueMoneyAccountList } from '@/03-api/common'
import { getToken, setToken, removeToken } from '@/02-utils/auth'
import { resetRouter } from '@/05-router'
// import Cookies from 'js-cookie'
import LocalStore from '@/02-utils/localStorage'
const user = LocalStore.get('user') || {
  GroupName: '',
  IsSuper: false,
  LastLoginTime: '',
  MerchantAlias: '',
  MerchantName: '',
  SessionId: '',
  username: ''
}
const state = {
  token: getToken(),
  user,
  currency: [],
  payTypeList: [],
  cashoutTypeList: [],
  bankList: [],
  spiderAccountList: [],
  qrSpiderAccountList: [],
  bankcardSpiderAccountList: [],
  trueMoneyAccountList: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  REMOVE_TOKEN: (state) => {
    state.token = ''
    LocalStore.remove('user')
    state.user = { ...user }
    removeToken()
  },
  SET_USERINFO: (state, userInfo) => {
    state.user = userInfo
    LocalStore.set('user', userInfo)
  },
  SET_CURRENCY(state, currency) {
    state.currency = currency
    LocalStore.set('currency', currency)
  },
  SET_SPIDERACCOUNTLIST(state, list) {
    state.spiderAccountList = list
    LocalStore.set('spideraccountlist', list)
  },
  SET_QRSPIDERACCOUNTLIST(state, list) {
    state.qrSpiderAccountList = list
    LocalStore.set('qrspideraccountlist', list)
  },
  SET_BANKCARDSPIDERACCOUNTLIST(state, list) {
    state.bankcardSpiderAccountList = list
    LocalStore.set('bankcardspideraccountlist', list)
  },
  SET_TRUEMONEYACCOUNTLIST(state, list) {
    state.trueMoneyAccountList = list
    LocalStore.set('truemoneyaccountlist', list)
  },
  SET_PAYTYPE_LIST(state, payTypeList) {
    state.payTypeList = payTypeList
    LocalStore.set('payTypeList', payTypeList)
  },
  SET_CASHOUTTYPE_LIST(state, cashoutTypeList) {
    state.cashoutTypeList = cashoutTypeList
    LocalStore.set('cashoutTypeList', cashoutTypeList)
  },
  SET_BANK_LIST(state, bankList) {
    state.bankList = bankList
    LocalStore.set('bankList', bankList)
  }
}

const actions = {
  // user login
  async login({ commit, dispatch }, params) {
    try {
      const res = await adminLogin(params)
      commit('SET_USERINFO', res.user)
      commit('SET_TOKEN', res.token)
      return await dispatch('permission/generateRoutes', {}, { root: true })
    } catch (error) {
      return false
    }
  },
  async loginInfo({ commit }) {
    try {
      const user = await getLoginInfo()
      commit('SET_USERINFO', user)
      return true
    } catch (error) {
      return false
    }
  },
  // user logout
  async logout({ commit, state, dispatch }) {
    commit('REMOVE_TOKEN')
    commit('permission/SET_ROUTES', [], { root: true })
    commit('app/CLEART_INC', null, { root: true })
    resetRouter()

    // reset visited views and cached views
    // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
    dispatch('tagsView/delAllViews', null, { root: true })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('REMOVE_TOKEN')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
