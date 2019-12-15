<template>
  <div class="app-container">
    <el-col :span="6" style="margin-top:10px">
      <el-input
        v-model="findData"
        placeholder="请输入表单标题"
        size="mini"
        prefix-icon="el-icon-search"
      >
        <template slot="append">
          <el-button type="primary" @click="handleSearch">
            搜索
          </el-button>
        </template>
      </el-input>
    </el-col>
    <el-col :span="6" style="margin-left:20px;margin-top:10px">
      <el-button type="primary" size="mini" @click="handleClone">
        数据备份
      </el-button>
    </el-col>
    <el-table
      :data="tableData"
      style=" width: 100%;margin-top:60px"
      :height="tableHeight"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :default-sort="{ prop: 'para_id', order: 'ascending' }"
      border
    >
      <el-table-column label="序号" type="index" width="60" align="center" />
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
          <el-button size="mini" type="primary" @click="handleEdit(row)">
            详情
          </el-button>
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

export default {
  data() {
    return {
      tableHeight: window.innerHeight - 180,
      screenHeight: window.innerHeight,
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
  watch: {
    screenHeight(val) {
      this.screenHeight = val;
      this.tableHeight = this.screenHeight - 180;
    }
  },
  created() {
    this.find();
    window.onresize = () => {
      return (() => {
        window.screenHeight = window.innerHeight;
        this.screenHeight = window.screenHeight;
      })();
    };
  },
  computed: {},
  methods: {
    handleEdit(item) {
      this.$router.push({
        name: "suanfa",
        query: {
          id: item.article_id,
          type:1
        }
      });
    },
    // 查看所有数据
    find() {
      const type = this.$store.state.table.type;
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/event/getArticleList",
          qs.stringify({
            title: this.findData,
            // type: type,
            currPage: this.currpage,
            pageSize: this.pagesize
          })
        )
        .then(res => {
          // console.log(res.data.data);
          this.length = res.data.data.count;
          this.tableData = [...res.data.data.articleList];
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      this.find();
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.find();
    },
    handleSearch() {
      this.find();
    },
    handleClone() {
      this.axios
        .post("/jdqd/action/JDQD/biz/eventcurd/generateInsertSqlDemo")
        .then(res => {
          this.$message({
            showClose: true,
            message:
              "数据备份成功,存放在/hyren/python/app/qingdao/forecast/insertSql.txt中",
            type: "success",
            duration: 0
          });
        })
        .catch(err => {
          console.log(err);
        });
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
