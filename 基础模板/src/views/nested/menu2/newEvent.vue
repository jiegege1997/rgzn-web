<template>
  <div class="app-container">
    <el-dialog
      title="模型列表"
      :visible.sync="dialogTableVisible"
      width="70%"
      style="overflow:hidden"
    >
      <el-table
        ref="multipleTable"
        :data="tableData"
        height="400px"
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
        <el-table-column
          prop="create_date"
          label="创建日期"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <div class="btns">
        <el-button @click="cancel()">取消</el-button>
        <el-button @click="save()" type="success">确定</el-button>
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
          <el-col :span="6">
            <el-form-item label="模型名称" prop="name">
              <el-input v-model="ruleForm.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="预测天数" prop="day">
              <el-input v-model="ruleForm.day"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="预测说明" prop="remark">
              <el-input v-model="ruleForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="6">
            <el-form-item label="数据开始时间">
              <el-date-picker
                v-model="ruleForm.sample_start_date"
                type="date"
                placeholder="日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="数据结束时间">
              <el-date-picker
                v-model="ruleForm.sample_end_date"
                type="date"
                placeholder="日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row> -->
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
              :loading="loadingbut"
              style="margin-top:20px;margin-left:25px"
            >
              事件预测
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      loadingbut: false,
      loadingtext: "事件预测",
      radio: "",
      currentRow: "",
      newDay: "",
      ruleForm: {
        name: "",
        day: "",
        remark: "",
        sample_start_date: "",
        sample_end_date: ""
      },
      rules: {
        name: [{ required: true, message: "请输入模型名称", trigger: "blur" }],
        day: [{ required: true, message: "请输入预测天数", trigger: "blur" }]
      },
      dialogTableVisible: false,
      tableData: [],
      tableData2: []
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
      var date1 = new Date(this.ruleForm.sample_start_date);
      var date2 = new Date(this.ruleForm.sample_end_date);
      console.log(date1);
      if (this.currentRow.days < this.ruleForm.day) {
        this.$message({
          showClose: true,
          message: "预测天数不能大于模型预测天数",
          type: "error"
        });
      } else if (date1 > date2) {
        this.$message({
          showClose: true,
          message: "结束日期必须在开始日期之后",
          type: "error"
        });
      } else {
        this.axios
          .post(
            "/jdqd/action/JDQD/biz/eventpredict/addEventPredictInfo",
            qs.stringify({
              t_event_model_model_id: this.currentRow.model_id, //任务id
              model_name: this.currentRow.model_name, //任务名称
              task_remark: this.ruleForm.remark, //预测事件说明
              epoch: this.currentRow.days, //预测天数,
              tables_name: this.currentRow.tables_name
              // sample_start_date: this.ruleForm.sample_start_date,
              // sample_end_date: this.ruleForm.sample_end_date
            })
          )
          .then(res => {
            console.log(res.data.data);
            this.$router.go(-1);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    save() {
      console.log(this.currentRow);
      this.dialogTableVisible = false;
      this.ruleForm.name = this.currentRow.model_name;
      this.ruleForm.day = this.currentRow.days;
      this.newDay = this.currentRow.day;
    },
    getData() {
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/modeltrain/getModelTrainInfo",
          qs.stringify({
            currPage: 1,
            pageSize: 1000
          })
        )
        .then(res => {
          console.log(res.data.data);
          let data = res.data.data.data;
          let data1 = data.filter(item => item.status == "2 ");
          console.log(data1);
          this.tableData = [...data1];
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
  text-align: right;
  margin-right: 10px;
  /* border: 1px solid red; */
  margin-top: 10px;
}
.btns :after {
  content: ".";
  height: 0;
  clear: both;
  display: block;
  visibility: hidden;
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
