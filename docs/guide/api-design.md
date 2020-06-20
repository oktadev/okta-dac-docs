---
sidebarDepth: 3
---
# API

This section discusses the design for okta-dac [APIs](/api).

## OAuth for Okta

With [OAuth for Okta](https://developer.okta.com/docs/guides/implement-oauth-for-okta/overview/), you are able to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains.

The [scopes](https://developer.okta.com/docs/guides/implement-oauth-for-okta/scopes/) that we request are:

* `okta.users.manage` so that we can read, add, and update users
* `okta.groups.manage` so that we can read and update groups

***If you are a Group Admin and obtain an access_token from Okta with the above scopes, you can use it on the [users](https://developer.okta.com/docs/reference/api/users/) and [groups](https://developer.okta.com/docs/reference/api/groups/) APIs. Most importantly, the API responses are automatically filtered according to your Group Admin privileges.*** For example, calling `GET /users` will return only users in the groups you manage; Calling `GET /groups` will only return groups you manage, etc.

In order to get an access_token with these scopes, we rely on the Okta session.

### Okta session

Okta uses a cookie-based authentication mechanism to maintain a user's authentication [session](https://developer.okta.com/docs/reference/api/sessions/) across web requests.

* When a user signs into okta-dac, a session is created in Okta and persisted on the browser with a cookie.
* Leveraging this existing session, we can then **fetch the bearer token** without the need to re-authenticate. We use the [Okta Auth JavaScript SDK](https://github.com/okta/okta-auth-js) `getWithoutPrompt` function to silently get this token. Below is the sample code:

```js
//src/views/Home.vue
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
* [`authJs.token.getWithoutPrompt()`](https://github.com/okta/okta-auth-js#tokengetwithoutpromptoptions) makes an OAuth [authorize](https://developer.okta.com/docs/reference/api/oidc/#authorize) request with [`&prompt=none`](https://developer.okta.com/docs/reference/api/oidc/#parameter-details). As a session cookie is present in the request, the user does not need to authenticate again.

In okta-dac, a good place to run this piece of code is in `src/views/Home.vue`, during the on created event. This is because upon logging into okta-dac, the first component we land on is Home.vue. 

Once we get the access_token we use it to implement list/search users, add users, update users, assign apps, etc.

![alt text](./images/dac-demo.gif)

## API Access Management

Because we synthetically created a Tenants structure in the Okta org, we need to write our own [Tenants API](/api/#tenants) to wrap around the Okta CRUD APIs and perform custom filtering of the CRUD API's results.  

Over here, we leverage [API Access Management](https://developer.okta.com/docs/concepts/api-access-management/) – Okta's implementation of the OAuth 2.0 standard – to secure our "wrapper APIs", which implement the business logic abstraction layer that generates our "tenant" structure in the Okta org. (Please refer to [composite APIs](/api/#composite-apis) for documentation).

**Couple of custom claims are essential to the proper functioning of okta-dac. Okta's API Access Management makes it easy to generate JWTs and embed custom claims:**

### The `tenants` claim

::: warning NOTE
The `APPLICATION_ENTITLEMENT_POLICY` **feature flag** must be enabled for the Okta Org
:::

We configure Okta to store a User App Attribute called "Tenants" and display its value in a custom claim called `tenants`. See:

* Custom App Profile Attribute. [Config steps](/setup/org-setup.html#_4-add-custom-app-profile-attribute).
* The `tenants` custom claim. [Config steps](/setup/org-setup.html#_6-add-custom-claims).

We populate `tenants` using a special format: `${tenantId}:${tenantName}:${usersGroupId}`. This is done inside our [Add Tenant](/api/#add-tenant) API code by calling *__`PUT`__`apps/${appId}/groups/${groupId}`* to update the AppProfile.

```js{5}
await axios.put(
    orgUrl + '/api/v1/apps/' + clientId + '/groups/' + groupId, {
        profile: {
            tenants: [
                tenantId + ":" + tenantName + ':' + usersGroupId
            ]
        }
    },
    headers
);
```

Embedding this value in the JWT provides okta-dac quick access to the tenant name and id, and its associated USERS_ group id without making additional requests to the Okta API.

### The `groups` claim

We configure Okta to return the `groups` custom claim. See [steps](/setup/org-setup.html#_6-add-custom-claims). This allows the okta-dac to:

* Differentiate Super Admins from Tenant Admins. 
* For the Tenant Admins, provide the Tenant(s) info.
* Which apps are available for Tenants.

#### Sample JWT

As mentioned, the `tenants` and `groups` claims are crucial for the proper functioning of okta-dac. To illustrate how they're used, take a look at the sample below:

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
    "0oapi0vtwxmVdOywi0h7:spidermonkey:00gpi18cf4SkPByz40h7"
  ],
  "groups": [
    "USERS_spidermonkey",
    "Everyone",
    "ADMINS_spidermonkey",
    "APPUSERS_spidermonkey_0oaq1xvxlfoEEbii40h7",
    "APPUSERS_spidermonkey_0oaphr8z83xlSeZAg0h7"
  ]
}
```

* This JWT is for a Tenant Admin because there is no SUPERUSERS in the `groups` claim
* The Tenant is "spidermonkey"
* spidermonkey has access to 2 apps (Ids `0oaq1xvxlfoEEbii40h7` & `0oaphr8z83xlSeZAg0h7`)

### AuthZ

The information in the above JWT is used by okta-dac to display the proper UX to the user. Not only that, it is also used to authorize access for our wrapper APIs. See [custom-authorizer](#custom-authorizer) for more info.

## okta-dac Composite APIs

::: tip
Refer to the [okta-dac-api](https://github.com/oktadeveloper/okta-dac-api) serverless project for source code and issue tracking.
:::

### [Tenants API](/api/#tenants)

Implementing the Tenants endpoint is a practice of stitching together a series of Okta API operations. We illustrate with a few examples:

* __Example 1__: 
    When we [add a tenant](/api/#add-tenant), what the client sees as one API call is actually 8 API requests:
    1. [Add Identity Provider](https://developer.okta.com/docs/reference/api/idps/#add-identity-provider) with naming convention `DAC_${tenantName}`
    2. [Add `USERS_${tenantName}` group](https://developer.okta.com/docs/reference/api/groups/#add-group)
    3. Add `ADMINS_${tenantName}`. Set `profile.description`=
    ```json
    {"tenantId": "${id-from-step-#1}"}
    ```
    4. [Add a Role](https://developer.okta.com/docs/reference/api/roles/#assign-a-role-to-a-group) `type==USER_ADMIN` to the `ADMINS_${tenantName}` group.
    5. [Assign `USERS_${tenantName}` role target](https://developer.okta.com/docs/reference/api/roles/#add-group-target-to-group-administrator-role-given-to-a-group) to the GroupRole from step #4.
    6. Assign `ADMINS_${tenantName}` role target the GroupRole from step #4.
    7. [Assign the `USERS_${tenantName}` group](https://developer.okta.com/docs/reference/api/apps/#assign-group-to-application) to the okta-dac App
    8. [Update IdP](https://developer.okta.com/docs/reference/api/idps/#update-identity-provider) from step #1 and set JIT to group = `USERS_${tenantName}`.

* __Example 2__: When we [get a tenant](/api/#get-tenant) by name, we call the [Search Groups](https://developer.okta.com/docs/reference/api/groups/#search-groups) API. This is because every tenant has an equivalent `ADMINS_${tenantName}` group and there is no search IdPs API.

* __Example 3__: [Tenant Apps](/api/#tenant-apps)
    * When we "add tenant app", we create a `APPUSERS_${tenantName}_${appId}` group.
    * When we "list tenant apps", we search groups using the parameter `q=APPUSERS_${tenantName}`

* __Example 4__: [Tenant Admins](/api/#tenant-admins)
    * When we "list tenant admins", we return all users for the group `ADMINS_${tenantName}`.
    * When we "assign tenant admin", we add a user to the `ADMINS_${tenantName}` group.

* __Example 5__: [Tenant Domains](/api/#tenant-domains)
    * When we "add a tenant domain", we add a routing rule (or update an existing routing rule)
    * When we "list domains for a tenant", we lookup the routing rule and (if exists) list all of its domains

::: tip NOTE
Refer to the source code for implementation details
:::

### [IdPs API](/api/#idps)

Keep in mind that we store the IdP Id in the `ADMINS_${tenantName}` group's `profile.description` as the "tenantId":

```json
{"tenantId": "${id-from-step-#1}"}
```

This allows us to implement the [Get Idp](/api/#get-idp) composite API:

1. Search Groups with `q=ADMINS_${tenantName}`
2. Parse the `profile.description` for the "tenantId"
3. Read back the Idp (by Id) from step #2

Similarly, [Update Idp](/api/#update-idp) triggers:

1. Search Groups with `q=ADMINS_${tenantName}`
2. Parse the `profile.description` for the "tenantId"
3. Update Idp (by Id) from step #2

### [Apps API](/api/#apps)

We implemented a [List Apps](/api/#list-apps) API which is context sensitive to the Bearer token of the request. If the token's `groups` claim contains `SUPERUSERS`, then list all apps that **startsWith** `DAC_`. Else, list all apps that **startswith** `APPUSERS_${tenantName}`. For implementation details refer to the project source code.

::: tip NOTE
To distinguish between SaaS provider products/apps and other apps in Okta, we simply prefix them with `DAC_`
:::

### Custom Authorizer

Amazon API Gateway supports custom authorizers where you can restrict access to the exact HTTP method and route. We rely heavily on this functionality to provide AuthZ functionality to our composite APIs.

In the custom authorizer, we restrict access to the tenant-namespaced route based on which tenant the user is an ADMIN of. Keep in mind that our JWT contains the `tenants` and `groups` claims, which give us the AuthZ information that we need to generate the following policy:

```js
// Everyone can read apps
policy.allowMethod(AuthPolicy.HttpVerb.GET, 'apps');
policy.allowMethod(AuthPolicy.HttpVerb.GET, 'apps/*');

// Only superusers can read and add tenants
if (jwt.claims.groups && jwt.claims.groups.includes('SUPERUSERS')) {
    policy.allowMethod(AuthPolicy.HttpVerb.GET, 'tenants');
    policy.allowMethod(AuthPolicy.HttpVerb.POST, 'tenants');
    policy.allowMethod(AuthPolicy.HttpVerb.ALL, 'tenants/*');
}

const tenants = jwt.claims.tenants;
if (tenants && tenants.length > 0) {
    policy.allowMethod(AuthPolicy.HttpVerb.GET, 'idps');
    tenants.forEach((tenant)=>{
        const parts = tenant.split(':');
        // Tenant Admins can read and update their own idp settings
        policy.allowMethod(AuthPolicy.HttpVerb.GET, 'idps/' + parts[0]);
        policy.allowMethod(AuthPolicy.HttpVerb.GET, 'idps/' + parts[0] + '/metadata.xml');
        policy.allowMethod(AuthPolicy.HttpVerb.PUT, 'idps/' + parts[0]);   

        // Read own tenants
        policy.allowMethod(AuthPolicy.HttpVerb.GET, 'tenants/' + parts[1]);
        policy.allowMethod(AuthPolicy.HttpVerb.GET, 'tenants/' + parts[1] + '/domains');
        policy.allowMethod(AuthPolicy.HttpVerb.GET, 'tenants/' + parts[1] + '/domains/*');

        policy.allowMethod(AuthPolicy.HttpVerb.PUT, 'tenants/' + parts[1] + '/admins/*');    // Assign Tenant Admins
        policy.allowMethod(AuthPolicy.HttpVerb.POST, 'tenants/' + parts[1] + '/domains');    // Register Tenant Domains
        policy.allowMethod(AuthPolicy.HttpVerb.PUT, 'tenants/' + parts[1] + '/domains/*');   // Verify Tenant Domains
        policy.allowMethod(AuthPolicy.HttpVerb.DELETE,'tenants/' + parts[1] + '/domains/*'); // De-register Tenant Domains
        policy.allowMethod(AuthPolicy.HttpVerb.PUT, 'tenants/' + parts[1] + '/apps/*');      // Assign all tenant users to app
    });
}
```

---

## Next Steps
If you're ready to test out the sample project(s), head over to the [Setup](/setup/) section to get started.