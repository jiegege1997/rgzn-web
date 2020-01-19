<template>
  <div class="app-container">
    <el-button @click="cancel"
               size="small"
               type="primary">
      返回
    </el-button>
    <div class="left">
      <h4 class="handletitle">构建数据源</h4>
      <div style="margin-top:20px">
        <el-form ref="form"
                 :model="form"
                 :label-position="labelPosition">
          <el-form-item label="数据表名:">
            <el-col :span="20">
              <!-- <el-input v-model="form.tables_name"></el-input> -->
              {{ this.form.tables_name }}
            </el-col>
          </el-form-item>
          <h4 class="handletitle">模型基础信息</h4>
          <div style="margin-top:20px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="模型名称:">
                  {{ this.form.model_name }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="训练数据集时间:">
                  {{ this.form.tran_start_date }} ~
                  {{ this.form.tran_end_date }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="模型评估数据集时间:">
                  {{ this.form.evaluation_start_date }} ~
                  {{ this.form.evaluation_end_date }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-table :data="tableData"
                      style="width: 100%;"
                      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                      :default-sort="{ prop: 'para_id', order: 'ascending' }"
                      border>
              <el-table-column label="步长">
                <span>{{ this.form.size }} </span>
              </el-table-column>
              <el-table-column label="降维维度">
                <span>{{ this.form.dr_min }} - {{ this.form.dr_max }}</span>
              </el-table-column>
              <el-table-column label="滞后时间">
                {{ this.form.delay_min_day }} - {{ this.form.delay_max_day }}
              </el-table-column>
              <el-table-column label="神经元个数">
                {{ this.form.neure_num }}
              </el-table-column>
              <el-table-column label="网络数据个数">
                {{ this.form.train_batch_no }}
              </el-table-column>
              <el-table-column label="预测天数">
                {{ this.form.days }}
              </el-table-column>
              <el-table-column label="训练次数">
                {{ this.form.epoch }}
              </el-table-column>
            </el-table>
          </div>
          <h4 class="handletitle"
              style="margin-top:20px">训练事件明细</h4>
          <traintable :eventInfo="eventInfo" />
          <h4 class="handletitle"
              style="margin-top:20px">
            模型综合评价
          </h4>
          <modeldetail :modelTotInfo="modelTotInfo" />
          <h4 class="handletitle"
              style="margin-top:20px">
            模型明细
            <span style="float:right">
              选择事件:
              <el-select v-model="listvalue"
                         placeholder="请选择"
                         size="mini"
                         style="width:90px;"
                         @change="selectevent">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </span>
          </h4>
          <modeltable :eventDetail="eventDetail" />
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import traintable from "@/views/nested/menu1/components/traintable";
import modeltable from "@/views/nested/menu1/components/modeltable";
import modeldetail from "@/views/nested/menu1/components/modeldetail";

export default {
  components: {
    traintable,
    modeltable,
    modeldetail
  },
  data () {
    return {
      loadingbut: false,
      loadingtext: "立即创建",
      labelPosition: "left",
      tableData: [],
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
        epoch: "" //训练次数,
      },
      traintime: "2020-01-01 ~ 2020-01-09",
      modeltime: "2020-01-01 ~ 2020-01-08",
      options: [
      ],
      listvalue: "",
      modelTotInfo: [], //模型综合评价
      eventInfo: [], //训练事件明细
      eventDetail: [] //训练事件明细
    };
  },
  created () {
    this.findData();
  },
  methods: {
    findData () {
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
          this.form = res.data.data.modelInfo;
          this.modelTotInfo = res.data.data.modelTotInfo; //模型综合评价
          this.eventInfo = res.data.data.eventInfo; //训练事件明细
          this.tableData.push(res.data.data);
          var option = res.data.data.eventList;
          console.log(option, 'option')
          for (let i = 0; i < option.length; i++) {
            var obj = {}
            obj.value = option[i].event_name
            obj.label = option[i].event_name
            // this.options[i].value = option[i].event_name;
            // this.options[i].label = option[i].event_name;
            this.options.push(obj)
          }
          console.log(this.options)
          // this.options = res.data.data.eventlist; //选择事件下拉框
        })
        .catch(err => {
          console.log(err);
        });
    },
    //选择事件
    selectevent () {
      console.log(this.listvalue);
      let modelId = this.$route.query.id;
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/modeltrain/getModelDteailByEvent",
          qs.stringify({
            modelId: modelId,
            eventName: this.listvalue
          })
        )
        .then(res => {
          console.log(res.data.data);
          this.eventDetail = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit () {
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
    cancel () {
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
.main {
  display: flex;
}
</style>
