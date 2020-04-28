---
title: About
# We can even add meta tags to the page! This sets the keywords meta tag.
# <meta name="keywords" content="my SEO keywords"/>
meta:
  - name: keywords
  - content: my SEO keywords
---

# Introduction
This is the architecture documentation for the "__Delegated Admin Console__" aka [okta-dac](https://github.com/udplabs/okta-dac) open source project *and its companion project, "__End-user Dashboard__" aka [byob-dashboard](https://github.com/oktadeveloper/byob-dashboard)*.

The Okta Identity Cloud provides a rich set of APIs and services that can be used to develop custom solutions for SaaS use-cases. We demonstrate these capabilities with ***okta-dac***, a project that implements the common use-case(s) of providing delegated administration (aka "self service") capabilities to SaaS tenants. 

Using native Okta capabilities, we:
1. **Add a "tenant" layer to an Okta Org** using custom setup of Groups and [Roles](https://help.okta.com/en/prod/Content/Topics/Security/Administrators.htm)
2. **Provide tenant self-service administration** by leveraging [OAuth for Okta](https://developer.okta.com/docs/guides/implement-oauth-for-okta/overview/). 
    * Users in any particular tenant can have 1 of 2 roles: *User* and *Tenant Admin*. Tenant Admins can access the __Delegated Admin Console__ app. And all users can access the __End-user Dashboard__ app.
3. **Support "bring your own IdP"** using Okta's [Inbound Federation](https://developer.okta.com/docs/concepts/identity-providers/) functionality
4. **Protect API resources** with Okta's [API Access Management](https://developer.okta.com/docs/concepts/api-access-management/)
    * We configure Okta to generate JWTs embedding tenant info; We design our API endpoints to implement tenant-namespace in the request url; And we implement a custom authorizer to restrict access to the tenant-namespaced route based on tenant info embedded in the JWT (the Bearer token of the API request).

## Delegated Admin Console
This section discusses the Admin App

![alt text](./images/dac-demo.gif)

### The Superuser Role
About the Superuser role

### The Tenant Admin Role
About the Tenant Admin role

## End-user Dashboard
This section discusses the End-User Dashboard

![alt text](./images/byob-demo.gif)
