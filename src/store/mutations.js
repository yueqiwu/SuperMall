import {
  ADD_COUNTER, ADD_TO_CART, CHANGE_CHECKED, CHANGE_CHECKED_TRUE
  , CHANGE_CHECKED_FALSE, DEL_ORDER, SET_USER
} from './mutation-types'

import storage from 'commonjs/storage'
import decodeJwt from 'jwt-decode'

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  },
  [CHANGE_CHECKED](state, index) {
    state.cartList[index].isChecked = !state.cartList[index].isChecked;
  },
  // 全选
  [CHANGE_CHECKED_TRUE](state) {
    for (let i of state.cartList) {
      i.isChecked = true;
    }
  },
  // 全不选
  [CHANGE_CHECKED_FALSE](state) {
    for (let i of state.cartList) {
      i.isChecked = false;
    }
  },
  [DEL_ORDER](state, index) {
    console.log(state.cartList)
    state.cartList.splice(index,1)
    console.log(state.cartList)
  },
  //  设置用户信息
  [SET_USER](state, data) {
    if (data && data.token) {
      data.id = decodeJwt(data.token).user_id
    }
    state.user = data
    console.log(state.user)
    storage.set('user', data)
  }
}