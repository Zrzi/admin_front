import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    roleId: '',
    systemId: '',
  },
  getters: {
  },
  mutations: {
    SET_TOKENS: (state, token) => {
      state.token = token;
      localStorage.setItem("token", token);
    },
    RESET_STATE: (state) => {
      state.token = '';
    },
    SET_SYSTEM_ID: (state, systemId) => {
      state.systemId = systemId;
    },
    RESET_SYSTEM_ID: (state) => {
      state.systemId = '';
    },
    SET_ROLE_ID: (state, roleId) => {
      state.roleId = roleId;
    },
    RESET_ROLE_ID: (state) => {
      state.roleId = '';
    }
  },
  actions: {
  },
  modules: {
  }
})
