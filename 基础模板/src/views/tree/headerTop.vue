<template>
  <div class="app-container">
    <!-- 高级搜索模态框 -->
    <el-dialog title="高级查询"
               :visible.sync="centerDialogVisible"
               width="35%"
               center>
      <el-form :label-position="labelPosition"
               label-width="80px"
               :model="formLabelAlign">
        <el-form-item label="开始时间">
          <el-col :span="24">
            <el-form-item prop="date1">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="formLabelAlign.date1"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-col :span="24">
            <el-form-item prop="date2">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="formLabelAlign.date2"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
        <el-form-item label="数量范围">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-input v-model="formLabelAlign.type"
                        placeholder="最小数量"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line"
                  :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-input v-model="formLabelAlign.type"
                        placeholder="最大数量"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="展开深度">
          <el-select v-model="formLabelAlign.value"
                     placeholder="请选择"
                     style="width:100px;">
            <el-option v-for="item in formLabelAlign.options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="headerTop">
      <el-row>
        <el-col :span="6"
                style="margin-top: 20px;margin-bottom:20px;">
          <el-input placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="input2"
                    size="mini">
          </el-input>
        </el-col>
        <el-col :span="6"
                style="margin-top: 20px;margin-bottom:20px; margin-left:20px;">
          <el-button type="primary"
                     size="mini">
            搜索
          </el-button>
          <el-button type="primary"
                     size="mini"
                     @click="centerDialogVisible = true">
            高级
          </el-button>
        </el-col>
        <el-col :span="4"
                :offset="7"
                style="margin-top:20px">
          展现形式:
          <el-select v-model="value"
                     placeholder="请选择"
                     @change="handleChange"
                     size="mini"
                     style="width:90px;">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          事件状态:
          <el-checkbox label="正在发生"></el-checkbox>
          <el-checkbox label="已发生"></el-checkbox>
          <el-checkbox label="将发生"></el-checkbox>
        </el-col>
        <el-col :span="10"
                :offset="2">
          事件关系:
          <el-checkbox label="抽象因果关系"></el-checkbox>
          <el-checkbox label="事件泛化"></el-checkbox>
          <el-checkbox label="上下位关系"></el-checkbox>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerTop",
  data () {
    return {
      input2: "",
      centerDialogVisible: false,
      labelPosition: "left",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
        data1: "",
        data2: "",
        value: "",
        options: [
          {
            value: "1",
            lebel: "1"
          },
          {
            value: "2",
            lebel: "2"
          },
          {
            value: "3",
            lebel: "3"
          },
          {
            value: "4",
            lebel: "4"
          },
          {
            value: "5",
            lebel: "5"
          }
        ]
      },
      options: [
        { value: "1", label: "列表" },
        { value: "2", label: "图表" }
      ],
      value: ""
    };
  },
  watch: {},
  methods: {
    slice () {
      console.log(111);
    },
    handleChange (value) {
      // console.log(value);
      this.$emit("increase", value);
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
