<template>
  <div id="search">
    <nav-bar class="search-header" :needRigth="false">
      <template v-slot:left>
        <i class="iconfont icon-back" @click="goBack"></i>
      </template>
      <template v-slot:center>
        <search-box placeholder="品牌服装一元抢" @query="query" class="search-input"></search-box>
      </template>
    </nav-bar>
    <scroll class="search-content ignore" ref="scroll">
      <hot v-show="!queryStr.length" />
      <history @refreshScroll="refreshScroll" v-show="!queryStr.length" />
      <result v-show="queryStr.length" :queryList="queryList" :haveResult="haveResult" />
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import SearchBox from "components/content/searchBox/SearchBox";
import Scroll from "components/common/scroll/Scroll";

import Hot from "./childComps/Hot";
import History from "./childComps/History";
import Result from "./childComps/Result";

import { getQuery } from "network/search";
export default {
  name: "Search",
  components: {
    NavBar,
    SearchBox,
    Hot,
    Scroll,
    History,
    Result
  },
  data() {
    return {
      // 输入框绑定的值
      queryStr: "",
      // 搜索返回的数据
      queryList: [],
      // 搜索是否有结果
      haveResult: true
    };
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/home" });
    },
    // 搜索框输入内容
    async query(str) {
      this.queryStr = str;
      const res = await getQuery(str);
      console.log(res.result);
      if (res.result.length === 0) {
        this.haveResult = false;
        console.log(this.haveResult);
        return 0;
      }
      this.queryList = res.result;
      console.log(res.result);
    },
    refreshScroll() {
      this.$refs.scroll.refresh();
    }
  }
};
</script>

<style scoped>
#search {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eee;
  z-index: 10;
}
.search-header {
  background-color: var(--color-tint);
}
.icon-back {
  color: #fff;
  font-size: 20px;
}
.search-input {
  margin-right: 15px;
}
.ignore.search-content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
</style>