import { fetchPost, fetchGet } from "../axios/index";

export default {
  Logout(params) {
    return fetchPost("/admin/logout", params); // 退出登录接口
  },
  GetCode(params) {
    return fetchPost("/admin/getCode", params); // 获取验证码接口
  },
  Login(params) {
    return fetchPost("/admin/login", params); // 登录接口
  },
  GetTableData(params) {
    return fetchPost("/admin/GetTableData", params); // 登录接口
  },
  uptoken(params) {
    return fetchGet("/qiniu/upload/uptoken", params); // 获取token
  }
};
