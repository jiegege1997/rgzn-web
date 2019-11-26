<template>
  <div>
    <headerTop @increase="handleChange" style="margin-left:10px;" />
    <tableTop1 v-if="value == '1'" />
    <tableTop2 v-if="value == '2'" />
    <contentLeft v-if="value == '3'" />
    <echarts v-if="value == '3'" />
  </div>
</template>

<script>
import headerTop from "@/views/people/headerTop";
import tableTop1 from "@/views/people/tableTop1";
import tableTop2 from "@/views/people/tableTop2";
import contentLeft from "@/views/people/contentLeft";
import echarts from "@/views/people/echarts";

export default {
  components: {
    headerTop,
    tableTop1,
    tableTop2,
    contentLeft,
    echarts
  },
  data() {
    return {
      value: "1"
    };
  },

  methods: {
    handleChange: function(value) {
      console.log(value);
      this.value = value;
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
