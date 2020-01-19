<template>
  <div class="app-container">
    <el-button @click="cancel"
               size="small"
               type="primary">
      返回
    </el-button>
    <div class="left">
      <h4 class="handletitle">预测数据集日期</h4>
      <div class="title">
        <div class="title-time">
          {{ this.start_date }} -- {{ this.end_date }}
        </div>
      </div>
      <h4 class="handletitle">预测结果</h4>
      <div style="margin-top:20px">
        <div class="detailchart">
          <!-- <chartline :chartdata="chartdata" /> -->
          <VeLine :data="chartdata"
                  :extend="chartExtend"
                  :settings="chartSettings" />
        </div>
        <div class="detailbutton">
          <el-button size="small"
                     type="primary"
                     @click="handleClick">
            查看详情
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import chartline from "@/views/nested/menu2/components/chartline";
import VeLine from "v-charts/lib/line.common";

export default {
  components: {
    // chartline
    VeLine
  },
  data () {
    this.chartSettings = {
      xAxisType: "category"
    };
    return {
      chartdata: {
        columns: [],
        rows: []
      },
      chartExtend: {
        series: {
          type: "line",
          smooth: false
        }
      },
      start_date: {},
      end_date: {},
      dataArr: []
    };
  },
  mounted () {
    this.getData();
  },
  methods: {
    cancel () {
      this.$router.go(-1);
    },
    //查看详情
    handleClick () {
      this.$router.push({
        name: "modelDetail",
        query: {
          forecastDate: this.start_date,
          taskId: this.$route.query.taskId,
          dataArr: JSON.stringify(this.dataArr)
        }
      });
    },
    getData () {
      console.log(this.$route.query.taskId);
      this.axios
        .post(
          "/jdqd/action/JDQD/biz/eventpredict/getEventPredictResultByTask",
          qs.stringify({
            // taskId: item.model_id
            taskId: this.$route.query.taskId
          })
        )
        .then(res => {
          console.log(res.data.data);
          let testdata = res.data.data;
          this.start_date = testdata.start_date;
          this.end_date = testdata.end_date;
          this.dataArr = testdata.forecastDateList;
          this.chartdata.columns = ["事件"];
          testdata.forecastDateList.forEach(item => {
            this.chartdata.columns.push(item.forecast_date);
          });
          let test = testdata.taskList;
          this.chartdata.rows = [];
          let dataArr = []; //对数据分组处理过的数组
          test.map(mapItem => {
            if (dataArr.length == 0) {
              dataArr.push({ event_name: mapItem.event_name, List: [mapItem] });
            } else {
              let res = dataArr.some(item => {
                //判断相同日期，有就添加到当前项
                if (item.event_name == mapItem.event_name) {
                  item.List.push(mapItem);
                  return true;
                }
              });
              if (!res) {
                //如果没找相同日期添加一个新对象
                dataArr.push({
                  event_name: mapItem.event_name,
                  List: [mapItem]
                });
              }
            }
          });
          // console.log(dataArr);
          let resultArr = [];
          for (let i = 0; i < dataArr.length; i++) {
            let obj = {};
            dataArr[i].List.forEach(item => {
              obj["事件"] = item.event_name;
              obj[item.forecast_date] = parseFloat(item.probability);
            });
            resultArr.push(obj);
          }
          // console.log(resultArr);
          this.chartdata.rows = resultArr;
          // console.log(this.chartdata);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
.ruzhu-mess .el-form-item__label {
  font-family: Microsoft YaHei !important;
}
</style>

<style scoped>
.left {
  width: 95%;
  position: relative;
  margin-top: 20px;
  height: 80%;
}
.handletitle {
  margin-top: 0;
  margin-bottom: 20px;
  padding-left: 10px;
  line-height: 20px;
  border-left: 8px solid #3080fe;
  font-weight: 400;
  font-size: 16;
  font-family: Microsoft YaHei;
}
.title {
  margin-top: 20px;
  height: 15vh;
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title-time {
  font-size: 25px;
}
.detailchart {
  /* border: 1px solid red; */
  position: relative;
}
.detailbutton {
  /* border: 1px solid red; */
  position: absolute;
  margin-top: -400px;
  margin-left: 75vw;
}
</style>
