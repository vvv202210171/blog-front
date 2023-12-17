<template>
  <el-dialog class="create-balance" :title="$t('report_0043')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <el-form ref="form" :rules="rules" :model="form" label-position="top">
      <el-form-item class="" :label="$t('report_0038')" prop="MerchantAlias">
        <el-input :value="form.MerchantAlias" :readonly="true" />
      </el-form-item>
      <el-form-item class="" :label="$t('report_0039')" prop="MerchantName">
        <el-input :value="form.MerchantName" :readonly="true" />
      </el-form-item>
      <el-form-item class="" :label="$t('report_0044')" prop="Balance">
        <el-input v-model="form.Balance" :readonly="true" />
      </el-form-item>
      <el-form-item class="" :label="$t('report_0045')" prop="DiffAmount">
        <el-input-number v-model="form.DiffAmount" :precision="2" :placeholder="$t('report_0046')" />
        <!-- <el-input-number v-model="form.DiffAmount" :precision="2" :placeholder="$t('report_0046')" @keyup.native="keyup($event, 'DiffAmount')" /> -->
      </el-form-item>
      <el-form-item class="" :label="$t('report_0047')" prop="Remark">
        <el-input v-model="form.Remark" type="textarea" />
      </el-form-item>
      <el-form-item class="" :label="$t('report_0048')" prop="RemarkForMerchant">
        <el-input v-model="form.RemarkForMerchant" type="textarea" />
      </el-form-item>

      <el-form-item class="" :label="$t('report_0049')" prop="GoogleVerifyCode">
        <el-input v-model="form.GoogleVerifyCode" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="confirm()">{{ $t('common_0053') }}</el-button>
      <el-button @click="dialogFormVisible = false">{{ $t('common_0030') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { manualChange } from '@/03-api/merchant'
import { mapGetters } from 'vuex'
import i18n from '@/locales/index'
const _form = {
  'MerchantAlias': '',
  'DiffAmount': 0.00,
  'Remark': '',
  'RemarkForMerchant': '',
  'GoogleVerifyCode': ''
}
export default {
  name: 'Balance',
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
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        ..._form
      },
      rules: {
        MerchantAlias: [{ required: true, message: i18n.t('report_0016'), trigger: 'blur' }],
        DiffAmount: [{ required: true, message: i18n.t('report_0016'), trigger: 'blur' }],
        GoogleVerifyCode: [{ required: true, message: i18n.t('report_0016'), trigger: 'blur' }]
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
        this.form = this.model
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
    console.log(this.$t('common_0001'))
  },
  methods: {
    async confirm() {
      try {
        if (await this.$refs.form.validate()) {
          this.loading = true
          const param = { ...this.form }
          const { code, msg } = await manualChange(param, { isAction: true })
          this.loading = false
          if (code === 0) {
            const _msg = msg || this.$t('report_0017')
            this.$message.success(_msg)
            this.dialogFormVisible = false
          }
        }
      } catch (error) {
        this.loading = false
      }
    }
    // keyup({ target }, key) {
    //   const [val, precision = ''] = String(target.value).split('.')
    //   this.form[key] = Number(`${val}.${precision.slice(0, 2)}`)
    // }
  }
}
</script>

<style lang="scss">
.create-balance {
  .el-dialog {
    width: 500px;
  }
  .el-input-number--mini {
    width: 460px;
  }
}
</style>
