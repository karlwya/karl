<template>
  <div class="card-container">
    <div class="card">
      <el-card class="box-card">
        <div class="text">
          <p>用户统计<el-badge value="100" class="item"><el-button size="small">评论</el-button></el-badge></p>
          <p>100</p>
          <p>当前总用户数量（人）：3000</p>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text">
          <p>商品统计<el-badge value="1000" class="item"><el-button size="small">评论</el-button></el-badge></p>
          <p>1000</p>
          <p>当前总商品数量（件）：3000</p>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text">
          <p>订单统计<el-badge value="1000" class="item"><el-button size="small">评论</el-button></el-badge></p>
          <p>1000</p>
          <p>当前总订单数量（个）：3000</p>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text">
          <p>销售统计<el-badge value="1000" class="item"><el-button size="small">评论</el-button></el-badge></p>
          <p>1000</p>
          <p>当前总销售额（万）：3000</p>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.card-container {
//   background: springgreen;
  height: 100%;
  padding: 20px;
  .card {
    display: flex;
    justify-content: left;
    align-items: center;
    .box-card {
      padding: 10px;
      width: 240px;
      margin-left: 20px;
      border-radius: 10px;
      color: #fff;
      &:nth-child(1) {
        background: #409eff;
      }
      &:nth-child(2) {
        background: #e6a23c;
      }
      &:nth-child(3) {
        background: #67c23a;
      }
      &:nth-child(4) {
        background: #c0c4cc;
      }
    }
  }
}

.text p {
  line-height: 30px;
  &:nth-child(1) {
    font: 14px;
    font-weight: bold;
    position: relative;
   .item{
     position: absolute;
       right: 10px;
    }
  }
  &:nth-child(2) {
    text-align: center;
    font-size: 24px;
  }
  &:nth-child(3) {
    font-size: 13px;
   margin-top: 10px;
  }
}
</style>
