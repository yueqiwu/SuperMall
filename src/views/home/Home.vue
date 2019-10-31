<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <div class="home-swiper">
      <home-swiper :banners="banners" v-if="banners.length"/>
      <img src="~assets/img/loading.gif" alt="" v-else>
    </div>
    <home-recommend :recommends="recommends"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";

import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend
  },
  data() {
    return {
      banners: [],
      recommends: []
    };
  },
  created() {
    getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
    });
  }
};
</script>

<style scoped>
#home{
  background-color:#eee;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.home-swiper{
  height:199px;
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
}

</style>