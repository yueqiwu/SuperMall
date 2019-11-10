<template>
  <div class="nav">
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="goBack">
          <div class="back-arrow"></div>
        </div>
      </template>
      <template v-slot:center>
        <div
          class="center-item"
          v-for="(item,index) in titles"
          :key="item"
          :class="{active:currentIndex===index}"
          @click="itemClick(index)"
        >{{item}}</div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "detailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    itemClick(index){
      this.currentIndex = index;
      this.$emit('titleClick',index);
    }
  }
};
</script>

<style scoped>
.center-item {
  flex: 1;
}
.back-arrow {
  width: 12px;
  height: 12px;
  border-left: 1px solid red;
  border-top: 1px solid red;
  transform: rotate(-45deg);
}
.active {
  color: crimson;
}
.back{
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
}
</style>