<template>
  <el-table
    ref="report"
    v-loading="loading"
    :data="list"
    :show-summary="!!summaryMethod"
    :summary-method="summaryMethod"
    :default-sort="sort"
    :style="{ width: width }"
    fit
    border
    stripe
    min-width="100%"
    highlight-current-row
    @selection-change="Selected($event)"
  >
    <template v-if="expand.length">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item v-for="item of expand" :key="item.key" :label="item.label">
              <a v-if="item.isLink" class="el-link el-link--primary" :href="props.row[item.key]" target="_blank">{{ props.row[item.key] }}</a>
              <slot v-else-if="item.slot" :name="item.slot" :item="props.row" />
              <span v-else>{{ props.row[item.key] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
    </template>
    <template v-for="item of items">
      <el-table-column v-if="item.selection && (!item.role || item.role.includes(role))" :key="item.key" type="selection" align="center" :width="item.width" />
      <el-table-column
        v-else-if="!item.role || item.role.includes(role)"
        :key="item.key"
        :prop="item.key"
        :label="item.label"
        :align="item.align || 'center'"
        :width="item.width"
        :min-width="item.minWidth"
        :sortable="item.sortable"
        :fixed="item.fixed"
        :class-name="item.className"
      >
        <template v-if="item.headerHtml" #header> <span v-html="item.headerHtml" /> </template>
        <template slot-scope="{ row }">
          <span v-if="item.prefix">{{ item.prefix }}</span>
          <clipboard v-if="item.copyText" :text="row[item.key]" />
          <el-tag v-else-if="item.tag" :type="GetTagStatus(item.tag, row[item.key])">{{ GetMapsValue(item.maps, row[item.key]) }}</el-tag>
          <slot v-else-if="item.slot" :name="item.slot" :item="row" />
          <!-- <span v-else-if="item.format">{{ $moment(row[item.key]).format(item.format) }}</span> -->
          <span v-else-if="item.isAmount">{{ row[item.key] }} <span v-show="row.isSettleU">USDT</span> </span>
          <!-- <span v-else-if="item.maps">{{ GetMapsValue(item.maps, row[item.key]) }}</span> -->
          <span v-else-if="item.image">
            <el-image :src="row[item.key]" :style="{ background: item.bgColor || '#fff', 'width': item.cellWidth + 'px' }" /></span>
          <span v-else-if="item.key === 'action'">
            <el-button
              v-for="action of actionList"
              v-show="(!row.IsSuper || (row.IsSuper && !action.hideForSuperMerchant)) && (!row.IsDefault || (row.IsDefault && !action.hideForDefaultUser))"
              :key="action.code"
              :type="action.type || 'text'"
              @click="ClickRowAction(action.code, row)"
            > <slot :name="item.slot" :item="row">{{ action.name || roles[action.role].FunctionName }}</slot> </el-button>
          </span>
          <span v-else>{{ row[item.key] }}</span>
          <span v-if="item.suffix">{{ item.suffix }}</span>
          <slot v-if="item.append" :name="item.key" :row="row" />
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import keyMaps from '@/02-utils/keyMaps'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportTable',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    expand: {
      type: Array,
      default() {
        return []
      }
    },
    items: {
      type: Array,
      default() {
        return []
      }
    },
    actions: {
      type: Array,
      default() {
        return []
      }
    },
    roles: {
      type: Object,
      default() {
        return {}
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    summaryMethod: {
      type: Function
    },
    sort: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      keyMaps,
      timer: null
    }
  },
  computed: {
    ...mapGetters(['user']),
    actionList() {
      const hasRoles = Object.keys(this.roles).length > 0
      if (hasRoles) {
        return this.actions.filter(item => {
          return !item.role || this.roles[item.role] && this.roles[item.role].Allow
        })
      } else {
        return this.actions
      }
    }
  },
  watch: {
    list() {
      setTimeout(() => {
        this.ResetFooterColspan()
      }, 100)
    }
  },
  mounted() {
    this.SetTableHeight()
    window.onresize = () => {
      this.SetTableHeight()
    }
  },
  destroyed() {
    window.onscroll = null
  },
  methods: {
    ResetFooterColspan() {
      this.$nextTick(() => {
        const elems = document.querySelectorAll('.el-table__footer-wrapper td')
        if (elems.length && elems.length < this.items.length) {
          elems[0].setAttribute('colspan', this.items.length + 1 - elems.length)
          return
        }
        let padStart = 1
        if (elems) {
          for (const elem of elems) {
            if (!elem.querySelector('.cell').innerHTML) {
              padStart++
              document.querySelector('.el-table__footer-wrapper tr').removeChild(elem)
            } else {
              elem.setAttribute('colspan', padStart)
              elem.classList.add('text-right')
              break
            }
          }
        }
      })
    },
    SetTableHeight() {
      const elem = document.querySelector('.el-table__header-wrapper')
      const rect = elem.getBoundingClientRect()
      const originTop = rect.top + window.pageYOffset
      window.onscroll = () => {
        if (window.pageYOffset > originTop) {
          elem.style.cssText = `
            position: relative;
            transform: translate3d(0, ${window.pageYOffset - originTop}px, 0);
            z-index: 10;
            box-shadow: 0 0 30px -10px;
          `
        } else {
          elem.style.cssText = ''
        }
      }
    },
    GetMapsValue(mapName, key) {
      if (this.keyMaps[mapName]) {
        if (this.keyMaps[mapName][key]) {
          return this.keyMaps[mapName][key].text || this.keyMaps[mapName][key]
        } else {
          return '--'
        }
      } else {
        return '--'
      }
    },
    GetTagStatus(mapName, key) {
      if (this.keyMaps[mapName]) {
        return this.keyMaps[mapName][key].status
      } else {
        return ''
      }
    },
    ClickRowAction(actionName, item) {
      this.$emit('row-action', { actionName, item })
    },
    Selected(rows) {
      this.$emit('selected', rows)
    }
  }
}
</script>

<style lang="scss">
.el-table th {
  background-color: #f5f7fa;
}
.el-table .cell {
  // white-space: nowrap;
}
.el-table th > .cell {
  color: #204ca3;
  word-break: break-word;
}
.el-table__footer-wrapper {
  td:first-child {
    text-align: right;
  }
  .cell {
    white-space: pre;
  }
}

.el-button--text {
  text-decoration: underline;
}
</style>
