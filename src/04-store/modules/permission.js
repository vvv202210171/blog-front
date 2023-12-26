import router from "@/05-router";
import Layout from "@/layout";
import { MENU_LIST } from "@/02-utils/enum";
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

// 转换为路由格式的对象
function convertToRoutes(menuList) {
  const routeMap = {};
  // 先创建所有的路由对象
  let index = 0;
  const routeArr = menuList.map((menuItem) => {
    const router = {
      path: menuItem.path,
      name: menuItem.name,
      hidden: menuItem.hidden,
      meta: {
        title: menuItem.menuName,
        parentId: menuItem.parentId,
        icon: menuItem.icon,
        index: "" + index++
      }
    }
    if (menuItem.parentId == 0) {
      router.children = [];
      router.component = Layout
      routeMap[menuItem.id] = router;
      return null;
    } else {
      router.component = _import(menuItem.path)
    }
    return router
  });
  index = 0;
  routeArr.filter(v => v != null).forEach(r => {
    routeMap[r.meta.parentId].children.push(r);
  });

  return Object.values(routeMap);
}
const actions = {
  //   AdminMenuCode  AdminMenuName  PageName  PageName_enUS  RouteName
  // A0006  站点管理  基础设置  Basic Setting  /site/basicSetting
  // A0006  站点管理  Banner设置  Banner Setting  /site/bannerSetting
  // A0007  内容管理  文章管理  Article management  /content/articleManagement
  // A0007  内容管理  轮播图管理  Carousel Management  /content/carouselManagement
  // A0007  内容管理  广告管理  Advertising Management  /content/advertisingManagement
  // A0007  内容管理  品牌站推荐管理  Brand Management  /content/brandManagement
  async generateRoutes({ commit, dispatch }) {
    try {
      let res = [];

      //await dispatch("admin/loginInfo")
      dispatch("admin/loginInfo", null, { root: true })
      const routeList = convertToRoutes(MENU_LIST);
      console.log(routeList)
      routeList.unshift({
        path: "/502",
        hidden: true,
      });
      commit("SET_ROUTES", routeList);
      return true;
    } catch (error) {
      console.error(error)
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
