import axios from "axios";
import i18n from "@/locales/index";
import { MessageBox, Message } from "element-ui";
import store from "@/04-store";
import router from "@/05-router/index";
import { getToken } from '@/02-utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: "", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15 * 1000, // request timeout,
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    // config.headers['Content-Type'] = 'text/plain'
    if (config.isFormRequest) {
      //  config.headers["Content-Type"] = "multipart/form-data";
    }
    config.headers["satoken"] = getToken();
    if (config.isFormRequest) {
      const fromData = new FormData();
      const params = { ...config.data };
      for (const [key, value] of Object.entries(params)) {
        fromData.append(key, value);
      }
      config.data = fromData;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    console.log(response)
    if (res.code) {
      if (res.code !== 0) {
        if (res.code === 7) {
          store.commit("app/CLEART_INC");
          if (router.currentRoute.name === "Login") return;
          MessageBox.confirm(i18n.t("common_0027"), i18n.t("common_0028"), {
            confirmButtonText: i18n.t("common_0029"),
            type: "warning",
            showCancelButton: false,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
          }).then(() => {
            store.dispatch("admin/logout").then(() => {
              location.reload();
            });
          });
        } else if (response.config.closeErrorTips) {
          return res;
        } else {
          Message({
            message: res.msg || "Error",
            type: "error",
            duration: 5 * 1000,
          });
        }
        return Promise.reject(new Error(res.msg || "Error"));
      }
    }
    if (response.config.isAction) {
      return res;
    }
    return res.data;
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
