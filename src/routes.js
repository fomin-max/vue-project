import VueRouter from "vue-router";

import { Home, Comments, FractionCalculator } from "./pages";
import { URLS } from "./constants";

export const router = new VueRouter({
  routes: [
    {
      path: URLS.HOME,
      component: Home
    },
    {
      path: URLS.COMMENTS,
      component: Comments
    },
    {
      path: URLS.FRACTION_CALCULATOR,
      component: FractionCalculator
    }
  ],
  mode: "history"
});
