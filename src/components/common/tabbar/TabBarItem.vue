<template>
  <div class="tab-bar-item" @click="itemClick" :style="activeColor">
    <slot name="item-icon"></slot>
    <slot name="item-text"></slot>
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
    path: {
      type: String
    }
  },
  methods: {
    itemClick() {
      if (this.$route.path === this.path) return;
      this.$router.replace(this.path);
    },
    
  },
  computed: {
    isactive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeColor(){
      if(this.isactive) return 'color:'+this.$store.state.activeColor
    }

  },
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
/* .iconfont {
  font-size: 22px;
}
.active {
  color: red;
} */
</style>