<template>
  <el-dialog class="create-user" :title="$t('common_0077')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <el-form ref="form" :rules="rules" :model="form" label-position="top">
      <el-form-item class="" :label="$t('report_0115')" prop="UserName">
        <el-input v-model="user.UserName" :readonly="true" />
      </el-form-item>
      <el-form-item :label="$t('common_0079')" prop="OldPassword">
        <el-input v-model="form.OldPassword" type="text" show-password />
      </el-form-item>
      <el-form-item :label="$t('common_0078')" prop="NewPassword">
        <el-input v-model="form.NewPassword" type="text" show-password />
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
import { changeUserPassword } from '@/03-api/admin'
import { mapGetters } from 'vuex'
const _form = {
  OldPassword: '', // 旧密码
  NewPassword: '', // 新密码
  GoogleVerifyCode: '' // OPT验证码
}
export default {
  name: 'ChangeUserPassword',
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
    const validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('report_0200')))
      } else if (value.length < 6) {
        callback(new Error(this.$t('report_0117')))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('report_0201')))
      } else if (value.length < 6) {
        callback(new Error(this.$t('report_0117')))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('report_0118')))
      } else if (value !== this.form.NewPassword) {
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
        OldPassword: [{ validator: validateOldPass, trigger: 'blur' }],
        NewPassword: [{ validator: validatePass, trigger: 'blur' }],
        ConfirmPassword: [{ validator: validatePass2, trigger: 'blur' }],
        GoogleVerifyCode: [{ required: true, message: this.$t('report_0016'), trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    show(value) {
      if (value) {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
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
            const { code, msg } = await changeUserPassword(param, { isAction: true })
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
