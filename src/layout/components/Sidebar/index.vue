<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        :router="false"
      >
        <sidebar-item :item="indexItem" base-path="/main" />
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.name"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import Layout from "@/layout/index.vue";
import i18n from "@/locales/index";
export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      indexItem: {
        path: "/main",
        index: "0",
        component: Layout,
        name: "Main",
        meta: {
          title: "泉湉博客",
          icon: "el-icon-s-home",
        },
        children: [],
      },
    };
  },
  computed: {
    ...mapGetters(["permission_routes", "sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, name } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.index) {
        return meta.index;
      }
      return name;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
