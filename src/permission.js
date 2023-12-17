import router from './05-router'
import store from './04-store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/02-utils/auth' // get token from cookie
import getPageTitle from '@/02-utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/401', '/forbidden'] // no redirect whitelist
import { checkSession } from '@/03-api/admin'
import { check } from '@/03-api/common'
let timer = null

const stopCheckSession = () => {
  clearInterval(timer)
  timer = null
}

const startCheckSession = () => {
  if (timer) {
    stopCheckSession()
  }
  timer = setInterval(checkSession, 60 * 1000)
}

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  if (to.path === '/login') {
    stopCheckSession()
    const { code, data } = await check({}, { isAction: true })
    if (code === 0) {
      next()
    } else if (code === 19) {
      next({ path: '/forbidden?ip=' + data })
    }

    NProgress.done()
  }
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      stopCheckSession()
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      const { permission_routes } = store.getters
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoutes = permission_routes && permission_routes.length > 0
      if (hasRoutes) {
        startCheckSession()
        next()
      } else {
        try {
          const success = await store.dispatch('permission/generateRoutes')
          if (success) {
            startCheckSession()
            next({ ...to, replace: true })
          }
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login`)
          stopCheckSession()
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    clearInterval(timer)
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
