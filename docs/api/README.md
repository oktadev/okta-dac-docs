---
sidebarDepth: 3
collapsable: true
---
# Composite APIs

## Tenants

### Add Tenant
__`POST`__`tenants/`

### Get Tenants by name
__`GET`__`tenants/{tenant}`

### List Tenants (with Pagination)
__`GET`__`tenants?after={after}`

### Search Tenants
__`GET`__`tenants?search={search}`


## Tenant Apps
### List Tenant Apps
__`GET`__`tenants/{tenant}/apps`

### Activate Tenant App
__`PUT`__`tenants/{tenant}/apps/{appId}`

### Deactivate Tenant App
__`DELETE`__`tenants/{tenant}/apps/{appId}`

## Tenant Admins
### Get Tenant Admin
__`GET`__`tenants/{tenant}/admins`

### Assign Tenant Admin
__`PUT`__`tenants/{tenant}/admins/{userId}`

## Tenant Domains
### Add Tenant Domain
__`POST`__`tenants/{tenant}/domains`

### Delete Tenant Domain
__`DELETE`__`tenants/{tenant}/domains/{domain}`

### List Tenant Domains
__`GET`__`tenants/{tenant}/domains`

### Get Verified or Unverified Tenant Domain by name
__`GET`__`tenants/{tenant}/domains?verified=false | true`

### Verify Domain
__`PUT`__`tenants/{tenant}/domains/{domain}`

## Idps
### List Idps
__`GET`__`idps/`

### Get Idp
__`GET`__`idps/{id}`

### Get Idp Metadata
__`GET`__`idps/{id}/metadata.xml`

### Update Idp
__`PUT`__`idps/{id}`

## Apps

### List Apps
__`GET`__`apps/`

### Get App
__`GET`__`apps/{id}`

### Update App
__`PUT`__`apps/{id}`

## Admins

### Get Admin
__`GET`__`admins/{email}`