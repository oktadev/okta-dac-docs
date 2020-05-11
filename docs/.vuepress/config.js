module.exports = {
  title: "Okta Multi Tenant Admin",
  description: "Identity Management for Multi-Tenant Applications",
  themeConfig: {
    repo: "udplabs/mta-docs",
    logo:
      "https://www.okta.com/sites/all/themes/Okta/images/logos/developer/Dev_Logo-02_Large.png",
    lastUpdated: "Last Updated",
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Edit this page on GitHub",
    docsDir: "docs",
    smoothScroll: true,
    nav: require("./nav/en"),
    sidebar: {
      "/guide/": getGuideSidebar(),
      "/setup/": getSetupSidebar(),
      "/api/": getApiReferenceSidebar(),
    },
    /*algolia: {
      apiKey: "191db45e6f87475d6a1256d5a4298324",
      indexName: "udplabs_mta-docs",
    },*/
  },
  plugins: [
    ["@vuepress/back-to-top", true],
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ],
    ["@vuepress/medium-zoom", true],
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-128189152-1",
      },
    ],
    [
      "container",
      {
        type: "vue",
        before: '<pre class="vue-container"><code>',
        after: "</code></pre>",
      },
    ],
    [
      "container",
      {
        type: "upgrade",
        before: (info) => `<UpgradePath title="${info}">`,
        after: "</UpgradePath>",
      },
    ],
    ["flowchart"],
  ],
  extraWatchFiles: [".vuepress/nav/en.js", ".vuepress/nav/zh.js"],
};

function getGuideSidebar() {
  return [
    {
      title: "Guide",
      collapsable: false,
      children: ["", "architecture", "api-design", "org-setup"],
    },
  ];
}

function getSetupSidebar() {
  return [
    {
      title: "Setup",
      collapsable: false,
      children: ["", "terraform"],
    },
  ];
}

function getApiReferenceSidebar() {
    return [
      {
        title: "API Reference",
        collapsable: false,
        children: [
            "", "o4o"
        ],
      },
    ];
  }
  