<template>
  <el-card v-if="historyList.length">
    <h4 class="history-title">历史记录</h4>
    <transition-group class="history-list" tag="ul" name="list">
      <li v-for="item in historyList" :key="item" class="history-item" @click="$_selectItem(item)">
        {{item}}
        <i class="el-icon-close" @click.stop="delItem(item)"></i>
      </li>
    </transition-group>
    <div class="clear">
      <div class="clear-btn" @click="clearAll">
        <i class="el-icon-delete"></i>
        清空历史搜索
      </div>
    </div>
  </el-card>
</template>

<script>
import { searchMixin } from "commonjs/mixins";
import { MessageBox } from "element-ui";
import storage from "commonjs/storage";
export default {
  name: "History",
  mixins: [searchMixin],
  data() {
    return {
      historyList: []
    };
  },
  created() {
    this.getHistoryList();
  },
  mounted() {
    this.$bus.$on('updataHistory',()=>{
      this.getHistoryList()
    })
  },
  methods: {
    getHistoryList() {
      this.historyList = storage.get("superMall_search_hotWords");
    },
    delItem(item) {
      this.historyList = this.historyList.filter(i => i !== item);
      storage.set("superMall_search_hotWords", this.historyList);
      this.$emit("refreshScroll");
    },
    clearAll() {
      MessageBox.confirm("此操作将清空历史记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.historyList = [];
          storage.set("superMall_search_hotWords", this.historyList);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
.el-card {
  margin-top: 20px;
}
.history-title {
  height: 34px;
  line-height: 34px;
  font-weight: bold;
}
.history-item {
  height: 30px;
  font-size: 12px;
  color: #999;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  overflow: hidden;
}
.el-icon-close {
  font-size: 16px;
  /* display:flex;
  align-items: center; */
  line-height: inherit;
}
.history-item:first-child {
  border-top: 1px solid #eee;
}
.clear {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.clear .clear-btn {
  width: 300px;
  height: 40px;
  border: 1px solid #eee;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
}
.list-leave-active,
.list-enter-active {
  transition: height 0.3s;
}
.list-leave-to,
.list-enter {
  height: 0;
}
</style>