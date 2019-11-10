import {
  SET_ACTIVE_COLOR, ADD_COUNTER, ADD_TO_CART, CHANGE_CHECKED, CHANGE_CHECKED_TRUE
  , CHANGE_CHECKED_FALSE
} from './mutation-types'

export default {
  [SET_ACTIVE_COLOR](state, color) {
    state.activeColor = color;
  },
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  },
  [CHANGE_CHECKED](state, index) {
    state.cartList[index].isChecked = !state.cartList[index].isChecked;
  },
  [CHANGE_CHECKED_TRUE](state) {
    for (let i of state.cartList) {
      i.isChecked = true;
    }
  },
  [CHANGE_CHECKED_FALSE](state) {
    for (let i of state.cartList) {
      i.isChecked = false;
    }
  }
}