module.exports = [
  {
    text: "Login",
    link: "/login/",
    meta: {
      requiresAuth: false,
    },
  },
  {
    text: "Guide",
    link: "/guide/",
    meta: {
      requiresAuth: true,
    },
  },
  {
    text: "API Reference",
    link: "/api/",
    meta: {
      requiresAuth: true,
    },
  },
  {
    text: "Demo",
    link: "https://okta-mta.idp.rocks",
    meta: {
      requiresAuth: false,
    },
  },
];
