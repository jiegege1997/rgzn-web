<template>
  <div class="app-container">
    <el-dialog title="预测结果"
               :visible.sync="dialogVisible"
               width="60%">
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="dialogVisible = false"
                   size="mini">确 定</el-button>
      </span>
      <div class="dayText">
        <!-- <timeline /> -->
        <chartline />
        <!-- <el-calendar>
          <template slot="dateCell" slot-scope="{ date, data }">
            {{
              data.day
                .split("-")
                .slice(1)
                .join("-")
            }}
            <div v-for="i in dataarr.length" :key="-i">
              <div style="color:blue">
                {{ data.day === dataarr[i - 1] ? detailarr[i - 1] : "" }}
              </div>
              <div style="color:red">
                {{ data.day === dataarr[i - 1] ? eventarr[i - 1] : "" }}
              </div>
            </div>
          </template>
        </el-calendar> -->
      </div>
    </el-dialog>
    <el-col :span="6">
      <el-button type="primary"
                 @click="created()">
        新建事件预测
      </el-button>
    </el-col>
    <el-table :data="tableData"
              style="width: 100%;margin-top:60px;"
              :height="tableHeight"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :default-sort="{ prop: 'para_id', order: 'ascending' }"
              border>
      <el-table-column label="序号"
                       type="index"
                       width="60"
                       align="center" />
      <el-table-column label="任务名称"
                       prop="name">
        <template slot-scope="{ row }">
          <span>{{ row.model_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预测天数"
                       prop="day">
        <template slot-scope="{ row }">
          <span>{{ row.epoch }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期"
                       prop="date">
        <template slot-scope="{ row }">
          <span>{{ row.create_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态"
                       prop="remark">
        <template slot-scope="{ row }">
          <span>{{
            row.status == "1 "
              ? "预测中"
              : row.status == "2 "
              ? "已完成"
              : "已失败"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="160%"
                       text-align="center">
        <template slot-scope="{ row }">
          <el-button size="mini"
                     type="primary"
                     @click="handleEdit(row)">
            详情
          </el-button>
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
import qs from "qs";
import timeline from "@/views/nested/menu2/components/timeline";
import chartline from "@/views/nested/menu2/components/chartline";

export default {
  components: {
    // timeline,
    chartline
  },
  data () {
    return {
      //定时器
      timer: null,
      tableData2: [],
      tableData: [],
      dataarr: [],
      eventarr: [],
      detailarr: [],
      pagesize: 10,
      tableHeight: window.innerHeight - 180,
      screenHeight: window.innerHeight,
      currpage: 1,
      dialogVisible: false
    };
  },
  created () {
    this.getData();
  },
  mounted () {
    this.timer = setInterval(this.getData, 10000);
    window.onresize = () => {
      return (() => {
        window.screenHeight = window.innerHeight;
        this.screenHeight = window.screenHeight;
      })();
    };
  },
  // 页面销毁时候
  destroyed () {
    console.log("destroyed");
    clearInterval(this.timer);
    this.timer = null;
  },
  watch: {
    screenHeight (val) {
      this.screenHeight = val;
      this.tableHeight = this.screenHeight - 180;
    }
  },
  methods: {
    //获取模型信息接口
    handleGet () {
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/eventpredict/getEventPredictInfoById",
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
    created () {
      this.$router.push({
        name: "NewEvent"
      });
    },
    handleCurrentChange (cpage) {
      this.currpage = cpage;
      this.getData();
    },
    handleSizeChange (psize) {
      this.pagesize = psize;
      this.getData();
    },
    //得到数据方法
    getData () {
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/eventpredict/getEventPredictInfo",
          qs.stringify({
            currPage: this.currpage,
            pageSize: this.pagesize
          })
        )
        .then(res => {
          console.log(res.data.data);
          this.tableData = [...res.data.data.data];
          this.tableData.length = res.data.data.totalSize;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查看详情方法
    handleEdit (item) {
      console.log(item.task_id)
      if (item.status == "1 ") {
        this.$confirm("该模型正在训练中,无法查看结果", "提示", {
          type: "warning"
        });
      } else {
        this.$router.push({
          name: "deTail",
          query: {
            taskId: item.task_id
          }
        });
        this.axios
          .post(
            "/jdqd/action/JDQD/biz/eventpredict/getEventPredictResultByTask",
            qs.stringify({
              // taskId: item.model_id
              taskId: item.task_id
            })
          )
          .then(res => {
            console.log(res.data.data);
            // let data = res.data.data.task_result_content;
            // let data1 = data.replace(/'/g, '"');
            // console.log(data1);
            // let data2 = JSON.parse(data1);
            // console.log(data2);
            // let obj = data2;
            // let dataArr = [];
            // let eventArr = [];
            // let detailArr = [];
            // for (var i in obj) {
            //   dataArr.push(i);
            //   eventArr.push(obj[i].split("|")[0]);
            //   detailArr.push(obj[i].split("|")[1]);
            // }
            // this.dataarr = dataArr;
            // this.eventarr = eventArr;
            // this.detailarr = detailArr;
            // console.log(this.detailarr);
            // this.dialogVisible = true;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// /deep/ .dayText {
//   .el-calendar-table {
//     thead {
//       background-color: red;
//     }
//   }
// }
</style>
