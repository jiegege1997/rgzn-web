<template>
  <div class="app-container">
    <el-button size="small" type="primary" @click="back">返回</el-button>
    <div class="header">{{ title }}</div>
    <el-row :gutter="20">
      <el-col :span="16"> </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="14" :offset="1">
        <!-- 文章内容 -->
        <div
          v-for="(item, index) in resultsList"
          :key="index"
          class="content-left"
          v-html="item.name"
        >
          {{ item.name }}
        </div>
      </el-col>
      <el-col :span="8" :offset="1">
        <div class="right">
          <div class="title">相关事件</div>
          <table>
            <tr
              v-for="(item, index) in tableData"
              :key="index"
              class="tr-top"
              @click="handleClick(index, item)"
              :class="isActive == index ? 'active' : ''"
            >
              <td class="td-left">{{ item.event }}</td>
              <td class="td-right">{{ Number(item.score).toFixed(3) }}</td>
            </tr>
          </table>

          <div class="title">相关文章</div>
          <table>
            <tr
              v-for="(item, index) in textData"
              :key="index"
              class="tr-top"
              @click="textClick(index, item)"
            >
              <td>{{ item.translated_title }}</td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "Syspara",
  data() {
    return {
      keyWords: "",
      results: [],
      tableData: [],
      textData: [],
      isActive: -1,
      resultsList: [{ name: "" }],
      someList: [],
      title: ""
    };
  },
  created() {
    this.find();
    this.findtext();
  },

  methods: {
    textClick(index, item) {
      console.log(item.article_id);
      // console.log(this.$route.query.id)
      const id = item.article_id;
      let type = this.$route.query.type;
      this.axios.defaults.headers = {
        "Content-type": "application/x-www-form-urlencoded"
      };
      this.axios
        .post(
          "http://139.9.126.19:8081/jdqd/action/JDQD/biz/event/getArticleDetail",
          qs.stringify({
            type: type,
            articleId: id
          })
        )
        .then(res => {
          console.log(res.data.data);
          const data = res.data.data;
          this.title = data.title;
          this.resultsList[0].name = data.content;
          this.tableData = data.eventList.slice(0, 5);
          console.log(this.tableData);
        })
        .catch(err => {
          this.$message.error(error);
        });
    },
    handleClick(index, item) {
      console.log(this.$route.query.type);
      console.log(index);
      this.isActive = index;
      let id = this.$route.query.id;
      let type = this.$route.query.type;
      this.axios.defaults.headers = {
        "Content-type": "application/x-www-form-urlencoded"
      };
      this.axios
        .post(
          "http://139.9.126.19:8081/jdqd/action/JDQD/biz/event/getArticleHighLight",
          qs.stringify({
            eventId: item.solr_event_id,
            articleId: id,
            type: type
          })
        )
        .then(res => {
          console.log(res.data.data);
          const data = res.data.data;
          this.resultsList[0].name = data.content;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeColor(resultsList) {
      resultsList.map((item, index) => {
        // console.log('item', item)
        if (this.keyWords && this.keyWords.length > 0) {
          // 匹配关键字正则
          const replaceReg = new RegExp(this.keyWords, "g");
          console.log(replaceReg);
          // 高亮替换v-html值
          const replaceString =
            '<span class="search-text">' + this.keyWords + "</span>";
          // '<span >' + this.keyWords + '</span>'
          resultsList[index].name = item.name.replace(
            replaceReg,
            replaceString
          );
        }
      });
      this.results = [];
      this.results = resultsList;
    },
    // 查看所有数据
    find() {
      console.log(this.$route.query.id);
      const id = this.$route.query.id;
      let type = this.$route.query.type;
      this.axios.defaults.headers = {
        "Content-type": "application/x-www-form-urlencoded"
      };
      this.axios
        .post(
          "http://139.9.126.19:8081/jdqd/action/JDQD/biz/event/getArticleDetail",
          qs.stringify({
            type: type,
            articleId: id
          })
        )
        .then(res => {
          console.log(res.data.data);
          const data = res.data.data;
          this.title = data.title;
          this.resultsList[0].name = data.content;
          this.tableData = data.eventList.slice(0, 5);
          this.someList = data.contentSummary;
          console.log(this.tableData);
        })
        .catch(err => {
          this.$message.error(error);
        });
    },
    findtext() {
      console.log(this.$route.query.id);
      const id = this.$route.query.id;
      let type = this.$route.query.type;
      this.axios.defaults.headers = {
        "Content-type": "application/x-www-form-urlencoded"
      };
      this.axios
        .post(
          "http://139.9.126.19:8081/jdqd/action/JDQD/biz/event/getSimilarArticleTitle",
          qs.stringify({
            articleId: id
          })
        )
        .then(res => {
          const data = res.data.data;
          console.log(data);
          data.forEach(item => {
            if (item.translated_title == "") {
              data.shift(item);
            }
          });
          console.log(data);
          this.textData = data;
          console.log(this.textData);
          // console.log(this.tableData)
        })
        .catch(err => {
          // this.$message.error(err);
        });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.active {
  background-color: antiquewhite;
}
.title {
  color: #333;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 14px;
  line-height: 1.29;
  font-weight: 700;
}
/* 标题 */
.header {
  font-size: 27px;
  text-align: center;
  width: 60vw;
  margin: 0 auto;
}
/* 内容 */
.content-left {
  text-indent: 2em;
  letter-spacing: 1px;
  font-size: 16px;
  font-family: "Microsoft YaHei";
  line-height: 1.9;
}
.header2 {
  margin-top: 10px;
  color: #666;
  font-size: 13px;
  text-align: left;
  margin-left: 20px;
}
.right {
  border-left: 1px solid #e1e1e1;
  height: 600px;
}

.right td {
  border-bottom: 1px solid #f3f3f3;
}
.right table {
  border-collapse: collapse;
  border-spacing: 0;
  margin-left: 20px;
}
.td-right {
  padding-left: 60px;
  color: rgb(51, 51, 51);
}
.tr-top {
  line-height: 2.2;
  font-size: 13px;
  color: rgb(0, 47, 217);
}
.search-text {
  color: red;
}
</style>
