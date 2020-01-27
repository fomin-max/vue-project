import Vue from "vue";
import { Plugin } from "vue-fragment";

import App from "./App.vue";
import { router } from "./routes";

Vue.use(Plugin);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: h => h(App),
  router
});
