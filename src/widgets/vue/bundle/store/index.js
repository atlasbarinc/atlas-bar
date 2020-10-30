import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  getters: require('./_getters').default,
  mutations: require('./_mutations').default,
  state: require('./_state').default
})

export default store