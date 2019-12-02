<template>
  <div>
    <div class="wrapper">
      <div class="item">原因</div>
      <div class="item">货币超发</div>
      <div class="item">结果</div>
      <div class="item">房价的快速上涨</div>
      <div class="item">上下文</div>
      <div id="content">
        我国的货币一直在以远超GDP增速的速度超发，长期来看，货币贬值速度会超过房产贬值速度。但是如果以2018年为起点，今天100万元的房产和100万元的存款做对比，可能是100万元存款10年后更值钱。
        日本曾经经历过房产泡沫破灭，东京一套公寓曾经高达18亿日元的售价，30年后同一栋楼同一户型出售价格只有1.8亿日元，仅为当年的十分之一。香港也曾经历过楼市暴跌，短短几年间打造出超过十万个负资产家庭。虽然通过减少供给、以低利率刺激房产投机和引进外来人口购房成功使得房价成为银河系最贵。100万元存款，按照当前稳妥保本的4.2%收益率来计算，10年后本息总和151.8万元。
        如今100万元的房子，不过是三线城市一套大户型毛坯房的价格，或者一套普通的三居室装修过后的价格，十年后真的就能值150万元吗？小小金融小编认为不能。在过去的二十年，卖地收入40万亿，房地产成了货币超发的泄洪池。居民收入虽然大幅增长，但是就购买力而言，并没有显著提升，因为收入增长的速度比不上货币贬值的速度。
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
  width: 20vw;
  height: 55vh;
  float: right;
  text-align: center;
  margin-right: 80px;
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
  overflow: auto;
}
</style>
