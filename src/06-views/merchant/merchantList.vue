<template>
  <div class="app-container">
    <Search :filters="conf.filters" :roles="$route.meta.roles" :actions="conf.actions" @change="Change($event)" @action="Action($event)" @enter="Enter($event)" />
    <Report v-loading="loading" :list="list" width="100%" :expand="conf.report.expand" :items="conf.report.items" :roles="$route.meta.roles" :actions="conf.report.actions" @row-action="RowAction($event)">
      <template #merchantName="{ item }">
        <span>{{ item.MerchantName }}</span>(<span :class="item.IsSuper ? 'color-primary' : 'color-default'">{{ item.IsSuper ? $t('merchant_0001') : $t('merchant_0002') }}</span>)
      </template>
      <template #CashoutOrderAutoConfirm="{ item }">
        <div :class="item.CashoutOrderAutoConfirm ? 'color-primary' : 'color-error'">{{ item.CashoutOrderAutoConfirm ? $t('report_0362'):$t('report_0363') }}</div>
        <div>{{ $t('report_0364') + item.CashoutOrderAutoConfirmMinAmount + ' ~ ' + item.CashoutOrderAutoConfirmMaxAmount }} </div>
      </template>
      <template #MerchantStatus="{ item }">
        <span v-if="item.MerchantStatus == 1" class="color-success">{{ $t('common_0048') }}</span>
        <span v-if="item.MerchantStatus == 2" class="color-warning">{{ $t('common_0054') }}</span>
        <span v-if="item.MerchantStatus == 3" class="color-error">{{ $t('common_0049') }}</span>
      </template>
      <template #TelegramNotifyChannel="{ item }">
        {{ item.TelegramNotifyChannel || '--' }}
      </template>

    </Report>

    <CreateModal :show="showCreateModal" :model="model" @closed="onClosed" />
    <ApiWhiteIP :show="showAPIWhiteIP" :model="model" @closed="onClosed" />
    <PrivateKeyInfo :show="showPrivateKeyInfo" :model="model" @closed="onClosed" />
    <ResetWithdrawPassword :show="showResetWithdrawPasswordModal" :model="model" @closed="onClosed" />
  </div>
</template>

<script>
import { merchantList, getPrivateKey } from '@/03-api/merchant'
import conf, { search } from './config/merchantList'

import Search from '@/01-components/Search'
import Report from '@/01-components/Report'
import mixinPage from '@/07-mixins/page'

import CreateModal from './component/createMerchant.vue'
import ApiWhiteIP from './component/apiWhiteIP.vue'
import PrivateKeyInfo from './component/PrivateKeyInfo.vue'
import ResetWithdrawPassword from './component/resetWithdrawPassword'
export default {
  name: 'MerchantList',
  components: { Search, Report, CreateModal, ApiWhiteIP, PrivateKeyInfo, ResetWithdrawPassword },
  mixins: [mixinPage],
  data() {
    return {
      conf,
      search,
      params: { ...search },
      showCreateModal: false,
      showAPIWhiteIP: false,
      showPrivateKeyInfo: false,
      showResetWithdrawPasswordModal: false,
      loading: false,
      list: [],
      model: { }
    }
  },
  computed: {
  },
  created() {
    this.$store.dispatch('admin/loadCurrencyList')
    this.loadList()
  },
  methods: {
    async loadList() {
      this.loading = true
      try {
        const data = await merchantList(this.params)
        this.list = data
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    editor(item) {
      this.model = item
      this.showCreateModal = true
    },

    apiWhiteIP(item) {
      this.model = item
      this.showAPIWhiteIP = true
    },

    async showPrivateKeyModel(item) {
      try {
        const { action, value } = await this.$prompt(this.$t('report_0227'), this.$t('common_0067'), {
          inputType: 'text',
          inputPattern: /^\S+$/,
          inputErrorMessage: this.$t('report_0227'),
          closeOnClickModal: false
        })
        if (action === 'confirm') {
          const { code, data } = await getPrivateKey({ ...item, GoogleVerifyCode: value }, { isAction: true })
          if (code === 0) {
            this.model = data
            this.showPrivateKeyInfo = true
          }
        }
      } catch (error) {
        console.warn(error)
      }
    },

    payChannelSetting(item) {
      this.$store.dispatch('merchant/setActiveMerchant', item)
      this.$router.push('/merchant/payChannelSetting')
    },
    cashoutSetting(item) {
      this.$store.dispatch('merchant/setActiveMerchant', item)
      this.$router.push('/merchant/cashoutSetting')
    },
    resetWithdrawPassword(item) {
      this.model = item
      this.showResetWithdrawPasswordModal = true
    },

    onClosed() {
      this.showCreateModal = false
      this.showAPIWhiteIP = false
      this.showPrivateKeyInfo = false
      this.showResetWithdrawPasswordModal = false
      this.model = {}
      this.loadList()
    }
  }
}
</script>

<style lang="scss">
.color-success {
  color: #67C23A;
}
.color-warning {
  color: #E6A23C;
}
.color-error {
  color: #F56C6C;
}
</style>
