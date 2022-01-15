import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //已登陆的用户信息
    userInfo: {},
    token: null
  },
  mutations: {
    setUserInfo(state) {
      // state.userInfo = payload
      state.userInfo = JSON.parse(window.localStorage.getItem("userInfo"))
      // console.log("userInfo为：")
      // console.log(state.userInfo)
    },
    loginOut(state) {
      state.userInfo = null
      state.token = null
    },
    getToken(state) {
      state.token = window.localStorage.getItem("token")
    }
  },
  actions: {

  },
  modules: {
  }
})
