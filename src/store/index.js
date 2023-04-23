import { createStore } from 'vuex'
import router from "@/router";

export default createStore({
  state: {
    token: '',
    refreshToken: '',
    roleId: '',
    systemId: '',
    userNo: '',
    excelId: '',
    roleChange: false,
    publicKey: '',
    loggedIn: false,
    username: "",
    jwtToken: "",
    routerName: "",
    studentNum1:"10",
    courseNum1:"23",
    projectNum1:"13",
    honerNum1:"2",
    activityNum1:"3",
    dailyNum1:"123",
    list: []
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
    },

    studentNumplus(state){
      state.studentNum1++
    },
    studentNumminus(state){
      state.studentNum1--
    },
    honerNumplus(state){
      state.honerNum1++
    },
    honerNumminus(state){
      state.honerNum1--
    },
    projectNumplus(state){
      state.projectNum1++
    },
    projectNumminus(state){
      state.projectNum1--
    },

    courseNumplus(state){
      state.courseNum1++
    },
    courseNumminus(state){
      state.courseNum1--
    },
    dailyNumplus(state){
      state.dailyNum1++
    },
    dailyNumminus(state){
      state.dailyNum1--
    },
    activityNumminus(state){
      state.activityNum1--
    },
    activityNumplus(state){
      state.activityNum1++
    },

    navi(state, data) {
      state.list = data
    },
    setRouterName(state, val) {
      state.routerName = val
    },
    login(state, { username, jwtToken }) {
      state.loggedIn = true,
          state.username = username,
          state.jwtToken = jwtToken
    },
    logout(state) {
      state.loggedIn = false,
          state.username = "",
          state.jwtToken = "",
          state.list = []
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      return userLoginReq(username, password)
          .then((jwtToken) => {
            commit('login', { username, jwtToken })
            getUimsConfig().then(res => {
              var list = res.data.data.uims.menu
              commit('navi', list)
              router.push('/Home')
            })
          })
    }
  },
  modules: {
  }
})
