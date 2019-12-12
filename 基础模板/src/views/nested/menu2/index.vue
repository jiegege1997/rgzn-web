<template>
  <div class="app-container">
    <el-dialog title="预测结果" :visible.sync="dialogVisible" width="60%">
      <!-- <el-table
        :data="tableData2"
        border
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style=" width:100%;"
      >
        <el-table-column
          prop="data"
          label="预计日期"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="arr" label="事件表名" align="center">
        </el-table-column>
      </el-table> -->
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false" size="mini">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false" size="mini"
          >确 定</el-button
        >
      </span>
      <el-calendar>
        <template slot="dateCell" slot-scope="{ date, data }">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{
              data.day
                .split("-")
                .slice(1)
                .join("-")
            }}
            <!-- {{ data.day===this.arr[0]?tableData2[0].arr:"" }} -->
            <br />
          </p>
          <div v-for="i in 7" :key="i">
            {{ data.day === dataarr[i - 1] ? eventarr[i - 1] : "" }}
          </div>
          <!-- {{ data.day === dataarr[0] ? eventarr[0] : "" }}
            {{ data.day === dataarr[1] ? eventarr[1] : "" }}
            {{ data.day === dataarr[2] ? eventarr[2] : "" }}
            {{ data.day === dataarr[3] ? eventarr[3] : "" }}
            {{ data.day === dataarr[4] ? eventarr[4] : "" }}
            {{ data.day === dataarr[5] ? eventarr[5] : "" }}
            {{ data.day === dataarr[6] ? eventarr[6] : "" }} -->
        </template>
      </el-calendar>
    </el-dialog>
    <el-col :span="6">
      <el-button type="primary" @click="created()">
        新建事件预测
      </el-button>
    </el-col>
    <el-table
      :data="tableData"
      style="width: 100%;margin-top:60px;"
      :height="tableHeight"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
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
          <el-button size="mini" type="primary" @click="handleEdit(row)">
            详情
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
      dataarr: [],
      eventarr: [],
      pagesize: 10,
      tableHeight: window.innerHeight - 180,
      screenHeight: window.innerHeight,
      currpage: 1,
      dialogVisible: false
    };
  },
  mounted() {
    this.getData();
    window.onresize = () => {
      return (() => {
        window.screenHeight = window.innerHeight;
        this.screenHeight = window.screenHeight;
      })();
    };
  },
  watch: {
    screenHeight(val) {
      this.screenHeight = val;
      this.tableHeight = this.screenHeight - 180;
    }
  },
  methods: {
    //获取模型信息接口
    handleGet() {
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
    created() {
      this.$router.push({
        name: "NewEvent"
      });
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      this.getData();
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.getData();
    },
    getData() {
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
    handleEdit(item) {
      if (item.status == "1 ") {
        this.$confirm("该模型正在训练中,无法查看结果", "提示", {
          type: "warning"
        });
      } else {
        this.axios
          .post(
            "/jdqd/action/JDQD/biz/eventpredict/getEventPredictResultById",
            qs.stringify({
              modelId: item.model_id
            })
          )
          .then(res => {
            console.log(res.data.data.date_task_result_content);
            let obj = res.data.data.date_task_result_content;
            let dataArr = [];
            let eventArr = [];
            for (var i in obj) {
              dataArr.push(i);
              eventArr.push(obj[i]);
            }
            this.dataarr = dataArr;
            this.eventarr = eventArr;
            console.log(typeof eventArr[0]);
            //原来处理方法
            // let data = res.data.data.task_result_content;
            // let data1 = data.replace(/'/g, '"');
            // let data2 = JSON.parse(data1);
            // let arr = [];
            // for (var i in data2) {
            //   let obj = {};
            //   obj.data = i;
            //   let str = JSON.stringify(data2[i]);
            //   obj.arr = str.substring(1, str.length - 1);
            //   arr.push(obj);
            // }
            // this.tableData2 = [...arr];
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
