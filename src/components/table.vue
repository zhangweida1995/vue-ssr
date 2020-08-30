<template>
  <table border="1"
         class="table">
    <thead>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>customerName</th>
        <th>salesMobile</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,i) in dataList "
          :key="Math.random()+''+i">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.customerName}}</td>
        <td>{{item.salesMobile}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    dataList: Array
  }
}
</script>

<style scoped>
.table {
  border-collapse: collapse;
  width: 50%;
  margin: 0 auto;
}
th,
td {
  text-align: left;
}
</style>