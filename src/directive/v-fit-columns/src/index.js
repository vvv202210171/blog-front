import './styles.css'
function adjustColumnWidth(table, padding = 0) {
  const colgroup = table.querySelector('colgroup')
  const colDefs = [...colgroup.querySelectorAll('col')]
  colDefs.forEach((col) => {
    const clsName = col.getAttribute('name')
    const cells = [
      ...table.querySelectorAll(`td.${clsName}`),
      ...table.querySelectorAll(`th.${clsName}`)
    ]
    if (cells[0]?.classList?.contains?.('leave-alone')) {
      return
    }
    const widthList = cells.map((el) => {
      return el.querySelector('.cell')?.scrollWidth || 0
    })
    const max = Math.max(...widthList)
    table.querySelectorAll(`col[name=${clsName}]:not(.total-col)`).forEach((el) => {
      el.setAttribute('width', max + 10)
    })
    table.querySelector(`col[name=gutter]`).setAttribute('width', 0)
  })
}

export default {
  install(Vue) {
    Vue.directive('fit-columns', {
      update() {},
      bind() {},
      inserted(el, binding) {
        // Vue.nextTick(function() {
        //   adjustColumnWidth(el, binding.value)
        // })
      },
      componentUpdated(el, binding) {
        if (!binding.value?.length) return
        el.setAttribute('id', 'r-table')
        Vue.nextTick(function() {
          adjustColumnWidth(el)
        })
      },
      unbind() {}
    })
  }
}
