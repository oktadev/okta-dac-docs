<style scoped></style>

<template>
  <div class="login">
    <div id="okta-signin-container"></div>
  </div>
</template>

<script>
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import { oktaConfig } from "../oktaConfig";

export default {
  name: "Login",
  mounted: function() {
    this.$nextTick(function() {
      const cfg = {
        baseUrl: oktaConfig.issuer.split("oauth2")[0],
        clientId: oktaConfig.client_id,
        redirectUri: oktaConfig.redirect_uri,
        authParams: {
          responseType: "code",
          grantType: "authorization_code",
          issuer: oktaConfig.issuer,
          scopes: oktaConfig.scope.split(" "),
          display: "page",
        },
      };
      this.widget = new OktaSignIn(cfg);

      this.widget.authClient.session.exists().then((exists) => {
        if (exists) {
          this.$auth.loginRedirect("/", {});
        } else {
          this.widget.renderEl(
            { el: "#okta-signin-container" },
            (res) => {
              console.log(res);
            },
            (err) => {
              throw err;
            }
          );
        }
      });
    });
  },
  destroyed() {
    // Remove the widget from the DOM on path change
    this.widget.remove();
  },
};
</script>
