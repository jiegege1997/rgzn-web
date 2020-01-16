<template>
  <div @click="linkto">
    <VeLine :data="chartData"
            :extend="chartExtend"
            :settings="chartSettings" />
    <!-- {{ chartdata }} -->
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";

export default {
  name: "chartline",
  components: {
    VeLine
  },
  props: ["chartdata"],
  data () {
    return {

      // chartData: {
      //   columns: ["事件", "2019.1.09", "2019.1.10", "2019.1.11"],
      //   rows: [
      //     {
      //       事件: "20132",
      //       "2019.1.09": 0.32,
      //       "2019.1.10": 0.12,
      //       "2019.1.11": 0.6
      //     },
      //     {
      //       事件: "20131",
      //       "2019.1.09": 0.32,
      //       "2019.1.10": 0.62,
      //       "2019.1.11": 0.6
      //     }
      //   ]
      // },
      chartSettings: {
        xAxisType: "category"
      },
      chartData: this.chartdata,
      chartExtend: {
        series: {
          smooth: false
        }
      }
    };
  },
  beforeMount () {
    this.chartSettings.xAxisType = "category"
  },
  mounted () {
    this.chartSettings.xAxisType = "category"
  },
  created () {
    this.chartSettings.xAxisType = "category"
  },
  methods: {
    linkto () {
      console.log(typeof Object.keys(this.chartData.rows[0])[0]);
      console.log(this.chartData.rows[0]["事件"]);
    }
  }
};
</script>

<style lang="scss" scoped></style>
