import Vue from "vue";
import Router from "vue-router";
import i18n from "@/locales/index";
Vue.use(Router);

/* Layout */
import Layout from "@/layout";


export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/06-views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/06-views/login/index"),
    hidden: true,
  },
  {
    path: "/auth-redirect",
    component: () => import("@/06-views/login/auth-redirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/06-views/error-page/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/06-views/error-page/401"),
    hidden: true,
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    component: () => import("@/06-views/forbidden"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/main",
    children: [
      {
        path: "main",
        component: () => import("@/06-views/index"),
        name: "Main",
        meta: { title: i18n.t("common_0031"), icon: "main", affix: true },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/user/userGroupRole",
        component: () => import("@/06-views/user/userGroupRole"),
        meta: {
          title: i18n.t("common_0034"),
        },
      },
    ],
  },
];


const createRouter = () =>
  new Router({
    mode: "history", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
