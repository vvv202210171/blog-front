<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="search-item">
        <span class="label">{{ $t('report_0018') }}：</span>
        <el-select v-model="params.MerchantAlias" :placeholder="$t('report_0018')" filterable @change="loadList">
          <el-option v-for="item of merchantList" :key="item.MerchantAlias" :value="item.MerchantAlias" :label="item.MerchantName" />
        </el-select>
      </div>

      <el-button type="primary" class="btn" :loading="submiting" @click="save">{{ $t('common_0050') }}</el-button>
    </div>

    <div class="table-container">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        stripe
        fit
        border
        class="table-level-1"
        :data="list"
        tooltip-effect="dark"
        @select-all="handleSelectionSelectALL"
        @select="handleSelect"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          :label="$t('report_0035')"
          width="250"
        >
          <template slot-scope="scope">{{ scope.row.AdminMenuName }}</template>
        </el-table-column>

        <el-table-column
          :label="$t('report_0036')"
        >
          <template slot-scope="scope">
            <el-checkbox-group v-model="scope.row.Selected">
              <el-checkbox v-for="item of scope.row.PageList" :key="item.PagePermissionCode" :label="item.PagePermissionCode">{{ item.PageName }} </el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { permissionList, updateMerchantPermission } from '@/03-api/merchant'
export default {
  data() {
    return {
      list: [],
      loading: false,
      params: {
        MerchantAlias: ''
      },
      submiting: false
    }
  },
  computed: {
    ...mapGetters(['user', 'merchantList'])
  },
  created() {
    this.$store.dispatch('merchant/loadMerchantList', true)
    this.params.MerchantAlias = this.user.MerchantAlias
    this.loadList()
  },
  methods: {
    async loadList() {
      try {
        this.loading = true
        const data = await permissionList(this.params)
        const permissions = data.reduce((prev, curr) => {
          const page = { PagePermissionCode: curr.PagePermissionCode, PageName: curr.PageName, FunctionList: curr.FunctionList }
          if (prev[curr.AdminMenuCode]) {
            prev[curr.AdminMenuCode].PageList.push(page)
          } else {
            prev[curr.AdminMenuCode] = {
              AdminMenuCode: curr.AdminMenuCode,
              AdminMenuName: curr.AdminMenuName,
              PageList: [page],
              Selected: []
            }
          }

          if (curr.Allow) {
            prev[curr.AdminMenuCode].Selected.push(curr.PagePermissionCode)
          }
          return prev
        }, {})
        this.list = Object.values(permissions)
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    async save() {
      const codeList = this.list.reduce((prev, curr) => {
        prev.push(...curr.Selected)
        return prev
      }, [])
      try {
        this.submiting = true
        const { code, msg } = await updateMerchantPermission({ MerchantAlias: this.params.MerchantAlias, PagePermissionCode: codeList }, { isAction: true })
        this.submiting = false
        if (code === 0) {
          this.loadList()
          this.$message.success(msg || this.$t('common_0052'))
        }
      } catch (error) {
        console.log(error)
        this.submiting = false
      }
    },
    handleSelect(selection, row) {
      const selected = selection.find(item => item.AdminMenuCode === row.AdminMenuCode)
      const item = this.list.find(item => item.AdminMenuCode === row.AdminMenuCode)
      if (selected) {
        item.Selected = item.PageList.map(item => item.PagePermissionCode)
      } else {
        item.Selected = []
      }
    },
    handleSelectionSelectALL(list) {
      if (list.length > 0) {
        list.forEach(item => {
          item.Selected = item.PageList.map(page => page.PagePermissionCode)
        })
      } else {
        this.list = this.list.map(item => ({ ...item, Selected: [] }))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-container {
    display: flex;
    align-items: center;
    .btn {
      margin-left: 5px;
    }
    .search-item {
      .label {
        font-size: 14px;
        color: #333;
      }
    }
  }

  .table-container {
    display: flex;
  }
  .table-level-1 {
    // width: auto;
    // flex: unset;
    // border-top: 1px solid #dfe6ec;
    // border-left: 1px solid #dfe6ec;
    // border-right: 1px solid #dfe6ec;
    // &::after {
    //   content: unset;
    // }
  }

  .table-level-2 {

    border-top: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
  }
</style>
