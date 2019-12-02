<template>
  <div class="dashboard-container">
    <div class="dashboard-aaa">
      <el-button @click="aaa" class="dashboard-aaa-aaa"> 事件识别 </el-button>
      <el-button @click="bbb" class="dashboard-aaa-aaa"> 事件预测 </el-button>
      <el-button @click="ccc" class="dashboard-aaa-aaa"> 事理图谱 </el-button>
      <el-button @click="ddd" class="dashboard-aaa-aaa"> 人员共现 </el-button>
      <!-- <div class="dashboard-text">特色应用-人物与事件处理系统</div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"])
  },
  methods: {
    aaa() {
      this.$router.push({ name: "Table" });
      let id = this.hotCities.find(function(item) {
        return item.name == value;
      });
    },
    bbb() {
      this.$router.push({ name: "Nested" });
    },
    ccc() {
      this.$router.push({ name: "Tree" });
    },
    ddd() {
      this.$router.push({ name: "People" });
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    width: 500px;
    height: 300px;
    font-size: 30px;
    line-height: 46px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -150px;
  }
  &-aaa {
    display: grid;
    grid-template-columns: 250px 250px;
    grid-template-rows: 250px 250px;
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    margin-left: 20vw;
    margin-top: 10vh;
    &-aaa {
      font-size: 30px;
    }
  }
}
</style>
