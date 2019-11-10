<template>
  <div class="bottom-menu">
    <check-btn :isChecked="isCheckAll" class="select-all" @click.native="checkAll" />
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="toCalc">去计算({{$store.getters.cartCount}})</span>
  </div>
</template>

<script>
import checkBtn from "./CheckBtn";
import {
  CHANGE_CHECKED_TRUE,
  CHANGE_CHECKED_FALSE
} from "store/mutation-types";

export default {
  name: "BottomBar",
  components: {
    checkBtn
  },
  data(){
    return {
      cartList:this.$store.state.cartList
    }
  },
  computed: {
    totalPrice() {
      return this.cartList
        .filter(item => item.isChecked)
        .reduce((a, b) => {
          return a + b.newPrice * b.count;
        }, 0)
        .toFixed(2);
    },
    isCheckAll() {
      if(this.cartList.length === 0) return false;

      for (let i of this.cartList) {
        if (i.isChecked === false) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    checkAll() {
      if (this.isCheckAll) {
        //如果已经全部选中
        this.$store.commit(CHANGE_CHECKED_FALSE)
      } else {
        this.$store.commit(CHANGE_CHECKED_TRUE)
      }
    },
    toCalc(){
      this.$toast.show('假的购物车，你结算个啥^_^')
    }
  }
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>