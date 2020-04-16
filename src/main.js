import Vue from "vue";
import ElementUI from "element-ui";
import VueClipboard from "vue-clipboard2";
import VueQuillEditor from "vue-quill-editor";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import "element-ui/lib/theme-chalk/index.css";
import "@/common/less/reset.less";
import api from "./api/index";

import "quill/dist/quill.snow.css";

Vue.use(VueQuillEditor /* { default global options } */);
Vue.use(VueClipboard);
Vue.config.productionTip = false;
if (process.env.NODE_ENV === "development" && process.env.VUE_APP_MOCK_ENABLED === "true") {
  console.info("当前使用mock数据");
  require("./mock/mock.js");
}
Vue.use(ElementUI);
Vue.prototype.$http = api;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
