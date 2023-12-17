<template>
  <el-dialog class="verify-info" :title="$t('report_0109')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <div class="row"><div class="label">{{ $t('report_0110') }}:</div><div class="value">{{ verifyInfo[2] }}</div></div>
    <div class="row"><div class="label">{{ $t('report_0111') }}:</div><div class="value">{{ verifyInfo[1] }}</div> <div class="action"> <el-button v-clipboard="verifyInfo[1] || ''" type="text" @success="success">{{ $t('common_0068') }}</el-button> </div> </div>
    <div class="qr-code">
      <el-image :src="verifyInfo[0]" />
    </div>
    <div class="tips">
      <span>{{ $t('report_0112') }}</span>
      <span>{{ $t('report_0113') }}</span>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'GoogleVerifyModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    verifyInfo: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogFormVisible: false
    }
  },
  computed: {
  },
  watch: {
    show(value) {
      if (value) {
        this.dialogFormVisible = true
      }
    },
    dialogFormVisible(value) {
      if (!value) {
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
.verify-info {
  .el-dialog {
    width: 500px;
  }

  .el-dialog__body {
    padding: 0 20px 30px;
  }

  .row {
    display: flex;
    align-items: flex-start;
    height: 30px;

    .label {
        min-width: 48px;
        text-align: right;
    }
    .value {
        flex: 1;
        padding: 0 10px;
    }
    .el-button {
        padding: 0;
    }
  }

  .qr-code {
        text-align: center;
  }
  .tips {
        display: flex;
        flex-flow: column;
        align-items: center;
  }
}
</style>
