<template>
  <div class="app-container">
    <div class="left">
      <h4 class="handletitle">新增事件</h4>
      <div style="margin-top:30px">
        <el-form ref="form" :model="form" :label-position="labelPosition">
          <h4 class="handletitle"></h4>
          <div style="margin-top:30px">
            <el-form-item label="主语:">
              <el-col :span="9">
                <el-input v-model="form.zy"></el-input>
              </el-col>
              <el-col :span="12" style="margin-left:50px">
                <el-form-item label="主语同义词:">
                  <el-col :span="18">
                    <el-input v-model="form.Zys"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="谓语:">
              <el-col :span="9">
                <el-input v-model="form.wy"></el-input>
              </el-col>
              <el-col :span="12" style="margin-left:50px">
                <el-form-item label="谓语同义词:">
                  <el-col :span="18">
                    <el-input v-model="form.Wys"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="宾语:">
              <el-col :span="9">
                <el-input v-model="form.by"></el-input>
              </el-col>
              <el-col :span="12" style="margin-left:50px">
                <el-form-item label="宾语同义词:">
                  <el-col :span="18">
                    <el-input v-model="form.Bys"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="btns">
      <el-button type="success" @click="onSubmit" size="small">
        保存
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
      labelPosition: "left",
      form: {
        zy: "",
        wy: "",
        by: "",
        Zys: "",
        Wys: "",
        Bys: "",
        type: [],
        neuron: "",
        epoch: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/eventcurd/addToTableTeventall",
          qs.stringify({
            eventZy: this.form.zy,
            eventWy: this.form.wy,
            eventBy: this.form.by,
            eventZys: this.form.Zys,
            eventWys: this.form.Wys,
            eventBys: this.form.Bys
          })
        )
        .then(res => {
          console.log(res);
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
}
</style>
