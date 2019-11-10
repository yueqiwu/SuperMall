import Toast from './Toast'

const obj = {}

obj.install = function(Vue){
  //1.创建组件构造器 Toast继承Vue
  const toastContructor = Vue.extend(Toast);
  //2.实例化组件对象
  const toast = new toastContructor();
  //3.将组件对象挂载到某一元素上
  toast.$mount(document.createElement('div'));
  //4.toast.$el就是上面创建的div了 将这个div放到body上
  document.body.appendChild(toast.$el);
  //5.在Vue原型上挂在 在其他组件都可直接通过this.$toast拿到
  Vue.prototype.$toast = toast;
  // console.log(123214)
}

export default obj