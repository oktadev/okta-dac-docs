# API

This section discusses the design for okta-dac [composite APIs](/api)


### Custom Authorizer
In the custom authorizer, we restrict access to the tenant-namespaced route based on which tenant the user is an ADMIN of:
```js
// Everyone can read apps
policy.allowMethod(AuthPolicy.HttpVerb.GET, "/apps");
policy.allowMethod(AuthPolicy.HttpVerb.GET, "/apps/*");

// Tenant admins can read/manage their own idp settings
const tenants = jwt.claims.tenants;
if (tenants && tenants.length > 0) {
    policy.allowMethod(AuthPolicy.HttpVerb.GET, '/idps');
    tenants.forEach((tenant)=>{
        const parts = tenant.split(':');
        policy.allowMethod(AuthPolicy.HttpVerb.GET, '/idps/' + parts[0]);
        policy.allowMethod(AuthPolicy.HttpVerb.GET, '/idps/' + parts[0] + '/metadata.xml');
        policy.allowMethod(AuthPolicy.HttpVerb.PUT, '/idps/' + parts[0]);
    });            
}

if (jwt.claims.groups && jwt.claims.groups.includes('SUPERUSERS')) {
    // Only superusers can manage tenants
    policy.allowMethod(AuthPolicy.HttpVerb.GET, "/tenants");
    policy.allowMethod(AuthPolicy.HttpVerb.POST, "/tenants");
    policy.allowMethod(AuthPolicy.HttpVerb.ALL, "/tenants/*");
    // read admins
    policy.allowMethod(AuthPolicy.HttpVerb.GET, "/admins/*");
    // update app profile
    policy.allowMethod(AuthPolicy.HttpVerb.PUT, "/apps/*");
} else {
    jwt.claims.groups.forEach(grp=>{
        if (grp.startsWith('ADMINS_')) {
            policy.allowMethod(AuthPolicy.HttpVerb.GET, "/tenants/" + grp.split('_')[1]);
            policy.allowMethod(AuthPolicy.HttpVerb.PUT, "/tenants/" + grp.split('_')[1] + "/admins/*");
            policy.allowMethod(AuthPolicy.HttpVerb.GET, "/tenants/" + grp.split('_')[1] + "/domains");
            policy.allowMethod(AuthPolicy.HttpVerb.GET, "/tenants/" + grp.split('_')[1] + "/domains/*");
            policy.allowMethod(AuthPolicy.HttpVerb.POST, "/tenants/" + grp.split('_')[1] + "/domains");
            policy.allowMethod(AuthPolicy.HttpVerb.PUT, "/tenants/" + grp.split('_')[1] + "/domains/*");
            policy.allowMethod(AuthPolicy.HttpVerb.DELETE, "/tenants/" + grp.split('_')[1] + "/domains/*");
        }
    });
}
```