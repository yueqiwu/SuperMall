<template>
  <el-card>
    <h4 class="hot-title">热门搜索</h4>
    <div class="list" v-if="hotList.length">
      <el-tag
        v-for="item in hotList"
        :key="item.num"
        type="success"
        @click="$_selectItem(item.hotWord)"
      >{{item.hotWord}}</el-tag>
    </div>
    <div v-else style="text-align:center">
      <img src="~assets/img/common/loading.gif" alt />
    </div>
  </el-card>
</template>

<script>
import { getHot } from "network/search";
import { searchMixin } from "commonjs/mixins"
export default {
  name: "Hot",
  mixins:[searchMixin],
  data() {
    return {
      hotList: []
    };
  },
  created() {
    this.getHotList();
  },
  methods: {
    async getHotList() {
      const res = await getHot();
      this.hotList = res;
    }  
  }
};
</script>

<style scoped>
.hot-title {
  height: 34px;
  line-height: 34px;
  font-weight: bold;
}
.el-tag {
  margin-right: 10px;
  margin-top: 8px;
}
</style>