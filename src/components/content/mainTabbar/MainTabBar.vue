<template>
  <tab-bar activeColor="red">
    <tab-bar-item path="/home">
      <template v-slot:item-icon>
        <i class="iconfont icon-home"></i>
      </template>
      <template v-slot:item-text>
        <span>首页</span>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <template v-slot:item-icon>
        <i class="iconfont icon-category"></i>
      </template>
      <template v-slot:item-text>
        <span>分类</span>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <template v-slot:item-icon>
        <i class="iconfont icon-cart"></i>
      </template>
      <template v-slot:item-text>
        <span>购物车</span>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <template v-slot:item-icon>
        <i class="iconfont icon-personal"></i>
      </template>
      <template v-slot:item-text>
        <span>我的</span>
      </template>
    </tab-bar-item>
  </tab-bar>
  <!-- <div>123</div> -->
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped>
.iconfont {
  font-size: 22px;
}
.active {
  color: red;
}
</style>