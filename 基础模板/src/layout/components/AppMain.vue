<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <!-- <div> -->
    <keep-alive>
      <router-view :key="key" v-if="this.$route.meta.keepAlive" />
    </keep-alive>
    <router-view :key="key" v-if="!this.$route.meta.keepAlive" />

    <!-- </transition> -->
  </section>
</template>

<script>
import { mount } from "@vue/test-utils";
export default {
  name: "AppMain",
  created() {
    // this.axios.defaults.headers.post["Content-Type"] =
    //   "application/x-www-form-urlencoded";
  },
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
