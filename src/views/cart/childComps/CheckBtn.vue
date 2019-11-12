<template>
  <div class="check-btn ignore" :class="{checked:isChecked}" @click="btnClick">
    <!-- <img src="~assets/img/cart/tick.svg" alt=""> -->
  </div>
</template>

<script>
export default {
  name:"CheckBtn",
  props:{
    isChecked:{
      type:Boolean,
      default:false
    },
  },
  methods:{
    btnClick(){
      this.$emit('btnClick')
    }
  }
}
</script>

<style scoped>
  .check-btn.ignore{
    width:16px;
    height:16px;
    border:1px solid #999;
    border-radius:50%;
  }
  .checked{
    background-color:red;
    border:1px solid red;
    background-image: url("~assets/img/cart/tick.svg");
  }
</style>