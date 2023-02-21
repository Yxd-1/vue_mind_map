import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入思维导图插件
import ZmTreeOrg from 'zm-tree-org';
import "zm-tree-org/lib/zm-tree-org.css";

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8080'
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须返回config
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(ZmTreeOrg);

// // 告诉服务器去哪里找静态资源文件
// const path = require('path');
// app.use(express.static(path.join(__dirname, '/assets')));


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
