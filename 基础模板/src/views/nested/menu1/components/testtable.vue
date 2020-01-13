<template>
  <div>
    <el-table :data="tableData"
              style="width: 92%;margin-left:30px;"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :default-sort="{ prop: 'para_id', order: 'ascending' }"
              @selection-change="handleSelectionChange"
              border>
      <!-- <el-table-column
        type="index"
        align="center"
        label="序号"
        width="60"
      ></el-table-column> -->
      <el-table-column type="selection"
                       width="55"
                       align="center">
      </el-table-column>
      <el-table-column label="模型名称"
                       align="center"
                       prop="modelname">
      </el-table-column>
      <el-table-column label="事件一"
                       align="center">
        <el-table-column label="召回率"
                         prop="source"
                         align="center">
        </el-table-column>
        <el-table-column label="BLEU值"
                         prop="trainevent"
                         align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="事件二"
                       align="center">
        <el-table-column label="召回率"
                         prop="source"
                         align="center">
        </el-table-column>
        <el-table-column label="BLEU值"
                         prop="trainevent"
                         align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="事件三"
                       align="center">
        <el-table-column label="召回率"
                         prop="source"
                         align="center">
        </el-table-column>
        <el-table-column label="BLEU值"
                         prop="trainevent"
                         align="center">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "testtable",
  data () {
    return {
      tableData: [
        {
          modelname: "40-3-48-2020-01-08",
          trainevent: 1.0,
          time: 8,
          source: "1.0"
        },
        {
          modelname: "60-3-16-2020-01-08",
          trainevent: 0.5,
          time: 9,
          source: "1.0",
        },
        {
          modelname: "30-3-60-2020-01-08",
          trainevent: 0.6,
          time: 10,
          source: "1.0",
        },
        {
          modelname: "55-3-12-2020-01-08",
          trainevent: 0.6,
          time: 10,
          source: "1.0",
        },
        {
          modelname: "30-3-36-2020-01-08",
          trainevent: 0.6,
          time: 10,
          source: 0.5
        },
        {
          modelname: "20-3-32-2020-01-08",
          trainevent: 0.6,
          time: 10,
          source: 0.5
        },
        {
          modelname: "55-3-8-2020-01-08",
          trainevent: 0.6,
          time: 10,
          source: 0.5
        },
        {
          modelname: "45-3-52-2020-01-08",
          trainevent: 0.6,
          time: 10,
          source: 0.5
        },
        {
          modelname: "55-3-24-2020-01-08",
          trainevent: 0.6,
          time: 10,
          source: 0.5
        },
        {
          modelname: "25-3-52-2020-01-08",
          trainevent: 0.6,
          time: 10,
          source: 0.5
        },
      ]
    };
  },
  methods: {
    handleSelectionChange (val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>
// .pagination {
//   margin-right: calc(100px - 30px);
// }
</style>
