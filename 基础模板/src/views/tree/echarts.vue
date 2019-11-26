<template>
  <div>
    <div id="chart1" ref="chart1"></div>
  </div>
</template>

<script>
export default {
  name: "echartsTop",
  methods: {
    getEchartData1() {
      let myChart = this.$echarts.init(this.$refs.chart1);
      // 绘制图表
      const option = {
        title: {
          text: ""
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 50,
            roam: false, //禁止放大缩小
            label: {
              normal: { show: true } //是否显示标签
            },
            edgeSymbol: ["circle", "arrow"], //箭头
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 19
                }
              }
            },
            data: [
              { name: "养殖户\n抛售生猪多", x: 600, y: 100 },
              { name: "饲料需求\n上升", x: 0, y: -200 },
              { name: "市场供应\n紧", x: 300, y: -200 },
              { name: "减少资金\n亏损", x: 600, y: -200 },
              { name: "销量下滑", x: 900, y: -200 },
              { name: "猪肉出现\n下跌风险", x: 1200, y: -200 },
              { name: "猪瘟", x: 600, y: 350 },
              { name: "玉米价格\n下跌", x: 0, y: 600 },
              { name: "猪价上涨", x: 300, y: 600 },
              { name: "消费者\n减少猪肉\n消费", x: 600, y: 600 },
              { name: "生猪省内\n消化", x: 900, y: 600 },
              { name: "轮猪周期\n天触底", x: 1200, y: 600 }
            ],
            // links: [],
            links: [
              {
                source: "养殖户\n抛售生猪多",
                target: "猪肉出现\n下跌风险",
                // symbolSize: [5, 20],
                label: {
                  normal: {
                    show: true,
                    formatter: "可能造成"
                  }
                }
              },
              {
                source: "养殖户\n抛售生猪多",
                target: "饲料需求\n上升",
                // symbolSize: [5, 20],
                label: {
                  normal: {
                    show: true,
                    formatter: "从而"
                  }
                }
              },
              {
                source: "养殖户\n抛售生猪多",
                target: "市场供应\n紧",
                // symbolSize: [5, 20],
                label: {
                  normal: {
                    show: true,
                    formatter: "导致"
                  }
                }
              },
              {
                source: "养殖户\n抛售生猪多",
                target: "销量下滑",
                // symbolSize: [5, 20],
                label: {
                  normal: {
                    show: true,
                    formatter: "造成"
                  }
                }
              },
              {
                source: "养殖户\n抛售生猪多",
                target: "减少资金\n亏损",
                // symbolSize: [5, 20],
                label: {
                  normal: {
                    show: true,
                    formatter: "为了"
                  }
                }
              },
              {
                source: "猪瘟",
                target: "养殖户\n抛售生猪多",
                // symbolSize: [5, 20],
                label: {
                  normal: {
                    show: true,
                    formatter: "导致"
                  }
                }
              },
              {
                source: "猪瘟",
                target: "猪价上涨",
                label: {
                  normal: {
                    show: true,
                    formatter: "导致"
                  }
                }
              },
              {
                source: "猪瘟",
                target: "玉米价格\n下跌",
                label: {
                  normal: {
                    show: true,
                    formatter: "引起"
                  }
                }
              },
              {
                source: "猪瘟",
                target: "生猪省内\n消化",
                label: {
                  normal: {
                    show: true,
                    formatter: "因为"
                  }
                }
              },
              {
                source: "猪瘟",
                target: "消费者\n减少猪肉\n消费",
                label: {
                  normal: {
                    show: true,
                    formatter: "引起"
                  }
                }
              },
              {
                source: "猪瘟",
                target: "轮猪周期\n天触底",
                label: {
                  normal: {
                    show: true,
                    formatter: "导致"
                  }
                }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
#chart1 {
  height: 550px;
  width: 1000px;
  // border: 1px solid red;
  // margin-left: 40px;
}
</style>
