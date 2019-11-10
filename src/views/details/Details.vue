<template>
  <div id="details" ref="details">
    <nav-bar @titleClick="scrollToTheme" ref="nav" />
    <scroll class="content ignore" ref="scroll" :probeType="3" @scroll="contentScroll">
      <details-swiper :top-images="topImages" />
      <base-info :goods="goods" />
      <shop-info :shop="shop" />
      <goods-info :goods-info="goodsInfo" @imageLoad="refeshScroll" />
      <params-info :param-info="goodsParam" ref="params" />
      <comment-info :comment="comment" ref="comment" />
      <goods-list
        :recommend="recommend"
        v-if="Object.keys(recommend).length !== 0"
        ref="recommend"
      />
    </scroll>
    <bottom-bar @addToCart="addToCart" />
    <transition name="backTop">
      <back-top @click.native="backTop" v-show="isBackTopShow" />
    </transition>
  </div>
</template>

<script>
import DetailsSwiper from "./childComps/DetailsSwiper";
import navBar from "./childComps/DetailsNavBar";
import BaseInfo from "./childComps/DetailBaseInfo";
import ShopInfo from "./childComps/DetailShopInfo";
import GoodsInfo from "./childComps/DetailGoodsInfo";
import ParamsInfo from "./childComps/DetailParamInfo";
import CommentInfo from "./childComps/DetailComment";
import GoodsList from "components/content/goodsList/GoodsList";
import BottomBar from "./childComps/DetailBottomBar";

import scroll from "components/common/scroll/Scroll";

import { backTopMixin } from "commonjs/mixins";

import {
  getDetails,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/details";
import { debounce } from "commonjs/utils";

export default {
  name: "Details",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      goodsInfo: {},
      goodsParam: {},
      comment: {},
      recommend: {},
      themeTops: [],
      currentIndex: 0
    };
  },
  mixins: [backTopMixin],
  components: {
    navBar,
    scroll,
    DetailsSwiper,
    BaseInfo,
    ShopInfo,
    GoodsInfo,
    ParamsInfo,
    CommentInfo,
    GoodsList,
    BottomBar
  },
  created() {
    this._getDetails();
  },
  mounted() {
    // 1.监听goodslistitem中图片的加载完成
    const refresh = debounce(this.$refs.scroll.refresh);
    this.$bus.$on("detailImageLoad", () => {
      refresh();
    });
  },
  methods: {
    refeshScroll() {
      //1.更新滚动条
      this.$refs.scroll.refresh();

      //2.更新元素的offsetTop
      this.themeTops = [];

      this.themeTops.push(
        ...[
          0,
          this.$refs.params.$el.offsetTop,
          this.$refs.comment.$el.offsetTop,
          this.$refs.recommend
            ? this.$refs.recommend.$el.offsetTop
            : this.$refs.comment.$el.offsetTop +
              this.$refs.comment.$el.offsetHeight
        ]
      );
      //this.$refs.recommend做特殊处理是因为 recommen的数据是另行获取的并且有可能依托getDetails getDetails本身就是异步的 recommend也是异步的 慢上加慢
      //网速慢的时候可能获取不到recommend 但是getdetails肯定已经完成了
    },
    scrollToTheme(index) {
      this.$refs.scroll.scrollTo(0, this.themeTops[index] * -1, 300);
    },
    contentScroll(position) {
      const positionY = -position.y;

      // for (let i = 0, length = this.themeTops.length; i < length; i++) {
      //   if (
      //     this.currentIndex !== i &&
      //     ((i < length - 1 &&
      //       this.themeTops[i] <= positionY &&
      //       positionY < this.themeTops[i + 1]) ||
      //       (i === length - 1 && this.themeTops[i] <= positionY))
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }
      this.isBackTopShow = positionY > this.$refs.details.offsetHeight;

      //滚动条滚动 navbar变色
      for (let i = this.themeTops.length - 1; i >= 0; i--) {
        if (this.themeTops[i] <= positionY) {
          if (this.currentIndex === i) return; //这个return会把整个函数都不执行 所以isbackshow要放前面
          // console.log(i);
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
          break;
        }
      }
    },
    addToCart() {
      // 1.创建对象
      const obj = {};
      // 2.对象信息
      obj.iid = this.iid;
      obj.imgURL = this.topImages[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.newPrice = this.goods.realPrice;
      // console.log(this.goods)
      // 3.添加到Store中
      this.$store.dispatch("addCart", obj).then(res=>{
        this.$toast.show(res)
      });
    },
    _getDetails() {
      //1.保存id
      this.iid = this.$route.params.Id;

      //2.根据iid请求详情数据
      getDetails(this.iid).then(res => {
        //1.获取顶部轮播图数据
        const data = res.result;
        // console.log(res);
        this.topImages = data.itemInfo.topImages;

        //2.获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );

        //3.获取店铺信息
        this.shop = new Shop(data.shopInfo);

        //4.保存商品详情数据
        this.goodsInfo = data.detailInfo;

        //5.获取商品参数
        this.goodsParam = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        //6.获取评论信息
        if (data.rate.cRate !== 0) {
          this.comment = data.rate.list[0];
        }

        //7.获取热门推荐
        this._getRecommend()
      });
    },
    _getRecommend() {
      getRecommend().then(res => {
        this.recommend = res.data;
        console.log(res);
      });
    }
  }
};
</script>

<style scoped>
#details {
  height: 100vh;
  width: 100%;
  background: #fff;
  position: relative;
  z-index: 10;
}
.content.ignore {
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 58px;
}
</style>