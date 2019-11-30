<template>
  <div class="menu">
    <scroll class="menu-list content">
      <div
        class="menu-item"
        v-for="(item,index) in menuList"
        :key="index"
        :class="{active:currentIndex===index}"
        @click="itemClick(index,item.maitKey,item.miniWallkey)"
      >{{item.title}}</div>
    </scroll>
  </div>
</template>

<script>
import scroll from "components/common/scroll/Scroll.vue";
export default {
  name: "Menu",
  components: {
    scroll
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods:{
    itemClick(index,maitKey,miniWallkey){
      this.currentIndex = index;
      // console.log(maitKey)
      this.$emit('itemClick',index,maitKey,miniWallkey)
    }
  }
};
</script>

<style scoped>
.content.menu-list {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  overflow: hidden;
}
.menu-item {
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
}
.active {
  background-color: #fff;
  border-left:3px solid hotpink;
}
</style>