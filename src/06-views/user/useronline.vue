<template>
  <div class="app-container">
    <Search :filters="conf.filters" :roles="$route.meta.roles" :actions="conf.actions" @change="Change($event)" @action="Action($event)" @enter="Enter($event)" />
    <Report v-loading="loading" :list="list" width="100%" :expand="conf.report.expand" :items="conf.report.items" :roles="$route.meta.roles" :actions="conf.report.actions" @row-action="RowAction($event)" />
  </div>
</template>

<script>
import { getOnlineUserList, kickUser } from '@/03-api/user'
import conf, { search } from './config/useronline'
import Search from '@/01-components/Search'
import Report from '@/01-components/Report'
import mixinPage from '@/07-mixins/page'
import { mapGetters } from 'vuex'

export default {
  name: 'UserOnLine',
  components: { Search, Report },
  mixins: [mixinPage],
  data() {
    return {
      conf,
      search,
      params: { ...search },
      loading: false,
      list: [],
      model: { }
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
        const data = await getOnlineUserList(this.params)
        this.list = data
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    async kickUser(item) {
      try {
        const confirm = this.Confirm(this.$t('common_0045'), 'warning')
        confirm(kickUser, { SessionKey: item.SessionKey })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
