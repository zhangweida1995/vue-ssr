import Vue from 'vue'
import App from './App.vue'
import { createRoute } from './router/index'
import { createStore } from './store/index'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title.js'
Vue.mixin(titleMixin)

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
