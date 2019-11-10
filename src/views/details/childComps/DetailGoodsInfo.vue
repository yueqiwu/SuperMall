<template>
  <div class="goods-info clear-fix" v-if="Object.keys(goodsInfo).length !== 0">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{goodsInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="detail-images" v-for="(item,index) in goodsInfo.detailImage" :key="index">
      <div class="info-key">{{item.key}}</div>
      <div class="image-list">
        <img v-for="(src,indey) in item.list" :src="src" :key="indey" @load="imgLoad"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data(){
    return{
      timer:null
    }
  },
  methods:{
    imgLoad(){
      if(this.timer) clearTimeout(this.timer);
      this.timer  = setTimeout(()=>{
        this.$emit('imageLoad')
      },250); 
    }
  }
};
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
}
.info-desc {
  padding: 0 15px;
  font-size: 14px;
}
.start::before,
.end::after {
  display: block;
  content: "";
  width: 5px;
  height: 5px;
  background-color: #111;
}
.start,
.end {
  width: 80px;
  border-bottom: 1px solid #111;
}
.desc {
  padding: 15px 0;
}
.end {
  /* transform: translate3d(100%,0,0) */
  float: right;
  position: relative;
}
.end::after {
  position: absolute;
  right: 0;
  top: -5px;
}
.start::before {
  position: relative;
  top: 5px;
}
.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.image-list img {
  width: 100%;
}
</style>