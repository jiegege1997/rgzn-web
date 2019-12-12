<template>
  <div class="app-container">
    <el-button @click="cancel" size="small" type="primary">
      返回
    </el-button>
    <div class="left">
      <h4 class="handletitle">构建数据源</h4>
      <div style="margin-top:30px">
        <el-form ref="form" :model="form" :label-position="labelPosition">
          <el-form-item label="数据表名">
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
          <!-- <el-form-item label="同一天的事件列表">
            <el-row>
              <el-col :span="11">
                <el-checkbox-group v-model="form.type">
                  <el-checkbox label="21297"
                               name="type"></el-checkbox>
                  <el-checkbox label="21682"
                               name="type"></el-checkbox>
                  <el-checkbox label="21253"
                               name="type"></el-checkbox>
                  <el-checkbox label="21319"
                               name="type"></el-checkbox>
                  <el-checkbox label="21451"
                               name="type"></el-checkbox>
                  <el-checkbox label="21132"
                               name="type"></el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
          </el-form-item> -->
          <h4 class="handletitle">模型基础信息</h4>
          <div style="margin-top:30px">
            <el-form-item label="模型名称:">
              <el-col :span="9" style="margin-left:12px;">
                <el-input v-model="form.model_name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="降维维度:">
              <el-col :span="4" style="margin-left:13px;">
                <el-input
                  v-model="form.dr_min"
                  placeholder="最小维度"
                ></el-input>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="4">
                <el-input
                  v-model="form.dr_max"
                  placeholder="最大维度"
                ></el-input>
              </el-col>
              <el-col :span="12" style="margin-left:56px;">
                <el-form-item label="滞后时间:">
                  <el-col :span="8">
                    <el-input
                      v-model="form.delay_min_day"
                      placeholder="最小天数"
                    ></el-input>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="8">
                    <el-input
                      v-model="form.delay_max_day"
                      placeholder="最大天数"
                    ></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="神经元个数:">
              <el-col :span="9">
                <el-input v-model="form.neure_num"></el-input>
              </el-col>
              <el-col :span="12" style="margin-left:25px;">
                <el-form-item label="网络数据个数:">
                  <el-col :span="18">
                    <el-input v-model="form.train_batch_no"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="预测天数:">
              <el-col :span="9" style="margin-left:13px">
                <el-input v-model="form.days"></el-input>
              </el-col>
              <el-col :span="12" style="margin-left:56px">
                <el-form-item label="训练次数:" class="ruzhu-mess">
                  <el-col :span="18">
                    <el-input v-model="form.epoch"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="btns">
      <!-- <el-button
        type="success"
        @click="onSubmit"
        size="small"
        :loading="loadingbut"
      >
        {{ loadingtext }}
      </el-button> -->
      <!-- <el-button
        @click="cancel"
        class="btns-cancel"
        size="small"
        type="primary"
      >
        返回
      </el-button> -->
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      loadingbut: false,
      loadingtext: "立即创建",
      labelPosition: "left",
      form: {
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
        epoch: "" //训练次数
      }
    };
  },
  created() {
    this.findData();
  },
  methods: {
    findData() {
      let modelId = this.$route.query.id;
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/modeltrain/getModelTrainInfoById",
          qs.stringify({
            modelId: modelId
          })
        )
        .then(res => {
          console.log(res.data.data);
          this.form = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
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
            days: this.form.days
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
  margin-left: 35%;
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
