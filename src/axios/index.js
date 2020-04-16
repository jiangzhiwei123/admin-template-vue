/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from "axios";
import qs from "qs";
import router from "../router/router";
// 配置baseUrl
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.interceptors.request.use(
  config => {
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// http响应拦截器
axios.interceptors.response.use(
  data => {
    // 如果后端放回是-1，重新登录
    if (data.data.ret === -1) {
      if (router.currentRoute.path !== "login") {
        router.replace({
          path: "login"
        });
      }
    }
    return data;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 306:
          // 只有在当前路由不是登录页面才跳转
          if (router.currentRoute.path !== "login") {
            router.replace({
              path: "login"
            });
          }
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error);
  }
);

export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        response => {
          resolve(response.data);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}

export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(
        response => {
          resolve(response.data);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}

export default { fetchPost, fetchGet };
