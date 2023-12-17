<template>
  <div class="app-container api-data">
    <Search :filters="conf.filters" :roles="$route.meta.roles" :actions="conf.actions" @change="Change($event)" @action="Action($event)" @enter="Enter($event)" />
    <div class="model-container">
      <div class="title">{{ $t('report_0228') }}:</div>
      <div class="form-item">
        <div class="label">{{ $t('report_0038') }}:</div>
        <div class="value"><el-input :value="model.MerchantAlias" readonly /></div>
      </div>
      <div class="form-item">
        <div class="label">{{ $t('report_0039') }}:</div>
        <div class="value"><el-input :value="model.MerchantName" readonly /></div>
      </div>
      <div v-show="model.MerchantAlias" class="form-item">
        <div class="label">{{ $t('report_0228') }}:</div>
        <div class="value"> <el-button type="text" :disabled="!hasRole" @click="showAPIKey">{{ hasRole ? $t('report_0229') : $t('report_0230') }}</el-button> </div>
      </div>
    </div>

    <div class="report-container">
      <div class="title">{{ $t('report_0231') }}:</div>
      <Report v-loading="loading" :list="list" width="100%" :expand="conf.report.expand" :items="conf.report.items" :roles="$route.meta.roles" :actions="conf.report.actions" @row-action="RowAction($event)" />
    </div>

    <div class="report-container">
      <div class="title">{{ $t('report_0232') }}:</div>
      <Report v-loading="loading" :list="list2" width="100%" :expand="conf.report2.expand" :items="conf.report2.items" :roles="$route.meta.roles" :actions="conf.report2.actions" @row-action="RowAction($event)" />
    </div>

    <PrivateKeyInfo :show="showPrivateKeyInfoModal" :model="model" @closed="onClosed" />
    <EditorPassword :show="showEditorWithdrawPasswordModal" @closed="onClosed" />
  </div>
</template>

<script>
import { apiDataManagementInfo, getMerchantAPIKey } from '@/03-api/merchant'
import conf, { search } from './config/apiDataManagement'
import Search from '@/01-components/Search'
import Report from '@/01-components/Report'
import mixinPage from '@/07-mixins/page'
import { mapGetters } from 'vuex'

import PrivateKeyInfo from './component/privateKeyInfo.vue'
import EditorPassword from './component/editorPassword.vue'
export default {
  name: 'ApiDataManagement',
  components: { Search, Report, PrivateKeyInfo, EditorPassword },
  mixins: [mixinPage],
  data() {
    return {
      conf,
      search,
      params: { ...search },
      loading: false,
      showPrivateKeyInfoModal: false,
      showEditorWithdrawPasswordModal: false,
      list: [],
      list2: [],
      hasRole: false,
      model: { },

      hideMerchantALLOption: true
    }
  },
  computed: {
    ...mapGetters(['user', 'merchantList'])
  },
  watch: {
    merchantList: {
      handler(list) {
        if (list.length) {
          this.loadList()
        }
      },
      immediate: true
    }
  },
  created() {
    this.hasRole = this.$route.meta.roles['0505_0001'].Allow
  },
  methods: {
    async loadList() {
      if (!this.user.IsSuper && !this.params.MerchantAlias) {
        this.params.MerchantAlias = this.user.MerchantAlias
      }
      this.loading = true
      this.model = this.merchantList.find(item => item.MerchantAlias === this.params.MerchantAlias) || {}
      try {
        const [listCashout, listPayChannel] = await apiDataManagementInfo(this.params)
        this.list = listCashout
        this.list2 = listPayChannel
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    async showAPIKey() {
      try {
        const { action, value } = await this.$prompt(this.$t('report_0227'), this.$t('common_0067'), {
          inputType: 'text',
          inputPattern: /^\S+$/,
          inputErrorMessage: this.$t('report_0227'),
          closeOnClickModal: false
        })
        if (action === 'confirm') {
          const { code, data } = await getMerchantAPIKey({ MerchantAlias: this.params.MerchantAlias, GoogleVerifyCode: value }, { isAction: true })
          if (code === 0) {
            this.model = data
            this.showPrivateKeyInfoModal = true
          }
        }
      } catch (error) {
        console.warn(error)
      }
    },

    editor() {
      this.showEditorWithdrawPasswordModal = true
    },

    onClosed() {
      this.showPrivateKeyInfoModal = false
      this.showEditorWithdrawPasswordModal = false
      this.model = {}
      this.loadList()
    }
  }
}
</script>

<style lang="scss">
.api-data {
.model-container {
    position: relative;
    padding: 20px 10px 15px;
    border: 1px solid #e6ebf5;
    margin-bottom: 20px;
    border-radius: 3px;

    .title {
        position: absolute;
        top: -8px;
        left: 10px;
        margin-bottom: 5px;
        font-size: 14px;
        background: #fff;
    }

    .form-item {
        display: flex;
        align-items: center;
        font-size: 12px;

        + .form-item {
            margin-top: 5px;
        }

        .label {
            padding-right: 5px;
        }
    }
}

.report-container {
    margin-bottom: 20px;
    .title {
        margin-bottom: 5px;
        font-size: 14px;
        background: #fff;
    }
}
}

</style>
