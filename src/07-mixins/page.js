export default {
  data() {
    return {
      firstEnter: true,
      isCurrent: false,
      second: 0
    }
  },
  activated() {
    this.isCurrent = true
    if (this.firstEnter) {
      this.firstEnter = false
    } else {
      this.ResetParams()
      this.loadList()
    }
  },
  async created() {
    clearInterval(this.$store.state.app.timer)
    this.isCurrent = true
    if (this.params) {
      if ('MerchantAlias' in this.params) {
        await this.$store.dispatch('merchant/loadMerchantList', this.hideMerchantALLOption)
      }
      if ('CurrencyCode' in this.params) {
        await this.$store.dispatch('admin/loadCurrencyList')
      }
      if ('SpiderAccount' in this.params) {
        await this.$store.dispatch('admin/loadSpiderAccountList')
      }
      if ('QRSpiderAccount' in this.params) {
        await this.$store.dispatch('admin/loadQRSpiderAccountList')
      }
      if ('OfflineQRID' in this.params) {
        await this.$store.dispatch('admin/loadBankCardSpiderAccountList')
      }
      if ('TrueMoneyAccount' in this.params) {
        await this.$store.dispatch('admin/loadTrueMoneyAccountList')
      }
      if ('CashoutTypeCode' in this.params) {
        await this.$store.dispatch('admin/loadCashoutTypeList')
      }
      if ('PayTypeCode' in this.params) {
        await this.$store.dispatch('admin/loadPayTypeList')
      }
      if ('BankCode' in this.params) {
        await this.$store.dispatch('admin/loadBankList')
      }
      if (this.params.refresh > 0) {
        this.Refresh()
      }
    }
  },
  deactivated() {
    this.isCurrent = false
    clearInterval(this.$store.state.app.timer)
  },
  beforeDestroy() {
    clearInterval(this.$store.state.app.timer)
  },
  methods: {
    ResetParams() {
      this.params = { ...this.search }
    },
    Refresh() {
      if (!this.params || !('refresh' in this.params)) return
      clearInterval(this.$store.state.app.timer)
      if (this.params.refresh === 0) return
      this.second = this.params.refresh
      this.$store.state.app.timer = setInterval(() => {
        if (this.second === 0) {
          this.second = this.params.refresh
          this.loadList()
          return
        }
        this.second--
      }, 1000)
    },
    Change(params) {
      this.ResetParams()
      Object.assign(this.params, params)
      this.loadList()
      this.Refresh()
    },
    ChangePage(value) {
      this.params.PageNumber = value
      this.loadList()
    },
    HandleSizeChange(value) {
      this.params.PageNumber = 1
      this.params.PageSize = value
      this.loadList()
    },
    RowAction({ actionName, item }) {
      this[actionName](item)
    },
    Action({ type, params }) {
      switch (type) {
        case 'search':
          this.ResetParams()
          Object.assign(this.params, params)
          this.loadList()
          break
        case 'reset':
          this.ResetParams()
          this.loadList()
          break
        case 'create':
          this.showCreateModal = true
          if (this.create) {
            this.create()
          }
          break
        case 'back':
          this.$router.go(-1)
          break
        case 'export':
          this.HandleDownLoad()
          break
        default:
          this[type] && this[type]()
          break
      }
    },
    Enter({ key, params }) {
      Object.assign(this.params, params)
      this.loadList()
    },
    DownLoadFile(href) {
      const elink = document.createElement('a')
      elink.style.display = 'none'
      // elink.download = 'download'
      elink.href = href
      elink.target = '_blank'
      document.body.appendChild(elink)
      elink.click()
      document.body.removeChild(elink)
    },
    async HandleDownLoad() {
      let timer = null
      const message = this.$message({
        message: 'Loading...',
        iconClass: 'el-icon-loading',
        duration: 0,
        showClose: true,
        offset: (document.body.clientHeight / 2) - 50,
        onClose: () => {
          clearInterval(timer)
        }
      })
      try {
        var [url, second] = await this.exportList(this.params)
        if (second) {
          timer = setInterval(() => {
            if (second === 0) {
              clearInterval(timer)
              message.close()
              this.DownLoadFile(url)
              return
            }
            message.message = this.$t('report_0308', [second])
            second--
          }, 1000)
        }
      } catch (error) {
        message.close()
      }
    },
    BeforeClose(func, params, success) {
      return async(action, instance, done) => {
        if (action === 'cancel') return done()
        instance.confirmButtonLoading = true
        instance.confirmButtonText = `${this.$t('common_0071')}...`
        try {
          const { code, msg } = await func(params, { isAction: true })
          if (code === 0) {
            this.$message({ type: 'success', message: msg || this.$t('report_0017') })
            if (success) {
              success()
            } else {
              this.loadList && this.loadList()
            }
          }
        } catch (error) {
          console.warn(error)
        }
        instance.confirmButtonLoading = false
        done()
      }
    },
    Confirm(message, type = 'primary', title = this.$t('common_0067')) {
      return (func, params, success) => {
        this.$confirm(message, title, {
          type,
          lockScroll: false,
          beforeClose: this.BeforeClose(func, params, success)
        })
      }
    },
    Command(actionName, item) {
      this[actionName](item)
    },
    getSummaries(report, total, start = 0) {
      // debugger
      const sum = (list) => {
        return list.reduce((prev, curr) => {
          const value = Number(curr)
          if (!isNaN(value)) {
            return prev.add(curr)
          } else {
            return prev
          }
        }, 0)
      }
      return (param) => {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === start) {
            sums[index] = total ? `${this.$t('common_0103')}\n${this.$t('common_0102')}` : this.$t('common_0102')
            return
          }
          if (total && !report[index].summary && !report[index].summarys || index < start) {
            sums[index] = ''
          } else {
            if (report[index].summarys) {
              const arr = report[index].summarys.reduce((prev, curr) => {
                const values = data.map(item => Number(item[curr]))
                let value = 'N/A'
                if (!values.every(value => isNaN(value))) {
                  value = sum(values)
                }
                prev.push(value)
                return prev
              }, [])

              sums[index] = arr.join('\n')
            } else {
              const values = data.map(item => Number(item[column.property]))
              if (!values.every(value => isNaN(value))) {
                sums[index] = sum(values)
                if (total) {
                  sums[index] = Math.floor(sums[index] * 100) / 100 + '\n' + total[report[index].summary]
                } else {
                  sums[index] = Math.floor(sums[index] * 100) / 100
                }
              } else {
                sums[index] = 'N/A'
              }
            }
          }
        })

        return sums
      }
    }
  }
}

