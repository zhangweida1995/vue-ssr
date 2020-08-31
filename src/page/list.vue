<template>
  <div class="list">
    <h2>List</h2>
    <ig-table :data-list="list"></ig-table>
  </div>
</template>

<script>
import igTable from '@/components/table.vue'
export default {
  asyncData ({ store, route }) {
    return store.dispatch('fetchItem')
  },
  components: {
    igTable
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    list () {
      return this.$store.state.items.data
    }
  },
  mounted () {
  }
}
</script>

<style  scoped>
.list {
  width: 100%;
  text-align: center;
}
</style>