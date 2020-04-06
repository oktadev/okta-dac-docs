import Auth from "@okta/okta-vue";
import { oktaConfig } from "./oktaConfig";
import authn from "./authn";

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  Vue.use(Auth, oktaConfig);
  Vue.use(authn, Vue.prototype.$auth);

  router.beforeEach(async (from, to, next) => {
    const auth = await Vue.prototype.$auth.isAuthenticated();
    let routeNeedsAuth = false;
    let nav = siteData.themeConfig.nav;

    let link = to.path.replace(/\.[^/.]+$/, "");
    console.log("to", link);
    let linkIndex = nav.findIndex((x) => x.link === link);

    console.log("linkIndex", linkIndex);
    if (linkIndex > -1) {
      const navConfig = nav[linkIndex];
      if (navConfig.meta && navConfig.meta.requiresAuth) {
        routeNeedsAuth = true;
      }
    }

    //if (from.matched.some((record) => record.meta.requiresAuth) && !routeNeedsAuth) {
    console.log("router", JSON.stringify(router.routes));
    if (!auth && routeNeedsAuth) {
      console.log("Needs authentication to access page");
      //Vue.prototype.$auth.loginRedirect(link);
      //next("/login/");
      //router.push("/login/");
      next("/login/");
    } else {
      next();
    }
  });
};
