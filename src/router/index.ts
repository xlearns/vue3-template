import {
  Router,
  RouteRecordRaw,
  createRouter,
  createWebHistory
} from "vue-router";
import { toRouteType, routesItems } from "./types";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { isPublic: true, title: "首页" }
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to: toRouteType, _from, next) => {
  to.matched.some((item: routesItems) => {
    if (!item.meta.title) {
      return "";
    }
    document.title = item.meta.title;
  });
  next();
});

export default router;
