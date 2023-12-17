<template>
  <el-dialog class="private-model" :title="$t('report_0055')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <el-form ref="form" :rules="rules" :model="form" label-position="top">
      <el-form-item class="" :label="$t('report_0038')" prop="MerchantAlias">
        <el-input v-model="form.MerchantAlias" :readonly="true" />
      </el-form-item>
      <el-form-item class="" :label="$t('report_0039')" prop="MerchantAlias">
        <el-input v-model="form.MerchantName" :readonly="true" />
      </el-form-item>
      <el-form-item class="" label="API Root">
        <el-input v-model="form.MerchantAPIRoot" :readonly="true">
          <template slot="append">
            <i v-clipboard="form.MerchantAPIRoot || ''" class="copy el-icon-document-copy" @success="success" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="" label="Key A">
        <el-input v-model="form.KeyA" :readonly="true">
          <template slot="append">
            <i v-clipboard="form.KeyA || ''" class="copy el-icon-document-copy" @success="success" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="" label="Key B">
        <el-input v-model="form.KeyB" :readonly="true">
          <template slot="append">
            <i v-clipboard="form.KeyB || ''" class="copy el-icon-document-copy" @success="success" />
          </template>
        </el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">{{ $t('common_0056') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
const _form = {
  'MerchantAlias': '', // 商户编号
  'MerchantName': '' // 商户名称

}
export default {
  name: 'PrivateKeys',
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
      }
    }
  },
  created() {
  },
  methods: {
    success() {
      this.$message({
        type: 'success',
        message: this.$t('common_0057')
      })
    }
  }
}
</script>

<style lang="scss">
.private-model {
  .el-dialog {
    width: 500px;
  }

  .copy {
    display: inline-block;
    height: 100%;
    padding: 0 20px;
    cursor: pointer;
  }

  .el-input-group__append {
    padding: 0;
  }
}
</style>
