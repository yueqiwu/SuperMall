<template>
  <div class="recommends">
    <div class="home-recommend" v-if="recommends.length">
      <a :href="item.link" v-for="(item,index) in recommends" :key="index" class="recommendsItem">
        <img v-lazy="item.image" @load="recommendsImageLoad" />
        <span>{{item.title}}</span>
      </a>
    </div>
    <div class="loading" v-else>
      <img src="~assets/img/common/loading.gif" alt @load="imgLoad" />
    </div>
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
  methods: {
    recommendsImageLoad() {
      this.$emit("recommendsImageLoad");
    },
    imgLoad() {
      this.$bus.$emit("itemImageLoad");
    }
  }
};
</script>

<style scoped>
.recommends {
  width: 100%;
  height: 122px;
  background-color: #fff;
}
.home-recommend {
  display: flex;
  padding: 10px 0 20px;
}
.recommendsItem {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
.recommendsItem img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>