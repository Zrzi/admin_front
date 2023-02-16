import { createStore } from 'vuex'

export default createStore({
  state: {
    token: ''
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
    }
  },
  actions: {
  },
  modules: {
  }
})
