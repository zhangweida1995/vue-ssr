/**
 *
 * 类似于资源注入，Head 管理遵循相同的理念：
 * 我们可以在组件的生命周期中，将数据动态地追加到渲染上下文 (render context)
 */

function getTitle(vm) {
  // 组件可以提供一个 `title` 选项
  // 此选项可以是一个字符串或函数
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function' ? title.call(vm) : title
  }
}

const serverTitle = {
  created() {
    const title = getTitle(this)
    if (title) {
      // 可以通过 this.$ssrContext 来直接访问组件中的服务器端渲染上下文(SSR context)
      this.$ssrContext.title = title
    }
  },
}

const clientTitle = {
  mounted() {
    const title = getTitle(this)
    if (title) {
      document.title = title
    }
  },
}

export default process.env.VUE_ENV === 'server' ? serverTitle : clientTitle
