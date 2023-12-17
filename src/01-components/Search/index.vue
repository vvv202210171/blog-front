<template>
  <div class="filter-container">
    <el-row v-for="(row, r) of filters" :key="r" :gutter="10" type="flex">
      <template v-for="elem of row">
        <el-col
          v-if="(!user.IsSuper || user.IsSuper && !elem.hideForSuperMerchant) && (!elem.role || roles[elem.role].Allow) && (!['MerchantAlias', 'CurrencyCode'].includes(elem.key) || ['MerchantAlias', 'CurrencyCode'].includes(elem.key) && user.IsSuper)"
          :key="elem.key"
          :class="[{'is-datetime': elem.elemName == 'dateTime', 'is-action': elem.elemName == 'actions' }, 'col-' + elem.col]"
        >
          <template v-if="elem.elemName === 'input'">
            <div class="search-item">
              <span v-show="elem.label" class="label">{{ elem.label }}:</span>
              <el-input
                v-model="params[elem.key]"
                :clearable="elem.clear"
                :placeholder="elem.placeholder || ($t('common_0003') + elem.label.toLowerCase())"
                :readonly="elem.readonly"
                @keyup.enter.native="EnterInput(elem.key)"
              />
            </div>
          </template>

          <template v-if="elem.elemName === 'select'">
            <template v-if="elem.key === 'MerchantAlias'">
              <div class="search-item">
                <span v-show="elem.label" class="label">{{ elem.label }}:</span>
                <el-select v-model="params.MerchantAlias" :clearable="elem.clear" :placeholder="$t('common_0004') + elem.label.toLowerCase()" filterable>
                  <el-option v-for="item of merchantList" :key="item.MerchantAlias" :label="item.MerchantName" :value="item.MerchantAlias" />
                </el-select>
              </div>
            </template>
            <template v-else-if="elem.key === 'CurrencyCode'">
              <div class="search-item">
                <span v-show="elem.label" class="label">{{ elem.label }}:</span>
                <el-select v-model="params.CurrencyCode" :clearable="elem.clear" :placeholder="$t('common_0004') + elem.label.toLowerCase()" filterable>
                  <el-option v-for="item of currencyList" :key="item.label" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </template>
            <template v-else-if="elem.key === 'SpiderAccount'">
              <div class="search-item">
                <span v-show="elem.label" class="label">{{ elem.label }}:</span>
                <el-select v-model="params.SpiderAccount" :clearable="elem.clear" :placeholder="$t('common_0004') + elem.label.toLowerCase()" filterable>
                  <el-option v-for="item of spiderAccountOptions" :key="item.value + '|'+ item.label" :label="item.value" :value="item.value">
                    <span style="float: left">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label == '1'? 'THB_Bank': item.label == '2'? 'THB_QR': item.label }}</span>
                  </el-option>
                </el-select>
              </div>
            </template>
            <template v-else-if="elem.key === 'QRSpiderAccount'">
              <div class="search-item">
                <span v-show="elem.label" class="label">{{ elem.label }}:</span>
                <el-select v-model="params.QRSpiderAccount" :clearable="elem.clear" :placeholder="$t('common_0004') + elem.label.toLowerCase()" filterable>
                  <el-option v-for="item of qrSpiderAccountOptions" :key="item.value + '|'+ item.label" :label="item.value" :value="item.value">
                    <span style="float: left">{{ item.value ? item.value + ' (' + item.orRemarkForBO + ')':'' }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label == ''? '--': item.label }}</span>
                  </el-option>
                </el-select>
              </div>
            </template>
            <template v-else-if="elem.key === 'OfflineQRID'">
              <div class="search-item">
                <span v-show="elem.label" class="label">{{ elem.label }}:</span>
                <el-select v-model="params.OfflineQRID" :clearable="elem.clear" :placeholder="$t('common_0004') + elem.label.toLowerCase()" filterable>
                  <el-option v-for="item of bankcardSpiderAccountOptions" :key="item.value + '|'+ item.label" :label="item.value" :value="item.offlineQRID">
                    <span style="float: left">{{ item.value ? item.value + ' (' + item.orRemarkForBO + ')':'' }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label == ''? '--': item.label }}</span>
                  </el-option>
                </el-select>
              </div>
            </template>

            <template v-else-if="elem.key === 'TrueMoneyAccount'">
              <div class="search-item">
                <span v-show="elem.label" class="label">{{ elem.label }}:</span>
                <el-select v-model="params.TrueMoneyAccount" :clearable="elem.clear" :placeholder="$t('common_0004') + elem.label.toLowerCase()" filterable>
                  <el-option v-for="item of trueMoneyAccountOptions" :key="item.value" :label="item.value" :value="item.value">
                    <span style="float: left">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label == ''? '--': item.label }}</span>
                  </el-option>
                </el-select>
              </div>
            </template>
            <template v-else-if="elem.key === 'PayTypeCode'">
              <div class="search-item">
                <span v-show="elem.label" class="label">{{ elem.label }}:</span>
                <el-select v-model="params.PayTypeCode" :clearable="elem.clear" :placeholder="$t('common_0004') + elem.label.toLowerCase()" filterable>
                  <el-option v-for="item of payTypeListOptions" :key="item.label" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </template>
            <template v-else-if="elem.key === 'CashoutTypeCode'">
              <div class="search-item">
                <span v-show="elem.label" class="label">{{ elem.label }}:</span>
                <el-select v-model="params.CashoutTypeCode" :clearable="elem.clear" :placeholder="$t('common_0004') + elem.label.toLowerCase()" filterable>
                  <el-option v-for="item of cashoutListOptions" :key="item.label" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </template>
            <template v-else>
              <div class="search-item">
                <span v-show="elem.label" class="label">{{ elem.label }}:</span>
                <el-select v-model="params[elem.key]" :class="elem.key" :clearable="elem.clear" :multiple="elem.multiple" :placeholder="$t('common_0004') + elem.label.toLowerCase()" @change="Change($event)">
                  <el-option v-for="item of elem.options" :key="item.value" :label="item.label" :value="item.value" />
                  <template #prefix>
                    <span v-show="elem.key === 'refresh' && params[elem.key] > 0">{{ second }}</span>
                  </template>
                </el-select>
              </div>
            </template>

          </template>

          <template v-if="elem.elemName === 'dateTime'">
            <div class="search-item">
              <span v-show="elem.label" class="label">{{ elem.label }}:</span>
              <el-date-picker
                v-model="dateTime"
                type="datetimerange"
                align="right"
                unlink-panels
                :range-separator="$t('common_0005')"
                :start-placeholder="$t('common_0006')"
                :end-placeholder="$t('common_0007')"
                :value-format="elem.format"
                :default-value="new Date()"
                :picker-options="dateOptions"
                :clearable="false"
                @change="ChangeDate($event, elem)"
              />
            </div>

          </template>

          <template v-if="elem.elemName === 'date'">
            <el-date-picker
              v-model="date"
              type="daterange"
              align="right"
              unlink-panels
              :range-separator="$t('common_0005')"
              :start-placeholder="$t('common_0006')"
              :end-placeholder="$t('common_0007')"
              :value-format="elem.format"
              :default-value="new Date()"
              :picker-options="dateOptions"
              @change="ChangeDate($event, elem)"
            />
          </template>

          <template v-if="elem.elemName === 'range'">
            <div class="search-item">
              <el-checkbox v-if="elem.control" v-model="params[elem.control.key]">{{ elem.control.label }}</el-checkbox>
              <span v-show="elem.label" class="label">{{ elem.label }}:</span>
              <div class="input-group">
                <el-input v-model="params[elem.min]" />
                <span class="diff">~</span>
                <el-input v-model="params[elem.max]" />
              </div>
            </div>
          </template>

          <template v-if="elem.elemName === 'checkbox'">
            <div class="search-item">
              <el-checkbox v-model="params[elem.key]">{{ elem.label }}</el-checkbox>
            </div>
          </template>

          <template v-if="elem.elemName === 'actions'">
            <template v-for="item of actions">
              <el-button
                v-if="(!user.IsSuper || user.IsSuper && !item.hideForSuperMerchant) && (!elem.role || item.role && roles[elem.role].Allow)"
                :key="item.key"
                :icon="item.icon"
                :type="item.type || 'primary'"
                :loading="item.key === 'export' && $parent.exportLoading"
                @click="HandleAction(item.key)"
              >{{ item.label }}</el-button>
            </template>
          </template>
          <template v-if="elem.elemName === 'checkboxGroup'">
            <div class="search-item">
              <el-checkbox-group v-model="params[elem.key]">
                <el-checkbox v-for="item in elem.options" :key="item.key" :label="item.key">{{ item.label }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </template>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
import { dateTime, monthDate } from '@/02-utils/index'
import { dateOptions } from '@/02-utils/keyMaps'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportSearch',
  props: {
    filters: {
      type: Array,
      default() {
        return []
      }
    },
    actions: {
      type: Array,
      default() {
        return []
      }
    },
    roles: {
      type: Object,
      default() {
        return {}
      }
    },
    second: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      dateOptions,
      date: [...monthDate()],
      dateTime: [...dateTime()],
      params: {}
    }
  },
  computed: {
    ...mapGetters(['user', 'currency', 'merchantList', 'payTypeList', 'cashoutTypeList', 'spiderAccountList', 'qrSpiderAccountList', 'bankcardSpiderAccountList', 'trueMoneyAccountList']),
    currencyList() {
      const list = this.currency.map(code => ({ value: code, label: code }))
      list.unshift({ value: '', label: this.$t('common_0082') })
      return list
    },
    spiderAccountOptions() {
      const list = this.spiderAccountList.map(item => ({ value: item.SpiderAccount, label: item.SourceType }))
      list.unshift({ value: '', label: this.$t('common_110') })
      return list
    },
    qrSpiderAccountOptions() {
      const list = this.qrSpiderAccountList.map(item => ({ value: item.SpiderAccount, label: item.MerchantName, orRemarkForBO: item.QRRemarkForBO, offlineQRID: item.OfflineQRID }))
      list.unshift({ value: '', label: this.$t('common_110') })
      return list
    },
    bankcardSpiderAccountOptions() {
      const list = this.bankcardSpiderAccountList.map(item => ({ value: item.SpiderAccount, label: item.MerchantName, orRemarkForBO: item.BankCardRemarkForBO, offlineQRID: item.OfflineBankCardID }))
      list.unshift({ value: '', label: this.$t('common_110') })
      return list
    },
    trueMoneyAccountOptions() {
      const list = this.trueMoneyAccountList.map(item => ({ value: item.OfflineTrueMoneyAccount, label: item.MerchantName }))
      list.unshift({ value: '', label: this.$t('common_111') })
      return list
    },
    payTypeListOptions() {
      const list = this.payTypeList.map(item => ({ value: item.PayTypeCode, label: item.PayTypeName }))
      list.unshift({ value: '', label: this.$t('common_0083') })
      return list
    },
    cashoutListOptions() {
      const list = this.cashoutTypeList.map(item => ({ value: item.CashoutTypeCode, label: item.CashoutTypeName }))
      list.unshift({ value: '', label: this.$t('common_0083') })
      return list
    }
  },
  watch: {
    filters: {
      handler(value) {
        this.date = [...monthDate()]
        this.dateTime = [...dateTime()]
        this.InitParams(value.flat())
      },
      immediate: true
    }
  },
  methods: {
    InitParams(list, isReset) {
      for (const item of list) {
        if (Object.prototype.hasOwnProperty.call(item, 'active')) {
          this.$set(this.params, item.key, item.active)
        }
        // if (item.key === 'MerchantAlias' && this.user.MerchantAlias) {
        //   this.$set(this.params, 'MerchantAlias', this.user.MerchantAlias)
        // }
        if (item.elemName === 'dateTime' && item.defaultValue) {
          this.dateTime = [...item.defaultValue]
        }
      }
    },
    EnterInput(key) {
      this.$emit('enter', { key, params: this.GetVaildParams() })
    },
    GetVaildParams() {
      const _params = {}
      for (const [key, value] of Object.entries(this.params)) {
        if (value === '' || value === null) continue
        _params[key] = value
      }
      return _params
    },
    Change() {
      this.$emit('change', this.GetVaildParams())
    },
    ChangeDate(date, item) {
      const [start, end] = date || dateTime()
      const dateParams = {
        [item.start]: start,
        [item.end]: end
      }
      Object.assign(this.params, dateParams)
    },
    ResetParams() {
      const _monthDate = monthDate()
      const _dateTime = dateTime()
      this.date = [..._monthDate]
      this.dateTime = [..._dateTime]
      for (const key of Object.keys(this.params)) {
        if (key === 'startTime') {
          this.params[key] = _dateTime[0]
        } else if (key === 'endTime') {
          this.params[key] = _dateTime[1]
        } else if (key === 'startDate') {
          this.params[key] = _monthDate[0]
        } else if (key === 'endDate') {
          this.params[key] = _monthDate[1]
        } else {
          this.params[key] = ''
        }
      }
      this.InitParams(this.filters.flat(), true)
    },
    HandleAction(type) {
      switch (type) {
        case 'reset':
          this.ResetParams()
          break
      }
      this.$emit('action', { type, params: this.GetVaildParams() })
    }
  }
}
</script>

<style lang="scss">
.filter-container {
  .el-row--flex {
    flex-wrap: wrap;

    + .el-row--flex {
      margin-top: 5px;
    }
  }
  .el-select {
    width: 100%;
    line-height: 1;
  }
  .el-button {
    height: 30px;
    align-self: flex-end;
  }
  .refresh {
      .el-input__prefix {
        left: unset;
        right: 30px;
        line-height: 28px;
      }
  }
  .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner,
  .el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner {
    width: 100%;
  }

  .el-col {
    min-width: 230px;
    max-width: 325px;

    &.is-datetime {
      min-width: 330px;
      max-width: 650px;
    }

    &.col-1 {
      min-width: 80px;
      max-width: 80px;
    }
    &.col-2 {
      min-width: 220px;
      max-width: 220px;
    }
    &.col-3 {
      min-width: 240px;
      max-width: 220px;
    }
    &.col-4{
      min-width: 260px;
      max-width: 400px;
    }
    &.col-5 {
      min-width: 330px;
      max-width: 650px;
    }
    &.col-10 {
      min-width: 330px;
      max-width: 100%;
    }
    &.is-action {
      display: flex;
      width: auto;
    }
  }

  .search-item {
    display: flex;
    line-height: 30px;
    .label {
      padding-right: 5px;
      font-size: 12px;
      color: #333;
    }
    .el-input {
      flex: 1;
    }
    .el-select {
      flex: 1;
    }
    .el-date-editor {
      flex: 1;
    }

    .input-group {
      flex: 1;
      display: flex;
      align-content: center;
      .diff {
        padding: 0 5px;
      }
    }
  }
  .el-button:not(:last-child) {
    margin-right: 10px;
  }

  .el-button + .el-button {
    margin: 0;
  }
}
</style>
