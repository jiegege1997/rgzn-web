<template>
  <div class="app-container">
    <el-dialog title="文章列表" :visible.sync="dialogVisible" width="60%">
      <el-table
        :data="tableData2"
        border
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style=" width:100%;"
      >
        <el-table-column
          prop="translated_title"
          label="文章标题"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="create_date"
          label="创建日期"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column label="操作" text-align="center" width="86%">
          <template slot-scope="{ row }">
            <el-button size="mini" type="primary" @click="handleEdit(row)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-col :span="6" style="margin-top:10px">
      <el-date-picker
        v-model="findData"
        type="date"
        placeholder="选择日期"
        size="mini"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-button type="primary" @click="handleFind" size="mini">
        搜索
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
      <el-table-column label="相关事件" prop="title">
        <template slot-scope="{ row }">
          <span class="biaoti">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="事件主语" prop="event_zy">
        <template slot-scope="{ row }">
          <span>{{ row.event_zy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="事件谓语" prop="event_wy" width="80%">
        <template slot-scope="{ row }">
          <span>{{ row.event_wy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="事件宾语" prop="event_by">
        <template slot-scope="{ row }">
          <span>{{ row.event_by }}</span>
        </template>
      </el-table-column>
      <el-table-column label="事件时间" prop="create_date" width="100%">
        <template slot-scope="{ row }">
          <span>{{ row.create_date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="符合文章数"
        prop="num"
        width="100%"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" text-align="center" width="86%">
        <template slot-scope="{ row }">
          <el-button size="mini" type="primary" @click="handleEdit2(row)">
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
      dialogVisible: false,
      search: "",
      findData: "",
      showEdit: [], // 显示编辑框
      showBtn: [],
      tableData2: [],
      pagesize: 10,
      currpage: 1,
      value: "success",
      type: this.$store.state.table.type,
      length: 10,
      title: "",
      id: ""
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
    handleEdit2(item) {
      console.log(item);
      this.title = item.title;
      this.id = item.event_id;
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/event/getEventRelateArticleMess",
          qs.stringify({
            solr_event_id: item.event_id
          })
        )
        .then(res => {
          console.log(res.data.data);
          this.dialogVisible = true;
          this.tableData2 = [...res.data.data];
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查看详情
    handleEdit(item) {
      console.log(this.title);
      console.log(this.id);
      this.dialogVisible = false;
      this.$router.push({
        name: "singlesuanfa",
        query: {
          id: item.article_id,
          solr_event_id: this.id,
          title: this.title,
          type: 2
        }
      });
    },
    // 查看所有数据
    find() {
      const type = this.$store.state.table.type;
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/event/getEventArticle",
          qs.stringify({
            currPage: this.currpage,
            pageSize: this.pagesize
          })
        )
        .then(res => {
          this.length = Number(res.data.data.count);
          this.tableData = [...JSON.parse(res.data.data.data)];
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      if (this.findData != "") {
        this.handleFind();
      } else {
        this.find();
      }
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      if (this.findData != "") {
        this.handleFind();
      } else {
        this.find();
      }
    },
    handleFind() {
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/event/getEventArticleByDate",
          qs.stringify({
            create_date: this.findData,
            currPage: this.currpage,
            pageSize: this.pagesize
          })
        )
        .then(res => {
          this.length = Number(res.data.data.count);
          this.tableData = [...JSON.parse(res.data.data.data)];
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
