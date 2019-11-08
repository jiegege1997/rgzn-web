<template>
  <div class="app-container">
    <!-- 搜索框 -->
    <el-col :span="6"
            style="margin-top: 20px;margin-bottom:20px;">
      <el-input v-model="findData"
                placeholder="请输入表单标题"
                size="mini">
        <template slot="append">
          <el-button @click="find()">
            搜索
          </el-button>
        </template>
      </el-input>
    </el-col>
    <!-- 表格 -->
    <!-- style="margin-top: 40px" -->
    <!-- height="400px" -->
    <el-table :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
              style="width: 100%"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              height="500px"
              :default-sort="{prop: 'para_id', order: 'ascending'}"
              border>
      <el-table-column label="#"
                       type="index" />
      <el-table-column label="标题"
                       prop="translated_title"
                       width="90%">
        <template slot-scope="{row}">
          <span>{{ row.translated_title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="相关事件"
                       prop="event">
        <template slot-scope="{row,}">
          <span>{{ row.event }}</span>
        </template>
      </el-table-column>
      <el-table-column label="网站名称"
                       prop="url">
        <template slot-scope="{row, $index}">
          <span v-if="!showEdit[$index]">{{ row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文本日期"
                       prop="remark"
                       sortable>
        <template slot-scope="{row, $index}">
          <el-input v-if="showEdit[$index]"
                    v-model="row.remark"
                    class="edit-cell" />
          <span v-if="!showEdit[$index]">{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="80%"
                       text-align="center">
        <template slot-scope="{row, $index}">
          <el-button v-if="!showBtn[$index]"
                     size="mini"
                     type="primary"
                     @click="handleEdit(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   style="float:right"
                   layout="prev, pager, next, sizes, total, jumper"
                   :page-sizes="[5, 10, 15, 20]"
                   :page-size="pagesize"
                   :total="tableData.length"
                   @current-change="handleCurrentChange"
                   @size-change="handleSizeChange" />

  </div>
</template>

<script>
// import { getList } from '@/api/table'
import qs from 'qs'

export default {
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      // list: null,
      // listLoading: true
      tableData: [],
      dialogFormVisible: false,
      search: '',
      findData: '',
      showEdit: [], // 显示编辑框
      showBtn: [],
      pagesize: 10,
      currpage: 1
    }
  },
  created () {
    this.find()
  },
  methods: {
    // fetchData() {
    //   this.listLoading = true
    //   getList().then(response => {
    //     this.list = response.data.items
    //     this.listLoading = false
    //   })
    // }
    handleEdit (item) {
      // console.log(item)
      this.$router.push({
        name: 'details',
        query: {
          id: item.article_id
        }
      })
    },
    // 查看所有数据
    find () {
      this.axios.defaults.headers = {
        'Content-type': 'application/x-www-form-urlencoded'      }
      this.axios.post(
        'http://192.168.3.81:8080/jdqd/action/JDQD/biz/event/getArticleList',
        qs.stringify({
          title: '',
          type: '',
          currPage: 1,
          pageSize: 10
        })
      )
        .then((res) => {
          console.log(res.data.data)
          this.tableData = res.data.data.articleList
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleCurrentChange (cpage) {
      this.currpage = cpage
    },
    handleSizeChange (psize) {
      this.pagesize = psize
    }
  }
}
</script>
