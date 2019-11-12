<template>
    <div class="subCategory">
      <div class="categoryItem" v-for="(item,index) in categoryList" :key="index">
        <a :href="item.link" class="link">
          <img :src="item.image" alt @load="imageLoad" />
          <span>{{item.title}}</span>
        </a>
      </div>
    </div>
</template>

<script>

import { debounce } from "commonjs/utils";
export default {
  name: "SubCategory",
  props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      timer: null
    };
  },
  methods: {
    imageLoad() {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$emit('imageLoad')
      }, 200);
    }
  }
};
</script>

<style scoped>
.subCategory {
  display: flex;
  flex-wrap: wrap;
  padding:15px 0;
  /* justify-content: space-around; */
}
.categoryItem {
  width: 33%;
  /* margin-right:3%; */
}
.link {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}
img {
  width: 100%;
}
span {
  margin-top: 10px;
  font-size: 14px;
}
</style>