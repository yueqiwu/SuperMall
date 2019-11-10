<template>
  <div class="details-swiper">
    <swiper v-if="topImages.length" :options="swiperOption">
      <swiper-slide v-for="(item,index) in topImages" :key="index">
        <img :src="item" class="swiper-img" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <img src="~assets/img/common/loading.gif" v-else />
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "DetailSwiper",
  components: {
    swiper,
    swiperSlide
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.swiperOption = {
        watchOverflow: true, //只有一个slider时，swiper会失效且隐藏导航等
        direction: "horizontal",
        autoplay: {
          delay: 2000,
          disableOnInteraction: false //一旦有交互就停止轮播
        },
        slidesPerView: 1, //设置slider容器能够同时显示的slides数量
        loop: true,
        pagination: {
          //导航点
          el: ".swiper-pagination"
        },
      };
    }
  },
  watch: {
    topImages(value) {
      if (value.length === 1) {
        this.swiperOption.loop = false;
      }
    }
  }
};
</script>

<style scoped>
.details-swiper {
  height: 300px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-container {
  height: 100%;
}
.swiper-img {
  width: 100%;
}
</style>