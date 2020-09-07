import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import VueAxios from "vue-axios";
import axios from "axios";

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => {
      return record.meta.requiresAuth;
    })
  ) {
    if (store.state.isLogin === false) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
