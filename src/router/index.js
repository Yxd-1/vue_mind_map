import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login";
import Home from "../components/Home";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { path: "/home", component: Home },
  ],
});

// 挂载路由导航首位
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径来
  // next 函数，表示放行
  // next()放行  next("/login")强制跳转

  if (to.path === "/login") return next();
  // 获取token
  const tokenstr = window.sessionStorage.getItem("token");
  if (!tokenstr) return next("/login");
  next();
});

export default router;
