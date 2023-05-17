import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入element
import './plugins/element.js'
//导入基础样式
import './assets/css/reset.css'  
//导入语言
import i18n from './lang/index.js' 
//挂载api
import api from './api/index'
Vue.prototype.$api = api
//导航守卫
import './router/permission'
//持久化
import './utils/localStorage'
//引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

