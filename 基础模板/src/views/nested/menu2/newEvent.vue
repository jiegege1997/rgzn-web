<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"    class="demo-form-inline">
        <el-col :span="8">
            <el-form-item label="模型名称" prop="name">
                <el-input v-model="ruleForm.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="预测天数" prop="day">
                <el-input v-model="ruleForm.day"></el-input>
            </el-form-item>
            <el-button type="primary" @click="chooseBtn()" style="margin-top:20px;margin-left:25px">
                选择模型
            </el-button>
            <el-button type="warning" @click="forecastBtn()" style="margin-top:20px;margin-left:25px">
                事件预测
            </el-button>
        </el-col>
    </el-form>
    <el-dialog title="模型列表" :visible.sync="dialogTableVisible">
        <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @row-click="showRow" @current-change="handleCurrentChange">
            <el-table-column width="50">
                <template scope="scope">
                    <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column label="序号"
            type="index" />
            <el-table-column
            prop="name"
            label="模型名称">
            </el-table-column>
            <el-table-column
            prop="day"
            label="预测天数">
            </el-table-column>
            <el-table-column
            prop="dates"
            label="创建日期"
            show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <div class="btns">
            <el-button @click="save()" type="success">确定</el-button>
            <el-button @click="cancel()">取消</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        radio: '',
        currentRow:'',
        newDay:'',
        ruleForm: {
          name: '',
          day: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入模型名称', trigger: 'blur' },
          ],
          day: [
            { required: true, message: '请输入预测天数', trigger: 'blur' },
          ],
        },
        dialogTableVisible:false,
        tableData:[{
            name:'模型一',
            day:'5',
            dates:'2019-11-8'
        },{
            name:'模型二',
            day:'3',
            dates:'2019-11-11'
        },{
            name:'模型三',
            day:'7',
            dates:'2019-7-10'
        }],
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
        chooseBtn(){
            this.dialogTableVisible = true;
        },
        forecastBtn(){
          if (this.ruleForm.name == '' || this.ruleForm.day == '') {
            this.$message.error('信息不完整');
          }else{
            if (this.newDay<this.ruleForm.day) {
              this.$message.error('预测天数超出');
            }else{

            }
          }
        },
        save(){
            this.dialogTableVisible = false;
            this.ruleForm.name = this.currentRow.name;
            this.ruleForm.day = this.currentRow.day;
            this.newDay = this.currentRow.day;
        },
        cancel(){
            this.dialogTableVisible = false;
        },
        showRow(row) {
          this.radio = this.tableData.indexOf(row);
        },
        getCurrentRow(val) {
          // console.log(val);
          this.newDay = '';
        },
        handleCurrentChange(currentRow, oldCurrentRow){
          console.log(currentRow);
          this.currentRow = currentRow;
          // this.getCurrentRow(this.tableData.indexOf(currentRow));
        },
        getData(){

        },
    }
  }
</script>
<style scoped>
  .btns{
    margin-left:520px;
    margin-top:15px;
  }
</style>

