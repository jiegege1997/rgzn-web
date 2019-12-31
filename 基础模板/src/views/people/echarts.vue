<template>
  <div>
    <div class="max">
      <div style="margin-top:-40px;font-size:16px;">2019&nbsp;G7会议</div>
      <div class="min"
           style="margin-top:70px;margin-left:120px"
           @click="modalShow">
        <h3 style="margin-top:35px">特朗普</h3>
      </div>
      <div class="min"
           style="margin-top:70px;margin-left:250px"
           @click="modalShow">
        <h3 style="margin-top:35px">孔特</h3>
      </div>
      <div class="min"
           style="margin-top:200px;margin-left:50px;background-color:rgb(73,144,226);color:white"
           @click="modalShow">
        <h3 style="margin-top:35px">特鲁多</h3>
      </div>
      <div class="min"
           style="margin-top:200px;margin-left:350px"
           @click="modalShow">
        <h3 style="margin-top:35px">安培</h3>
      </div>
      <div class="min"
           style="margin-top:200px;margin-left:200px "
           @click="modalShow">
        <h3 style="margin-top:35px">马克龙</h3>
      </div>
      <div class="min"
           style="margin-top:350px;margin-left:120px;background-color:rgb(73,144,226);color:white"
           @click="modalShow">
        <h3 style="margin-top:35px">约翰逊</h3>
      </div>
      <div class="min"
           style="margin-top:350px;margin-left:250px;"
           @click="modalShow">
        <h3 style="margin-top:35px">默克尔</h3>
      </div>
    </div>
    <el-dialog title="详细信息"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <el-table :data="tableData"
                style="width: 100%"
                border
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
        <el-table-column prop="date"
                         label="属性名"> </el-table-column>
        <el-table-column prop="name"
                         label="属性值"> </el-table-column>
      </el-table>
      <span slot="footer"
            class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        > -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "echarts",
  data () {
    return {
      dialogVisible: false,
      tableData: [
        { date: "时间", name: "2019年8月26日" },
        { date: "地点", name: "法国" },
        { date: "人员共现支持度", name: "22%" },
        { date: "人员共现置信度", name: "10%" },
        { date: "时间内容", name: "url" }
      ]
    };
  },
  methods: {
    modalShow () {
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  position: absolute;
  /* margin-top: 10px; */
  margin-left: 400px;
}
.max {
  position: relative;
  width: 500px;
  height: 500px;
  margin-top: 50px;
  margin-left: 150px;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  text-align: center;
  color: rgb(0, 0, 1);
}
.min {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;

  text-align: center;
  color: rgb(0, 0, 0);
}
</style>
