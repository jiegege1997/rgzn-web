<template>
  <div class="app-container">
    <div class="left">
      <h4 class="handletitle">构建数据源</h4>
      <div style="margin-top:30px;">
        <el-form
          ref="form"
          :model="form"
          :label-position="labelPosition"
          style="margin-left:60px;"
        >
          <el-form-item label="数据表名:">
            <el-col :span="20">
              <el-input v-model="form.tables_name"></el-input>
            </el-col>
            <el-tooltip
              class="item"
              effect="dark"
              content="多个表名 用逗号分隔"
              placement="bottom-end"
              style="margin-left:20px;"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="事件类别:">
            <el-row>
              <el-col :span="11" style="margin-left:10px">
                <el-radio-group v-model="form.event_type">
                  <el-radio label="2">按大类生成</el-radio>
                  <el-radio label="1">按小类生成</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <h4 class="handletitle">模型基础信息</h4>
        <div style="margin-top:20px">
          <el-form
            ref="form"
            :model="form"
            label-width="130px"
            :label-position="labelPosition"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="模型名称:">
                  <el-input v-model="form.model_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="滞后时间:">
                  <el-col :span="11">
                    <el-input
                      v-model="form.delay_min_day"
                      placeholder="最小天数"
                    ></el-input>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-input
                      v-model="form.delay_max_day"
                      placeholder="最大天数"
                    ></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="步长:">
                  <el-input v-model="form.size"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="降维维度:">
                  <el-col :span="11">
                    <el-input
                      v-model="form.dr_min"
                      placeholder="最小维度"
                    ></el-input>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-input
                      v-model="form.dr_max"
                      placeholder="最大维度"
                    ></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="网络数据个数:">
                  <el-input v-model="form.train_batch_no"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="神经元个数:">
                  <el-input v-model="form.neure_num"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="训练次数:" class="ruzhu-mess">
                  <el-input v-model="form.epoch"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预测天数:">
                  <el-input v-model="form.days"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="模型评估日期:">
                  <!-- <el-input v-model="form.modeltime"></el-input> -->
                  <el-col :span="11">
                    <!-- <el-input
                      v-model="form.evaluation_start_date"
                      placeholder="开始日期"
                    ></el-input> -->
                    <el-date-picker
                      v-model="form.evaluation_start_date"
                      type="date"
                      placeholder="开始日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <!-- <el-input
                      v-model="form.evaluation_end_date"
                      placeholder="结束日期"
                    ></el-input> -->
                    <el-date-picker
                      v-model="form.evaluation_end_date"
                      type="date"
                      placeholder="结束日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="训练日期:">
                  <!-- <el-input v-model="form.traintime"></el-input> -->
                  <el-col :span="11">
                    <!-- <el-input
                      v-model="form.tran_start_date"
                      placeholder="开始日期"
                    ></el-input> -->
                    <el-date-picker
                      v-model="form.tran_start_date"
                      type="date"
                      placeholder="开始日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <!-- <el-input
                      v-model="form.tran_end_date"
                      placeholder="结束日期"
                    ></el-input> -->
                    <el-date-picker
                      v-model="form.tran_end_date"
                      type="date"
                      placeholder="结束日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
    <div class="btns">
      <el-button
        type="success"
        @click="onSubmit"
        size="small"
        :loading="loadingbut"
      >
        {{ loadingtext }}
      </el-button>
      <el-button @click="cancel" class="btns-cancel" size="small">
        取消
      </el-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      abc: true,
      loadingbut: false,
      loadingtext: "立即创建",
      labelPosition: "right",
      form: {
        event_type: "",
        name: "",
        delivery: false,
        type: [],
        model_id: "", //模型id
        tables_name: "", //训练表名
        model_name: "", //模型名称
        dr_min: "", //降维最小维度
        dr_max: "", //降维最大维度
        delay_min_day: "", //滞后最小天数
        delay_max_day: "", //滞后最大天数
        neure_num: "", //神经元个数
        train_batch_no: "", //网络数据个数
        days: "", //预测天数
        epoch: "", //训练次数
        size: "", //步长
        traintime: "",
        modeltime: "",
        tran_start_date: "", //训练开始日期
        tran_end_date: "" //训练结束日期
      }
    };
  },
  methods: {
    onSubmit() {
      // this.loadingbut = true;
      // this.loadingtext = "创建中";
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/modeltrain/addModelInfo",
          qs.stringify({
            tables_name: this.form.tables_name,
            model_name: this.form.model_name,
            dr_min: this.form.dr_min,
            dr_max: this.form.dr_max,
            delay_min_day: this.form.delay_min_day,
            delay_max_day: this.form.delay_max_day,
            neure_num: this.form.neure_num,
            train_batch_no: this.form.train_batch_no,
            epoch: this.form.epoch,
            days: this.form.days,
            event_type: this.form.event_type,
            size: this.form.size,
            tran_start_date: this.form.tran_start_date,
            tran_end_date: this.form.tran_end_date,
            evaluation_start_date: this.form.evaluation_start_date,
            evaluation_end_date: this.form.evaluation_end_date
          })
        )
        .then(res => {
          console.log(res.data.data);
          this.$router.go(-1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.ruzhu-mess .el-form-item__label {
  /* font-size: 30px !important; */
  font-family: Microsoft YaHei !important;
}
</style>

<style scoped>
.left {
  width: 95%;
  position: relative;
  margin-top: 20px;
  height: 80%;
}
.right {
  position: absolute;
  margin-top: 20px;
  margin-left: 52%;
  height: 68%;
  width: 45%;
}
.test {
  position: absolute;
  margin-top: 15%;
  margin-left: 45.7%;
}
.line {
  text-align: center;
}
.btns {
  position: absolute;
  margin-top: 30px;
  margin-left: 40%;
  width: 15%;
}
.btns-cancel {
  float: right;
}
.el-icon-question {
  color: red;
}
.handletitle {
  margin-top: 0;
  margin-bottom: 20px;
  padding-left: 10px;
  line-height: 20px;
  border-left: 8px solid #3080fe;
  font-weight: 400;
  font-size: 16;
  font-family: Microsoft YaHei;
}
</style>
