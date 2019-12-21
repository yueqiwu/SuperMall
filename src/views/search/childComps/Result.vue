<template>
  <el-card class="result">
    <ul class="query-list" v-if="queryList.length">
      <li v-for="item in queryList" :key="item[1]" class="query-list-item" @click="$_selectItem(item[0])">{{item[0]}}</li>
    </ul>
    <div v-else style="text-align:center;height:200px;line-height:200px;">
      <img src="~assets/img/common/loading.gif" v-if="haveResult" alt />
      <span v-else>没有结果</span>
    </div>
  </el-card>
</template>

<script>
import { searchMixin } from "commonjs/mixins";
export default {
  name: "Result",
  mixins:[searchMixin],
  props: {
    queryList: {
      type: Array,
      default() {
        return []
      }
    },
    haveResult: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    queryList(list){
      
    }
  }
};
</script>

<style scoped>
.query-list-item {
  height:30px;
  font-size:12px;
  color:#999;
  line-height:30px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  background-color:#fff;
  overflow: hidden;
}
</style>