import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import SheetView from "../views/SheetView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import { usesecurityStore } from "@/store/security";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "/sheet",
    name: "sheet",
    component: SheetView,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const security = usesecurityStore();
  if (security.token.length < 1 && to.name !== "login") {
    return { name: "login" };
  }
});

export default router;
