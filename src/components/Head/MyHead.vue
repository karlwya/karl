<template>
  <div class="head-container">
    <el-container>
      <el-header>
        <h3>翼上云电商管理系统</h3>
        <div class="header-box">
          <span class="sp1">欢迎您，{{ getName }} 管理员</span>
          <el-button type="info" plain @click="del">退出登录</el-button>
        </div>
      </el-header>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    del() {
      sessionStorage.removeItem("username");
      this.$router.push("/login");
    },
  },
  computed: {
    getName() {
      let username = sessionStorage.getItem("username");
      return username
    },
  },
};
</script>
<style lang="less" scoped>
.el-header {
  background-color: rgb(63, 63, 63);
  line-height: 60px;
  // width: 100%;
  h3 {
    display: inline-block;
    color: #fff;
  }
  .header-box {
    float: right;
    color: #fff;
    i {
      color: #fff;
      padding: 5px;
    }
    span {
      display: inline-block;
      color: #fff;
      cursor: pointer;
      padding-right: 30px;
    }
  }
}
</style>
