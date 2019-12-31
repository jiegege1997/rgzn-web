<template>
  <div>
    <VeLine :data="chartData" />
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";

export default {
  name: "chartline",
  components: {
    VeLine
  },
  data() {
    return {
      chartData: {
        columns: ["日期", "第一天", "第二天", "第三天", "第四天"],
        rows: [
          {
            日期: "事件A",
            第一天: 0.32,
            第二天: 0.12,
            第三天: 0.32,
            第四天: 0.5
          },
          {
            日期: "事件B",
            第一天: 0.32,
            第二天: 0.62,
            第三天: 0.26,
            第四天: 0.5
          },
          {
            日期: "事件C",
            第一天: 0.42,
            第二天: 0.82,
            第三天: 0.76,
            第四天: 0.5
          },
          {
            日期: "事件D",
            第一天: 0.22,
            第二天: 0.92,
            第三天: 0.49,
            第四天: 0.5
          },
          {
            日期: "事件E",
            第一天: 0.32,
            第二天: 0.32,
            第三天: 0.323,
            第三天: 0.5
          },
          {
            日期: "事件F",
            第一天: 0.12,
            第二天: 0.32,
            第三天: 0.08,
            第三天: 0.5
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
