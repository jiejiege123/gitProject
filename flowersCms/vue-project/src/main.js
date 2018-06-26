// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入字体图标
import './assets/css/font/iconfont.css'

// 引入elementui
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// 引入主题
// import './assets/css/theme/default/index.css'
import '../theme/index.css'

// 引入echarts
import echarts from "echarts"

// 引入axios
import Axios from 'axios'

// 引入vuex的index.js
import store from './store/index.js'

// 百度编辑器
import'../static/Ueditor/ueditor.config.js'
import'../static/Ueditor/ueditor.all.js'
import'../static/Ueditor/lang/zh-cn/zh-cn.js'
import'../static/Ueditor/ueditor.parse.js'

Vue.use(ElementUI)
Vue.config.productionTip = false

// 设置为vue方法
Vue.prototype.$axios = Axios
Vue.prototype.$host = 'http://localhost:8888/'
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

/* 全局拦截loading */
// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 设置不需要loading的请求判断
    if (config.showLoad == false) {
    	
    }else {
    	showloading()
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    	hideloading()
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// 设置请求函数
let needLoading = 0

export function showloading() {
  if (needLoading === 0) {
    startLoading()
  }
  needLoading++
}

export function hideloading() {
  if (needLoading <= 0) return
  needLoading--
  if (needLoading === 0) {
    endLoading()
  }
}

// 调用 element的loading方法
import { Loading } from 'element-ui'

let loading

function startLoading() {
  loading = Loading.service({
    lock: true,
    fullscreen: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  loading.close()
}
