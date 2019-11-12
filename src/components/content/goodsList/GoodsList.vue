<template>
  <div class="goods">
    <div class="goods-list" v-if="goodsList.length">
      <goods-list-item v-for="(item,index) in goodsList" :key="index" :good="item" />
    </div>
    <div class="loading" v-else>
      <img src="~assets/img/common/loading.gif" alt @load="imgLoad" />
    </div>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  components: {
    GoodsListItem
  },
  methods:{
    imgLoad(){
      this.$bus.$emit("itemImageLoad");
    }
  }
};
</script>

<style scoped>
.goods-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px;
  background-color: #fff;
}
.loading{
  width:100%;
  height:400px;
  display:flex;
  justify-content:center;
  align-items:center;
}
</style>