<template>
  <div id="tab-bar">
      <slot></slot>
  </div>
</template>

<script>
export default {
    name:"tabBar",
    props:{
      activeColor:{
        type:String,
        default:'red'
      }
    },
    created(){
      // console.log(this.activeColor)
      this.$store.commit('setActiveColor',this.activeColor)
      // console.log(this.$store.state.activeColor)
    }
}
</script>

<style scoped>
    #tab-bar{
    display:flex;
    width:100%;
    box-shadow:0 1px 1px rgba(100,100,100,.1);
    background-color:#f6f6f6;
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    z-index: 9;
  }
</style>