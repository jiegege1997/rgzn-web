let defaultType = '1'
try {
  if (localStorage.type) {
    defaultType = localStorage.type
  }
} catch (e) {}

const state = {
  type: defaultType
}

const mutations = {
  CHANGE_TYPE(state, type) {
    state.type = type
    try {
      localStorage.type = type
    } catch (e) {}
  }
}

const actions = {
  changeType({ commit }, type) {
    commit('CHANGE_TYPE', type)
  }
}

export default {
  state,
  mutations,
  actions
}
