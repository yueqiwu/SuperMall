<template>
  <div class="tab-bar-item" @click="itemClick" :style="activeStyle">
      <i :class="data.icon"></i>
      <span>{{data.title}}</span>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data(){
    return{
    }
  },
  props: {
    data: {
      type: Object
    },
    activeColor:{
      type: String
    }
  },
  methods: {
    itemClick() {
      if (this.$route.path === this.data.path) return;
      this.$router.replace(this.data.path);
    },
    
  },
  computed: {
    // 判断当前是否为活动页
    isactive() {
      return this.$route.path.indexOf(this.data.path) !== -1;
    },
    activeStyle(){
      if(this.isactive) return 'color:'+this.activeColor
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  height: 49px;
  flex: 1;
  /* text-align:center; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
i {
  font-size: 22px;
}
</style>