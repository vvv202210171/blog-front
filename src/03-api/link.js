import request from "@/02-utils/request";

export function getLinkList() {
    return request({
        url: "/admin/link/list",
        method: "get",
    });
}
export function getLink(params) {
    return request({
        url: "/admin/link/get",
        method: "get",
        params
    });
}
export function addLink(data, isAction = true) {
    return request({
        url: "/admin/link/add",
        method: "post",
        data,
        isAction
    });
}
export function updateLink(data, isAction = true) {
    return request({
        url: "/admin/link/update",
        method: "post",
        data,
        isAction
    });
}
export function delLink(params, isAction = true) {
    return request({
        url: "/admin/link/delete",
        method: "get",
        params,
        isAction
    });
}