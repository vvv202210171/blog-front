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
          <h2 class="label">用户名或电子邮件地址：</h2>
          <el-input
            ref="username"
            v-model="form.username"
            placeholder="请输入用户名或电子邮件地址"
            name="username"
            type="text"
            tabindex="2"
          />
        </el-form-item>

        <el-tooltip
          v-model="capsTooltip"
          :content="$t('login_0004')"
          placement="right"
          manual
        >
          <el-form-item prop="password" class="form-item">
            <h2 class="label">密码：</h2>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="form.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="3"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
        </el-tooltip>
        <div class="btn">
          <el-button
            :loading="loading"
            type="primary"
            size="medium"
            @click.native.prevent="handleLogin"
          >
            登陆</el-button
          >
        </div>
        <div class="link">
          <el-link type="primary" href="#" icon="el-icon-back"
            >返回到泉湉博客</el-link
          >
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary" href="#">注册</el-link>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
// import { validusername } from '@/02-utils/validate'
import { LANGLIST } from "@/locales";
import { valid } from "mockjs";
import { Alert } from "element-ui";
export default {
  name: "Login",
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
    return {
      form: {
        username: "", // 用户名
        password: "", // 登录密码
      },
      rules: {
        username: [{ validator: autoFoucs("username"), trigger: "blur" }],
        password: [{ validator: validatepassword, trigger: "blur" }],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      LANGLIST,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {},
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    async handleLogin() {
      try {
        this.loading = true;
        await this.$refs.form.validate();
        const success = await this.$store.dispatch("admin/login", this.form);
        this.loading = false;
        if (success) {
          this.$router.push({
            path: this.redirect || "/",
            query: this.otherQuery,
          });
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
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
