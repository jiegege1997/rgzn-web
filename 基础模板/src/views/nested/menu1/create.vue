<template>
  <div class="app-container">
    <div>
      <div class="left">
        <h4 class="title">构建数据源</h4>
        <div style="margin-top:30px">
          <el-form ref="form" :model="form" :label-position="labelPosition">
            <el-form-item label="数据表名">
              <el-col :span="20">
                <el-input v-model="form.name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="同一天的事件列表">
              <el-row>
                <el-col :span="11">
                  <el-checkbox-group v-model="form.type">
                    <el-checkbox label="21297" name="type"></el-checkbox>
                    <el-checkbox label="21682" name="type"></el-checkbox>
                    <el-checkbox label="21253" name="type"></el-checkbox>
                    <el-checkbox label="21319" name="type"></el-checkbox>
                    <el-checkbox label="21451" name="type"></el-checkbox>
                    <el-checkbox label="21132" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="同一天出现多个事件 选择需要的事件即可"
                  placement="bottom-end"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </el-row>
            </el-form-item>

            <h4 class="title">模型基础信息</h4>
            <div style="margin-top:30px">
              <el-form-item label="模型名称:">
                <el-col :span="9" style="margin-left:10px;">
                  <el-input v-model="form.name"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="降维维度:">
                <el-col :span="4" style="margin-left:10px;">
                  <el-input
                    v-model="form.mindimension"
                    placeholder="最小维度"
                  ></el-input>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-input
                    v-model="form.maxdimension"
                    placeholder="最大维度"
                  ></el-input>
                </el-col>
                <el-col :span="12" :offset="1">
                  <el-form-item label="滞后时间">
                    <el-col :span="8" style="margin-left:10px;">
                      <el-input
                        v-model="form.mintime"
                        placeholder="最小天数"
                      ></el-input>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="8">
                      <el-input
                        v-model="form.maxtime"
                        placeholder="最大天数"
                      ></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="神经元个数:">
                <el-col :span="9">
                  <el-input v-model="form.neuron"></el-input>
                </el-col>
                <el-col :span="12" :offset="1">
                  <el-form-item label="网络数据个数:">
                    <el-col :span="17">
                      <el-input v-model="form.name"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="预测天数:">
                <el-col :span="9" style="margin-left:10px">
                  <el-input v-model="form.name"></el-input>
                </el-col>
                <el-col :span="12" :offset="1">
                  <el-form-item label="训练次数">
                    <el-col :span="18" style="margin-left:10px">
                      <el-input v-model="form.epoch"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div class="btns">
      <el-button type="success" @click="onSubmit" size="small">
        立即创建
      </el-button>
      <el-button @click="cancel" class="btns-cancel" size="small">
        取消
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        mintime: "",
        maxtime: "",
        mindimension: "",
        maxdimension: "",
        neuron: "",
        epoch: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.left {
  width: 95%;
  position: absolute;
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
  margin-top: 40%;
  margin-left: 35%;
  width: 15%;
}
.btns-cancel {
  float: right;
}
.el-icon-question {
  color: red;
}
.title {
  margin-top: 0;
  margin-bottom: 20px;
  padding-left: 10px;
  line-height: 20px;
  border-left: 8px solid #3080fe;
  font-weight: 400;
  font-size: 16;
}
</style>
