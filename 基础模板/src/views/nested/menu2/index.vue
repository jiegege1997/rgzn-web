<template>
  <div class="app-container">
    <el-col :span="6" style="margin-bottom:20px;">
      <el-button type="primary" @click="created()">
        新建事件预测
      </el-button>
    </el-col>
    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      height="500px"
      :default-sort="{ prop: 'para_id', order: 'ascending' }"
      border
    >
      <el-table-column label="序号" prop="no">
        <template slot-scope="{ row }">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称" prop="name">
        <template slot-scope="{ row }">
          <span>{{ row.model_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预测天数" prop="day">
        <template slot-scope="{ row }">
          <span>{{ row.epoch }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" prop="date">
        <template slot-scope="{ row }">
          <span>{{ row.create_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="remark">
        <template slot-scope="{ row }">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160%" text-align="center">
        <template slot-scope="{ row }">
          <el-button size="mini" type="primary" @click="handleEdit(row)"
            >详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="float:right"
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="tableData.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      tableData: [],
      pagesize: 10,
      currpage: 1
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    created() {
      this.$router.push({
        name: "NewEvent"
      });
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    getData() {
      this.axios.defaults.headers = {
        "Content-type": "application/x-www-form-urlencoded"
      };
      this.axios
        .post(
          "http://192.168.3.139:8080/jdqd/action/JDQD/biz/eventpredict/getEventPredictInfo",
          qs.stringify({
            currPage: 1,
            pageSize: 10
          })
        )
        .then(res => {
          console.log(res.data.data);
          this.tableData = [...res.data.data];
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(item) {
      console.log(item);
      this.axios.defaults.headers = {
        "Content-type": "application/x-www-form-urlencoded"
      };
      this.axios
        .post(
          "http://192.168.3.139:8080/jdqd/action/JDQD/biz/eventpredict/getEventPredictInfoById",
          qs.stringify({
            modelId: item.model_id
          })
        )
        .then(res => {
          console.log(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
      this.axios.defaults.headers = {
        "Content-type": "application/x-www-form-urlencoded"
      };
      this.axios
        .post(
          "http://192.168.3.139:8080/jdqd/action/JDQD/biz/eventpredict/getEventPredictResultById",
          qs.stringify({
            modelId: item.model_id
          })
        )
        .then(res => {
          console.log(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
