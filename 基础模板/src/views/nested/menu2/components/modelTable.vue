<template>
  <div>
    <el-table
      :data="modeltable"
      style="width: 100%;"
      show-summary
      sum-text="ss"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :default-sort="{ prop: 'para_id', order: 'ascending' }"
      border
    >
      <el-table-column label="事件名称" prop="event_name"> </el-table-column>
      <el-table-column label="模型1" prop="score"> </el-table-column>
      <el-table-column label="模型2" prop="score"> </el-table-column>
      <el-table-column label="模型3" prop="score">
        <template slot="header" slot-scope="score">
          <div class="aa" @click="double(score)">
            <span>模型3</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型4" prop="score">
        <template slot="header" slot-scope="score">
          <div class="aa" @click="double(score)">
            <span>模型4</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型5" prop="score">
        <template slot="header" slot-scope="score">
          <div class="aa" @click="double(score)">
            <span>模型5</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型6" prop="score">
        <template slot="header" slot-scope="score">
          <div class="aa" @click="double(score)">
            <span>模型6</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型7" prop="score">
        <template slot="header" slot-scope="score">
          <div class="aa" @click="double(score)">
            <span>模型7</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型8" prop="score">
        <template slot="header" slot-scope="score">
          <div class="aa" @click="double(score)">
            <span>模型8</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型9" prop="score">
        <template slot="header" slot-scope="score">
          <div class="aa" @click="double(score)">
            <span>模型9</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模型10" prop="score">
        <template slot="header" slot-scope="score">
          <div class="aa" @click="double(score)">
            <span>模型10</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "modelTable",
  props: ["modeltable"],
  data() {
    return {
      tableData: [
        {
          model_name: "20169",
          score: 0.65
        },
        {
          model_name: "22010",
          score: 0.65
        },
        {
          model_name: "21064",
          score: 0.69
        },
        {
          model_name: "21064",
          score: 0.69
        },
        {
          model_name: "21064",
          score: 0.69
        },
        {
          model_name: "21064",
          score: 0.69
        },
        {
          model_name: "21064",
          score: 0.69
        }
      ]
    };
  },
  methods: {
    double(slot) {
      console.log(slot.column);
      console.log("123");
    }
  }
};
</script>

<style lang="scss" scoped>
.aa :hover {
  cursor: pointer;
}
</style>
