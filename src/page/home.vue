<template>
  <div>
    <h3>Home</h3>
    <el-button type="primary"
               @click="requestData">请求数据</el-button>
    <ig-table :data-list="list"></ig-table>
  </div>
</template>

<script>
import igTable from '@/components/table.vue'

export default {
  components: {
    igTable
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    requestData () {
      this.$axios.post('/tasks/boards/list', {
        displayStart: 1,
        displayLength: 40,
      }).then(res => {
        console.table(res.data.data)
        this.list = res.data.data
      })
    }
  },
  mounted () {
    this.requestData()
  }
}
</script>

<style lang="scss" scoped>
</style>