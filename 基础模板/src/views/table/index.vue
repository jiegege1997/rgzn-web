<template>
  <div class="app-container">
    <!-- 搜索框 -->
    <el-col :span="6" style="margin-top: 20px;margin-bottom:20px;">
      <el-input v-model="findData" placeholder="请输入表单标题" size="mini">
        <template slot="append">
          <el-button @click="handleSearch">
            搜索
          </el-button>
        </template>
      </el-input>
    </el-col>
    <!-- 按钮组 -->
    <el-col
      :span="6"
      style="margin-top: 20px;margin-bottom:20px; margin-left:20px;"
    >
      <el-button size="mini" @click="find1" :class="type == 1 ? 'active' : ''">
        方式一
      </el-button>
      <el-button size="mini" @click="find2" :class="type == 2 ? 'active' : ''">
        方式二
      </el-button>
    </el-col>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      height="570px"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :default-sort="{ prop: 'para_id', order: 'ascending' }"
      border
    >
      <el-table-column label="#" type="index" width="40%" />
      <el-table-column label="标题" prop="translated_title">
        <template slot-scope="{ row }">
          <span class="biaoti">{{ row.translated_title }}</span>
          <br />
          <span class="zhaiyao">{{ row.contentSummary[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="相关事件" prop="event">
        <template slot-scope="{ row }">
          <span v-for="(item2, index) in row.event" :key="index">
            事件{{ index + 1 }}:{{ item2.event }}
            <br />
          </span>
        </template>
      </el-table-column>
      <el-table-column label="网站名称" prop="source" width="100%">
        <template slot-scope="{ row }">
          <span>{{ row.source }}</span>
        </template>
      </el-table-column>
      <el-table-column label="爬取日期" prop="remark" width="100%">
        <template slot-scope="{ row }">
          <span>{{ row.spider_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" text-align="center" width="86%">
        <template slot-scope="{ row }">
          <el-button size="mini" type="primary" @click="handleEdit(row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      style="float:right"
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="this.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import qs from "qs";
// import { getTable } from '@/api/getTable'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      search: "",
      findData: "",
      showEdit: [], // 显示编辑框
      showBtn: [],
      pagesize: 10,
      currpage: 1,
      value: "success",
      type: this.$store.state.table.type,
      length: 10
    };
  },
  created() {
    this.find();
    console.log(document.documentElement.offsetWidth);
    console.log(document.body.offsetWidth);
    console.log(document.documentElement.clientWidth);
  },
  computed: {},
  methods: {
    handleSearch() {
      // console.log(this.findData)
      this.find();
    },
    handleEdit(item) {
      // console.log(item)
      if (this.type == "1") {
        this.$router.push({
          name: "details",
          query: {
            id: item.article_id,
            type: this.type
          }
        });
      } else {
        this.$router.push({
          name: "suanfa",
          query: {
            id: item.article_id,
            type: this.type
          }
        });
      }
    },
    // 查看所有数据
    find() {
      const type = this.$store.state.table.type;
      this.axios.defaults.headers = {
        "Content-type": "application/x-www-form-urlencoded"
      };
      this.axios
        .post(
          "http://139.9.126.19:8081/jdqd/action/JDQD/biz/event/getArticleList",
          qs.stringify({
            title: this.findData,
            type: type,
            currPage: this.currpage,
            pageSize: this.pagesize
          })
        )
        .then(res => {
          console.log(res.data.data);
          this.length = res.data.data.count;
          this.tableData = res.data.data.articleList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    find1() {
      this.type = "1";
      this.$store.dispatch("changeType", this.type);
      this.find();
    },
    find2() {
      this.type = "2";
      this.$store.dispatch("changeType", this.type);
      this.find();
    },
    find3() {
      // this.type = '3'
      console.log(localStorage);
      // this.$store.dispatch('changeType', this.type)
      // this.find()
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      this.find();
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.find();
    }
  }
};
</script>

<style scoped>
.zhaiyao {
  color: #666;
  font-size: 10px;
}
.biaoti {
  font-weight: bold;
}
.active {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
</style>
