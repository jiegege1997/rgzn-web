<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 92%;margin-left:30px;"
      height="500px"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :default-sort="{ prop: 'para_id', order: 'ascending' }"
      border
    >
      <el-table-column label="序号" />
      <el-table-column label="人员名称" prop="translated_title">
      </el-table-column>
      <el-table-column label="类型" prop="event"> </el-table-column>
      <el-table-column label="人员清单" prop="source">
        <template slot-scope="{ row }">
          <span>{{ row.source }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发生时间" prop="remark">
        <template slot-scope="{ row }">
          <span>{{ row.spider_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      class="pagination"
      style="float:right;"
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="this.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
export default {
  name: "tableTop",
  data() {
    return {
      tableData: []
    };
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-right: calc(100px - 30px);
}
</style>
