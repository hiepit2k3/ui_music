import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginForm from "@/views/LoginForm.vue";
import MusicPlayer from "@/views/MusicPlayer.vue";
import RoomMove from "@/views/MoveView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/login",
    name: "login",
    component: LoginForm
  },
  {
    path: "/roommusic/:roomid",
    name: "roommusic",
    component: MusicPlayer,
    props: true,
  },
  {
    path: "/roommover",
    name: "roommover",
    component: RoomMove
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterForm.vue"),
  },
  {
    path: "/:pathMatch(.*)*",  // Catch-all route for 404 page
    name: "notfound",
    component: () => import("../views/404.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
