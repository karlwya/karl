<template>
  <div class="login-container">
    <div class="login-bg">
      <div class="login-box">
        <!-- <img src="../../assets/images/head.png" alt="" class="imgs" /> -->
        <div class="login-form">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="35px"
            class="demo-ruleForm"
          >
            <el-form-item prop="username" class="ipts">
              <label><i class="el-icon-user"></i></label>
              <el-input
                type="text"
                v-model="ruleForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item prop="pass" class="ipts">
              <label><i class="el-icon-lock"></i></label>
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                class="login-btns"
                @click="submitForm('ruleForm')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>

          <div class="span-icon">
            <span class="iconfont icon-shejiaotubiao-39"></span>
            <span class="iconfont icon-weixin"></span>
            <span class="iconfont icon-zhifubao"></span>
            <span class="iconfont icon-shejiaotubiao-44"></span>
          </div>
          <router-link to="">忘记密码</router-link>
          <router-link to="/register">免费注册</router-link>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        username: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getUsername();
          this.$message({
            message: "恭喜你，登录成功",
            type: "success",
            duration: 1000,
          });
        } else {
          this.$message.error("不好意思，请重新登录");
          return false;
        }
      });
    },

    async getUsername() {
      const { data: res } = await this.$http.post("manager/login", {
        username: this.ruleForm.username,
        password: this.ruleForm.pass,
      });
      console.log(res);
      if (res.status != 200) {
        return this.$message("用户名或者密码错误");
      } else {
        sessionStorage.setItem("username", res.data.username);
        sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-bg {
  width: 100%;
  height: 100vh;
  background: url("../../assets/images/car.png") no-repeat;
  background-size: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .login-form {
    width: 400px;
    height: 270px;
    padding: 40px;
    background: rgba(0, 0, 0, 0.5);
    a {
      float: right;
      color: #fff;
      padding: 5px 10px;
    }
    .login-btns {
      width: 100%;
      font: 18px Arial;
      border: 0;
      background: #06d6f6;
    }
  }
}

.ipts {
  padding: 3px;
  margin-top: 10px;
  .el-input{
    height: 40px;
  }
  label {
    font-size: 23px;
    position: absolute;
    top: 0px;
    left: -40px;
    i{
      color:#fff;
    }
  }
}
.span-icon {
  span {
    font-size: 22px;
    padding: 5px;
    &:nth-child(1) {
      color: rgb(17, 197, 229);
      margin-left: 12px;
    }
    &:nth-child(2) {
      font-size: 20px;
      color: rgb(74, 236, 122);
    }
    &:nth-child(3) {
      font-size: 20px;
      color: rgb(17, 197, 229);
    }
    &:nth-child(4) {
      font-size: 25px;
      position: relative;
      top: 2px;
      color: rgb(234, 131, 27);
    }
  }
}
</style>
