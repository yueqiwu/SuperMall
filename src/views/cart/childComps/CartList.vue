<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item" :index="index"/>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem"
export default {
  name: "CartList",
  components: {
    scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated(){
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.content{
  position:absolute;
  top:44px;
  bottom:93px;
  left:0;
  right:0;
  overflow: hidden;
}
</style>