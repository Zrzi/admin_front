import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    roleId: '',
    systemId: '',
    userNo: '',
    roleChange: false
  },
  getters: {
  },
  mutations: {
    SET_TOKENS: (state, token) => {
      state.token = token;
      localStorage.setItem("token", token);
    },
    RESET_TOKEN: (state) => {
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
    },
    SET_USER_NO: (state, userNo) => {
      state.userNo = userNo;
    },
    RESET_USER_NO: (state) => {
      state.userNo = '';
    },
    SET_ROLE_CHANGE: (state, roleChange) => {
      state.roleChange = roleChange;
    },
    RESET_ROLE_CHANGE: (state) => {
      state.roleChange = false;
    },
    RESET_STATE: (state) => {
      state.token = '';
      state.roleId = '';
      state.systemId = '';
      state.roleDeleted = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
