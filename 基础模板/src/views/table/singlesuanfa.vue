<template>
  <div class="app-container">
    <el-button size="small" @click="back" type="primary">返回</el-button>
    <div class="header">{{ title }}</div>
    <div class="headertwo">
      文章来源:{{ source }}&nbsp;&nbsp;&nbsp;&nbsp; 文章日期:{{ articleData }}
    </div>
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
            <tr class="tr-top">
              <td class="td-left">{{ this.$route.query.title }}</td>
              <!-- <td class="td-right">{{ Number(item.score).toFixed(3) }}</td> -->
            </tr>
          </table>

          <!-- <div class="title">相关文章</div> -->
          <!-- <table>
            <tr
              v-for="(item, index) in textData"
              :key="index"
              class="tr-top"
              @click="textClick(index, item)"
            >
              <td>{{ item.translated_title }}</td>
            </tr>
          </table> -->
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
      source: "",
      articleData: "",
      tableData: [],
      keywordsdetailzy: [],
      keywordsdetailwy: [],
      keywordsdetailby: [],
      textData: [],
      isActive: -1,
      resultsList: [{ name: "" }],
      title: "",
      keywordsdetail: [],
      data1: ""
    };
  },
  created() {
    // this.find();
    this.demo();
  },
  methods: {
    textClick(index, item) {
      this.isActive = -1;
      console.log(item.id);
      const id = item.article_id;
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/event/getArticleDetail",
          qs.stringify({
            // type: type,
            articleId: id,
            type: this.$route.query.type
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
    // 高亮
    handleClick(index, item) {
      let id = this.$route.query.id;
      return new Promise((resolve, reject) => {
        this.axios
          .post(
            "/jdqd/action/JDQD/biz/event/getArticleHighLight",
            qs.stringify({
              eventId: this.$route.query.solr_event_id,
              articleId: id
            })
          )
          .then(res => {
            const data = res.data.data;
            this.keywordsdetailzy = data.keywordszy.split(",");
            this.keywordsdetailwy = data.keywordswy.split(",");
            this.keywordsdetailby = data.keywordsby.split(",");
            resolve(data);
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    //对关键词进行变色
    changeColor(resultsList) {
      this.resultsList[0].name = this.data1.content;
      this.keywordsdetailzy.map((item, index) => {
        let keyWords = item;
        resultsList.map((item, index) => {
          if (keyWords && keyWords.length > 0) {
            // 匹配关键字正则
            let replaceReg = new RegExp(keyWords, "g");
            // 高亮替换v-html值
            let replaceString =
              '<span class="search-text">' + keyWords + "</span>";
            resultsList[index].name = item.name.replace(
              replaceReg,
              replaceString
            );
          }
        });
      });
      this.keywordsdetailwy.map((item, index) => {
        let keyWords2 = item;
        resultsList.map((item, index) => {
          if (keyWords2 && keyWords2 > 0) {
            // 匹配关键字正则
            let replaceReg = new RegExp(keyWords2, "g");
            // 高亮替换v-html值
            let replaceString =
              '<span class="search-text1">' + keyWords2 + "</span>";
            resultsList[index].name = item.name.replace(
              replaceReg,
              replaceString
            );
          }
        });
      });
      this.keywordsdetailby.map((item, index) => {
        this.keyWords = item;
        resultsList.map((item, index) => {
          if (this.keyWords && this.keyWords.length > 0) {
            // 匹配关键字正则
            let replaceReg = new RegExp(this.keyWords, "g");
            // 高亮替换v-html值
            let replaceString =
              '<span class="search-text2">' + this.keyWords + "</span>";
            resultsList[index].name = item.name.replace(
              replaceReg,
              replaceString
            );
          }
        });
      });
      this.results = [];
      this.results = resultsList;
    },
    back() {
      this.$router.go(-1);
    },
    // 查看所有数据
    find() {
      console.log(this.$route.query.id);
      const id = this.$route.query.id;
      return new Promise((resolve, reject) => {
        this.axios
          .post(
            "/jdqd/action/JDQD/biz/event/getArticleDetail",
            qs.stringify({
              articleId: id,
              type: this.$route.query.type
            })
          )
          .then(res => {
            console.log(res.data.data);
            const data = res.data.data;
            this.title = data.title;
            this.source = data.source;
            this.articleData = data.create_date;
            this.data1 = data;
            resolve(res.data.data.content);
          })
          .catch(err => {
            this.$message.error(error);
          });
      });
    },
    async demo() {
      var result = await this.find(); // 页面渲染方法 生成右边列表
      // console.log(result);
      this.resultsList[0].name = result;
      var result1 = await this.handleClick(); //点击列表方法获取 关键词
      // console.log(result1);
      this.changeColor(this.resultsList); //对关键词进行变色处理
    },
    findtext() {
      console.log(this.$route.query.id);
      const id = this.$route.query.id;
      let type = this.$route.query.type;
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/event/getSimilarArticleTitle",
          qs.stringify({
            articleId: id
          })
        )
        .then(res => {
          console.log(res.data.data);
          const data = res.data.data;
          data.forEach(item => {
            if (item.translated_title == "") {
              data.shift(item);
            }
          });
          this.textData = data;
          console.log(this.textData);
        })
        .catch(err => {
          this.$message.error(error);
        });
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
.header {
  font-size: 27px;
  text-align: center;
  width: 60vw;
  margin: 0 auto;
}
.right {
  border-left: 1px solid #e1e1e1;
  height: 550px;
}
.headertwo {
  font-size: 15px;
  text-align: center;
  width: 60vw;
  margin: 10px auto;
  /* border: 1px solid red; */
}
.content-left {
  text-indent: 2em;
  letter-spacing: 1px;
  font-size: 16px;
  font-family: Helvetica, Arial, sans-serif;
  line-height: 1.5;
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
}
.tr-top {
  line-height: 2.2;
}
.search-text {
  color: red;
}
.search-text1 {
  color: blue;
}
.search-text2 {
  color: slateblue;
}
</style>
