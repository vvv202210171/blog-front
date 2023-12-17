export const ArticleStatusEnum = [
  {
    name: "正常",
    code: "Enable",
    val: 1,
  },
  {
    name: "待审核",
    code: "PendingReview",
    val: 2,
  },
  {
    name: "已删除",
    code: "Deleted",
    val: 99,
  },
];


export const AdvertiseStatusEnum = [
  {
    name: "正常",
    code: "Enable",
    val: 1,
  },
  {
    name: "待审核",
    code: "PendingReview",
    val: 2,
  },
  {
    name: "已删除",
    code: "Deleted",
    val: 99,
  },
];

export const AdvertiseTypeEnum = [
  {
    name: "Logo右边的顶部广告",
    code: "MainHead",
    val: 1,
    tip:"广告图片尺寸要求: 800*120px",
  },
  {
    name: "内容页面的顶部广告",
    code: "BodyHead",
    val: 2,
    tip:"广告图片尺寸要求: 1200*90px",
  },
  {
    name: "内容页面的顶部广告(移动端)",
    code: "BodyHeadMobile",
    val: 6,
    tip:"广告图片尺寸要求: 750*90px",
  },
  {
    name: "首页轮播图",
    code: "Carousel",
    val: 3,
    tip:"广告图片尺寸要求: 850*280px",
  },
  {
    name: "文章列表页右侧广告",
    code: "CategoryLeft",
    val: 4,
    tip:"广告图片尺寸要求: 850*110px",
  },
  {
    name: "文章列表页左侧广告",
    code: "CategoryRight",
    val: 5,
    tip:"广告图片尺寸要求: 330*400px",
  },
];