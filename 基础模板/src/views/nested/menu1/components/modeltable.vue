<template>
  <div>
    <el-table :data="eventDetail"
              style="width: 100%;"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :default-sort="{ prop: 'para_id', order: 'ascending' }"
              border>
      <el-table-column type="index"
                       align="center"
                       label="序号"
                       width="60"></el-table-column>
      <el-table-column label="模型名称"
                       prop="model_name"> </el-table-column>
      <el-table-column label="虚警率"
                       prop="false_alarm_rate">
      </el-table-column>
      <el-table-column label="误报率"
                       prop="false_rate"> </el-table-column>
      <el-table-column label="召回率"
                       prop="recall_rate"> </el-table-column>
      <el-table-column label="BLEU值"
                       prop="bleu"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "modeltable",
  props: ["eventDetail"],
  data () {
    return {
      tableData: [
        //   {
        //     modelname: "模型名称1",
        //     event: 0.34,
        //     source: 0.65
        //   },
        //   {
        //     modelname: "模型名称2",
        //     event: 0.45,
        //     source: 0.65
        //   },
        //   {
        //     modelname: "模型名称3",
        //     event: 0.38,
        //     source: 0.69
        //   }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
