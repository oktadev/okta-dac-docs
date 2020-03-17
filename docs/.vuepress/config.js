module.exports = {
  title: "Okta Multi Tenant Admin",
  description: "Identity Management for Multi-Tenant Applications",

  themeConfig: {
    lastUpdated: 'Last Updated',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!',
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "Demo", link: "https://okta-mta.idp.rocks" }
    ],
    sidebar: [
      '/',
      '/guide',
    ]
  }
};