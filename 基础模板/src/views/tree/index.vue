<template>
  <div>
    <headerTop @increase="handleChange" style="margin-left:10px;" />
    <tableTop v-if="value == '1'" />
    <contentLeft v-if="value == '2'" />
    <echartsTop v-if="value == '2'" style="margin-left:20px;" ref="child" />
  </div>
</template>

<script>
import headerTop from "@/views/tree/headerTop";
import tableTop from "@/views/tree/tableTop";
import contentLeft from "@/views/tree/contentLeft";
import echartsTop from "@/views/tree/echarts";
export default {
  components: {
    headerTop,
    tableTop,
    contentLeft,
    echartsTop
  },
  data() {
    return {
      value: "1"
    };
  },
  methods: {
    handleChange: function(value) {
      this.value = value;
      if ((value = "2")) {
        this.$nextTick(function() {
          console.log(this.$refs.child);
          this.$refs.child.getEchartData1();
        });
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
