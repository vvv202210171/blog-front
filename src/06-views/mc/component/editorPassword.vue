<template>
  <el-dialog class="reset-password" :title="$t('report_0262')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <el-form ref="form" :rules="rules" :model="form" label-position="top" label-width="100px">
      <el-form-item class="" :label="$t('report_0038')" prop="MerchantAlias">
        <el-input v-model="user.MerchantAlias" readonly />
      </el-form-item>
      <el-form-item class="" :label="$t('report_0039')" prop="MerchantName">
        <el-input v-model="user.MerchantName" readonly />
      </el-form-item>
      <el-form-item :label="$t('report_0264')" prop="OldWithdrawPassword">
        <el-input v-model="form.OldWithdrawPassword" type="text" show-password />
      </el-form-item>
      <el-form-item :label="$t('report_0265')" prop="NewWithdrawPassword">
        <el-input v-model="form.NewWithdrawPassword" type="text" show-password />
      </el-form-item>
      <el-form-item :label="$t('report_0261')" prop="ConfirmWithdrawPassword">
        <el-input v-model="form.ConfirmWithdrawPassword" type="text" show-password />
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
import { editorSelfWithdrawPassword } from '@/03-api/merchant'
import i18n from '@/locales/index'
import { mapGetters } from 'vuex'
const _form = {
  'MerchantAlias': '', // 商户编号
  'OldWithdrawPassword': '',
  'NewWithdrawPassword': '',
  'ConfirmWithdrawPassword': '',
  'GoogleVerifyCode': ''
}
export default {
  name: 'EditorWithdrawPassword',
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
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(this.$t('login_0008')))
      } else {
        callback()
      }
    }
    const validatePassword2 = (rule, value, callback) => {
      if (value !== this.form.NewWithdrawPassword) {
        callback(new Error(this.$t('report_0119')))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      isEditor: false,
      dialogFormVisible: false,
      form: {
        ..._form
      },
      rules: {
        OldWithdrawPassword: [{ required: true, message: i18n.t('report_0016'), trigger: 'blur' }],
        NewWithdrawPassword: [{ validator: validatePassword, trigger: 'blur' }],
        ConfirmWithdrawPassword: [{ validator: validatePassword2, trigger: 'blur' }],
        GoogleVerifyCode: [{ required: true, message: i18n.t('report_0016'), trigger: 'blur' }]
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
        this.form.MerchantAlias = this.user.MerchantAlias
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
      }
    },
    dialogFormVisible(value) {
      if (!value) {
        this.form = { ..._form }
        this.$emit('closed', value)
      }
    }
  },
  created() {
  },
  methods: {
    async confirm() {
      try {
        if (await this.$refs.form.validate()) {
          this.loading = true
          const param = { ...this.form }
          const { code, msg } = await editorSelfWithdrawPassword(param, { isAction: true })
          this.loading = false
          if (code === 0) {
            const _msg = msg || this.$t('common_0052')
            this.$message.success(_msg)
            this.dialogFormVisible = false
          }
        }
      } catch (error) {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
.reset-password {

  .el-dialog {
    width: 500px;
    .el-dialog__body {
        padding: 10px 20px 0;
    }
  }

  .el-input-number--mini {
      width: 100%;
  }
}
</style>
