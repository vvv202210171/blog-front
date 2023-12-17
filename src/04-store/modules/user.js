
// import Cookies from 'js-cookie'
import { getUserGroupSimpleList } from '@/03-api/user'
const state = {
  active: {},
  usergroup: []
}

const mutations = {
  SET_ACTIVE: (state, activeUserGroup) => {
    state.active = activeUserGroup
  },
  REMOVE_ACTIVE: (state) => {
    state.active = {}
  },

  SET_USER_GROUP: (state, usergroupList) => {
    state.usergroup = usergroupList
  }
}

const actions = {
  async loadUserGroupList({ commit }, MerchantAlias) {
    try {
      const data = await getUserGroupSimpleList({ MerchantAlias })
      commit('SET_USER_GROUP', data)
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
