import createApp from './app.js'

/**
 * 服务器 entry 使用 default export 导出函数，并在每次渲染中重复调用此函数。此时，除了创建和返回应用程序实例之外，
 * 它不会做太多事情 - 但是稍后我们将在此执行服务器端路由匹配 (server-side route matching) 和数据预取逻辑 (data pre-fetching logic)
 */
export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url)
    // 路由器必须要提前解析路由配置中的异步组件，才能正确地调用组件中可能存在的路由钩子
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // 对所有匹配的路由组件调用asyncData
      Promise.all(
        matchedComponents.map((component) => {
          if (component.asyncData) {
            return component.asyncData({
              store,
              // route: router.currentRoute,
            })
          }
        })
      )
        .then(() => {
          // 在所有预取钩子(preFetch hook) resolve 后，
          // 我们的 store 现在已经填充入渲染应用程序所需的状态。
          // 当我们将状态附加到上下文，
          // 并且 `template` 选项用于 renderer 时，
          // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
          context.state = store.state
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
}
