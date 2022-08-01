<template>
  <div class="tab-container">
    <div class="icon-change">
      <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="showBread">{{$route.meta.title}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="showBread">{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: true,
      showBread:false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="less" scoped>
.tab-container {
  width: 100%;
  background: #fff;
  height: 30px;
  border-bottom: 1px solid #eee;
  .icon-change {
    line-height: 40px;
    width: 100%;
    .icon {
      width: 100%;
      i {
        font-size: 25px;
        float: left;
        line-height: 40px;
      }
    }
  }
}
</style>
