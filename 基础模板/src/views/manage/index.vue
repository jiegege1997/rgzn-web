<template>
  <div class="app-container">
    <el-col :span="6">
      <el-button @click="handleCreate()" type="primary">
        新增事件
      </el-button>
    </el-col>
    <tableTop class="handletable" />
  </div>
</template>

<script>
import tableTop from "@/views/manage/tableTop";
import qs from "qs";

export default {
  components: {
    tableTop
  },

  methods: {
    handleCreate() {
      this.$router.push({
        name: "addevent"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.handletable {
  position: relative;
  margin-top: 60px;
  margin-left: 0px;
}
</style>
