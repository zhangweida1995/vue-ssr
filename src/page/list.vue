<template>
  <div>
    <p v-for="(item,i) in list "
       :key="Math.random()+''+i">
      <span>{{item.id}}</span>
      <span>{{item.name}}</span>
    </p>
  </div>
</template>

<script>
export default {
  asyncData ({ store, route }) {
    return store.dispatch('fetchItem')
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    list () {
      return this.$store.state.items.data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>