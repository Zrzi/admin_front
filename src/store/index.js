import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    refreshToken: '',
    roleId: '',
    systemId: '',
    userNo: '',
    excelId: '',
    roleChange: false,
    publicKey: ''
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
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      state.refreshToken = refreshToken;
      localStorage.setItem("refreshToken", refreshToken);
    },
    RESET_REFRESH_TOKEN: (state) => {
      state.refreshToken = '';
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
    SET_EXCEL_ID: (state, excelId) => {
      state.excelId = excelId;
    },
    RESET_EXCEL_ID: (state) => {
      state.excelId = '';
    },
    SET_ROLE_CHANGE: (state, roleChange) => {
      state.roleChange = roleChange;
    },
    RESET_ROLE_CHANGE: (state) => {
      state.roleChange = false;
    },
    SET_PUBLIC_KEY: (state, publicKey) => {
      state.publicKey = publicKey;
    },
    RESET_PUBLIC_KEY: (state) => {
      state.publicKey = '';
    },
    RESET_STATE: (state) => {
      state.token = '';
      state.refreshToken = '';
      state.roleId = '';
      state.systemId = '';
      state.userNo = '';
      state.excelId = '';
      state.roleChange = false;
      state.publicKey = '';
    }
  },
  actions: {
  },
  modules: {
  }
})
