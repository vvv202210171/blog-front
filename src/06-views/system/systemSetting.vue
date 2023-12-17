<template>
  <div v-loading="loading" class="app-container sys-setting">
    <el-row type="flex" align="middle" :gutter="20">
      <el-col>
        <div class="item">
          <div class="label">{{ $t('report_0240') }}:</div>
          <el-select v-model="params.IsPaymentInMaintenance" :disabled="!hasRole">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-col>
      <el-col class="is-datetime">
        <div class="item">
          <div class="label">{{ $t('report_0241') }}:</div>
          <el-date-picker
            v-model="PaymentDateTime"
            :disabled="!hasRole"
            type="datetimerange"
            align="right"
            unlink-panels
            :range-separator="$t('common_0005')"
            :start-placeholder="$t('common_0006')"
            :end-placeholder="$t('common_0007')"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-value="new Date()"
            :picker-options="dateOptions"
            @change="ChangeDate($event, { start: 'PaymentMaintenanceFrom', end: 'PaymentMaintenanceTo' })"
          />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="item">
          <div class="label">{{ $t('report_0242') }}:</div>
          <el-select v-model="params.IsCashoutMaintenance" :disabled="!hasRole">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-col>
      <el-col class="is-datetime">
        <div class="item">
          <div class="label">{{ $t('report_0243') }}:</div>
          <el-date-picker
            v-model="CashoutDateTime"
            :disabled="!hasRole"
            type="datetimerange"
            align="right"
            unlink-panels
            :range-separator="$t('common_0005')"
            :start-placeholder="$t('common_0006')"
            :end-placeholder="$t('common_0007')"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-value="new Date()"
            :picker-options="dateOptions"
            @change="ChangeDate($event, { start: 'CashoutMaintenanceFrom', end: 'CashoutMaintenanceTo' })"
          />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button type="primary" :disabled="!hasRole" :loading="submiting" @click="updateSystemSetting">{{ $t('report_0244') }}</el-button>
      </el-col>
      <el-col><div class="grid-content bg-purple-dark" /></el-col>
    </el-row>
  </div>
</template>

<script>

import { dateOptions } from '@/02-utils/keyMaps'
import { getSystemSetting, updateSystemSetting } from '@/03-api/merchant'
import { mapGetters } from 'vuex'
import i18n from '@/locales/index'
export default {
  name: 'SystemSetting',
  components: { },
  mixins: [],
  data() {
    return {
      dateOptions,
      params: {
        IsPaymentInMaintenance: false,
        PaymentMaintenanceFrom: '',
        PaymentMaintenanceTo: '',
        IsCashoutMaintenance: false,
        CashoutMaintenanceFrom: '',
        CashoutMaintenanceTo: ''
      },
      PaymentDateTime: [],
      CashoutDateTime: [],
      loading: false,
      hasRole: false,
      submiting: false,
      options: [
        { value: true, label: i18n.t('common_0048') },
        { value: false, label: i18n.t('common_0049') }]
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.loadInfo()
    this.hasRole = this.$route.meta.roles?.['0001_0001']?.Allow
  },
  methods: {
    async loadInfo() {
      try {
        this.loading = true
        const data = await getSystemSetting()
        this.loading = false
        this.params = data
        this.PaymentDateTime = [this.params.PaymentMaintenanceFrom, this.params.PaymentMaintenanceTo]
        this.CashoutDateTime = [this.params.CashoutMaintenanceFrom, this.params.CashoutMaintenanceTo]
      } catch (error) {
        this.loading = false
      }
    },
    async updateSystemSetting() {
      try {
        this.submiting = true
        const { code, msg } = await updateSystemSetting(this.params, { isAction: true })
        this.submiting = false
        if (code === 0) {
          this.$message.success(msg || this.$t('report_0017'))
        }
        this.loadInfo()
      } catch (error) {
        this.submiting = false
      }
    },
    ChangeDate(date, keys) {
      const [start, end] = date
      this.params[keys.start] = start
      this.params[keys.end] = end
    }
  }
}
</script>

<style lang="scss">
.sys-setting {
    .el-row + .el-row {
        margin-top: 10px;
    }
    .el-col {
    min-width: 230px;
    max-width: 264px;

    &.is-datetime {
      min-width: 600px;
      max-width: 600px;
    }

    &.col-5 {
      min-width: 330px;
      max-width: 528px;
    }

    &.is-action {
      display: flex;
      width: auto;
    }
  }
    .item {
        display: flex;
        align-items: center;
        .label {
            font-size: 12px;
            padding-right: 5px;
        }
    }
}

.lang-enUS .sys-setting {
  .el-col {
    max-width: 340px;
  }
}
</style>
