---
sidebarDepth: 3
---

# Architecture

## Okta Basics: Users, Groups, Applications

An Okta Org supports having only one directory of users, who belong to one or more groups. Groups in Okta are flat, but users can belong to any number of groups. Users are *assigned* to applications. And groups can also be assigned to applications (When a group is assigned to an application, all users of the group are assigned to the application). The user object can store any number of custom attributes. Groups can store a name and description. 

![alt text](./images/okta-entities.png)

## Groups
Although Groups in Okta are flat in structure and only store name and description, it is acceptable practice to use naming convention and/or namespacing to simulate group-types, group hierarchy or nested group structures. One key feature of Okta groups which enables this is the groups API [search](https://developer.okta.com/docs/reference/api/groups/#search-groups) that supports ***startsWith***. Lets illustrate with a couple examples, below.

### Example 1: Group Hierarchy

You can implement nested groups (or group hierarchy) by applying hierarchical namespacing to the group name. For example, a hierarchy looking like the following:
![alt text](./images/dac-groups-example1.png)

Can be *flattened* and represented with the following naming convention:

| Group Name |
| ---------- |
| okta.com   |
| okta.com/dac |
| okta.com/dac/admins  |
| okta.com/dac/users  |
| okta.com/byob |
| okta.com/byob/users |

---
### Example 2: Group Types

You can implement group types by prefixing group names with the group type:
| Type       | Group      | Naming Convention |
| ---------- | ---------- | ----------------- |
| role       |  readonly  |  role_readonly    |
| role       |  admin     |  role_admin       |
| ou         |  sales     |  ou_sales         |
| ou         | engineering|  ou_engineering   |
* In order to list all the groups of a single type, use the search groups API with `search string = group type`
    ```
    GET https://${yourOktaDomain}/api/v1/Groups?q=${groupType}
    ```
* In order to search for a group by name (within a group type) simply prefix the search string with the group type
    ```
    GET https://${yourOktaDomain}/api/v1/Groups?q=${groupType}startsWith
    ```
---
### okta-dac design

In the okta-dac project, we use the *Example 2* design pattern to create 2 types of user groups – 1) Admins, and 2) Users – by prefixing group names with either **ADMINS_** and **USERS_**, respectively. The string following the prefix refers to the tenant name. 

For example, if we have 2 customers, `tenant1` and `tenant2` in our SaaS application, we'll have 2 sets of groups: `ADMINS_tenant1`, `ADMINS_tenant2` and `USERS_tenant1`, `USERS_tenant2`. Each customer's user is a member of their respective `USERS_` group. If the user is also a Tenant Admin, they'll be assigned to the `ADMINS_` group. 

With this naming convention in place, we've coerced our Okta org into a structure that our SaaS application needs:

![alt text](./images/multitenant.png)

At this point, lets introduce the concept of the `SUPERUSERS` role, which allows access to the [**okta-dac superuser UI**](/guide/#superuser). We model this by creating a SUPERUSERS group in our Okta Org, as illustrated in the diagram above. Users in this group have the ability to create tenants. 

#### Tenant Applications
Each tenant will of course have access to the suite of applications the SaaS provides, but not every tenant will have every application in the suite of products. We'll model this by setting up the `APPUSERS` group: For every app that a tenant is entitled to, a group `APPUSERS_{tenant}_{appId}` is created. These groups are assigned to the respective app. And in okta-dac, when we assign a user to an app using the UI, behind the scenes we use the Okta API to add the user to the group.

![alt text](./images/appusers.png)

## Group Admin Role
Okta natively supports **delegated admin** functionality at the group level via the [Group Admin Role](https://help.okta.com/en/prod/Content/Topics/Security/admin-role-groupadmin.htm). You can configure rules in Okta to allow users of a group permissions to read and manage a list of specific groups. Using this functionality, we configure `ADMINS_tenant` groups as the group admins for `USERS_tenant` and `APPUSERS_tenant` groups. 

As Tenant Admins are part of their `ADMINS_tenant` group, they can then read and manage users in the `USERS_tenant` group. And they can assign/unassign apps for their users by being able to add/remove `USERS_tenant` users to/from `APPUSERS_tenant`.

|Read more about the different [Administrator Roles](https://help.okta.com/en/prod/Content/Topics/Security/Administrators.htm) in Okta to get a better understanding of how we leveraged the Group Admin role|
| :--- |

## OAuth for Okta
### OAuth for Okta
With [OAuth for Okta](https://developer.okta.com/docs/guides/implement-oauth-for-okta/overview/), you are able to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains.

### Okta session
What is the Okta session and how did we get it?


With an existing session, we can **fetch the bearer token** using the [Okta Auth JavaScript SDK](https://github.com/okta/okta-auth-js). Upon logging into the __Delgated Admin Console__ app, the first component we land on is the Home.vue component. This would be a good place to fetch the token. 

In `src/views/Home.vue` we do the following on created:
```js
const authJs = new AuthJS({
    issuer: this.$config.oidc.issuer.split("oauth2")[0],
    clientId: this.$config.oidc.client_id,
    redirectUri: this.$config.oidc.redirect_uri,
    pkce: true
});
const exists = await authJs.session.exists();
if (exists) {
    try {
        const res = await authJs.token.getWithoutPrompt({
            scopes: [
                "okta.users.manage",
                "okta.groups.manage"
            ]
        });
        const accessToken = res.filter(token => { return token.accessToken; })[0];

        // vuex
        this.$store.commit("setO4oToken", accessToken.accessToken);
        this.$store.subscribe((mutation, state) => { console.log("Got mutation", mutation.type); });
    } catch (e) {
        console.log(e);
    }
}
```

* [`authJs.session.exists()`](https://github.com/okta/okta-auth-js#sessionexists) checks to see if user has logged-in (i.e. an Okta session exists)
* [`authJs.token.getWithoutPrompt()`](https://github.com/okta/okta-auth-js#tokengetwithoutpromptoptions) makes an OAuth "authorize" request and authenticates using an existing session.

## API Access Management
[API Access Management](https://developer.okta.com/docs/concepts/api-access-management/) overview

### Embedding the `tenants` claim
The `APPLICATION_ENTITLEMENT_POLICY` feature flag, when enabled allows configuration of app profile attributes that are tied to a Group. Meaning, when you set the value of the attribute, you set it to the Group assigned to the app, as opposed to directly setting it against a user. All users whom are members of the group will have the same value for said attribute.

| Refer to the [setup]() section |
| :--- |

We populate it with a special format: `${tenantId}:${tenantName}:${usersGroupId}`

### Embedding the `groups` claim
How we configured Okta

### Sample JWT
::: details Click to view the sample JWT payload
```json
{
  "sub": "00upkrte35fGaTMJi0h7",
  "ver": 1,
  "iss": "https://byobrand.oktapreview.com/oauth2/default",
  "aud": "0oaph3ep6uKllifkG0h7",
  "iat": 1588116050,
  "exp": 1588119650,
  "jti": "ID.9bXZ7w_fzcl0vR3oSTGpBWPRl6X7220uJ_3ciqpYfoY",
  "amr": [
    "pwd"
  ],
  "idp": "00op8q9xatOpYa5MK0h7",
  "nonce": "nonce",
  "auth_time": 1000,
  "at_hash": "preview_at_hash",
  "tenants": [
    "0oapi0vtwxmVdOywi0h7:boeing:00gpi18cf4SkPByz40h7"
  ],
  "groups": [
    "USERS_boeing",
    "Everyone",
    "ADMINS_boeing",
    "APPUSERS_boeing_0oaq1xvxlfoEEbii40h7",
    "APPUSERS_boeing_0oaphr8z83xlSeZAg0h7"
  ]
}
```
:::


### Custom Authorizer


In the custom authorizer, we restrict access to the tenant-namespaced route based on which tenant the user is an ADMIN of:
```js
// Tenant admins can read/manage their own idp settings
const tenants = jwt.claims.tenants;
if (tenants && tenants.length > 0) {
    policy.allowMethod(AuthPolicy.HttpVerb.GET, '/admin/idps');
    tenants.forEach((tenant)=>{
        const parts = tenant.split(':');
        policy.allowMethod(AuthPolicy.HttpVerb.GET, '/admin/idps/' + parts[0]);
        policy.allowMethod(AuthPolicy.HttpVerb.GET, '/admin/idps/' + parts[0] + '/metadata.xml');
        policy.allowMethod(AuthPolicy.HttpVerb.PUT, '/admin/idps/' + parts[0]);
    });            
}

// Tenant admins can read and update their own tenant info
jwt.claims.groups.forEach(grp=>{
    if (grp.startsWith('ADMINS_')) {
        policy.allowMethod(AuthPolicy.HttpVerb.GET, "/admin/tenants/" + grp.split('_')[1]);
        policy.allowMethod(AuthPolicy.HttpVerb.PUT, "/admin/tenants/" + grp.split('_')[1] + "/admins/*");
    }
});
```

## Inbound Federation
