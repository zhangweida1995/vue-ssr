import Vue from 'vue'
import App from './App.vue'
import { createRoute } from './router/index'
import { createStore } from './store/index'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title.js'
import { Button, Select } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.use(Button)
Vue.use(Select)
Vue.mixin(titleMixin)
axios.defaults.baseURL = 'http://test.api.iglobalwin.com/'
axios.interceptors.request.use(
  function(config) {
    config.headers.Authorization = '267482bb42ad40719f7ec8788d6c962e'
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
Vue.prototype.$axios = axios
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export default () => {
  const router = createRoute()
  const store = createStore()
  // 同步路由状态(route state)到 store
  Vue.prototype.routes = router
  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  })
  return { app, router, store }
}
