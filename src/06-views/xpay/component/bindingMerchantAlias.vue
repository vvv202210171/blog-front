
<template>
  <el-dialog class="bindingMerchantAlias-modal" :title="$t('report_0289')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <el-form ref="form" class="create-modal" :rules="rules" :model="form" label-position="top" label-width="100px">
      <!-- <el-button type="text" :disabled="!model.BindingMerchantAlias" @click="deleteBindingMerchantAlias(model)">
        取消绑定
      </el-button> -->
      <el-form-item class="" :label="$t('report_0289')" prop="BindingMerchantAlias">
        <el-select v-model="form.BindingMerchantAlias" :placeholder="$t('report_0122')">
          <el-option v-for="item of merchantList" :key="item.MerchantAlias" :label="item.MerchantName" :value="item.MerchantAlias" />
        </el-select>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :type="form.BindingMerchantAlias == '--' ? 'warning' : 'primary'" :loading="loading" @click="confirm(model)">{{ form.BindingMerchantAlias == '--' ? $t('report_0348') : $t('common_0053') }}</el-button>
      <el-button @click="dialogFormVisible = false">{{ $t('common_0030') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { deleteBindingMerchantAlias, deleteBankCardBindingMerchantAlias, originalCashoutBankcardBindingMerchant, originalOfflinetmnBindingMerchant } from '@/03-api/own'
import { simpleList } from '@/03-api/common'
import mixinPage from '@/07-mixins/page'
import i18n from '@/locales/index'
const _form = {
  'BindingMerchantAlias': ''
}
export default {
  name: 'BindingMerchantAlias',
  mixins: [mixinPage],
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
    },
    type: {
      type: String,
      default: 'QRCode'
    }
  },
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        ..._form
      },
      merchantList: [],
      rules: {
        BindingMerchantAlias: [{ required: true, message: i18n.t('report_0016'), trigger: 'blur' }]
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
          // this.$refs.form.clearValidate()
        })
      }

      if (Object.keys(this.model).length) {
        this.loadBindingMerchantAliasList()
        this.form = { ...this.model }
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
    async loadBindingMerchantAliasList() {
      try {
        const data = await simpleList()
        this.merchantList = data
        if (this.model.BindingMerchantAlias) {
          this.merchantList.unshift({ MerchantAlias: '--', MerchantName: '--' })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async confirm() {
      try {
        if (await this.$refs.form.validate()) {
          this.loading = true
          const key = {
            BankCard: 'OfflineBankCardID',
            QRCode: 'OfflineQRID',
            CashoutBankCard: 'OriginalCashoutBankCardID',
            OfflineTrueMoney: 'OfflineTrueMoneyAccountID'
          }[this.type]
          const _func = {
            BankCard: deleteBankCardBindingMerchantAlias,
            QRCode: deleteBindingMerchantAlias,
            CashoutBankCard: originalCashoutBankcardBindingMerchant,
            OfflineTrueMoney: originalOfflinetmnBindingMerchant
          }[this.type]

          const { code, msg } = await _func({ [key]: this.form[key], BindingMerchantAlias: (this.form.BindingMerchantAlias === '--' ? '' : this.form.BindingMerchantAlias) }, { isAction: true })
          this.loading = false
          if (code === 0) {
            const _msg = msg || this.form.BindingMerchantAlias === '--' ? this.$t('report_0349') : this.$t('common_0104')
            this.$message.success(_msg)
            this.dialogFormVisible = false
          }
        }
      } catch (error) {
        this.loading = false
      }
    },

    deleteBindingMerchantAlias(item) {
      const confirm = this.Confirm(this.$t('report_0301'))
      const key = {
        BankCard: 'OfflineBankCardID',
        QRCode: 'OfflineQRID',
        CashoutBankCard: 'OriginalCashoutBankCardID'
      }[this.type]
      const _func = {
        BankCard: deleteBankCardBindingMerchantAlias,
        QRCode: deleteBindingMerchantAlias,
        CashoutBankCard: originalCashoutBankcardBindingMerchant
      }[this.type]
      confirm(_func, { [key]: item[key], BindingMerchantAlias: '' }, () => {
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style lang="scss">
.bindingMerchantAlias-modal {
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
