
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

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
