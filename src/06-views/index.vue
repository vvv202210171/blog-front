<template>
  <div class="index-container">
    <div class="hello">{{ $t('common_0035') }}: {{ user.UserName }} ({{ user.GroupName }})</div>
    <div class="title">{{ $t('common_0036') }}：</div>
    <el-table
      :data="list"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="LoginTS"
        :label="$t('common_0037')"
        width="180"
      />
      <el-table-column
        prop="LoginIP"
        :label="$t('common_0038')"
        width="180"
      />
      <el-table-column
        prop="LoginLocation"
        :label="$t('common_0039')"
      />
      <el-table-column
        prop="LastActiveTS"
        :label="$t('common_0040')"
      />
      <el-table-column
        prop="BrowserUserAgent"
        :label="$t('common_0041')"
        width="720"
      />
      <el-table-column
        prop="Remark"
        :label="$t('common_0042')"
      />
      <el-table-column
        fixed="right"
        :label="$t('common_0043')"
        width="100"
      >
        <template slot-scope="scope">
          <el-button v-show="scope.row.SessionKey != user.SessionKey" type="text" @click="kickuser(scope.row)">{{ $t('common_0044') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getLoginInfo } from '@/03-api/admin'
import { kickUser } from '@/03-api/user'
import pageMixin from '@/07-mixins/page'
export default {
  name: 'Index',
  components: { },
  mixins: [pageMixin],
  data() {
    return {
      list: [],
      loading: true
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
      try {
        this.loading = true
        const res = await getLoginInfo()
        this.loading = false
        this.list = res
      } catch (error) {
        this.loading = false
      }
    },
    async kickuser(item) {
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
.index-container {
  color: #333;
  padding: 15px;
  font-size: 14px;
  .title {
    padding-top: 10px;
  }
}
</style>
