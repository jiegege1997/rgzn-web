<template>
  <div class="app-container">
    <div class="left">
      <h4 class="handletitle">事件详情</h4>
      <div style="margin-top:30px">
        <el-form ref="form"
                 :model="form"
                 :label-position="labelPosition">
          <h4 class="handletitle"></h4>
          <div style="margin-top:30px">
            <el-form-item label="主语:">
              <el-col :span="5">
                <el-input v-model="form.zy"
                          disabled></el-input>
              </el-col>
              <el-col :span="15"
                      :offset="2">
                <el-form-item label="主语同义词:">
                  <el-col :span="20">
                    <el-input v-model="form.Zys"
                              disabled></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="谓语:">
              <el-col :span="5">
                <el-input v-model="form.wy"
                          disabled></el-input>
              </el-col>
              <el-col :span="15"
                      :offset="2">
                <el-form-item label="谓语同义词:">
                  <el-col :span="20">
                    <el-input v-model="form.Wys"
                              disabled></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="宾语:">
              <el-col :span="5">
                <el-input v-model="form.by"
                          disabled></el-input>
              </el-col>
              <el-col :span="15"
                      :offset="2">
                <el-form-item label="宾语同义词:">
                  <el-col :span="20">
                    <el-input v-model="form.Bys"
                              disabled></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="btns">
      <el-button type="success"
                 @click="onSubmit"
                 size="small">
        确定
      </el-button>
      <el-button @click="cancel"
                 class="btns-cancel"
                 size="small">
        取消
      </el-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  created () {
    this.getData();
  },
  data () {
    return {
      labelPosition: "left",
      form: {
        zy: "",
        wy: "",
        by: "",
        Zys: "",
        Wys: "",
        Bys: "",
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
    onSubmit () {
      this.$router.go(-1)
    },
    getData () {
      console.log(this.$route.query.id);
      const id = this.$route.query.id;
      this.axios.defaults.headers = {
        "Content-type": "application/x-www-form-urlencoded"
      };
      this.axios
        .post(
          "http://192.168.3.63:8080/jdqd/action/JDQD/biz/eventcurd/queryTableTeventall",
          qs.stringify({
            solrEventId: id
          })
        )
        .then(res => {
          console.log(res.data.data);
          let data = res.data.data;
          this.form.zy = data.event_zy;
          this.form.wy = data.event_wy;
          this.form.by = data.event_by;
          this.form.Zys = data.event_zy_s;
          this.form.Wys = data.event_wy_s;
          this.form.Bys = data.event_by_s;
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
