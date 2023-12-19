import { adminLogin } from '@/03-api/admin'
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
  UserName: ''
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
    alert(token)
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

  async loadCurrencyList({ commit, state }) {
    try {
      if (!state.user.IsSuper) return true
      if (LocalStore.get('currency')) {
        commit('SET_CURRENCY', LocalStore.get('currency'))
      }
      const data = await currencyList()
      commit('SET_CURRENCY', data)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },

  async loadSpiderAccountList({ commit, state }) {
    try {
      if (!state.user.IsSuper) return true
      if (LocalStore.get('spideraccountlist')) {
        commit('SET_SPIDERACCOUNTLIST', LocalStore.get('spideraccountlist'))
      }
      const data = await spiderAccountList()
      commit('SET_SPIDERACCOUNTLIST', data)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },

  async loadQRSpiderAccountList({ commit, state }) {
    try {
      if (!state.user.IsSuper) return true
      if (LocalStore.get('qrspideraccountlist')) {
        commit('SET_QRSPIDERACCOUNTLIST', LocalStore.get('qrspideraccountlist'))
      }
      const data = await qrSpiderAccountList()
      commit('SET_QRSPIDERACCOUNTLIST', data)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },

  async loadBankCardSpiderAccountList({ commit, state }) {
    try {
      if (!state.user.IsSuper) return true
      if (LocalStore.get('bankcardspideraccountlist')) {
        commit('SET_BANKCARDSPIDERACCOUNTLIST', LocalStore.get('bankcardspideraccountlist'))
      }
      const data = await bankcardSpiderAccountList()
      commit('SET_BANKCARDSPIDERACCOUNTLIST', data)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },

  async loadTrueMoneyAccountList({ commit, state }) {
    try {
      if (!state.user.IsSuper) return true
      if (LocalStore.get('truemoneyaccountlist')) {
        commit('SET_TRUEMONEYACCOUNTLIST', LocalStore.get('truemoneyaccountlist'))
      }
      const data = await trueMoneyAccountList()
      commit('SET_TRUEMONEYACCOUNTLIST', data)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },

  async loadPayTypeList({ commit }) {
    try {
      if (LocalStore.get('payTypeList')) {
        commit('SET_PAYTYPE_LIST', LocalStore.get('payTypeList'))
      }
      const data = await paytypeList()
      commit('SET_PAYTYPE_LIST', data)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },

  async loadCashoutTypeList({ commit }) {
    try {
      if (LocalStore.get('cashoutTypeList')) {
        commit('SET_CASHOUTTYPE_LIST', LocalStore.get('cashoutTypeList'))
      }
      const data = await cashoutTypeList()
      commit('SET_CASHOUTTYPE_LIST', data)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },

  async loadBankList({ commit }) {
    try {
      if (LocalStore.get('bankList')) {
        commit('SET_BANK_LIST', LocalStore.get('bankList'))
      }
      const data = await bankList()
      commit('SET_BANK_LIST', data)
      return true
    } catch (error) {
      console.log(error)
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
