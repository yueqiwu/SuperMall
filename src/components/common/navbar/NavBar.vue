<template>
  <div class="navbar">
    <div class="left" v-if="needLeft" @click="$emit('leftClick')"><slot name="left"></slot></div>
    <div class="center" v-if="needCenter"><slot name="center"></slot></div>
    <div class="right" v-if="needRigth" @click="$emit('rightClick')"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() { 
    return {

    }
  },
  props: {
    needLeft:{
      type:Boolean,
      default:true
    },
    needCenter:{
      type:Boolean,
      default:true
    },
    needRigth:{
      type:Boolean,
      default:true
    }

  },
  components:{
  },
  mounted() {

  }
 }
</script>

<style scoped>
.navbar{
  position: relative;
  display:flex;
  width:100%;
  height:44px;
  line-height:44px;
  text-align:center;
  box-shadow:0 1px 1px rgba(100,100,100,.1)
}
.left,
.right,
.center{
  display:flex;
  justify-content:center;
  align-items:center;
}
.left,
.right{
  width:55px;
  height:100%;
}
.center{
  flex:1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.center ~ .right{
  position:static;
}
.left ~ .right{
  position:static;
}
.right{
  position:absolute;
  right:0;
}
</style>