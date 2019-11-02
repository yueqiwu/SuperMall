<template>
  <div class="goods-list">
    <goods-list-item v-for="(item,index) in goodsList" :key="index" :good="item"/>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"
export default {
  name:"GoodsList",
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    },
    currentType:{
      type:String,
      default:'pop'
    }
  },
  components:{
    GoodsListItem
  },
  computed:{
    goodsList(){
      return this.goods[this.currentType].list
    }
  },
}
</script>

<style scoped>
  .goods-list{
    width:100%;
    display:flex;
    flex-wrap:wrap;
    justify-content: space-around;
    padding:5px;
    background-color:#fff;
  }
</style>