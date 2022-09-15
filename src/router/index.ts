import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import SheetView from "../views/SheetView.vue";
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
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
