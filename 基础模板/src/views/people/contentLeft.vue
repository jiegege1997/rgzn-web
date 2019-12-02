<template>
  <div>
    <div class="wrapper">
      <div class="item">原因</div>
      <div class="item">维护发达国家利益</div>
      <div class="item">结果</div>
      <div class="item">将继续坚持“最后声明”</div>
      <div class="item">上下文</div>
      <div id="content">
        不管怎么样，各方在付出九牛二虎之力后，就一份共同性少得可怜的联合声明达成共识。大家一度认为峰会最起码保住了西方的脸面。谁曾想（其实应该能想到），文件墨迹未干，川普这位任性的美国总统便从“空军一号”上投下一颗“推特”炸弹，把本次峰会的“仅存果实”炸了个稀巴烂。

        “我已责成美国代表不要在联合声明上签字。”不仅如此，他还加上一码：“我们将要看看是否对充斥美国市场的那些汽车增税。”

        如此对待自己的盟友，这在七国集团四十年的历史上可谓前所未有。可川普似乎还不过瘾，干脆直接对主办人进行人身攻击：“特鲁多总理在峰会上表现得温顺亲和，但我刚走他就对记者说‘美国的关税有点侮辱人，我不会任人摆布’，他（特鲁多）非常不诚实，非常软弱。”

        特鲁多的确在会后对记者提到，加拿大将从7月1日起对美国产品作同等量增税，作为美国此前钢铝税的反制措施，因为峰会前各方为消弭贸易争执所作的努力均告失败，峰会上大家也并没有就解决冲突达成实质性共识。特鲁多的反应实属正常，但川普却是个对异议声超级敏感的人。
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
  overflow: auto;
}
</style>
