<template>
  <div class="app-container">
    <el-col :span="6">
      <el-button @click="handleCreate()" type="primary">
        创建模型
      </el-button>
    </el-col>
    <el-table
      :data="tableData"
      style=" width: 100%; margin-top:60px"
      :height="tableHeight"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :default-sort="{ prop: 'para_id', order: 'ascending' }"
      border
    >
      <el-table-column label="序号" type="index" width="60" align="center" />
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
          <span>{{
            row.status == "1 "
              ? "训练中"
              : row.status == "2 "
              ? "已完成"
              : "已失败"
          }}</span>
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
      currpage: 1
    };
  },
  created() {
    this.getData();
    window.onresize = () => {
      return (() => {
        window.screenHeight = window.innerHeight;
        this.screenHeight = window.screenHeight;
      })();
    };
  },
  watch: {
    screenHeight(val) {
      this.screenHeight = val;
      this.tableHeight = this.screenHeight - 180;
    }
  },
  methods: {
    //根据模型编号获取模型训练的信息
    handleEdit(item) {
      console.log(item);
      this.$router.push({
        name: "nestdetail",
        query: {
          id: item.model_id
        }
      });
    },
    handleCreate() {
      this.$router.push({
        name: "creates"
      });
    },
    // 查看所有数据
    getData() {
      this.axios
        .post(
          "http://139.9.126.19:8081/jdqd/action/JDQD/biz/modeltrain/getModelTrainInfo",
          qs.stringify({
            currPage: this.currpage,
            pageSize: this.pagesize
          })
        )
        .then(res => {
          console.log(res.data.data);
          this.tableData = [...res.data.data.data];
          this.tableData.length = res.data.data.totalSize;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      this.getData();
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.getData();
    },
    handleDelete(data) {
      console.log(data);
      this.$confirm("此操作将永久删除该模型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const id = data.model_id;
          this.axios
            .post(
              "http://139.9.126.19:8081/jdqd/action/JDQD/biz/modeltrain/deleteModelInfoById",
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
