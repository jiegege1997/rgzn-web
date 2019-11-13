<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="16">
        <!-- 文章标题 -->
        <div class="header"
             v-html="title">{{ title }}</div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="14"
              offset="1">
        <!-- 文章内容 -->
        <div v-for="(item,index) in resultsList"
             :key="index"
             class="content-left"
             v-html="item.name">
          {{ item.name }}
        </div>
      </el-col>
      <el-col :span="8"
              offset="1">
        <div class="right">
          <div class="title">相关事件</div>
          <table>
            <tr v-for=" (item,index) in tableData"
                :key="index"
                class="tr-top"
                @click="handleClick(index,item)"
                :class="isActive == index ? 'active':''">
              <td>{{ item.event }}</td>
              <td class="td-right">{{ Number(item.score).toFixed(3) }}</td>
            </tr>
          </table>
          <div class="title">相关文章</div>
          <table>
            <tr v-for=" (item,index) in textData"
                :key="index"
                class="tr-top"
                @click="textClick(index,item)">
              <!-- :class="isActive == index ? 'active':''" -->
              <td>{{ item.translated_title }}</td>
              <!-- <td class="td-right">{{ Number(item.score).toFixed(3) }}</td> -->
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'Syspara',
  data () {
    return {
      keyWords: '首尔',
      results: [],
      tableData: [

      ],
      textData: [],
      isActive: -1,
      resultsList: [{ name: '' }],
      title: '',
      keywordsdetail: [],
      data1: '',
    }
  },
  created () {
    this.find()
    this.findtext()
  },

  methods: {
    textClick (index, item) {
      this.isActive = -1
      console.log(item.id)
      // console.log(this.$route.query.id)
      const id = item.article_id
      let type = this.$route.query.type
      this.axios.defaults.headers = {
        'Content-type': 'application/x-www-form-urlencoded'      }
      this.axios.post(
        'http://139.9.126.19:8081/jdqd/action/JDQD/biz/event/getArticleDetail',
        qs.stringify({
          type: type,
          articleId: id
        })
      )
        .then((res) => {
          console.log(res.data.data)
          const data = res.data.data
          this.title = data.title
          this.resultsList[0].name = data.content
          this.tableData = data.eventList.slice(0, 5)
          console.log(this.tableData)
        })
        .catch((err) => {
          this.$message.error(error);
        })
    },
    handleClick (index, item) {
      this.isActive = index;
      // console.log(item)
      let id = this.$route.query.id
      let type = this.$route.query.type
      this.axios.defaults.headers = {
        'Content-type': 'application/x-www-form-urlencoded'      }
      this.axios.post(
        'http://139.9.126.19:8081/jdqd/action/JDQD/biz/event/getArticleHighLight',
        qs.stringify({
          eventId: item.algorithm_event_id,
          articleId: id,
          type: type
        })
      )
        .then((res) => {
          // console.log(res.data.data)
          const data = res.data.data
          // console.log(data.keywords)
          this.keywordsdetail = data.keywords.split(",")
          console.log(this.keywordsdetail)
          let arr = this.keywordsdetail
          console.log(arr)
          this.changeColor(this.resultsList);
        })
        .catch((err) => {
          console.log(err)
        })
      // this.changeColor(arr);
    },
    changeColor (resultsList) {
      this.resultsList[0].name = this.data1.content
      this.keywordsdetail.map((item, index) => {
        this.keyWords = item
        resultsList.map((item, index) => {
          // console.log('item', item)
          if (this.keyWords && this.keyWords.length > 0) {
            // 匹配关键字正则
            let replaceReg = new RegExp(this.keyWords, 'g')
            // 高亮替换v-html值
            let replaceString =
              '<span class="search-text">' + this.keyWords + '</span>'
            resultsList[index].name = item.name.replace(
              replaceReg,
              replaceString
            )
          }
        })
      })
      this.results = []
      this.results = resultsList
    },
    // 查看所有数据
    find () {
      console.log(this.$route.query.id)
      const id = this.$route.query.id
      let type = this.$route.query.type
      this.axios.defaults.headers = {
        'Content-type': 'application/x-www-form-urlencoded'      }
      this.axios.post(
        'http://139.9.126.19:8081/jdqd/action/JDQD/biz/event/getArticleDetail',
        qs.stringify({
          type: type,
          articleId: id
        })
      )
        .then((res) => {
          console.log(res.data.data)
          const data = res.data.data
          this.title = data.title
          this.data1 = data
          this.resultsList[0].name = data.content
          this.tableData = data.eventList.slice(0, 5)
        })
        .catch((err) => {
          this.$message.error(error);
        })
    },
    findtext () {
      console.log(this.$route.query.id)
      const id = this.$route.query.id
      let type = this.$route.query.type
      this.axios.defaults.headers = {
        'Content-type': 'application/x-www-form-urlencoded'      }
      this.axios.post(
        'http://139.9.126.19:8081/jdqd/action/JDQD/biz/event/getSimilarArticleTitle',
        qs.stringify({
          articleId: id
        })
      )
        .then((res) => {
          console.log(res.data.data)
          const data = res.data.data
          // this.title = data.title
          // this.resultsList[0].name = data.content
          // this.tableData = data.eventList.slice(0, 5)
          this.textData = data
          console.log(this.textData)
          // console.log(this.tableData)
        })
        .catch((err) => {
          this.$message.error(error);
        })
    }
  }
}
</script>

<style >
.el-row {
  margin-bottom: 20px;
}
.active {
  background-color: antiquewhite;

  /* background-color: #1e82d2; */
  /* font-weight: bolder; */
}
.title {
  color: #333;
  margin-left: 20px;
  font-size: 16px;
  line-height: 1.29;
  font-weight: 700;
}
.header {
  font-size: 30px;
  text-align: center;
}
.right {
  border-left: 1px solid #e1e1e1;
  height: 550px;
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
</style>
