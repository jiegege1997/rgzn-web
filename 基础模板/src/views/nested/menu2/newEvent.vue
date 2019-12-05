<template>
  <div class="app-container">
    <el-dialog title="模型列表" :visible.sync="dialogTableVisible">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @row-click="showRow"
        @current-change="handleCurrentChange"
      >
        <el-table-column width="50">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" />
        <el-table-column prop="model_name" label="模型名称"> </el-table-column>
        <el-table-column prop="days" label="预测天数"> </el-table-column>
        <el-table-column prop="dates" label="创建日期" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div class="btns">
        <el-button @click="save()" type="success">确定</el-button>
        <el-button @click="cancel()">取消</el-button>
      </div>
    </el-dialog>
    <h4 class="handletitle">选择模型</h4>
    <div style="margin-top:60px;">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-form-inline"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="模型名称" prop="name">
              <el-input v-model="ruleForm.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="4">
            <el-form-item label="预测天数" prop="day">
              <el-input v-model="ruleForm.day"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5" :offset="6">
            <el-button
              type="primary"
              @click="chooseBtn()"
              style="margin-top:20px;margin-left:25px"
            >
              选择模型
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-button
              type="warning"
              @click="forecastBtn()"
              style="margin-top:20px;margin-left:25px"
            >
              事件预测
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <h4 class="handletitle" id="title">预测结果</h4>
    <el-row id="table">
      <el-col :span="18" :offset="2">
        <el-table
          :data="tableData2"
          border
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          style="width: 100%"
        >
          <el-table-column type="index" align="center" label="序号" width="70">
          </el-table-column>
          <el-table-column
            prop="data"
            label="预计日期"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column prop="address" label="事件表名" align="center">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      radio: "",
      currentRow: "",
      newDay: "",
      ruleForm: {
        name: "",
        day: ""
      },
      rules: {
        name: [{ required: true, message: "请输入模型名称", trigger: "blur" }],
        day: [{ required: true, message: "请输入预测天数", trigger: "blur" }]
      },
      dialogTableVisible: false,
      tableData: [
        {
          name: "模型一",
          day: "5",
          dates: "2019-11-8"
        },
        {
          name: "模型二",
          day: "3",
          dates: "2019-11-11"
        },
        {
          name: "模型三",
          day: "7",
          dates: "2019-7-10"
        }
      ],
      tableData2: [
        {
          index: "1",
          address: "20230",
          data: "2017-08-28"
        },
        {
          index: "2",
          address: "20189、20198",
          data: "2017-08-28"
        },
        {
          index: "3",
          address: "20189、20198、20189、20198",
          data: "2017-08-28"
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    chooseBtn() {
      this.dialogTableVisible = true;
    },
    forecastBtn() {
      console.log(this.currentRow);
      let arr = this.currentRow;
      this.axios.defaults.headers = {
        "Content-type": "application/x-www-form-urlencoded"
      };
      this.axios
        .post(
          "http://192.168.3.139:8080/jdqd/action/JDQD/biz/eventpredict/addEventPredictInfo",
          qs.stringify({
            t_event_model_model_id: arr.model_id, //任务id
            model_name: arr.model_name, //任务名称
            task_remark: "预测", //预测事件说明
            epoch: arr.days, //预测天数,
            days: "7",
            tables_name: "data_xlshuju_1,data_xlshuju_2"
            // create_data:      //创建事件
            // status:           //状态
            // t_event_model_model_id     //模型id
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
    save() {
      console.log(this.currentRow);
      this.dialogTableVisible = false;
      this.ruleForm.name = this.currentRow.model_name;
      this.ruleForm.day = this.currentRow.days;
      this.newDay = this.currentRow.day;
    },
    getData() {
      this.axios.defaults.headers = {
        "Content-type": "application/x-www-form-urlencoded"
      };
      this.axios
        .post(
          "http://192.168.3.139:8080/jdqd/action/JDQD/biz/modeltrain/getModelTrainInfo",
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
    cancel() {
      this.dialogTableVisible = false;
    },
    showRow(row) {
      this.radio = this.tableData.indexOf(row);
    },
    getCurrentRow(val) {
      this.newDay = "";
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      console.log(currentRow);
      this.currentRow = currentRow;
    }
  }
};
</script>
<style scoped>
.btns {
  margin-left: 520px;
  margin-top: 15px;
}
.handletitle {
  margin-top: 0;
  margin-bottom: 20px;
  padding-left: 10px;
  line-height: 20px;
  border-left: 8px solid #3080fe;
  font-weight: 400;
  font-size: 16;
}
#title {
  position: absolute;
  margin-top: 10vh;
}
#table {
  margin-top: 20vh;
}
</style>
