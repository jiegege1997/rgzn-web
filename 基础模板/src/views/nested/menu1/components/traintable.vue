<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :default-sort="{ prop: 'para_id', order: 'ascending' }"
      border
    >
      <el-table-column type="index" align="center" label="序号" width="60">
      </el-table-column>
      <el-table-column label="事件名称" prop="trainevent"> </el-table-column>
      <el-table-column label="训练出现次数" prop="time"> </el-table-column>
      <!-- <el-table-column label="测试集事件" prop="testevent"> </el-table-column> -->
      <el-table-column label="测试出现次数" prop="time2"> </el-table-column>
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
  name: "tableTop",
  data() {
    return {
      tableData: [
        {
          trainevent: "事件1",
          time: 3,
          testevent: "测试事件1",
          time2: "--"
        },
        {
          trainevent: "事件2",
          time: "--",
          testevent: "测试事件2",
          time2: 4
        },
        {
          trainevent: "事件3",
          time: 3,
          testevent: "测试事件3",
          time2: 6
        },
        {
          trainevent: "事件4",
          time: "--",
          testevent: "测试事件4",
          time2: 9
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
