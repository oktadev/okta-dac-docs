---
title: About
# We can even add meta tags to the page! This sets the keywords meta tag.
# <meta name="keywords" content="my SEO keywords"/>
meta:
  - name: keywords
  - content: my SEO keywords
---

# Introduction
This section describes the Architecture

## Architecture
### Groups
Although Groups in Okta are flat in structure, it is common practice to use namespacing to simulate hierarchy (or nested group) functionality. The key feature of Okta Groups is that the API supports [search](https://developer.okta.com/docs/reference/api/groups/#search-groups) with ***startsWith***. We leverage this feature to create 2 classes of users – 1) Admins, and 2) Users – By prefixing group names with either **ADMIN_** or **USERS_**.

### Group Admin Role
Okta supports **delegated admin** functionality by allowing users to hold the [Group Admin Role](https://help.okta.com/en/prod/Content/Topics/Security/admin-role-groupadmin.htm) role. This functionality allows specific groups to be designated to specific Group Admins; And will restrict the Group Admins to only be able to view and perform updates those specifc groups (and the users in them).

Read more about the different [Administrator Roles](https://help.okta.com/en/prod/Content/Topics/Security/Administrators.htm) in Okta to get a better understanding of how we leveraged the Group Admin role.

### OAuth for Okta
[OAuth for Okta](https://developer.okta.com/docs/guides/implement-oauth-for-okta/overview/) overview

### API Access Management
[API Access Management](https://developer.okta.com/docs/concepts/api-access-management/) overview

## API
#### [API Reference](/api)
This section discusses the API design

## Admin App
This section discusses the Admin App

## End-User Dashboard
This section discusses the End-User Dashboard

![alt text](./images/byob-demo.gif)
