<template>
  <div class="list-container">
    <el-table :data="tableData1" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>
  </div>
</template>

<script>
import { queryTableData } from '../methods'
export default {
  name: 'TodoList',
  components: {},
  data() {
    return {
      tableData: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      tableData1: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      queryTableData(this.listQuery).then(response => {
        console.log('888', response)
        this.tableData = response.data.items
        this.total = response.data.total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  padding: 50px 50px;
}
</style>
