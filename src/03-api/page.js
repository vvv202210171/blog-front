import request from "@/02-utils/request";

export function getPageList() {
    return request({
        url: "/admin/page/list",
        method: "get",
    });
}
export function getPage(params) {
    return request({
        url: "/admin/page/get",
        method: "get",
        params
    });
}
export function addPage(data, isAction = true) {
    return request({
        url: "/admin/page/add",
        method: "post",
        data,
        isAction
    });
}
export function updatePage(data, isAction = true) {
    return request({
        url: "/admin/page/update",
        method: "post",
        data,
        isAction
    });
}
export function delPage(params, isAction = true) {
    return request({
        url: "/admin/page/delete",
        method: "get",
        params,
        isAction
    });
}