<template>
  <div class="app-container">
    <Search :filters="conf.filters" :roles="$route.meta.roles" :actions="conf.actions" @change="Change($event)" @action="Action($event)" @enter="Enter($event)" />
    <Report v-loading="loading" :list="list" width="100%" :expand="conf.report.expand" :items="conf.report.items" :roles="$route.meta.roles" :actions="conf.report.actions" @row-action="RowAction($event)">
      <template #IsDefault="{ item }">
        <span>{{ item.IsDefault ? $t('report_0108') : '' }}</span>
      </template>
      <template #Enable="{ item }">
        <span :class="item.Enable ? 'color-success' : 'color-error'">{{ item.Enable ? $t('common_0048') : $t('common_0049') }}</span>
      </template>
    </Report>

    <CreateModal :show="showCreateModal" :model="model" @closed="onClosed" />
    <ResetPassword :show="showResetPasswordModal" :model="model" @closed="onClosed" />
    <GoogleVerifyInfo :show="showGoogleVerifyCode" :verify-info="verifyInfo" @closed="onClosed" />
  </div>
</template>

<script>
import { getUserList, getValidatorInfo } from '@/03-api/user'
import conf, { search } from './config/userlist'
import Search from '@/01-components/Search'
import Report from '@/01-components/Report'
import mixinPage from '@/07-mixins/page'

import CreateModal from './component/user.vue'
import ResetPassword from './component/resetPassword.vue'
import GoogleVerifyInfo from './component/googleVerifyInfo.vue'

export default {
  name: 'UserList',
  components: { Search, Report, CreateModal, ResetPassword, GoogleVerifyInfo },
  mixins: [mixinPage],
  data() {
    return {
      conf,
      search,
      params: { ...search },
      showCreateModal: false,
      showResetPasswordModal: false,
      showGoogleVerifyCode: false,
      loading: false,
      list: [],
      model: { },
      verifyInfo: [],
      hideMerchantALLOption: true
    }
  },
  computed: {
  },
  created() {
    this.loadList()
  },
  methods: {
    async loadList() {
      this.loading = true
      try {
        const data = await getUserList(this.params)
        this.list = data
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    create() {
      this.showCreateModal = true
    },

    editor(item) {
      this.model = item
      this.showCreateModal = true
    },

    reset(item) {
      this.model = item
      this.showResetPasswordModal = true
    },

    async showGoogleCode(item) {
      try {
        const { action, value } = await this.$prompt(this.$t('common_0066'), this.$t('common_0067'), {
          inputType: 'password',
          inputPattern: /^\S+$/,
          inputErrorMessage: this.$t('common_0066'),
          closeOnClickModal: false
        })
        if (action === 'confirm') {
          const { code, data } = await getValidatorInfo({ UserName: item.UserName, LoginPassword: value }, { isAction: true })
          if (code === 0) {
            this.verifyInfo = data.ValidatorInfo
            this.showGoogleVerifyCode = true
          }
        }
      } catch (error) {
        console.warn(error)
      }
    },

    onClosed() {
      this.showCreateModal = false
      this.showResetPasswordModal = false
      this.showGoogleVerifyCode = false
      this.model = {}
      this.verifyInfo = []
      this.loadList()
    }
  }
}
</script>

<style lang="scss">
</style>
