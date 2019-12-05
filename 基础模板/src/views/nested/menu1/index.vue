<template>
  <div class="app-container">
    <el-col :span="6" style="margin-top: 20px;margin-bottom:20px;">
      <el-button @click="handleCreate()" type="primary">
        创建模型
      </el-button>
    </el-col>
    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      height="500px"
      :default-sort="{ prop: 'para_id', order: 'ascending' }"
      border
    >
      <el-table-column label="#" type="index" />
      <el-table-column label="模型名称" prop="translated_title">
        <template slot-scope="{ row }">
          <span>{{ row.model_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预测天数" prop="event">
        <template slot-scope="{ row }">
          <span>{{ row.days }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="url">
        <template slot-scope="{ row }">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160%" text-align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            v-if="!showBtn[$index]"
            size="mini"
            type="primary"
            @click="handleEdit(row)"
            >详情
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="float:right"
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="tableData.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import qs from "qs";

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
      // list: null,
      // listLoading: true
      tableData: [],
      dialogFormVisible: false,
      search: "",
      findData: "",
      showEdit: [], // 显示编辑框
      showBtn: [],
      pagesize: 10,
      currpage: 1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //根据模型编号获取模型训练的信息
    handleEdit(item) {
      console.log(item);
      // this.$router.push({
      //   name: "details",
      //   query: {
      //     id: item.article_id
      //   }
      // });
      this.axios.defaults.headers = {
        "Content-type": "application/x-www-form-urlencoded"
      };
      this.axios
        .post(
          "http://192.168.3.139:8080/jdqd/action/JDQD/biz/modeltrain/getModelTrainInfoById",
          qs.stringify({
            modelId: item.model_id
          })
        )
        .then(res => {
          console.log(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCreate() {
      this.$router.push({
        name: "creates"
      });
    },
    // 查看所有数据
    getData() {
      this.axios.defaults.headers = {
        "Content-type": "application/x-www-form-urlencoded"
      };
      this.axios
        .post(
          "http://192.168.3.139:8080/jdqd/action/JDQD/biz/modeltrain/getModelTrainInfo",
          qs.stringify({
            currPage: 1,
            pageSize: 10
          })
        )
        .then(res => {
          console.log(res.data.data);
          this.tableData = [...res.data.data];
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    handleDelete(data) {
      console.log(data);
      this.$confirm("此操作将永久删除该事件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const id = data.model_id;
          this.axios.defaults.headers = {
            "Content-type": "application/x-www-form-urlencoded"
          };
          this.axios
            .post(
              "http://192.168.3.139:8080/jdqd/action/JDQD/biz/modeltrain/deleteModelInfoById",
              qs.stringify({
                modelId: id
              })
            )
            .then(res => {
              console.log(res);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getData();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
