import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import storage from 'commonjs/storage'


Vue.use(Vuex)

const state = {
  cartList:[],
  user: storage.get('user')
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  models: {}
})

export default store