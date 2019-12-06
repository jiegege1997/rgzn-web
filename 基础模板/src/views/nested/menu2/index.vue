<template>
  <div class="app-container">
    <el-dialog title="预测结果" :visible.sync="dialogVisible" width="60%">
      <el-table
        :data="tableData2"
        border
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style=" width: 100%; height:70vh;"
      >
        <!-- <el-table-column type="index" align="center" label="序号" width="70"> -->
        <!-- </el-table-column> -->
        <el-table-column
          prop="data"
          label="预计日期"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="arr" label="事件表名" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false" size="mini">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
      <el-table-column label="序号" type="index" width="60" align="center" />
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
          <span>{{
            row.status == "1 "
              ? "训练中"
              : row.status == "2 "
              ? "已完成"
              : "已失败"
          }}</span>
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
      tableData2: [],
      tableData: [],
      pagesize: 10,
      currpage: 1,
      dialogVisible: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //获取模型信息接口
    handleGet() {
      this.axios
        .post(
          "http://139.9.126.19:8081/jdqd/action/JDQD/biz/eventpredict/getEventPredictInfoById",
          qs.stringify({
            modelId: item.model_id
          })
        )
        .then(res => {
          console.log(res.data.data);
          // let data = res.data.data.task_result_content;
        })
        .catch(err => {
          console.log(err);
        });
    },
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
      this.axios
        .post(
          "http://139.9.126.19:8081/jdqd/action/JDQD/biz/eventpredict/getEventPredictInfo",
          qs.stringify({
            currPage: 1,
            pageSize: 10
          })
        )
        .then(res => {
          console.log(res.data.data);
          this.tableData = [...res.data.data.data];
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(item) {
      if (item.status == "1 ") {
        this.$confirm("该模型正在训练中,无法查看", "提示", {
          type: "warning"
        });
      } else {
        this.axios
          .post(
            "http://139.9.126.19:8081/jdqd/action/JDQD/biz/eventpredict/getEventPredictResultById",
            qs.stringify({
              modelId: item.model_id
            })
          )
          .then(res => {
            // console.log(res.data.data);
            let data = res.data.data.task_result_content;
            let data1 = data.replace(/'/g, '"');
            let data2 = JSON.parse(data1);
            let arr = [];
            for (var i in data2) {
              let obj = {};
              obj.data = i;
              let str = JSON.stringify(data2[i]);
              obj.arr = str.substring(1, str.length - 1);
              arr.push(obj);
            }
            // console.log(arr);
            this.tableData2 = [...arr];
            this.dialogVisible = true;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
