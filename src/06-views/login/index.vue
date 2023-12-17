<template>
  <div class="login-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <!-- <h3 class="title">X Pay Admin</h3> -->
        <h3 class="title">
          <!-- <img src="../../assets/images/xpay_logo.png"> -->
          <!-- X Pay Admin -->
          <img src="../../assets/images/xpay_logo2.png" style="width: 250px;">
        </h3>

      </div>

      <el-form-item prop="lang">
        <span class="svg-container">
          <svg-icon icon-class="international" />
        </span>
        <el-select
          v-model="form.lang"
          tabindex="0"
          :placeholder="$t('login_0001')"
          @change="changeLanguage"
        >
          <el-option
            v-for="item of LANGLIST"
            :key="item.key"
            :value="item.code"
            :label="item.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="MerchantAlias">
        <span class="svg-container">
          <i class="el-icon-s-shop" />
        </span>
        <el-input
          ref="MerchantAlias"
          v-model="form.MerchantAlias"
          :placeholder="$t('login_0002')"
          name="MerchantAlias"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="UserName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="UserName"
          v-model="form.UserName"
          :placeholder="$t('login_0003')"
          name="UserName"
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
        <el-form-item prop="Password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="PasswordType"
            ref="Password"
            v-model="form.Password"
            :type="PasswordType"
            :placeholder="$t('login_0007')"
            name="Password"
            tabindex="3"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="PasswordType === 'Password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-form-item prop="GoogleVerifyCode">
        <span class="svg-container">
          <i class="el-icon-key" />
        </span>
        <el-input
          ref="GoogleVerifyCode"
          v-model="form.GoogleVerifyCode"
          :placeholder="$t('login_0005')"
          name="GoogleVerifyCode"
          type="text"
          tabindex="4"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        size="medium"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >
        {{ $t('login_0006') }}</el-button>
    </el-form>
  </div>
</template>

<script>
// import { validUserName } from '@/02-utils/validate'
import { LANGLIST } from '@/locales'
import Cookies from 'js-cookie'
import { setup as resetLanguage } from '@/locales/index'
export default {
  name: 'Login',
  components: { },
  data() {
    const _this = this
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(_this.$t('login_0008')))
      } else {
        callback()
      }
    }

    const autoFoucs = (target) => {
      return (rule, value, callback) => {
        if (!value) {
          callback(new Error(_this.$t('report_0016')))
        } else {
          this.form.MerchantAlias = this.form.MerchantAlias.trim()
          this.form.UserName = this.form.UserName.trim()
          callback()
        }
      }
    }
    return {
      form: {
        'lang': Cookies.get('lang'),
        'MerchantAlias': '', // 商户编号
        'UserName': '', // 用户名
        'Password': '', // 登录密码
        'GoogleVerifyCode': '' // google验证码
      },
      rules: {
        lang: [
          { required: true, message: this.$t('login_0001'), trigger: 'change' }
        ],
        MerchantAlias: [
          { validator: autoFoucs('MerchantAlias'), trigger: 'blur' }
        ],
        UserName: [
          { validator: autoFoucs('UserName'), trigger: 'blur' }
        ],
        Password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        GoogleVerifyCode: [
          { validator: autoFoucs('GoogleVerifyCode'), trigger: 'blur' }
        ]
      },
      PasswordType: 'Password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      LANGLIST
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {

  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.PasswordType === 'password') {
        this.PasswordType = ''
      } else {
        this.PasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.Password.focus()
      })
    },
    changeLanguage(value) {
      Cookies.set('lang', value)
      this.$store.commit('app/SET_LANG', value)
      resetLanguage(value)
      location.reload()
    },
    async handleLogin() {
      try {
        const vaild = await this.$refs.form.validate()
        if (vaild) {
          this.loading = true
          const success = await this.$store.dispatch('admin/login', this.form)
          this.loading = false
          if (success) {
            this.$router.push({
              path: this.redirect || '/',
              query: this.otherQuery
            })
            this.loading = false
          }
        }
      } catch (error) {
        this.loading = false
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item__content {
    display: flex;

    .el-select {
      flex: 1;

      .el-input {
        width: 100%;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #02182a;//
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    // .div-xpay_logo[data-v-4a8839dd] {
    // background-image: url(/static/img/xpay_logo.695d6814.png);
    // }

    .title {
      .div-xpay-logo{
        background-image: url(../../assets/images/xpay_logo.png) no-repeat;
      }
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
