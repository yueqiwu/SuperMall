import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeColor: 'red'
  },
  mutations: {
    setActiveColor(state, color) {
      state.activeColor = color;
    }
  },
  actions: {},
  getters: {},
  models: {}
})

export default store