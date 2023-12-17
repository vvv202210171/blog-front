<template>
  <el-dialog class="create-user" :title="$t('report_0114')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <el-form ref="form" :rules="rules" :model="form" label-position="top">
      <el-form-item class="" :label="$t('report_0115')" prop="UserName">
        <el-input v-model="form.UserName" :readonly="true" />
      </el-form-item>
      <el-form-item :label="$t('report_0054')" prop="Password">
        <el-input v-model="form.Password" type="text" show-password />
      </el-form-item>
      <el-form-item :label="$t('report_0116')" prop="ConfirmPassword">
        <el-input v-model="form.ConfirmPassword" type="text" show-password />
      </el-form-item>

      <el-form-item :label="$t('report_0049')" prop="GoogleVerifyCode">
        <el-input v-model="form.GoogleVerifyCode" type="text" />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="confirm()">{{ $t('common_0053') }}</el-button>
      <el-button @click="dialogFormVisible = false">{{ $t('common_0030') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { resetUserPassword } from '@/03-api/user'
const _form = {
  'UserName': '', // 用户名
  'Password': '', // 登录密码
  'ConfirmPassword': '',
  'GoogleVerifyCode': ''
}
export default {
  name: 'ResetUserPassword',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (this.isEditor) {
        callback()
      } else if (!value) {
        callback(new Error(this.$t('login_0007')))
      } else if (value.length < 6) {
        callback(new Error(this.$t('report_0117')))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (this.isEditor) {
        callback()
      } else if (!value) {
        callback(new Error(this.$t('report_0118')))
      } else if (value !== this.form.Password) {
        callback(new Error(this.$t('report_0119')))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        ..._form
      },
      rules: {
        Password: [{ validator: validatePass, trigger: 'blur' }],
        ConfirmPassword: [{ validator: validatePass2, trigger: 'blur' }],
        GoogleVerifyCode: [{ required: true, trigger: 'blur', message: this.$t('report_0016') }]
      }
    }
  },
  computed: {
  },
  watch: {
    show(value) {
      if (value) {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
      }

      if (Object.keys(this.model).length) {
        this.form = this.model
      }
    },
    dialogFormVisible(value) {
      if (!value) {
        this.isEditor = false
        this.form = { ..._form }
        this.$emit('closed', value)
      }
    }
  },
  created() {
  },
  methods: {
    confirm() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          this.loading = true
          const param = { ...this.form }
          try {
            const { code, msg } = await resetUserPassword(param, { isAction: true })
            this.loading = false
            if (code === 0) {
              const _msg = msg || this.$t('common_0052')
              this.$message.success(_msg)
              this.dialogFormVisible = false
            }
          } catch (error) {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.create-user {
  .el-dialog {
    width: 500px;
  }
}
</style>
