<template>
  <div class="login-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="login-form"
      autocomplete="on"
      label-position="left"
      size="medium"
    >
      <el-card class="card">
        <el-form-item prop="username" class="form-item">
          <h2 class="label">用户：</h2>
          <el-input
            ref="username"
            v-model="form.username"
            placeholder="请输入用户名或电子邮件地址"
            name="username"
            type="text"
            tabindex="2"
          />
        </el-form-item>
        <el-form-item prop="nickname" class="form-item">
          <h2 class="label">昵称：</h2>
          <el-input
            ref="nickname"
            v-model="form.nickname"
            placeholder="请输入昵称"
            name="nickname"
            type="text"
            tabindex="2"
          />
        </el-form-item>
        <el-form-item prop="email" class="form-item">
          <h2 class="label">电子邮箱：</h2>
          <el-input
            ref="email"
            v-model="form.email"
            placeholder="请输入电子邮件地址"
            name="email"
            type="text"
            tabindex="2"
          />
        </el-form-item>

        <el-form-item prop="password" class="form-item">
          <h2 class="label">登陆密码：</h2>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="form.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="3"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item prop="confirmPassword" class="form-item">
          <h2 class="label">确认密码：</h2>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="form.confirmPassword"
            :type="passwordType"
            placeholder="请输入确认密码"
            name="confirmPassword"
            tabindex="3"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <div class="btn">
          <el-button
            :loading="loading"
            type="primary"
            size="medium"
            @click.native.prevent="handleLogin"
          >
            注册</el-button
          >
        </div>
        <div class="link">
          <el-link type="primary" href="#" icon="el-icon-back"
            >返回到泉湉博客</el-link
          >
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary" href="/login">登陆</el-link>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import { reg } from "@/03-api/admin";
export default {
  name: "Reg",
  components: {},
  data() {
    const _this = this;
    const validatepassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(_this.$t("login_0008")));
      } else {
        callback();
      }
    };

    const autoFoucs = (target) => {
      return (rule, value, callback) => {
        if (!value) {
          callback(new Error(_this.$t("report_0016")));
        } else {
          this.form.username = this.form.username.trim();
          callback();
        }
      };
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("确认密码不能为空"));
      } else if (value != this.form.password) {
        callback(new Error("密码不一致"));
      } else {
        this.form.confirmPassword = this.form.confirmPassword.trim();
        callback();
      }
    };

    const validEmail = (rule, value, callback) => {
      let emailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!emailRegExp.test(value)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        this.form.email = this.form.email.trim();
        callback();
      }
    };
    return {
      form: {
        username: "", // 用户名
        password: "", // 登录密码
        email: "",
        nickname: "",
        confirmPassword: "",
      },
      rules: {
        username: [{ validator: autoFoucs("username"), trigger: "blur" }],
        password: [{ validator: validatepassword, trigger: "blur" }],
        email: [{ validator: validEmail, trigger: "blur" }],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: "blur" },
        ],
      },
      passwordType: "password",
      loading: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    async handleLogin() {
      try {
        await this.$refs.form.validate();
        this.loading = true;
        const res = await reg(this.form);
        this.$router.push({
          path: "login",
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>



<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background: url("../../assets/images/bg.png");
  background-size: cover;
  overflow: hidden;
  .link {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-form {
    position: relative;
    width: 500px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .card {
      background: #dcdfe6d9;
      .form-item {
        margin: 30px 8px;
        .label {
          line-height: 8px;
          font-size: 18px;
        }
      }
      .btn {
        display: flex;
        justify-content: right;
        align-items: center;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
