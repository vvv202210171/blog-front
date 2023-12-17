import request from "@/02-utils/request";

export function getArticleTypeList() {
  return request({
    url: "/mc_api/article/article_category_get",
    method: "post",
  });
}
export function uploadFile(formData) {
  return request({
    url: "/mc_api/content/images_upload",
    method: "post",
    data: formData,
    isFormRequest: true,
  });
}

export function getArticleList(data) {
  return request({
    url: "/rp_api/article/article_list",
    method: "post",
    data,
  });
}
export function add(data) {
  return request({
    url: "/mc_api/article/article_merge",
    method: "post",
    data,
    isFormRequest: true,
  });
}

export function update(data) {
  return request({
    url: "/mc_api/article/article_merge",
    method: "post",
    data,
    isFormRequest: true,
  });
}
//查询单条文章
export function getArticleById(data) {
  return request({
    url: "/rp_api/article/article_get",
    method: "post",
    data,
  });
}

//广告列表
export function getAdvertiseList(data) {
  return request({
    url: "/rp_api/advertise/advertise_list",
    method: "post",
    data,
  });
}

//查询单条广告
export function getAdvertiseById(data) {
  return request({
    url: "/rp_api/advertise/advertise_get",
    method: "post",
    data,
  });
}

//广告新增
export function mergeAdvertise(data) {
  return request({
    url: "/mc_api/advertise/advertise_merge",
    method: "post",
    data,
    isFormRequest: true,
  });
}


