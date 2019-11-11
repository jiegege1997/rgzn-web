<template>
  <div class="app-container">

    <div class="left">
      <el-upload class="upload-demo"
                 action="https://jsonplaceholder.typicode.com/posts/"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :before-remove="beforeRemove"
                 multiple
                 :limit="3"
                 :on-exceed="handleExceed"
                 :file-list="fileList">
        <el-button type="primary">点击上传</el-button>
      </el-upload>
      <div class="left-form">
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="模型名称">
            <el-col :span="10">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="降维维度">
            <el-col :span="4">
              <el-input v-model="form.mindimension"
                        placeholder="最小维度"></el-input>
            </el-col>
            <el-col class="line"
                    :span="2">-</el-col>
            <el-col :span="4">
              <el-input v-model="form.maxdimension"
                        placeholder="最大维度"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="滞后时间">
            <el-col :span="4">
              <el-input v-model="form.mintime"
                        placeholder="最小天数"></el-input>
            </el-col>
            <el-col class="line"
                    :span="2">-</el-col>
            <el-col :span="4">
              <el-input v-model="form.maxtime"
                        placeholder="最大天数"></el-input>
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item> -->
          <el-form-item label="神经元数">
            <el-col :span="10">
              <el-input v-model="form.neuron"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="训练批数">
            <el-col :span="10">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="epoch">
            <el-col :span="10">
              <el-input v-model="form.epoch"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit"
                       :loading="false">训练</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="right">
      <el-button type="success"
                 @click="onSubmit">立即创建</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>
  
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        mintime: '',
        maxtime: '',
        mindimension: '',
        maxdimension: '',
        neuron: '',
        epoch: ''
      },
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!');
    },
    cancel () {
      this.$router.go(-1);
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
}
</script>

<style scoped>
.right {
  float: right;
}
.line {
  text-align: center;
}
</style>