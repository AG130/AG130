import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import BaiduMap from 'vue-baidu-map'

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')

Vue.use(BaiduMap,{
  ak:'8CVicXyZiIOGD07rjHMROHn3WiIKDjTp'
})
