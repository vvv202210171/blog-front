import request from "@/02-utils/request";
export function getMenuList(params) {
    return request({
        url: '/admin/menu/list',
        method: 'get',
        params
    })
}
export function addMenu(data, isAction = true) {
    return request({
        url: "/admin/menu/add",
        method: "post",
        data,
        isAction
    });
}
export function updateMenu(data, isAction = true) {
    return request({
        url: "/admin/menu/update",
        method: "post",
        data,
        isAction
    });
}
export function deleteMenu(params, isAction = true) {
    return request({
        url: "/admin/menu/delete",
        method: "get",
        params,
        isAction
    });
}