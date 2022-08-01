import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import axios from 'axios'
Vue.prototype.$http = axios

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts


axios.defaults.baseURL = 'http://shop.wuximo.club/';
Vue.config.productionTip = false
Vue.prototype.$http = axios


import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)

//导入百度地图
// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//   ak: 'E1Lz32CrnBmdWydg4e2IGeqsi2kFnKXf'
// })

// import { VueJsonp } from 'vue-jsonp'
// Vue.use(VueJsonp)

axios.interceptors.request.use((config) => {
  config.headers.token = sessionStorage.getItem('token');
  return config;
}, (error) => {
  return Promise.reject(error);
});



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')