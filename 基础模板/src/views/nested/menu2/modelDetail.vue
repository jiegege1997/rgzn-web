<template>
  <div class="app-container">
    <el-button @click="cancel" size="small" type="primary">
      返回
    </el-button>
    <div class="left">
      <h4 class="handletitle">
        模型详情
        <el-tooltip
          class="item"
          effect="dark"
          content="点击模型名称可查看历史"
          placement="right"
          style="margin-left:20px;"
        >
          <i class="el-icon-question"></i>
        </el-tooltip>
        <span style="float:right;margin-right:40px;">
          选择时间:
          <el-select
            v-model="listvalue"
            placeholder="请选择"
            size="mini"
            style="width:120px;"
            @change="selectevent"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </span>
      </h4>
      <modelTable :modeltable="modeltable" :listdata="listvalue" />
    </div>
  </div>
</template>

<script>
import qs from "qs";
import chartline from "@/views/nested/menu2/components/chartline";
import modelTable from "@/views/nested/menu2/components/modelTable";

export default {
  components: {
    modelTable
  },
  data() {
    return {
      modeltable: [],
      options: [],
      listvalue: this.$route.query.forecastDate
    };
  },
  mounted() {
    // console.log(this.$route.query.forecastDate);
    console.log(JSON.parse(this.$route.query.dataArr));
    this.changeData();
    this.getData();
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    getData() {
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/eventpredict/getEventPredictByForecastDate",
          qs.stringify({
            forecastDate: this.$route.query.forecastDate,
            taskId: this.$route.query.taskId
          })
        )
        .then(res => {
          console.log(res.data.data);
          let testdata = res.data.data;
          let resultArr = [];
          testdata.forEach(item => {
            let obj = {};
            obj.event = item.event;
            item.model.forEach(item => {
              obj[item.model_name] = item.probability;
              obj[item.model_name + "id"] = item.detail_id;
            });
            resultArr.push(obj);
          });
          console.log(resultArr);
          this.modeltable = resultArr;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeData() {
      let testdata = JSON.parse(this.$route.query.dataArr);
      for (let i = 0; i < testdata.length; i++) {
        let obj = {};
        obj.value = testdata[i].forecast_date;
        obj.label = testdata[i].forecast_date;
        this.options.push(obj);
        // this.options[i].value = testdata[i].forecast_date;
        // this.options[i].label = testdata[i].forecast_date;
      }
      console.log(this.options);
    },
    selectevent() {
      console.log(this.listvalue);
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/eventpredict/getEventPredictByForecastDate",
          qs.stringify({
            forecastDate: this.listvalue,
            taskId: this.$route.query.taskId
          })
        )
        .then(res => {
          console.log(res.data.data);
          let testdata = res.data.data;
          let resultArr = [];
          testdata.forEach(item => {
            let obj = {};
            obj.event = item.event;
            item.model.forEach(item => {
              obj[item.model_name] = item.probability;
              obj[item.model_name + "id"] = item.detail_id;
            });
            resultArr.push(obj);
          });
          console.log(resultArr);
          this.modeltable = resultArr;
        })
        .catch(err => {
          console.log(err);
        });
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
.item {
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
.title {
  margin-top: 20px;
  height: 15vh;
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title-time {
  font-size: 25px;
}
</style>
