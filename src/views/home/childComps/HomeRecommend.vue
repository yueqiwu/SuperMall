<template>
  <div class="home-recommend">
    <a :href="item.link" v-for="(item,index) in recommends" :key="index" class="recommendsItem">
      <img v-lazy="item.image" @load="recommendsImageLoad" />
      <span>{{item.title}}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods:{
    recommendsImageLoad(){
      this.$emit('recommendsImageLoad')
    }
  }
};
</script>

<style scoped>
.home-recommend {
  width: 100%;
  display: flex;
  padding:10px 0 20px;
  background-color:#fff;
}
.recommendsItem {
  flex:1;
  display: block;
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  font-size:12px;
}
.recommendsItem img{
  width:70px;
  height:70px;
  margin-bottom:10px;
}
</style>