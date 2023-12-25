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
    name: "article_edit",
    menuName: "写文章",
    hidden: false,
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
]
