import { simpleList } from '@/03-api/common'
import i18n from '@/locales/index'
const state = {
  active: {},
  merchantList: []
}

const mutations = {
  SET_ACTIVE(state, merchant) {
    state.active = merchant
  },
  SET_LIST(state, { data, hideMerchantALLOption }) {
    const merchantList = data
    if (!hideMerchantALLOption) {
      data.unshift({ MerchantAlias: '', MerchantName: i18n.t('common_0100') })
    }
    state.merchantList = merchantList
  },
  REMOVE_ACTIVE(state) {
    state.active = {}
  }
}

const actions = {
  setActiveMerchant({ commit }, merchant) {
    commit('SET_ACTIVE', merchant)
  },
  async loadMerchantList({ commit }, hideMerchantALLOption) {
    try {
      const data = await simpleList()
      commit('SET_LIST', { data, hideMerchantALLOption })
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
