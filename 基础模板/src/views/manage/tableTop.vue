<template>
  <div>
    <el-table
      :data="
        tableData.slice(
          (this.currpage - 1) * this.pagesize,
          this.currpage * this.pagesize
        )
      "
      style="width: 100%; min-height:70vh;"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :default-sort="{ prop: 'para_id', order: 'ascending' }"
      border
    >
      <el-table-column type="index" align="center" label="序号" width="60">
      </el-table-column>
      <el-table-column label="主语" prop="translated_title">
        <template slot-scope="{ row }">
          <span>{{ row.event_zy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="谓语" prop="event">
        <template slot-scope="{ row }">
          <span>{{ row.event_wy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宾语" prop="source">
        <template slot-scope="{ row }">
          <span>{{ row.event_by }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" prop="remark" width="200">
        <template slot-scope="{ row }">
          <span>{{ row.create_date }}</span>
          <!-- 2019-12-02 -->
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="source" width="150">
        <template slot-scope="{ row }">
          <el-button size="mini" type="primary" @click="handleEdit(row)">
            详情
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      class="pagination"
      style="float:right;"
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
  name: "tableTop",
  data() {
    return {
      tableData: [],
      pagesize: 10,
      currpage: 1,
      length: 100
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      // this.axios.defaults.headers = {
      //   "Content-type": "application/x-www-form-urlencoded"
      // };
      this.axios
        .post(
          "http://139.9.126.19:8081/jdqd/action/JDQD/biz/eventcurd/queryTableTeventalls"
        )
        .then(res => {
          console.log(res.data.data);
          // this.length = res.data.data.count;
          this.tableData = [...res.data.data];
          this.length = this.tableData.length;
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
      this.$confirm("此操作将永久删除该事件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const id = data.solr_event_id;
          this.axios.defaults.headers = {
            "Content-type": "application/x-www-form-urlencoded"
          };
          this.axios
            .post(
              "http://139.9.126.19:8081/jdqd/action/JDQD/biz/eventcurd/deleteTableTeventall",
              qs.stringify({
                solrEventId: id
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
    },
    handleEdit(data) {
      this.$router.push({
        name: "detailevent",
        query: {
          id: data.solr_event_id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-right: calc(100px - 30px);
}
</style>
