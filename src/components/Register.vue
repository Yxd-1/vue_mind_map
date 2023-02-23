<template>
  <div class="register_container">
    <!-- 注册 -->
    <div class="register_box">
      <!-- 图片 -->
      <div class="avatar_box">
        <img src="../assets/dog.png" alt="" />
      </div>
      <!-- 表单 -->
      <el-form
        :model="registerForm"
        :rules="registerFormRules"
        ref="registerFormRef"
        label-width="0px"
        class="register_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type=" info" @click="back">返回</el-button>
          <el-button type="primary" @click="submit">完成</el-button>
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
      // 注册表单的数据绑定对象
      registerForm: {
        username: "",
        password: "",
      },

      // 表单验证规则
      registerFormRules: {
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
    // 注册完成跳转
    submit() {
      this.$refs.registerFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "users/register",
          this.registerForm
        );

        console.log(res);
        if (res.code != 1) return this.$message.error(res.msg);

        // 成功后跳转
        this.$message.success("注册成功，请登录");
        this.$router.push("/login");
      });
    },

    // 返回
    back(){
      this.$router.push("/login");
    },
  },
};
</script>
  
  <style lang="less" scoped>
.register_container {
  // 网上抄的，反正最后图片能完全显示
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background: url(../assets/background1.jpg); /*图片路径*/
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}

.register_box {
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

.register_form {
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

.vertifyCode {
  width: 50%;
}

.vertify {
  width: 20px;
}
</style>