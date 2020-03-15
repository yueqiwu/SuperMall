<template>
  <div id="tab-bar">
      <tab-bar-item v-for="(item, index) in data" :key="index" :data="item" :activeColor="activeColor"/>
  </div>
</template>

<script>
import TabBarItem from './TabBarItem'
export default {
    name:"tabBar",
    components:{
      TabBarItem
    },
    props:{
      activeColor:{
        type:String,
        default:'red'
      },
      data:{
        type:Array,
        default:[]
      }
    }
}
</script>

<style scoped>
    #tab-bar{
    display:flex;
    width:100%;
    box-shadow:0 1px 1px rgba(100,100,100,.1);
    background-color:#f6f6f6;
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    z-index: 9;
  }
</style>