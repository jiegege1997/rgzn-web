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
          placement="bottom-end"
          style="margin-left:20px;"
        >
          <i class="el-icon-question"></i>
        </el-tooltip>
      </h4>
      <modelTable :modeltable="modeltable" />
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
      modeltable: []
    };
  },
  created() {
    // console.log(this.$route.query.forecastDate);
    // console.log(this.$route.query.taskId);
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
          this.modeltable = res.data.data;
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
