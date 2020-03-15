<template>
  <tab-bar activeColor="red" :data="tabbarData"/>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";

export default {
  name: "MainTabBar",
  data() {
    return {
      tabbarData: [
                { title: '首页', icon: 'iconfont icon-home', path: '/home' },
                { title: '分类', icon: 'iconfont icon-category', path: '/category' },
                { title: '购物车', icon: 'iconfont icon-cart', path: '/cart' },
                { title: '我的', icon: 'iconfont icon-personal', path: '/profile' }
            ]
    }
  },
  components: {
    TabBar
  }
};
</script>

<style scoped>

</style>