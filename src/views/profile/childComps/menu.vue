<template>
  <div class="mine-menu">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "name"
};
</script>

<style scoped>
.mine-menu {
  display: flex;
  padding: 5px;
  height: 35px;
  border-bottom: 1px solid rgb(223, 220, 220);
  align-items: center;
}
 .mine-menu .center {
    flex: 1;
    padding-left: 20px;
    font-size: 15px;
    color:#000;
  }
</style>