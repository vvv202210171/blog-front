<template>
  <div class="app-container pay-channel-setting">
    <div class="header">
      <div class="curr-merchant">
        {{ $t('report_0034') }}-{{ active.MerchantName }}({{ active.MerchantAlias }})
      </div>
      <div class="actions">
        <el-button type="primary" :loading="submiting" @click="save">{{ $t('common_0050') }}</el-button>
        <el-button type="default" @click="back">{{ $t('common_0046') }}</el-button>
      </div>
    </div>
    <Report v-loading="loading" :list="list" width="100%" :expand="conf.report.expand" :items="conf.report.items" :actions="conf.report.actions" @row-action="RowAction($event)">
      <template #SortIndex="{ item }">
        <el-input v-model.number="item.SortIndex" />
      </template>
      <template #Enable="{ item }">
        <el-switch
          v-model="item.Enable"
          :active-text="$t('common_0048')"
          :inactive-text="$t('common_0049')"
        />
      </template>
      <template #ServiceFee="{ item }">
        <div :class="['el-form-item', { 'is-error': item.ServiceFee < 0 } ]">
          <el-input v-model="item.ServiceFee" :min="0" />
        </div>
      </template>
      <template #MinServiceFeeAmount="{ item }">
        <div :class="['el-form-item', { 'is-error': item.MinServiceFeeAmount < 0 || item.MinServiceFeeAmount > item.MaxServiceFeeAmount } ]">
          <el-input v-model="item.MinServiceFeeAmount" :min="0" :max="item.MaxServiceFeeAmount" />
        </div>
      </template>
      <template #MaxServiceFeeAmount="{ item }">
        <el-input v-model="item.MaxServiceFeeAmount" :min="item.MinServiceFeeAmount" />
      </template>
    </Report>
  </div>
</template>

<script>
import { getPayChannelList, updatePayChannel } from '@/03-api/merchant'
import conf, { search } from './config/payChannelSetting'
import Report from '@/01-components/Report'
import mixinPage from '@/07-mixins/page'
import { mapState } from 'vuex'

export default {
  name: 'PayChannelSetting',
  components: { Report },
  mixins: [mixinPage],
  data() {
    return {
      conf,
      search,
      params: { ...search },
      loading: false,
      submiting: false,
      list: []
    }
  },
  computed: {
    ...mapState('merchant', ['active'])
  },
  created() {
    this.loadList()
  },
  methods: {
    async loadList() {
      try {
        this.params.MerchantAlias = this.active.MerchantAlias
        if (!this.params.MerchantAlias) {
          this.$router.push('/merchant/merchantList')
          return
        }
        this.loading = true
        const data = await getPayChannelList(this.params)
        this.list = data
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    async save() {
      const unvaildRows = this.list.find(item => {
        const serviceFeeUnVaild = item.ServiceFee < 0
        const minServiceFeeAmountUnVaild = item.MinServiceFeeAmount < 0 || item.MinServiceFeeAmount > item.MaxServiceFeeAmount
        return serviceFeeUnVaild || minServiceFeeAmountUnVaild
      })
      if (unvaildRows) {
        this.$message.error(this.$t('common_0051'))
        return
      }
      this.submiting = true
      const { code, msg } = await updatePayChannel({ MerchantAlias: this.active.MerchantAlias, SettingList: this.list }, { isAction: true })
      this.submiting = false
      if (code === 0) {
        this.loadList()
        this.$message.success(msg || this.$t('common_0052'))
      }
    },

    back() {
      this.$router.push('/merchant/merchantList')
    },

    onClosed() {
      this.loadList()
    }
  }
}
</script>

<style lang="scss">
.pay-channel-setting {
  .header {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    .curr-merchant {
      padding-right: 5px;
      font-size: 14px;
    }
  }
  .el-form-item {
    margin-bottom: 0;
  }
}

</style>
