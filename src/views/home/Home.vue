<template>
  <div id="home" ref="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control
      @itemClick="tabClick"
      :titles="['流行','新款','精选']"
      ref="tabControlClone"
      class="tab-control"
      v-show="isTabControlShow"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pullUpLoad="{threshold: -150}"
      @scroll="contentScroll"
      @pullUpLoad="loadMore"
    >
      <div class="home-swiper">
        <home-swiper
          :banners="banners"
          v-if="banners.length"
          @swiperImageLoaded="updataTabControlTop"
        />
        <img src="~assets/img/common/loading.gif" alt v-else />
      </div>
      <home-recommend :recommends="recommends" />
      <home-feature />
      <tab-control
        @itemClick="tabClick"
        :titles="['流行','新款','精选']"
        ref="tabControl"
        class="tab-control"
      />
      <goods-list :goods="goods" :currentType="currentType" />
    </scroll>
    <transition name="backTop">
      <back-top @click.native="backTop" v-show="isBackTopShow" />
    </transition>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import HomeFeature from "./childComps/HomeFeature";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goodsList/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "commonjs/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isBackTopShow: false,
      tabControlOffsetTop: null,
      isTabControlShow:false
    };
  },
  created() {
    //1.请求多个数据
    this._getHomeMultidata();
    //2.请求商品数据
    this._getHomeGoods("pop");
    this._getHomeGoods("new");
    this._getHomeGoods("sell");
  },
  mounted() {
    // 1.监听goodslistitem中图片的加载完成
    const refresh = debounce(this.$refs.scroll.refresh);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    /**
     * 绑定事件
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControlClone.currentIndex = index;
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      //tabcontrol是否显示
      this.isTabControlShow = this.tabControlOffsetTop <= -position.y;
     
      //backtop是否显示
      this.isBackTopShow = -position.y > this.$refs.home.offsetHeight;
    },
    loadMore() {
      this._getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },
    updataTabControlTop() {
      //1.获取tabcontrol的offsetTop
      this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    /**
     * axios请求
     */
    _getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    _getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;
      });
    }
  }
};
</script>

<style scoped>
#home {
  background-color: #eee;
  /* padding-top: 44px; */
  height: 100%;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9; */
}
.home-swiper {
  height: 199px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  /* height:calc(100%-93px); */
  /* height: 100%; */
  position: absolute;
  top: 44px;
  bottom: 0px;
  left: 0;
  right: 0;

  overflow: hidden;
}
.backTop-leave-active,
.backTop-enter-active {
  transition: opacity 0.5s;
}
.backTop-leave-to,
.backTop-enter {
  opacity: 0;
}
.tab-control {
  position: relative;
  right: 0;
  left: 0;
  z-index: 9;
}
</style>