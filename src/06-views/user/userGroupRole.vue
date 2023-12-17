<template>
  <div class="app-container user-group-role">
    <div class="filter-container">
      <div class="curr-info">{{ $t('report_0106') }}: {{ active.UserGroupName }}</div>
      <el-button type="primary" class="btn" :loading="submiting" @click="save">{{ $t('common_0050') }}</el-button>
      <el-button type="default" class="btn" :loading="submiting" @click="back">{{ $t('common_0046') }}</el-button>
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
        :span-method="spanMethod"
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
          width="350"
        >
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.Allow" :label="scope.row.PagePermissionCode" @change="seriesChange($event, scope)">{{ scope.row.PageName }}</el-checkbox>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('report_0107')"
        >
          <template slot-scope="scope">
            <el-checkbox-group v-model="scope.row.PageFunctionCodeSelected">
              <el-checkbox v-for="item of scope.row.FunctionList" :key="item.PageFunctionCode" :label="item.PageFunctionCode" :disabled="!scope.row.Allow">{{ item.FunctionName }}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { getPermissionList, modifyUserGroupPermission } from '@/03-api/user'
export default {
  data() {
    return {
      list: [],
      loading: false,
      submiting: false
    }
  },
  computed: {
    ...mapState('user', ['active']),
    ...mapGetters(['user'])
  },
  created() {
    this.loadList()
  },
  destroyed() {
    this.$store.commit('user/REMOVE_ACTIVE')
  },
  methods: {
    async loadList() {
      try {
        if (!this.active.UserGroupID) {
          this.$router.push('/user/usergroup')
          return
        }
        this.loading = true
        const data = await getPermissionList({ UserGroupID: this.active.UserGroupID })
        this.list = data.map(row => ({ ...row, PageFunctionCodeSelected: row.FunctionList.filter(page => page.Allow).map(item => item.PageFunctionCode) }))
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    async save() {
      const selecated = this.list.filter(item => item.Allow)
      const PagePermissionCode = selecated.map(item => item.PagePermissionCode)
      const PageFunctionCode = selecated.reduce((prev, curr) => {
        prev.push(...curr.PageFunctionCodeSelected)
        return prev
      }, [])
      try {
        this.submiting = true
        const { code, msg } = await modifyUserGroupPermission({ UserGroupId: this.active.UserGroupID, PagePermissionCode, PageFunctionCode }, { isAction: true })
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
    back() {
      this.$router.push('/user/usergroup')
    },
    seriesChange(value, socpe) {
      if (value) {
        this.list[socpe.$index].PageFunctionCodeSelected = this.list[socpe.$index].FunctionList.map(item => item.PageFunctionCode)
      } else {
        this.list[socpe.$index].PageFunctionCodeSelected = []
      }
    },
    handleSelect(selection, row) {
      this.$set(row, 'selected', !row.selected)
      this.list.forEach((item, index) => {
        if (item.AdminMenuCode === row.AdminMenuCode) {
          item.Allow = row.selected
          this.seriesChange(item.Allow, { $index: index })
        }
      })
    },
    handleSelectionSelectALL(list) {
      const isActive = list.length === this.list.length
      this.list.forEach((item, index) => {
        item.Allow = isActive
        this.seriesChange(item.Allow, { $index: index })
      })
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if ([0, 1].includes(columnIndex)) {
        if (rowIndex >= 1 && this.list[rowIndex].AdminMenuCode === this.list[rowIndex - 1].AdminMenuCode) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        const rows = this.list.filter(item => item.AdminMenuCode === row.AdminMenuCode)
        if (rows.length) {
          return {
            rowspan: rows.length,
            colspan: 1
          }
        }
        // return {
        //   rowspan: 0,
        //   colspan: 0
        // }
      }
    }
  }
}
</script>

<style lang="scss">
.user-group-role {
  .filter-container {
    display: flex;
    align-items: center;
    .btn {
      margin-left: 5px;
    }
  }

  .el-table tbody tr:hover>td {
     background: transparent;
  }
}
</style>
