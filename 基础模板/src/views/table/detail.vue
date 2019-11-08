<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="16">
        <!-- 文章标题 -->
        <div class="header">{{ title }}</div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col
:span="14"
              offset="1"
>
        <!-- 文章内容 -->
        <div
v-for="(item,index) in resultsList"
             :key="index"
             class="content-left"
             v-html="item.name"
>
          {{ item.name }}
        </div>
      </el-col>
      <el-col
:span="8"
              offset="1"
>
        <div class="right">
          <table>
            <tr
v-for=" (item,index) in tableData"
                :key="index"
                class="tr-top"
                @click="handleClick(index,item)"
>
              <td>{{ item.event }}</td>
              <td class="td-right">{{ item.score }}</td>
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
  data() {
    return {
      keyWords: '',
      results: [],
      tableData: [
        // { event: '天气之子', score: '89分' },
        // { event: '你的名字', score: '89分' },
        // { event: '读者', score: '89分' },
        // { event: '影迷', score: '89分' },
        // { event: '日本知名动画导演新海诚', score: '89分' }
      ],
      resultsList: [
        {
          name: ''
        }
      ],
      title: ''
    }
  },
  created() {
    this.find()
  },

  methods: {
    handleClick(index, item) {
      console.log(item.event)
      const id = this.$route.query.id
      this.axios.defaults.headers = {
        'Content-type': 'application/x-www-form-urlencoded' }
      this.axios.post(
        'http://192.168.3.81:8080/jdqd/action/JDQD/biz/event/getArticleHighLight',
        qs.stringify({
          event: item.event,
          articleId: id,
          type: '1'
        })
      )
        .then((res) => {
          console.log(res.data.data)
          const data = res.data.data
          // this.title = data.title
          this.resultsList[0].name = data.content
          // this.tableData = data.eventList
        })
        .catch((err) => {
          console.log(err)
        })
      // this.keyWords = item.event
      // let arr = this.resultsList
      // this.changeColor(arr);
    },
    changeColor(resultsList) {
      resultsList.map((item, index) => {
        // console.log('item', item)
        if (this.keyWords && this.keyWords.length > 0) {
          // 匹配关键字正则
          const replaceReg = new RegExp(this.keyWords, 'g')
          console.log(replaceReg)
          // 高亮替换v-html值
          const replaceString =
            '<span class="search-text">' + this.keyWords + '</span>'
          // '<span >' + this.keyWords + '</span>'
          resultsList[index].name = item.name.replace(
            replaceReg,
            replaceString
          )
        }
      })
      this.results = []
      this.results = resultsList
    },
    // 查看所有数据
    find() {
      console.log(this.$route.query.id)
      const id = this.$route.query.id
      this.axios.defaults.headers = {
        'Content-type': 'application/x-www-form-urlencoded' }
      this.axios.post(
        'http://192.168.3.81:8080/jdqd/action/JDQD/biz/event/getArticleDetail',
        qs.stringify({
          type: '1',
          articleId: id
        })
      )
        .then((res) => {
          console.log(res.data.data)
          const data = res.data.data
          this.title = data.title
          this.resultsList[0].name = data.content
          this.tableData = data.eventList
        })
        .catch((err) => {
          console.log(err)
        })
    }

  }
}
</script>

<style >
.el-row {
  margin-bottom: 20px;
}
.header {
  font-size: 30px;
  text-align: center;
}
.right {
  border-left: 1px solid #e1e1e1;
  height: 480px;
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
