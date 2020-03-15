import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import Toast from 'components/common/toast'
import FastClick from 'fastclick'
import './plugins/element'
import './plugins/vant'

import 'swiper/dist/css/swiper.css';

//安装toast插件
Vue.use(Toast);

//添加事件总线
Vue.prototype.$bus = new Vue()

//解决移动端300ms延迟
FastClick.attach(document.body)

//安装lazyload
Vue.use(VueLazyLoad,{
  preLoad:1,
  error:require('assets/img/common/error.png'),
  loading:require('assets/img/common/loading.gif'),
  attempt:1
});


Vue.config.productionTip = false;



new Vue({
  render: h => h(App),
  router,
  store

}).$mount('#app')
