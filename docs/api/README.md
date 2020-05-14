---
sidebarDepth: 3
collapsable: true
---
# Composite APIs

## Tenants

### Add Tenant
| POST | `tenants/` |
| ---- | --- |

### Get Tenant
| GET | `tenants/{tenant}` |
| --- | --- |

### List Tenants (with Pagination)
| GET | `tenants?after={after}`|
| --- | --- |

### Search Tenants
| GET | `tenants?search={search}` |
| --- | --- |

## Tenant Apps
### List Tenant Apps
| GET | `tenants/{tenant}/apps` |
| --- | --- |

### Activate Tenant App
| PUT | `tenants/{tenant}/apps/{appId}` |
| --- | --- |

### Deactivate Tenant App
| DELETE | `tenants/{tenant}/apps/{appId}` |
| ------ | --- |

## Tenant Admins
### Get Tenant Admin
| GET | `tenants/{tenant}/admins` |
| --- | --- |

### Assign Tenant Admin
| PUT | `tenants/{tenant}/admins/{userId}` |
| --- | --- |

## Tenant Domains
### Get Verified or Unverified Tenant Domain
| GET | `tenants/{tenant}/domains?verified=false | true` |
| --- | --- |

### List Tenant Domains
| GET | `tenants/{tenant}/domains` |
| --- | --- |

### Add Tenant Domain
| POST | `tenants/{tenant}/domains` |
| ---- | --- |

### Delete Tenant Domain
| DELETE | `tenants/{tenant}/domains/{domain}` |
| ------ | --- |

### Verify Tenant Domain
| PUT |`tenants/{tenant}/domains/{domain}` |
| --- | --- |

## Idps
### Get Idp
| GET | `idps/{id}` |
| --- | --- |

### List Idps
| GET | `idps/` |
| --- | --- |

### Get Idp Metadata
| GET | `idps/{id}/metadata.xml` |
| --- | --- |

### Update Idp
| PUT | `idps/{id}` |
| --- | --- |

## Apps
### Get App
| GET | `apps/{id}` |
| --- | --- |

### List Apps
| GET | `apps/` |
| --- | --- |

### Update App
| PUT | `apps/{id}` |
| --- | --- |

## Admins
### Get Admin
| GET | `admins/{email}` |
| --- | --- |
