<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: [Boolean, Object],
      default: false
    },
    pullDownRefresh:{
      type: [Boolean, Object],
      default: false
    },
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper, {
      probeType: this.probeType, //设置是否监听滚动 0，1为默认不监听 2监听手指但不监听手指离开的惯性 3全监听
      pullUpLoad: this.pullUpLoad,
      pullDownRefresh:this.pullDownRefresh,
      click: true,
    });
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position);
    });
    this.scroll.on("pullingUp", () => {
      console.log('上啦加载')
      this.$emit("pullUpLoad");
    });
    this.scroll.on("pullingDown", () => {
      console.log('下拉刷新')
      this.$emit("pullDownRefresh");
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      //做一层验证是为了保险 因为this.scroll是在mounted的时候new的 可能还没mounted 就已经被调用了
      this.scroll && this.scroll.scrollTo(x, y, time);
      // console.log(12);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    finishPullDown(){
      this.scroll && this.scroll.finishPullDown();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>

<style>
</style>