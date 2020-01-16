<template>
  <div>
    <el-table
      :data="modeltable"
      style="width: 100%;"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :default-sort="{ prop: 'para_id', order: 'ascending' }"
      border
    >
      <el-table-column label="事件名称" prop="event"> </el-table-column>
      <el-table-column label="模型1" prop="model1">
        <template slot="header" slot-scope="model1">
          <div class="aa" @click="double(model1)">
            <span>模型1</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型2" prop="model2">
        <template slot="header" slot-scope="model2">
          <div class="aa" @click="double(model2)">
            <span>模型2</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型3" prop="model3">
        <template slot="header" slot-scope="model3">
          <div class="aa" @click="double(model3)">
            <span>模型3</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型4" prop="model4">
        <template slot="header" slot-scope="model4">
          <div class="aa" @click="double(model4)">
            <span>模型4</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型5" prop="model4">
        <template slot="header" slot-scope="model5">
          <div class="aa" @click="double(model5)">
            <span>模型5</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型6" prop="model6">
        <template slot="header" slot-scope="model6">
          <div class="aa" @click="double(model6)">
            <span>模型6</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型7" prop="model7">
        <template slot="header" slot-scope="model7">
          <div class="aa" @click="double(model7)">
            <span>模型7</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型8" prop="model8">
        <template slot="header" slot-scope="model8">
          <div class="aa" @click="double(model8)">
            <span>模型8</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型9" prop="model9">
        <template slot="header" slot-scope="model9">
          <div class="aa" @click="double(model9)">
            <span>模型9</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型10" prop="model10">
        <template slot="header" slot-scope="model10">
          <div class="aa" @click="double(model10)">
            <span>模型10</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "modelTable",
  props: ["modeltable", "listdata"],
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    double(a) {
      let test = a.column.property + "id";
      let enddata = this.listdata; //结束日期
      // console.log(this.$route.query.taskId);  //任务id
      let begindata = this.getBeforeDate(this.listdata); //开始日期
      // console.log(this.modeltable[0][test]); //模型id
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/eventpredict/getEventPredictModelDetail",
          qs.stringify({
            taskId: this.$route.query.taskId,
            detailId: this.modeltable[0][test],
            forecastStartDate: begindata,
            forecastEndDate: enddata
          })
        )
        .then(res => {
          console.log(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //得到前七天的日期
    getBeforeDate(listdata) {
      //n为你要传入的参数，当前为0，前一天为-1，后一天为1
      var date = new Date(listdata);
      var year, month, day, s;
      date.setDate(date.getDate() - 6);
      year = date.getFullYear();
      month = date.getMonth() + 1;
      day = date.getDate();
      s =
        year +
        "-" +
        (month < 10 ? "0" + month : month) +
        "-" +
        (day < 10 ? "0" + day : day);
      return s;
    }
  }
};
</script>

<style lang="scss" scoped>
.aa :hover {
  cursor: pointer;
}
</style>
