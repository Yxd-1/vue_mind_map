<template>
  <div class="login_container">
    <!-- 登录 -->
    <div class="login_box">
      <!-- 图片 -->
      <div class="avatar_box">
        <img src="../assets/dog.png" alt="" />
      </div>
      <!-- 表单 -->
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="success" @click="register">注册</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      // 登陆表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },

      // 表单验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    // 点击重置按钮，清空表单
    resetLoginForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields();
    },

    // 登录方法
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // 纯前端开发时用，无需验证登录
        window.sessionStorage.setItem("token", "kjad31413nl1123");
        this.$router.push("/home");
        return;

        // console.log(valid);
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "users/login",
          this.loginForm
        );
        console.log(res);
        if (res.code != 1) return this.$message.error(res.msg);
        this.$message.success("登陆成功");

        // 登陆成功后保存token到客户端的sessionStorage中
        window.sessionStorage.setItem("token", res.data.token);
        // 跳转
        this.$router.push("/home");
      });
    },

    // 注册方法
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  // 网上抄的，反正最后图片能完全显示
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background: url(../assets/background1.jpg);
  /*图片路径*/
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}

.login_box {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.85;

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>