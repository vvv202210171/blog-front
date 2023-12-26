import request from "@/02-utils/request";

export function getArticleTypeList() {
  return request({
    url: "/admin/category/list",
    method: "get",
  });
}

export function addArticleType(data, isAction = true) {
  return request({
    url: "/admin/category/add",
    method: "post",
    data,
    isAction
  });
}

export function updateArticleType(data, isAction = true) {
  return request({
    url: "/admin/category/update",
    method: "post",
    data,
    isAction
  });
}
export function deleteArticleType(params, isAction = true) {
  return request({
    url: "/admin/category/delete",
    method: "get",
    params,
    isAction
  });
}
export function addArticleTag(data, isAction = true) {
  return request({
    url: "/admin/tag/add",
    method: "post",
    data,
    isAction
  });
}
export function updateArticleTag(data, isAction = true) {
  return request({
    url: "/admin/tag/update",
    method: "post",
    data,
    isAction
  });
}
export function deleteArticleTag(params, isAction = true) {
  return request({
    url: "/admin/tag/delete",
    method: "get",
    params,
    isAction
  });
}

export function getArticleTypeListCount() {
  return request({
    url: "/admin/category/list_count",
    method: "get",
  });
}
export function getArticleTagListCount() {
  return request({
    url: "/admin/tag/list_count",
    method: "get",
  });

}
export function getArticleTagList() {
  return request({
    url: "/admin/tag/list",
    method: "get",
  });
}
export function uploadFile(formData) {
  return request({
    url: "/admin/upload/img",
    method: "post",
    data: formData,
    isFormRequest: true,
  });
}

export function getArticleList(params) {
  return request({
    url: "/admin/article/page",
    method: "get",
    params,
  });
}
export function add(data) {
  return request({
    url: "/admin/article/add",
    method: "post",
    data
  });
}

export function update(data) {
  return request({
    url: "/admin/article/update",
    method: "post",
    data,
  });
}
export function deleteArticle(params, isAction = true) {
  return request({
    url: "/admin/article/delete",
    method: "get",
    params,
    isAction
  });
}
//查询单条文章
export function getArticleById(params) {
  return request({
    url: "/admin/article/get",
    method: "get",
    params,
  });
}



