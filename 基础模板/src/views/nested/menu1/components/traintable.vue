<template>
  <div>
    <el-table :data="eventInfo"
              style="width: 100%;"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :default-sort="{ prop: 'para_id', order: 'ascending' }"
              border>
      <el-table-column type="index"
                       align="center"
                       label="序号"
                       width="60">
      </el-table-column>
      <el-table-column label="事件名称"
                       prop="event_name"> </el-table-column>
      <el-table-column label="训练出现次数"
                       prop="xlj"> </el-table-column>
      <el-table-column label="测试出现次数"
                       prop="csj"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "tableTop",
  props: ["eventInfo"],
  data () {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
