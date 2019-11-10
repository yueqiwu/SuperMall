<template>
  <transition name="toast">
    <div class="toast" v-show="isShow">
      <span>{{message}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      message: "",
      timer: null
    };
  },
  methods: {
    show(message, delay = 2000) {
      clearTimeout(this.timer);

      this.isShow = true;
      this.message = message;

      this.timer = setTimeout(() => {
        this.isShow = false;
        // this.message = "";
      }, delay);
    }
  }
};
</script>

<style scoped>
.toast {
  text-align:center;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 50%;
  left: 50%;
  color: #eee;
  padding: 8px 10px;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.toast-enter-active,
.toast-leave-active{
  transition: opacity .3s;
  /* color:red; */
}
.toast-enter,
.toast-leave-to{
  opacity:0;
}
.toast-enter-active{
  animation:bounce-in .3s;
}
.toast-leave-active{
  animation:bounce-in .3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>