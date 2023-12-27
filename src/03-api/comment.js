import request from "@/02-utils/request";

export function getCommentPage(params) {
    return request({
        url: "/admin/comment/page",
        method: "get",
        params
    });
}
