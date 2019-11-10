<template>
  <div class="home-feature">
    <a href="https://act.mogujie.com/zzlx67">
    <img src="~assets/img/home/recommend_bg.jpg" alt="" @load="featureImageLoad"></a>
  </div>
</template>

<script>
export default {
  name:'HomeFeature',
  methods:{
    featureImageLoad(){
      this.$emit('featureImageLoad')
    }
  }
}
</script>

<style scoped>
.home-feature{
  width:100%;
  background-color:#fff;
  margin-top:8px;
}
.home-feature img{
  width:100%;
}
</style>