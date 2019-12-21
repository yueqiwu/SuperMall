<template>
  <div id="app">
    <div id="body">
      <keep-alive exclude="Details,Search">
        <router-view />
      </keep-alive>
    </div>
    <main-tabbar/>
  </div>
</template>

<script>
import mainTabbar from 'components/content/mainTabbar/MainTabBar'
  export default{
    name:'app',
    components:{
      mainTabbar,
    }
  }
</script>

<style>
  @import "assets/css/base.css";
  #body {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding-bottom: 49px;
  overflow: hidden;
  /* overflow-x: hidden;
  overflow-y:scroll; */
  /* -webkit-overflow-scrolling: touch; */
}
</style>
