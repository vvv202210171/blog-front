import { getUserCurrentPermission } from "@/03-api/admin";
import router from "@/05-router";
import Layout from "@/layout";
const state = {
  routes: [],
  roles: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes;
    router.addRoutes(routes);
  },
  SET_ROLES(state, payload) {
    state.roles = payload;
  },
};

function _import(file) {
  return (resolve) => require([`@/06-views${file}.vue`], resolve);
}

const actions = {
  //   AdminMenuCode  AdminMenuName  PageName  PageName_enUS  RouteName
  // A0006  站点管理  基础设置  Basic Setting  /site/basicSetting
  // A0006  站点管理  Banner设置  Banner Setting  /site/bannerSetting
  // A0007  内容管理  文章管理  Article management  /content/articleManagement
  // A0007  内容管理  轮播图管理  Carousel Management  /content/carouselManagement
  // A0007  内容管理  广告管理  Advertising Management  /content/advertisingManagement
  // A0007  内容管理  品牌站推荐管理  Brand Management  /content/brandManagement
  async generateRoutes({ commit }) {
    try {
      let res = await getUserCurrentPermission();
      commit("SET_ROLES", res);
      let _baseIndex = 0;
      const defaultRoutes = [
        {
          AdminMenuCode: "A0007",
          AdminMenuName: "编辑文章",
          PageName: "编辑文章",
          PageName_enUS: "Article management",
          RouteName: "/content/Update",
          hidden: true,
          FunctionList: [],
        },
        {
          AdminMenuCode: "A0007",
          AdminMenuName: "新增文章",
          PageName: "新增文章",
          PageName_enUS: "Article management",
          RouteName: "/content/Add",
          hidden: true,
          FunctionList: [],
        },
        {
          AdminMenuCode: "A0007",
          AdminMenuName: "新增广告",
          PageName: "新增广告",
          PageName_enUS: "Advertising Management",
          RouteName: "/content/advertisingManagementAdd",
          hidden: true,
          FunctionList: [],
        },
        {
          AdminMenuCode: "A0007",
          AdminMenuName: "编辑广告",
          PageName: "编辑广告",
          PageName_enUS: "Advertising Management",
          RouteName: "/content/advertisingManagementUpdate",
          hidden: true,
          FunctionList: [],
        },
      ];
      res = res.concat(defaultRoutes);
      const routes = res.reduce((prev, curr, index) => {
        if (!prev[curr.AdminMenuCode]) {
          _baseIndex++;
        }
        const childRoute = {
          path: curr.RouteName,
          component: _import(curr.RouteName),
          name: curr.PageName,
          hidden: curr.hidden ? curr.hidden : false,
          meta: {
            title: curr.PageName,
            index: `${_baseIndex}-${index}`,
            roles: curr.FunctionList.reduce((prev, curr) => {
              prev[curr.PageFunctionCode] = curr;
              return prev;
            }, {}),
          },
        };
        if (prev[curr.AdminMenuCode]) {
          prev[curr.AdminMenuCode].children.push(childRoute);
        } else {
          prev[curr.AdminMenuCode] = {
            path: "/",
            component: Layout,
            name: curr.AdminMenuName,
            meta: {
              index: "" + _baseIndex,
              title: curr.AdminMenuName,
              icon: curr.icon,
            },
            children: [childRoute],
          };
        }

        return prev;
      }, {});
      const routeList = Object.values(routes);
      routeList.unshift({
        path: "/502",
        hidden: true,
      });
      commit("SET_ROUTES", routeList);
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
