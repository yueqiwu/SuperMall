<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车({{cartLength}})</template>
    </nav-bar>
    <cart-list/>
    <bottom-bar/>
  </div>
</template>

<script>

import navBar from "components/common/navbar/NavBar";
import cartList from "./childComps/CartList";
import bottomBar from "./childComps/BottomBar";

import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  data() {
    return {};
  },
  components: {
    navBar,
    cartList,
    bottomBar,
  },
  computed:{
    ...mapGetters(['cartLength'])
  }
};
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>