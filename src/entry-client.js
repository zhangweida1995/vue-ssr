import Vue from 'vue'
import createApp from './app.js'
/**客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中： */
const { app, router, store } = createApp()

// 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，
// 自动嵌入到最终的 HTML 中。而在客户端，在挂载到应用程序之前，store 就应该获取到状态
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
// 客户端预取数据：

//1、 在路由导航之前解析数据：
router.onReady(() => {
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activeted = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c)
    })
    if (!activeted.length) {
      return next()
    }

    Promise.all(
      activeted.map((c) => {
        if (c.asyncData) {
          return c.asyncData({ store, route: to })
        }
      })
    )
      .then(() => {
        next()
      })
      .catch(next)
  })
  app.$mount('#app')
})
// 2  匹配要渲染的视图后，再获取数据
// Vue.mixin({
//   beforeMount() {
//     const { asyncData } = this.$options
//     if (asyncData) {
//       // 将获取数据操作分配给 promise
//       // 以便在组件中，我们可以在数据准备就绪后
//       // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
//       this.dataPromise = asyncData({
//         store: this.$store,
//         route: this.$route,
//       })
//     }
//   },
// })
