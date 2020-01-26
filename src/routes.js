import Vue from "vue";
import VueRouter from "vue-router";

import { URLS } from "./constants";
import { Loader, Error } from "./components";

Vue.use(VueRouter);

const lazyLoadView = componentName => {
  const AsyncHandler = () => ({
    component: import(`@/pages/${componentName}.vue`),
    // A component to use while the component is loading.
    loading: Loader,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 200,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: Error,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000
  });

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children);
    }
  });
};

export const router = new VueRouter({
  routes: [
    {
      path: URLS.HOME,
      component: () => lazyLoadView("Home")
    },
    {
      path: URLS.COMMENTS,
      component: () => lazyLoadView("Comments")
    },
    {
      path: URLS.FRACTION_CALCULATOR,
      component: () => lazyLoadView("FractionCalculator")
    },
    {
      path: "*",
      redirect: URLS.HOME
    }
  ],
  mode: "history"
});
