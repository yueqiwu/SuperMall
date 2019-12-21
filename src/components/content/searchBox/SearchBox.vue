<template>
  <div class="mine-search-box-wrapper">
    <i class="iconfont icon-search"></i>
    <div class="mine-search-box" v-if="fake">{{placeholder}}</div>
    <input
      class="mine-search-box"
      type="text"
      title="搜索框"
      :placeholder="placeholder"
      ref="input"
      v-model="query"
      v-if="!fake"
    />
    <i class="el-icon-circle-close" v-show="query" @click="reset"></i>
  </div>
</template>

<script>
import { debounce } from "commonjs/utils";
export default {
  name: "MeSearchBox",
  data() {
    return {
      query: ""
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "请输入搜索内容"
    },
    fake:{
      type:Boolean,
      default:false//默认显示的是真的
    }
  },
  watch: {
    query: debounce(function(){
      this.$emit("query", this.query);
    })
  },
  methods: {
    focus() {
      this.$refs.input && this.$refs.input.focus();
    },
    clear() {
      this.query = "";
    },
    reset() {
      this.clear();
      this.focus();
    }
  }
};
</script>

<style scoped>

.mine-search-box-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 25px;
  padding: 0 7px;
  background-color: #fff;
  border-radius: 10px;
}

.iconfont {
  color: #ccc;
  font-size: 16px;
  font-weight: bold;
}
.icon-search {
  padding-right: 7px;
}
.mine-search-box {
  background: none;
  border: none;
  margin: 0 6px;
  color: #aaa;
  line-height: 1.5;
  font-size: 14px;
  letter-spacing: 0.1em;
}
input{
  outline:none;
  flex:1;
}
input::-webkit-input-placeholder{
  font-size: 14px;
}
</style>
