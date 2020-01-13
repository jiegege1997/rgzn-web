<template>
  <div>
    <el-table :data="tableData"
              style="width: 100%;"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :default-sort="{ prop: 'para_id', order: 'ascending' }"
              border>
      <el-table-column type="index"
                       align="center"
                       label="序号"
                       width="60"></el-table-column>
      <el-table-column label="模型名称"
                       prop="modelname"> </el-table-column>
      <el-table-column label="虚警率"
                       prop="event"> </el-table-column>
      <el-table-column label="误报率"
                       prop="event"> </el-table-column>
      <el-table-column label="召回率"
                       prop="source">
        <template slot-scope="{ row }">
          <span>{{ row.source }}</span>
        </template>
      </el-table-column>
      <el-table-column label="BLEU值"
                       prop="event"> </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <el-pagination
      background
      class="pagination"
      style="float:right;"
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="this.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    /> -->
  </div>
</template>

<script>
export default {
  name: "modeltable",
  data () {
    return {
      tableData: [{
        modelname: "模型名称1",
        event: 0.34,
        source: 0.65      },
      {
        modelname: "模型名称2",
        event: 0.45,
        source: 0.65
      },
      {
        modelname: "模型名称3",
        event: 0.38,
        source: 0.69
      }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
