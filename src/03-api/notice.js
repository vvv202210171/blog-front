import request from "@/02-utils/request";

export function getNoticeList() {
    return request({
        url: "/admin/notice/list",
        method: "get",
    });
}
export function getNotice(params) {
    return request({
        url: "/admin/notice/get",
        method: "get",
        params
    });
}
export function addNotice(data, isAction = true) {
    return request({
        url: "/admin/notice/add",
        method: "post",
        data,
        isAction
    });
}
export function updateNotice(data, isAction = true) {
    return request({
        url: "/admin/notice/update",
        method: "post",
        data,
        isAction
    });
}
export function delNotice(params, isAction = true) {
    return request({
        url: "/admin/notice/delete",
        method: "get",
        params,
        isAction
    });
}