<template>
  <div>
    <el-table
      :data="modelTotInfo"
      style="width: 100%;"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :default-sort="{ prop: 'para_id', order: 'ascending' }"
      border
    >
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="60"
      ></el-table-column>
      <el-table-column label="模型名称" prop="model_name"> </el-table-column>
      <el-table-column label="综合评分" prop="score"> </el-table-column>
      <el-table-column label="虚警率" prop="false_alarm_rate">
      </el-table-column>
      <el-table-column label="误报率" prop="false_rate"> </el-table-column>
      <el-table-column label="召回率" prop="recall_rate"> </el-table-column>
      <el-table-column label="BLEU值" prop="bleu"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "modeltable",
  props: ["modelTotInfo"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
