import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let isRepeat = false;
      for (let i of context.state.cartList) {
        if (i.iid === payload.iid) {
          context.commit(ADD_COUNTER, i);
          isRepeat = true;
          resolve('购物车商品数量+1')
        }
      }
      if (!isRepeat) {
        payload.count = 1;
        payload.isChecked = false;
        context.commit(ADD_TO_CART, payload);
        resolve('已成功加入购物车')
      }
    })
  }
}

