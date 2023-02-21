import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login";
import Home from "../components/Home";
import Register from "../components/Register";
import File from "../components/File";
import TrashBin from "../components/TrashBin";
import Welcome from "../components/Welcome";
import MindMap from "../components/MindMap";
import Users from "../components/Users";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    {
      path: "/home",
      component: Home,
      redirect: "/welcome",
      children: [
        {
          path: "/welcome",
          component: Welcome,
        },
        {
          path: "/files",
          component: File,
        },
        {
          path: "/trashbin",
          component: TrashBin,
        },
        {
          path: "/users",
          component: Users,
        },
      ],
    },
    { path: "/register", component: Register },
    { path: "/mindmap", component: MindMap },
  ],
});

// 挂载路由导航首位
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径来
  // next 函数，表示放行
  // next()放行  next("/login")强制跳转

  if (to.path === "/login" || to.path === "/register") return next();
  // 获取token
  const tokenstr = window.sessionStorage.getItem("token");
  if (!tokenstr) return next("/login");
  next();
});

export default router;
