<template>
  <div class="app-container">
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
          <el-input v-model="form.name"
                    placeholder="最小维度"></el-input>
        </el-col>
        <el-col class="line"
                :span="2">-</el-col>
        <el-col :span="4">
          <el-input v-model="form.name"
                    placeholder="最大维度"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="滞后时间">
        <el-col :span="4">
          <el-input v-model="form.name"
                    placeholder="最小天数"></el-input>
        </el-col>
        <el-col class="line"
                :span="2">-</el-col>
        <el-col :span="4">
          <el-input v-model="form.name"
                    placeholder="最大天数"></el-input>
        </el-col>
      </el-form-item>
      <!-- <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item> -->
      <el-form-item label="神经元数">
        <el-col :span="10">
          <el-input v-model="form.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="训练批数">
        <el-col :span="10">
          <el-input v-model="form.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="epoch">
        <el-col :span="10">
          <el-input v-model="form.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">立即创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
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
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!');
    },
    cancel () {
      this.$router.go(-1);
    }
  }
}
</script>