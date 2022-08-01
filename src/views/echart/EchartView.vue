<template>
  <div class="detail-container">
    <CardList></CardList>
    <div class="box">
      <EchartOne></EchartOne>
      <EchartTwo></EchartTwo>
    </div>
  </div>
</template>
<script>
import CardList from "./CardList";
import EchartOne from "./EchartOne";
import EchartTwo from "./EchartTwo";
export default {
  components: {
    CardList,
    EchartOne,
    EchartTwo,
  },
};
</script>
<style lang="less" scoped>
.box {
  display: flex;
  margin-top: 30px;
}
</style>
