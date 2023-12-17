<!-- <template>
  <div class="app-container">
    <Search :filters="conf.filters" :roles="$route.meta.roles" :actions="conf.actions" :second="second" @change="Change($event)" @action="Action($event)" @enter="Enter($event)" />
    <Report v-loading="loading" :list="list" width="100%" :expand="conf.report.expand" :items="conf.report.items" :roles="$route.meta.roles" :actions="conf.report.actions" @row-action="RowAction($event)">
      <template #BindingMerchantAlias="{ item }">
        <div>{{ item.BindingMerchantAlias == '' ? '--' : item.MerchantName + ' - ' + item.BindingMerchantAlias }}</div>
      </template>
      <template #CurrentBalance="{ item }">
        <div class="col-item">
          <span :class="{ 'color-error' : item.CurrentBalance < 5000 }">{{ item.CurrentBalance }}</span>
        </div>
      </template>
      <template #IsMonitor="{ item }">

        <el-button :type="item.IsMonitor ? 'success' : 'danger'" plain size="mini">{{ item.IsMonitor ? $t('common_114') : $t('common_115') }}</el-button>

      </template>
    </Report>
  </div>
</template>

<script>
import { queryCashoutBankCardMonitorList } from '@/03-api/own'
import conf, { search } from './config/offlineCashoutBankCardMonitor'
import Search from '@/01-components/Search'
import Report from '@/01-components/Report'
import mixinPage from '@/07-mixins/page'
import { mapGetters } from 'vuex'

export default {
  name: 'CashoutBankCardMonitor',
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
        const data = await queryCashoutBankCardMonitorList(this.params)
        this.list = data
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    onClosed() {
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
  color: yellow;
}
.color-error {
  color: #F56C6C;
}
</style>
 -->
