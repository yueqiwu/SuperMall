import {
  SET_ACTIVE_COLOR, ADD_COUNTER, ADD_TO_CART, CHANGE_CHECKED, CHANGE_CHECKED_TRUE
  , CHANGE_CHECKED_FALSE, DEL_ORDER
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
  }
}