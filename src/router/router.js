import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: resolve => require(["../views/Home.vue"], resolve)
    },
    {
      path: "/home",
      name: "home",
      component: resolve => require(["../views/Home.vue"], resolve),
      children: [
        {
          // 表单
          path: "/",
          component: resolve => require(["../components/Table.vue"], resolve)
        },
        {
          // 表单
          path: "/table",
          component: resolve => require(["../components/Table.vue"], resolve)
        },
        {
          // 图片上传
          path: "/upload",
          component: resolve => require(["../components/Upload.vue"], resolve)
        },
        {
          // 富文本
          path: "/editor",
          component: resolve => require(["../components/editor.vue"], resolve)
        }
      ]
    },
    {
      path: "/mobile",
      name: "mobile",
      component: resolve => require(["../views/Home.vue"], resolve),
      children: [
        {
          // 表单
          path: "/",
          component: resolve => require(["../components/lottery.vue"], resolve)
        },
        {
          // 翻翻乐
          path: "/lottery",
          component: resolve => require(["../components/lottery.vue"], resolve)
        },
        {
          // 翻翻乐
          path: "/sprite",
          component: resolve => require(["../components/sprite.vue"], resolve)
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: resolve => require(["../views/Login.vue"], resolve)
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   // 路由卫士
//   if (to.path === "/login") {
//     localStorage.removeItem("hasLogin");
//   }
//   let user = localStorage.getItem("hasLogin") == null;
//   if (user && to.path !== "/login") {
//     next({
//       path: "/login"
//     });
//   } else {
//     next();
//   }
// });

export default router;
