<template>
  <div>
    <div class="wrapper">
      <div class="item">原因</div>
      <div class="item">货币超发</div>
      <div class="item">结果</div>
      <div class="item">房价的快速上涨</div>
      <div class="item">上下文</div>
      <div id="content">
        时空旅行者那可怜的你是溃烂了你考虑哪些那看来只能看着那可怜的您看楼主你新年快乐你看到了你是快乐你考虑下只能那看来你现在看来你看到了你是快乐呢向南扩张那可怜的你看这里
        时空旅行者那可怜的你是溃烂了你考虑哪些那看来只能看着那可怜的您看楼
        时空旅行者那可怜的你是溃烂了你考虑哪些那看来只能看着那可怜的您看楼
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "contentLeft"
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 320px;
  height: 400px;
  float: right;
  text-align: center;
  margin-right: 100px;
  border: 1px solid rgba(80, 80, 80, 0.4);
  margin-top: 100px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 30px 50px 30px 50px 30px 210px;
}
.item {
  text-align: center;
  color: rgb(80, 80, 80);
}
.item:nth-child(2n-1) {
  background: rgb(237, 237, 237);
  line-height: 30px;
  font-weight: bold;
}
.item:nth-of-type(2n) {
  font-size: 13px;
  line-height: 50px;
  font-family: "Microsoft YaHei";
}
#content {
  padding: 10px;
  text-indent: 2em; //首段缩进
  letter-spacing: 0.5px;
  font-size: 13px;
  font-family: "Microsoft YaHei";
  line-height: 1.5;
  font-weight: 5px;
}
</style>
