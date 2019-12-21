<template>
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad"/>
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      this.swiperOption={
        watchOverflow: true, //只有一个slider时，swiper会失效且隐藏导航等
        direction: 'horizontal',
        autoplay: {
              delay: 1000,
              disableOnInteraction: false //一旦有交互就停止轮播
            },
        slidesPerView: 1, //设置slider容器能够同时显示的slides数量
        loop: true,
        pagination: {
          //导航点
          el: ".swiper-pagination"
        },
      }
    },
    imageLoad(){
      this.$emit('swiperImageLoaded')
    }
  }
};
</script>

<style scoped>
.swiper{
  height:100%;
}
img{
  width:100%;
  height:100%;
}
</style>