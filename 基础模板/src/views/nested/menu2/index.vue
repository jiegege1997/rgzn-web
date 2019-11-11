<template>
  <div class="app-container">
    <el-col :span="6"
    style="margin-bottom:20px;">
      <el-button type="primary" @click="created()">
        新建事件预测
      </el-button>
    </el-col>
    <el-table :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
    style="width: 100%"
    :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    height="500px"
    :default-sort="{prop: 'para_id', order: 'ascending'}"
    border>
      <el-table-column label="序号"
                       prop="no">
        <template slot-scope="{row}">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称"
                       prop="name">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预测天数"
                       prop="day">
        <template slot-scope="{row}">
          <span>{{ row.day }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期"
                       prop="date">
        <template slot-scope="{row}">
          <span>{{ row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态"
                       prop="remark">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
    style="float:right"
    layout="prev, pager, next, sizes, total, jumper"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="pagesize"
    :total="tableData.length"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      pagesize: 10,
      currpage: 1
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    created() {
      this.$router.push({
        name: 'NewEvent',
      });
    },
    handleCurrentChange (cpage) {
      this.currpage = cpage
    },
    handleSizeChange (psize) {
      this.pagesize = psize
    },
    getData(){
      
    }
  },
}
</script>
