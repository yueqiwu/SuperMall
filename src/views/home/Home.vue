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
      class="content ignore"
      ref="scroll"
      :probe-type="3"
      :pullUpLoad="{threshold: -80}"
      :pullDownRefresh="{threshold:80}"
      @scroll="contentScroll"
      @pullUpLoad="loadMore"
      @pullDownRefresh="pullDownRefresh"
      @touchend.native="isTouch=false"
      @touchstart.native="isTouch=true"
    >
      <div class="load-text ignore">{{downLoadText}}</div>
      <div class="home-swiper">
        <home-swiper
          :banners="banners"
          v-if="banners.length"
          @swiperImageLoaded="updataTabControlTop"
          :key="swiperKey"
        />
        <img src="~assets/img/common/loading.gif" alt v-else />
      </div>
      <home-recommend
        :recommends="recommends"
        @recommendsImageLoad="updataTabControlTop"
        :key="recommendKey"
      />
      <home-feature @featureImageLoad="updataTabControlTop" />
      <tab-control
        @itemClick="tabClick"
        :titles="['流行','新款','精选']"
        ref="tabControl"
        class="tab-control"
      />
      <goods-list :goodsList="goods[currentType].list" :currentType="currentType" :key="goodsListKey" />
      <div class="load-text ignore" v-if="goods[currentType].list.length !==0">{{upLoadText}}</div>
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
// import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "commonjs/utils";
import { backTopMixin } from "commonjs/mixins";

export default {
  name: "Home",
  mixins: [backTopMixin],
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll
    // BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [], loaded: true },
        new: { page: 0, list: [], loaded: true },
        sell: { page: 0, list: [], loaded: true }
      },
      currentType: "pop",
      // isBackTopShow: false,
      tabControlOffsetTop: null,
      isTabControlShow: false,
      scrollPosition: { x: 0, y: 0 },
      scrollY: 0,
      swiperKey: Math.random(),
      recommendKey: Math.random(),
      goodsListKey: Math.random(),
      upLoadText: "再拉，再拉就刷给你看",
      downLoadText: "再拉，再拉就刷给你看",
      scrollBottom: 0,
      isTouch: false
    };
  },
  created() {
    //1.请求多个数据
    this._getHomeMultidata();
    //2.请求商品数据
    this._getHomeGoods("pop");
    // this._getHomeGoods("new");
    // this._getHomeGoods("sell");
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
      // console.log(item)
      if (this.goods[this.currentType].list.length === 0) {
        //加载不同分类的商品
        this._getHomeGoods(this.currentType);
      }
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControlClone.currentIndex = index;
    },
    // backTop() {
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },
    contentScroll(position) {
      //tabcontrol是否显示
      this.isTabControlShow = this.tabControlOffsetTop <= -position.y;

      //backtop是否显示
      this.isBackTopShow = -position.y > this.$refs.home.offsetHeight;

      //上拉加载改变文字
      if (this.scrollBottom) {
        // console.log(-position.y,this.scrollBottom)
        if (-position.y + this.scrollBottom > 20) {
          this.upLoadText = "够了啦，松开人家嘛";
          if (this.isTouch === false) {
            //用户松手 加载数据
            this._getHomeGoods(this.currentType);
            this.upLoadText = "刷呀刷呀，好累啊，喵^w^";
            this.scrollBottom = 0;
          }
        } else {
          this.upLoadText = "再拉，再拉就刷给你看";
        }
      }

      //下拉刷新改变文字
      if (position.y > 80) {
        this.downLoadText = "够了啦，松开人家嘛";
      } else {
        this.downLoadText = "再拉，再拉就刷给你看";
      }
    },
    loadMore() {
      this.scrollBottom = this.$refs.scroll.getScrollY();
      // this._getHomeGoods(this.currentType);
      // console.log(this.$refs.scroll.getScrollY())
      this.$refs.scroll.finishPullUp();
    },
    updataTabControlTop() {
      //1.获取tabcontrol的offsetTop
      // console.log(111)
      this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    pullDownRefresh() {
      //下拉刷新 清空数组
      this.banners.length = 0;
      this.recommends.length = 0;
      this.goods = {
        pop: { page: 0, list: [], loaded: true },
        new: { page: 0, list: [], loaded: true },
        sell: { page: 0, list: [], loaded: true }
      };
      //重载组件
      this.swiperKey = Math.random();
      this.recommendKey = Math.random();
      this.goodsListKey = Math.random();
      //请求数据
      this._getHomeMultidata();
      this._getHomeGoods(this.currentType);

      this.$refs.scroll.finishPullDown();
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
      if (this.goods[type].loaded === false) return; //判断前一次请求数据是否返回了 没返回就不加载 避免加载多次
      const page = this.goods[type].page + 1;
      this.goods[type].loaded = false;
      getHomeGoods(type, page)
        .then(res => {
          this.upLoadText = "加载完了哦";
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page++;
          this.goods[type].loaded = true;
          this.upLoadText = "再拉，再拉就刷给你看";
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 工具函数
     */
    _getTranslate(str) {
      //获取滚动条当前的position 毫无意义直接this.$refs.scroll.getScrollY()
      const pattern = /translate(\(.*?\))/;
      const pattern2 = /[-]*[\d]+px/g;
      let obj = { x: 0, y: 0 };
      if (pattern.test(str)) {
        let list = pattern
          .exec(str)[1]
          .match(pattern2)
          .map(item => parseInt(item));
        obj.x = list[0];
        obj.y = list[1];
      }
      return obj;
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.scrollY, 20);
    this.$refs.scroll.refresh();

    //重载swiper
    this.swiperKey = Math.random();
  },
  deactivated() {
    this.scrollY = this.$refs.scroll.getScrollY();
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
  position: relative;
  z-index: 9;

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
  overflow: hidden;
}
.content.ignore {
  /* height:calc(100%-93px); */
  /* height: 100%; */
  position: absolute;
  top: 4px;
  bottom: -40px;
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
  top: -1px;
  z-index: 9;
}

.load-text.ignore {
  line-height: 40px;
  text-align: center;
}

.load-text::after {
  animation: dot 1.6s linear infinite both;
  content: "";
  position: absolute;
}
@keyframes dot {
  0% {
    content: ".";
  }
  33% {
    content: "..";
  }
  66% {
    content: "...";
  }
  100% {
    content: ".";
  }
}
</style>