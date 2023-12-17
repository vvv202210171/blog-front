<template>
  <el-dialog class="create-merchant" :title="isEditor ? $t('report_0207') : $t('report_0050')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <el-form ref="form" :class="{'create-modal': !isEditor }" :rules="rules" :model="form" label-position="top" label-width="100px">
      <el-form-item class="" :label="$t('report_0038')" prop="MerchantAlias">
        <el-input v-model="form.MerchantAlias" :disabled="isEditor" />
      </el-form-item>
      <el-form-item class="" :label="$t('report_0039')" prop="MerchantName">
        <el-input v-model="form.MerchantName" />
      </el-form-item>
      <el-form-item class="flex-1" :label="$t('report_0051')" prop="MerchantStatus">
        <el-radio-group v-model="form.MerchantStatus">
          <el-radio :label="1">{{ $t('common_0048') }}</el-radio>
          <el-radio :label="2">{{ $t('common_0054') }}</el-radio>
          <el-radio :label="3">{{ $t('common_0049') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="!isEditor" :label="$t('report_0019')">
        <el-select v-model.number="form.CurrencyCode">
          <el-option v-for="code of currency" :key="code" :label="code" :value="code" />
        </el-select>
      </el-form-item>

      <el-form-item class="" :label="$t('report_0052')" prop="merAccount">
        <el-input v-model.number="form.TimezoneDiffMinutes" />
      </el-form-item>

      <el-form-item v-show="!isEditor" :label="$t('report_0256')" prop="WithdrawPassword">
        <el-input v-model="form.WithdrawPassword" type="text" show-password />
      </el-form-item>
      <el-form-item v-show="!isEditor" :label="$t('report_0261')" prop="ConfirmWithdrawPassword">
        <el-input v-model="form.ConfirmWithdrawPassword" type="text" show-password />
      </el-form-item>
      <el-form-item v-show="!isEditor" :label="$t('report_0053')" prop="AdminUser">
        <el-input v-model="form.AdminUser" type="text" />
      </el-form-item>
      <el-form-item v-show="!isEditor" :label="$t('report_0054')" prop="Password">
        <el-input v-model="form.Password" type="text" show-password />
      </el-form-item>
      <el-form-item v-show="!isEditor" :label="$t('report_0260')" prop="ConfirmPassword">
        <el-input v-model="form.ConfirmPassword" type="text" show-password />
      </el-form-item>
      <el-form-item :label="$t('report_0356')">
        <el-select v-model="form.CashoutOrderAutoConfirm">
          <el-option :value="true" :label="$t('common_0048')" />
          <el-option :value="false" :label="$t('common_0108')" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('report_0357')" prop="CashoutOrderAutoConfirmMinAmount">
        <el-input-number v-model="form.CashoutOrderAutoConfirmMinAmount" type="text" />
      </el-form-item>
      <el-form-item :label="$t('report_0358')" prop="CashoutOrderAutoConfirmMaxAmount">
        <el-input-number v-model="form.CashoutOrderAutoConfirmMaxAmount" type="text" />
      </el-form-item>
      <el-form-item v-show="false" :label="$t('report_0352')" prop="TelegramNotifyChannel">
        <el-input v-model="form.TelegramNotifyChannel" type="text" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="confirm()">{{ $t('common_0053') }}</el-button>
      <el-button @click="dialogFormVisible = false">{{ $t('common_0030') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addMerchant, updateMerchant } from '@/03-api/merchant'
import { mapGetters } from 'vuex'
import i18n from '@/locales/index'
const _form = {
  'MerchantAlias': '', // 商户编号
  'MerchantName': '', // 商户名称
  'MerchantStatus': 1, // 商户状态
  'AdminUser': '', // 默认登录账号
  'Password': '', // 密码
  'ConfirmPassword': '', // 确认登录密码
  'CurrencyCode': '', // 货币类型
  'WithdrawPassword': '', // 提现密码
  'ConfirmWithdrawPassword': '', // 确认提现密码
  'TelegramNotifyChannel': '',
  'CashoutOrderAutoConfirm': true,
  'CashoutOrderAutoConfirmMinAmount': 0.01,
  'CashoutOrderAutoConfirmMaxAmount': 50000
}
export default {
  name: 'CreateMerchant',
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
    const validateUserName = (rule, value, callback) => {
      if (this.isEditor) {
        callback()
      } else if (!value) {
        callback(new Error(this.$t('report_0016')))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (this.isEditor) {
        callback()
      } else if (value.length < 6) {
        callback(new Error(this.$t('login_0008')))
      } else {
        callback()
      }
    }
    const validatePassword2 = (rule, value, callback) => {
      if (this.isEditor) {
        callback()
      } else if (value !== this.form.Password) {
        callback(new Error(this.$t('report_0119')))
      } else {
        callback()
      }
    }
    const validateConfrimPassword = (rule, value, callback) => {
      if (this.isEditor) {
        callback()
      } else if (value !== this.form.WithdrawPassword) {
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
        MerchantAlias: [{ required: true, message: i18n.t('report_0016'), trigger: 'blur' }],
        MerchantName: [{ required: true, message: i18n.t('report_0016'), trigger: 'blur' }],
        AdminUser: [{ validator: validateUserName, trigger: 'blur' }],
        Password: [{ validator: validatePassword, trigger: 'blur' }],
        ConfirmPassword: [{ validator: validatePassword2, trigger: 'blur' }],
        WithdrawPassword: [{ validator: validatePassword, trigger: 'blur' }],
        ConfirmWithdrawPassword: [{ validator: validateConfrimPassword, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['currency'])
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
        this.isEditor = true
        this.form = this.model
      }
    },
    dialogFormVisible(value) {
      if (!value) {
        this.form = { ..._form }
        this.$emit('closed', value)
        setTimeout(() => {
          this.isEditor = false
        }, 500)
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
          const _func = this.isEditor ? updateMerchant : addMerchant
          const { code, msg } = await _func(param, { isAction: true })
          this.loading = false
          if (code === 0) {
            const _msg = msg || (this.isEditor ? this.$t('common_0052') : this.$t('common_0055'))
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
.create-merchant {
  .create-modal {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .el-form-item {
        flex-basis: 48%;
    }
    .flex-1 {
        flex-basis: 100%;
    }

    .col-3 {
        flex-basis: 33.333%;
    }

    .col-2 {
        flex-basis: 20%;
    }

    .col-4 {
        flex-basis: calc(40% - 16px);
    }

    .col-8 {
        flex-basis: 80%;
    }
  }
  .el-dialog {
    width: 680px;
    .el-dialog__body {
        padding: 10px 20px 0;
    }
  }

  .el-input-number--mini {
      width: 100%;
  }
}
</style>
