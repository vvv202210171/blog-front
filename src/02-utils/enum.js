export const ArticleStatusEnum = [
  {
    name: "已发布",
    code: "Enable",
    val: 1,
  },
  {
    name: "草稿",
    code: "Disable",
    val: 0,
  },
];


export const UserStatusEnum = [
  {
    name: "正常",
    code: "Enable",
    val: 1,
  },
  {
    name: "禁用",
    code: "Disable",
    val: 0,
  },

];

export const PageStatusEnum = [
  {
    name: "显示",
    code: "Enable",
    val: 1,
  },
  {
    name: "隐藏",
    code: "Disable",
    val: 0,
  },

];
export const LinkStatusEnum = [
  {
    name: "显示",
    code: "Enable",
    val: 1,
  },
  {
    name: "隐藏",
    code: "Disable",
    val: 0,
  },

];
export const NoticeStatusEnum = [
  {
    name: "显示",
    code: "Enable",
    val: 1,
  },
  {
    name: "隐藏",
    code: "Disable",
    val: 0,
  },

];
export const CommentStatusEnum = [
  {
    name: "允许",
    code: "Enable",
    val: 1,
  },
  {
    name: "不允许",
    code: "Disable",
    val: 0,
  },

];
export const MenuLevelEnum = [
  {
    name: "顶部菜单",
    code: "Enable",
    val: 1,
  },
  {
    name: "主体菜单",
    code: "Disable",
    val: 2,
  },

];
export const MENU_LIST = [
  {
    id: 1,
    parentId: 0,
    menuName: "文章",
    name: "article",
    hidden: false,
    path: "",
    icon: "el-icon-document"
  },
  {
    id: 2,
    parentId: 1,
    name: "article_list",
    menuName: "全部文章",
    hidden: false,
    path: "/article/index",
  },
  {
    id: 3,
    parentId: 1,
    name: "article_add",
    menuName: "写文章",
    hidden: false,
    path: "/article/Add",
  },
  {
    id: 9,
    parentId: 1,
    name: "article_edit",
    menuName: "编辑文章",
    hidden: true,
    path: "/article/Update",
  },
  {
    id: 7,
    parentId: 1,
    name: "category",
    menuName: "全部分类",
    hidden: false,
    path: "/category/index",
  },
  {
    id: 8,
    parentId: 1,
    name: "tag",
    menuName: "全部标签",
    hidden: false,
    path: "/tag/index",
  },
  {
    id: 4,
    parentId: 0,
    menuName: "页面",
    name: "page",
    hidden: false,
    path: "",
    icon: "el-icon-notebook-1"
  },
  {
    id: 5,
    parentId: 4,
    name: "page_list",
    menuName: "全部页面",
    hidden: false,
    path: "/page/index",

  },
  {
    id: 6,
    parentId: 4,
    name: "page_add",
    menuName: "添加页面",
    hidden: false,
    path: "/page/Add",
  },
  {
    id: 10,
    parentId: 4,
    name: "page_update",
    menuName: "修改页面",
    hidden: true,
    path: "/page/Update",
  },
  {
    id: 11,
    parentId: 0,
    name: "linK",
    menuName: "链接",
    icon: "el-icon-link",
    hidden: false,
    path: "",
  },
  {
    id: 12,
    parentId: 11,
    name: "link_list",
    menuName: "全部链接",
    hidden: false,
    path: "/link/index",
  },
  {
    id: 13,
    parentId: 11,
    name: "link_add",
    menuName: "添加链接",
    hidden: false,
    path: "/link/Add",
  },
  {
    id: 14,
    parentId: 11,
    name: "link_Update",
    menuName: "修改链接",
    hidden: true,
    path: "/link/Update",
  },
  {
    id: 15,
    parentId: 0,
    name: "notice",
    menuName: "公告",
    hidden: false,
    path: "",
    icon: "el-icon-chat-round",
  },
  {
    id: 16,
    parentId: 15,
    name: "notice_list",
    menuName: "全部公告",
    hidden: false,
    path: "/notice/index",
  },
  {
    id: 17,
    parentId: 15,
    name: "notice_add",
    menuName: "添加公告",
    hidden: false,
    path: "/notice/Add",
  },
  {
    id: 18,
    parentId: 15,
    name: "notice_update",
    menuName: "修改公告",
    hidden: true,
    path: "/notice/Update",
  },
  {
    id: 19,
    parentId: 0,
    name: "commnet",
    menuName: "评论",
    hidden: false,
    icon: "el-icon-s-comment",
    path: "",
  },
  {
    id: 20,
    parentId: 19,
    name: "commnet_list",
    menuName: "评论列表",
    hidden: false,
    path: "/comment/index",
  },
  {
    id: 21,
    parentId: 0,
    name: "user",
    menuName: "用户",
    hidden: false,
    icon: "el-icon-user",
    path: "",
  },
  {
    id: 22,
    parentId: 21,
    name: "user_list",
    menuName: "全部用户",
    hidden: false,
    path: "/user/index",
  },
  {
    id: 22,
    parentId: 21,
    name: "user_add",
    menuName: "新增用户",
    hidden: false,
    path: "/user/Add",
  },
  {
    id: 23,
    parentId: 21,
    name: "user_update",
    menuName: "修改用户",
    hidden: true,
    path: "/user/Update",
  },
  {
    id: 24,
    parentId: 0,
    name: "setting",
    menuName: "设置",
    icon: "el-icon-s-tools",
    hidden: false,
    path: "",
  },
  {
    id: 25,
    parentId: 24,
    name: "setting_menu",
    menuName: "菜单",
    hidden: false,
    path: "/setting/menu",
  },
]
