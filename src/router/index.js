import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Setting from "../views/Setting.vue";
import Room from "../views/Room.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: false }
  },
  {
    path: "/setting",
    name: "Setting",
    component: Setting,
    meta: { requiresAuth: true }
  },
  {
    path: "/room/:roomId",
    name: "Room",
    component: Room,
    meta: { requiresAuth: true }
  },
  {
    path: "/*",
    redirect: "/login"
  }
];

const router = new VueRouter({
  routes
});

export default router;
