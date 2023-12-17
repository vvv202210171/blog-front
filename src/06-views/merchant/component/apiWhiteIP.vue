<template>
  <el-dialog class="model api-model" :title="$t('report_0037')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <el-form ref="form" :rules="rules" :model="form" label-position="top">
      <el-form-item class="" :label="$t('report_0038')" prop="MerchantAlias">
        <el-input v-model="form.MerchantAlias" :readonly="true" />
      </el-form-item>
      <el-form-item class="" :label="$t('report_0039')" prop="MerchantName">
        <el-input v-model="form.MerchantName" :readonly="true" />
      </el-form-item>

      <el-form-item class="" :label="$t('report_0040')" prop="IpList">
        <el-input
          v-model="form.IpList"
          type="textarea"
          :autosize="{ minRows: 3}"
          placeholder="127.0.0.1,127.0.0.2..."
        />
      </el-form-item>

      <el-form-item class="" :label="$t('report_0041')" prop="BOIpList">
        <el-input
          v-model="form.BOIpList"
          type="textarea"
          :autosize="{ minRows: 3}"
          placeholder="127.0.0.1,127.0.0.2..."
        />
      </el-form-item>
      <el-form-item class="" label="" prop="">
        <div class="tips">{{ $t('report_0042') }}</div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="confirm()">{{ $t('common_0053') }}</el-button>
      <el-button @click="dialogFormVisible = false">{{ $t('common_0030') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getMerchantApiList, editorApiIpList } from '@/03-api/merchant'
import { mapGetters } from 'vuex'
const _form = {
  'MerchantAlias': 'xpay',
  'IpList': '',
  'BOIpList': ''
}
export default {
  name: 'APIWhiteIP',
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

        if (Object.keys(this.model).length) {
          this.form = this.model
        }
        this.loadInfo()
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
    async loadInfo() {
      try {
        const data = await getMerchantApiList(this.form)
        this.$set(this.form, 'IpList', data.APIAccessIPList)
        this.$set(this.form, 'BOIpList', data.BOAccrssIPList)
      } catch (error) {
        console.log(error)
      }
    },
    async confirm() {
      try {
        if (await this.$refs.form.validate()) {
          this.loading = true
          const param = { ...this.form }
          const { code, msg } = await editorApiIpList(param, { isAction: true })
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
.api-model {
  .el-dialog {
    width: 800px;
  }
}
</style>
