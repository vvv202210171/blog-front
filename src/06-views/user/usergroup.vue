<template>
  <div class="app-container user-groups">
    <Search :filters="conf.filters" :roles="$route.meta.roles" :actions="conf.actions" @change="Change($event)" @action="Action($event)" @enter="Enter($event)" />
    <Report v-loading="loading" :list="list" width="100%" :expand="conf.report.expand" :items="conf.report.items" :roles="$route.meta.roles" :actions="conf.report.actions" @row-action="RowAction($event)">
      <template #IsDefault="{ item }">
        <span>{{ item.IsDefault ? $t('report_0103') : '' }}</span>
      </template>

    </Report>
  </div>
</template>

<script>
import { getUserGroupList, addUserGroup, updateUserGroup, deleteUserGroup } from '@/03-api/user'
import conf, { search } from './config/userGroup'
import Search from '@/01-components/Search'
import Report from '@/01-components/Report'
import mixinPage from '@/07-mixins/page'
import { mapGetters } from 'vuex'

export default {
  name: 'UserGroupList',
  components: { Search, Report },
  mixins: [mixinPage],
  data() {
    return {
      conf,
      search,
      params: { ...search },
      loading: false,
      list: [],
      model: { },
      hideMerchantALLOption: true
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.loadList()
  },
  methods: {
    async loadList() {
      this.loading = true
      try {
        const data = await getUserGroupList(this.params)
        this.list = data
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    async create() {
      try {
        const { action, value } = await this.$prompt(this.$t('report_0104'), this.$t('common_0063'), {
          inputPattern: /^.+$/,
          inputErrorMessage: this.$t('common_0064'),
          closeOnClickModal: false
        })
        if (action === 'confirm') {
          const { code, msg } = await addUserGroup({ UserGroupName: value }, { isAction: true })
          if (code === 0) {
            this.loadList()
            this.$message.success(msg || this.$t('common_0065'))
          }
        }
      } catch (error) {
        console.warn(error)
      }
    },

    async editor(item) {
      try {
        const { action, value } = await this.$prompt(this.$t('report_0104'), this.$t('common_0059'), {
          inputPattern: /^\S+$/,
          inputErrorMessage: this.$t('common_0064'),
          inputValue: item.UserGroupName,
          closeOnClickModal: false
        })
        if (action === 'confirm') {
          const { code, msg } = await updateUserGroup({ UserGroupId: item.UserGroupID, UserGroupName: value }, { isAction: true })
          if (code === 0) {
            this.loadList()
            this.$message.success(msg || this.$t('common_0052'))
          }
        }
      } catch (error) {
        console.warn(error)
      }
    },

    roleSetting(item) {
      this.$store.commit('user/SET_ACTIVE', item)
      this.$router.push('/user/userGroupRole')
    },

    async delete(item) {
      const confirm = this.Confirm(this.$t('report_0105').replace(/\{\s?usergroup\s?\}/, item.UserGroupName), 'warning')
      confirm(deleteUserGroup, { UserGroupId: item.UserGroupID })
    },

    onClosed() {
      this.showCreateModal = false
      this.model = {}
      this.loadList()
    }
  }
}
</script>

<style lang="scss">
.user-groups {

}
</style>
