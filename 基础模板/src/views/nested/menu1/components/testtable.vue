<template>
  <div>
    <el-table :data="tableData"
              style="width: 92%;margin-left:30px;"
              height="500px"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :default-sort="{ prop: 'para_id', order: 'ascending' }"
              border>
      <el-table-column label="序号" />
      <el-table-column label="测试集事件"
                       prop="trainevent">
      </el-table-column>
      <el-table-column label="出现次数"
                       prop="time"> </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <el-pagination background
                   class="pagination"
                   style="float:right;"
                   layout="prev, pager, next, sizes, total, jumper"
                   :page-sizes="[5, 10, 15, 20]"
                   :page-size="pagesize"
                   :total="this.length"
                   @current-change="handleCurrentChange"
                   @size-change="handleSizeChange" /> -->
  </div>
</template>

<script>
export default {
  name: "testtable",
  data () {
    return {
      tableData: [{
        trainevent: '事件1',
        time: 8
      }, {
        trainevent: '事件2',
        time: 9
      }, {
        trainevent: '事件3',
        time: 10
      }]
    };
  }
};
</script>

<style lang="scss" scoped>
// .pagination {
//   margin-right: calc(100px - 30px);
// }
</style>
