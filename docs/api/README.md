---
sidebarDepth: 3
collapsable: true
---
# Composite APIs

## Tenants

### Add Tenant
| POST | `tenants/` |
| ---- | --- |

__Request Body__

Example
```json
{
    "name": "spidermonkey"
}
```

__Successful Reponse__

Status: 201 Created
::: details Sample (Click to view)
```json
HTTP/1.1 201 CREATED
{
    "id": "0oaphsztw1XNmNqbb0h7",
    "adminsGroupId": "00griz62cg4YrBs0v0h7", // FIXME: rename ADMINS_groupId
    "usersGroupId": "00griz1rfjSqSxexz0h7",  // FIXME: rename USERS_groupId
    "roleId": "KVJUKUS7IFCE2SKO",            // FIXME: rename ADMINS_roleId
    "name": "spidermonkey",
    "created": "2020-05-14T06:29:07.000Z",
    "lastUpdated": "2020-05-14T06:29:07.000Z"
}
```
:::

### Get Tenant
| GET | `tenants/${tenant}` |
| --- | --- |

__Request Parameters__
| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| tenant | Name of the tenant | String | TRUE|

__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
{
    "id": "0oaphsztw1XNmNqbb0h7",
    "name": "spidermonkey",
    "groupId": "00gpht48f2bSI7jZw0h7", // FIXME: rename ADMINS_groupId
    "created": "2020-01-29T17:55:02.000Z"
}
```
:::

__Exception Reponse__

Status: 404 Not Found

### List Tenants (with Pagination)
| GET | `tenants?after=${after}`|
| --- | --- |

__Request Parameters__
| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| after | For pagination. Search results set return values "after" this tenant `id` | String | FALSE |

__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://${apiUrl}/tenants>; rel="self"
Link: <https://${apiUrl}/tenants?after=0oappepjgd1Jb1Bav0h7>; rel="next"
[
    {
        "id": "0oaphsztw1XNmNqbb0h7", // TODO: Add ADMINS_groupId
        "name": "spidermonkey",
        "created": "2020-01-29T17:50:49.000Z"
    },
    {
        "id": "0oapi0vtwxmVdOywi0h7",
        "name": "boeing",
        "created": "2020-01-30T00:06:34.000Z"
    },
    {
        "id": "0oappepjgd1Jb1Bav0h7",
        "name": "cocacola",
        "created": "2020-02-12T08:56:49.000Z"
    }
]
```
:::

### Search Tenants
| GET | `tenants?search=${search}` |
| --- | --- |

__Request Parameters__
| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| search | Tenant name `startsWith` search operand | String | FALSE |

__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
[
    {
        "id": "0oaphsztw1XNmNqbb0h7",
        "groupId": "00gpht48f2bSI7jZw0h7", // FIXME: rename ADMINS_groupId
        "name": "spidermonkey",
        "created": "2020-01-29T17:55:02.000Z"
    }
]
```
:::

## Tenant Apps
### List Tenant Apps
| GET | `tenants/${tenant}/apps` |
| --- | --- |

__Request Parameters__
| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| tenant | Name of tenant | String | TRUE |

__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
[
    {
        "id": "0oaphr2fltdBwkQHj0h7",
        "groupId": "00gr8ltdvqFJRSRjk0h7", // FIXME: rename APPUSERS_groupId
        "name": "MonkeyDynamics",
        "created": "2020-01-29T17:53:14.000Z",
        "lastUpdated": "2020-05-01T05:22:04.000Z",
        "logo": [
            {
                "name": "medium",
                "href": "https://op1static.oktacdn.com/fs/bco/4/fs0radz6ecFvmO7Hv0h7",
                "type": "image/png"
            }
        ]
    },
    {
        "id": "0oaphr8z83xlSeZAg0h7",
        "groupId": "00gq6yr99ofXpUAfv0h7",
        "name": "Spyderware",
        "created": "2020-01-29T17:53:29.000Z",
        "lastUpdated": "2020-05-01T04:47:50.000Z",
        "logo": [
            {
                "name": "medium",
                "href": "https://op1static.oktacdn.com/fs/bco/4/fs0raa8zay8W8cCu10h7",
                "type": "image/png"
            }
        ]
    },
    {
        "id": "0oaq1xvxlfoEEbii40h7",
        "groupId": "00gq6z45p6WQApZ5P0h7",
        "name": "Umbrella",
        "created": "2020-03-04T00:06:52.000Z",
        "lastUpdated": "2020-05-01T05:11:50.000Z",
        "logo": [
            {
                "name": "medium",
                "href": "https://op1static.oktacdn.com/fs/bco/4/fs0rac9h6cchMqovu0h7",
                "type": "image/png"
            }
        ]
    }
]
```
:::

### Activate Tenant App
| PUT | `tenants/${tenant}/apps/${appId}` |
| --- | --- |

__Request Parameters__
| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| tenant | Name of tenant | String | TRUE |
| appId | `id` of the app | String | TRUE |

__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
{
    "id": "0oaq1xvxlfoEEbii40h7",
    "lastUpdated": "2020-05-14T06:54:56.000Z" 
    // FIXME: {
    //      tenantId:
    //      appId:
    // }
}
```
:::

__Exception Reponse__

Status: 404 Not Found

### Deactivate Tenant App
| DELETE | `tenants/${tenant}/apps/${appId}` |
| ------ | --- |

__Request Parameters__
| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| tenant | Name of tenant | String | TRUE |
| appId | `id` of the app | String | TRUE |

__Successful Reponse__

Status: 204
__Response__
```json
HTTP/1.1 204 No Content
```

__Exception Reponse__

Status: 404 Not Found

## Tenant Admins
### Get Tenant Admin
| GET | `tenants/${tenant}/admins` |
| --- | --- |

__Request Parameters__
| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| tenant | Name of tenant | String | TRUE |

__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
[
    {
        "id": "00uphv18xwgIEFgyp0h7",
        "status": "ACTIVE",
        "created": "2020-01-29T19:20:18.000Z",
        "activated": "2020-01-29T19:20:19.000Z",
        "statusChanged": "2020-03-17T04:40:52.000Z",
        "lastLogin": "2020-05-07T23:03:20.000Z",
        "lastUpdated": "2020-03-17T04:40:52.000Z",
        "passwordChanged": "2020-01-29T19:20:19.000Z",
        "type": { // FIXME: remove
            "id": "otyp8q9xbeIPtCT140h7"
        },
        "profile": {
            "firstName": "Pamela",
            "lastName": "Landy",
            "mobilePhone": null, // FIXME: remove
            "secondEmail": null, // FIXME: remove
            "login": "pamela.landy@byob.com",  // FIXME: remove
            "email": "pamela.landy@byob.com"
        }
    }
]
```
:::

### Assign Tenant Admin
| PUT | `tenants/${tenant}/admins/${userId}` |
| --- | --- |

__Request Parameters__
| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| tenant | Name of tenant | String | TRUE |
| userId | `id` of user | String | TRUE |

__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
{
    "id": "0oaphsztw1XNmNqbb0h7",
    "lastUpdated": "2020-01-29T19:20:18.000Z"
     // FIXME: {
     //    tenantId: 
     //    userId:
     //    date?        
     // }
}
```
:::

## Tenant Domains
### List Tenant Domain
| GET | `tenants/${tenant}/domains?verified=false | true` |
| --- | --- |

| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| tenant | Name of tenant | String | TRUE |
| verified | If not supplied returns both verified and unverified domains. If provided, valid values are `true` or `false` | String | FALSE |

__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
[
    {
        "domain": "jeppesen.com",
        "verified": true
    },
    {
        "domain": "boeing.com",
        "verified": true
    },
    {
        "domain": "boeings.com",
        "verified": true
    },
    {
        "domain": "boewing.com",
        "verified": true
    },
    {
        "domain": "jeppesen.co",
        "verified": false,
        "dnsVerificationString": "c0cced8f-072c-4c8e-99ac-239e0c2e6f95"
    }
]
```
:::

### Add Tenant Domain
| POST | `tenants/${tenant}/domains` |
| ---- | --- |

| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| tenant | Name of tenant | String | TRUE |

__Request Body__

Example
```json
{
    "domain": "spidermonkey.com",
    "verified": true
}
```
__Successful Reponse__

Status: 201
::: details Sample (Click to view)
```json
HTTP/1.1 201 Created
{
    "domain": "spidermonkey.com"
}
```
:::

### Delete Tenant Domain
| DELETE | `tenants/${tenant}/domains/${domain}` |
| ------ | --- |

| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| tenant | Name of tenant | String | TRUE |
| domain | domain name | String | TRUE |

__Successful Reponse__

Status: 204
__Response__
```json
HTTP/1.1 204 No Content
```

### Verify Tenant Domain
| PUT |`tenants/${tenant}/domains/${domain}` |
| --- | --- |

| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| tenant | Name of tenant | String | TRUE |
| domain | domain name | String | TRUE |

__Request Body__

Example
```json
{
    "dnsVerificationString": "c0cced8f-072c-4c8e-99ac-239e0c2e6f95"
}
```
__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
{
    "domain": "spidermonkey.com",
    "verified": true
}
```
:::

## Idps
### Get Idp
| GET | `idps/${id}` |
| --- | --- |

| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| id | `id` of the Idp | String | TRUE |

__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
{
    "id": "0oapi0vtwxmVdOywi0h7",
    "type": "SAML2",
    "name": "boeing",
    "status": "ACTIVE",
    "created": "2020-01-30T00:06:34.000Z",
    "lastUpdated": "2020-05-02T22:27:19.000Z",
    "protocol": {
        "type": "SAML2",
        "endpoints": {
            "sso": {
                "url": "https://zeekhoo.okta.com/app/zeekhoooktacom_byobrandoktacom_1/exke0m58lpSjmtNcN1t7/sso/saml",
                "binding": "HTTP-POST",
                "destination": "https://foo/saml/sso"
            },
            "acs": {
                "binding": "HTTP-POST",
                "type": "INSTANCE"
            }
        },
        "algorithms": {
            "request": {
                "signature": {
                    "algorithm": "SHA-256",
                    "scope": "NONE"
                }
            },
            "response": {
                "signature": {
                    "algorithm": "SHA-256",
                    "scope": "ANY"
                }
            }
        },
        "settings": {
            "nameFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
        },
        "credentials": {
            "trust": {
                "issuer": "http://www.okta.com/exke0m58lpSjmtNcN1t7",
                "audience": "https://www.okta.com/saml2/service-provider/spkrvvlbtvuebtbplzul",
                "kid": "3027a332-4017-4ac3-bb18-47b7b7eec36d",
                "revocation": null,
                "revocationCacheLifetime": 0
            },
            "signing": {
                "kid": "_qY5bb1mqmdxDYSEN3ALOSNRyK8KhUOQaC8trQNIEjw"
            }
        }
    },
    "policy": {
        "provisioning": {
            "action": "AUTO",
            "profileMaster": false,
            "groups": {
                "action": "ASSIGN",
                "assignments": [
                    "00gpi18cf4SkPByz40h7"
                ]
            },
            "conditions": {
                "deprovisioned": {
                    "action": "NONE"
                },
                "suspended": {
                    "action": "NONE"
                }
            }
        },
        "accountLink": {
            "filter": null,
            "action": "AUTO"
        },
        "subject": {
            "userNameTemplate": {
                "template": "idpuser.subjectNameId"
            },
            "filter": "",
            "matchType": "EMAIL",
            "matchAttribute": null
        },
        "maxClockSkew": 300000
    },
    "_links": { // FIXME: remove
        "metadata": {
            "href": "https://byobrand.oktapreview.com/api/v1/idps/0oapi0vtwxmVdOywi0h7/metadata.xml",
            "type": "application/xml",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "acs": {
            "href": "https://byobrand.oktapreview.com/sso/saml2/0oapi0vtwxmVdOywi0h7",
            "type": "application/xml",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "users": {
            "href": "https://byobrand.oktapreview.com/api/v1/idps/0oapi0vtwxmVdOywi0h7/users",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "deactivate": {
            "href": "https://byobrand.oktapreview.com/api/v1/idps/0oapi0vtwxmVdOywi0h7/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    },
    "x5c": [
        "MIIDnjCCAoagAwIBAgIGAVzS5UBOMA0GCSqGSIb3DQEBCwUAMIGPMQswCQYDVQQGEwJVUzETMBEG\rA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU\rMBIGA1UECwwLU1NPUHJvdmlkZXIxEDAOBgNVBAMMB3plZWtob28xHDAaBgkqhkiG9w0BCQEWDWlu\rZm9Ab2t0YS5jb20wHhcNMTcwNjIzMDI1OTU4WhcNMjcwNjIzMDMwMDU4WjCBjzELMAkGA1UEBhMC\rVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNVBAoM\rBE9rdGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRAwDgYDVQQDDAd6ZWVraG9vMRwwGgYJKoZIhvcN\rAQkBFg1pbmZvQG9rdGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtrAO+BxT\rPPSJetJEXPQze8THcRLaD8aiTyCfV6NnZ/ERX85NJ6YpOarF82OecQp2LhaP4SnZfFYPS8kaltk0\rYjSlz206XcDysGaUWPsIbDdljtLMbb1QXht3b+/dA6ynPtk0p1NqLwXTWuhZo+VJ04vEFq0CbQom\rvhU7zHnIvGIiTjvhAxW2UI25bkW9K8jvyJ7NaNZ+5J5MsTlpdYWvibd2p6UvuTz4XhQW+AajAubB\rdOcyCfuvl61d7TCd9rT0sot1qrCWB77rCr6DcR2tonJ7FSUaPezCobm/OgWi5NoC/M5lgXhoG+Fw\rC6GqwiJwRpS9pI5dkmUudUDPVoh8bQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQA/W5j1euP2nLhS\rqlrJYwMm/7XXCqnhu3eBLnzkgRqNH6khtX1spAhC3w5L0w0JF4SgfjXAbAsWn6a6YsicEQsrDGdp\r3deMiKkkS9loWsJRhZB+FYvkrGv/EDtF9p16K2hcDbNAXkV7mKRbWiKthzWJ4o72DyPfwlyq8bTq\rVDk5ymHBYu2taomgRSQq/E+vGU1XXK9mPBHOq+ZeIDr+g8zvZhsU0R1uH+jM9iniPVX7DirN0Nwr\rsYfl5mDCZTjCiA5sRnHN644s3Kw0GHbvEYsxfjQQm/FtPiVQzg2H8EygVTOnQnyt+5KMEeEz7OTB\rxmkn+qw/u2YTUuUiUAM7dwt5\r"
    ]
}
```
:::

__Exception Reponse__

Status: 404 Not Found

### List Idps
| GET | `idps/` |
| --- | --- |

__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
[
  {
    "id": "0oapi0vtwxmVdOywi0h7",
    "type": "SAML2",
    "name": "boeing",
    "status": "ACTIVE",
    "created": "2020-01-30T00:06:34.000Z",
    "lastUpdated": "2020-05-02T22:27:19.000Z",
    "protocol": {
        "type": "SAML2",
        "endpoints": {
            "sso": {
                "url": "https://zeekhoo.okta.com/app/zeekhoooktacom_byobrandoktacom_1/exke0m58lpSjmtNcN1t7/sso/saml",
                "binding": "HTTP-POST",
                "destination": "https://foo/saml/sso"
            },
            "acs": {
                "binding": "HTTP-POST",
                "type": "INSTANCE"
            }
        },
        "algorithms": {
            "request": {
                "signature": {
                    "algorithm": "SHA-256",
                    "scope": "NONE"
                }
            },
            "response": {
                "signature": {
                    "algorithm": "SHA-256",
                    "scope": "ANY"
                }
            }
        },
        "settings": {
            "nameFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
        },
        "credentials": {
            "trust": {
                "issuer": "http://www.okta.com/exke0m58lpSjmtNcN1t7",
                "audience": "https://www.okta.com/saml2/service-provider/spkrvvlbtvuebtbplzul",
                "kid": "3027a332-4017-4ac3-bb18-47b7b7eec36d",
                "revocation": null,
                "revocationCacheLifetime": 0
            },
            "signing": {
                "kid": "_qY5bb1mqmdxDYSEN3ALOSNRyK8KhUOQaC8trQNIEjw"
            }
        }
    },
    "policy": {
        "provisioning": {
            "action": "AUTO",
            "profileMaster": false,
            "groups": {
                "action": "ASSIGN",
                "assignments": [
                    "00gpi18cf4SkPByz40h7"
                ]
            },
            "conditions": {
                "deprovisioned": {
                    "action": "NONE"
                },
                "suspended": {
                    "action": "NONE"
                }
            }
        },
        "accountLink": {
            "filter": null,
            "action": "AUTO"
        },
        "subject": {
            "userNameTemplate": {
                "template": "idpuser.subjectNameId"
            },
            "filter": "",
            "matchType": "EMAIL",
            "matchAttribute": null
        },
        "maxClockSkew": 300000
    },
    "_links": { // FIXME: remove
        "metadata": {
            "href": "https://byobrand.oktapreview.com/api/v1/idps/0oapi0vtwxmVdOywi0h7/metadata.xml",
            "type": "application/xml",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "acs": {
            "href": "https://byobrand.oktapreview.com/sso/saml2/0oapi0vtwxmVdOywi0h7",
            "type": "application/xml",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "users": {
            "href": "https://byobrand.oktapreview.com/api/v1/idps/0oapi0vtwxmVdOywi0h7/users",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "deactivate": {
            "href": "https://byobrand.oktapreview.com/api/v1/idps/0oapi0vtwxmVdOywi0h7/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    },
    "x5c": [
        "MIIDnjCCAoagAwIBAgIGAVzS5UBOMA0GCSqGSIb3DQEBCwUAMIGPMQswCQYDVQQGEwJVUzETMBEG\rA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU\rMBIGA1UECwwLU1NPUHJvdmlkZXIxEDAOBgNVBAMMB3plZWtob28xHDAaBgkqhkiG9w0BCQEWDWlu\rZm9Ab2t0YS5jb20wHhcNMTcwNjIzMDI1OTU4WhcNMjcwNjIzMDMwMDU4WjCBjzELMAkGA1UEBhMC\rVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNVBAoM\rBE9rdGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRAwDgYDVQQDDAd6ZWVraG9vMRwwGgYJKoZIhvcN\rAQkBFg1pbmZvQG9rdGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtrAO+BxT\rPPSJetJEXPQze8THcRLaD8aiTyCfV6NnZ/ERX85NJ6YpOarF82OecQp2LhaP4SnZfFYPS8kaltk0\rYjSlz206XcDysGaUWPsIbDdljtLMbb1QXht3b+/dA6ynPtk0p1NqLwXTWuhZo+VJ04vEFq0CbQom\rvhU7zHnIvGIiTjvhAxW2UI25bkW9K8jvyJ7NaNZ+5J5MsTlpdYWvibd2p6UvuTz4XhQW+AajAubB\rdOcyCfuvl61d7TCd9rT0sot1qrCWB77rCr6DcR2tonJ7FSUaPezCobm/OgWi5NoC/M5lgXhoG+Fw\rC6GqwiJwRpS9pI5dkmUudUDPVoh8bQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQA/W5j1euP2nLhS\rqlrJYwMm/7XXCqnhu3eBLnzkgRqNH6khtX1spAhC3w5L0w0JF4SgfjXAbAsWn6a6YsicEQsrDGdp\r3deMiKkkS9loWsJRhZB+FYvkrGv/EDtF9p16K2hcDbNAXkV7mKRbWiKthzWJ4o72DyPfwlyq8bTq\rVDk5ymHBYu2taomgRSQq/E+vGU1XXK9mPBHOq+ZeIDr+g8zvZhsU0R1uH+jM9iniPVX7DirN0Nwr\rsYfl5mDCZTjCiA5sRnHN644s3Kw0GHbvEYsxfjQQm/FtPiVQzg2H8EygVTOnQnyt+5KMEeEz7OTB\rxmkn+qw/u2YTUuUiUAM7dwt5\r"
    ]
  },
  ...
]
```
:::

### Get Idp Metadata
| GET | `idps/${id}/metadata.xml` |
| --- | --- |

| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| id | `id` of app | String | TRUE |


### Update Idp
| PUT | `idps/${id}` |
| --- | --- |

| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| id | `id` of app | String | TRUE |

__Request Body__

::: details Example (Click to expand)
```json
{
  "type": "SAML2",
  "name": "Example SAML IdP",
  "status": "INACTIVE",
  "protocol": {
    "type": "SAML2",
    "endpoints": {
      "sso": {
        "url": "https://idp.example.com/saml2/sso",
        "binding": "HTTP-REDIRECT",
        "destination": "https://idp.example.com/saml2/sso"
      },
      "acs": {
        "binding": "HTTP-POST",
        "type": "INSTANCE"
      }
    },
    "algorithms": {
      "request": {
        "signature": {
          "algorithm": "SHA-256",
          "scope": "REQUEST"
        }
      },
      "response": {
        "signature": {
          "algorithm": "SHA-256",
          "scope": "ANY"
        }
      }
    },
    "settings": {
      "nameFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
    },
    "credentials": {
      "trust": {
        "issuer": "https://idp.example.com",
        "audience": "https://www.okta.com/saml2/service-provider/spCQJRNaaxs7ANqKBO7M",
        "kid": "your-key-id"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
      "groups": {
        "action": "NONE"
      },
      "conditions": {
        "deprovisioned": {
          "action": "NONE"
        },
        "suspended": {
          "action": "NONE"
        }
      }
    },
    "accountLink": {
      "filter": null,
      "action": "AUTO"
    },
    "subject": {
      "userNameTemplate": {
        "template": "idpuser.subjectNameId"
      },
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 120000
  },
}
```
:::

__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
{
  "type": "SAML2",
  "name": "Example SAML IdP",
  "status": "INACTIVE",
  "protocol": {
    "type": "SAML2",
    "endpoints": {
      "sso": {
        "url": "https://idp.example.com/saml2/sso",
        "binding": "HTTP-REDIRECT",
        "destination": "https://idp.example.com/saml2/sso"
      },
      "acs": {
        "binding": "HTTP-POST",
        "type": "INSTANCE"
      }
    },
    "algorithms": {
      "request": {
        "signature": {
          "algorithm": "SHA-256",
          "scope": "REQUEST"
        }
      },
      "response": {
        "signature": {
          "algorithm": "SHA-256",
          "scope": "ANY"
        }
      }
    },
    "settings": {
      "nameFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
    },
    "credentials": {
      "trust": {
        "issuer": "https://idp.example.com",
        "audience": "https://www.okta.com/saml2/service-provider/spCQJRNaaxs7ANqKBO7M",
        "kid": "your-key-id"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
      "groups": {
        "action": "NONE"
      },
      "conditions": {
        "deprovisioned": {
          "action": "NONE"
        },
        "suspended": {
          "action": "NONE"
        }
      }
    },
    "accountLink": {
      "filter": null,
      "action": "AUTO"
    },
    "subject": {
      "userNameTemplate": {
        "template": "idpuser.subjectNameId"
      },
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 120000
  },
}
```
:::

## Apps
### Get App
| GET | `apps/${id}` |
| --- | --- |

| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| id | `id` of app | String | TRUE |

__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
{
    "id": "0oaphr2fltdBwkQHj0h7",
    "name": "AppDynamics",
    "created": "2020-01-29T17:53:14.000Z",
    "lastUpdated": "2020-05-01T05:22:04.000Z",
    "logo": [
        {
            "name": "medium",
            "href": "https://op1static.oktacdn.com/fs/bco/4/fs0radz6ecFvmO7Hv0h7",
            "type": "image/png"
        }
    ]
}
```
:::

### List Apps
| GET | `apps/` |
| --- | --- |

__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
[
    {
        "id": "0oaphr2fltdBwkQHj0h7",
        "name": "AppDynamics",
        "created": "2020-01-29T17:53:14.000Z",
        "lastUpdated": "2020-05-01T05:22:04.000Z",
        "logo": [
            {
                "name": "medium",
                "href": "https://op1static.oktacdn.com/fs/bco/4/fs0radz6ecFvmO7Hv0h7",
                "type": "image/png"
            }
        ]
    },
    {
        "id": "0oaq1xvxlfoEEbii40h7",
        "name": "Umbrella",
        "created": "2020-03-04T00:06:52.000Z",
        "lastUpdated": "2020-05-01T05:11:50.000Z",
        "logo": [
            {
                "name": "medium",
                "href": "https://op1static.oktacdn.com/fs/bco/4/fs0rac9h6cchMqovu0h7",
                "type": "image/png"
            }
        ]
    },
    {
        "id": "0oaq1z36mypNgGC4G0h7",
        "name": "Duo",
        "created": "2020-03-04T00:07:05.000Z",
        "lastUpdated": "2020-05-01T05:22:06.000Z",
        "logo": [
            {
                "name": "medium",
                "href": "https://op1static.oktacdn.com/fs/bco/4/fs0raafijiZKIah4v0h7",
                "type": "image/png"
            }
        ]
    },
    {
        "id": "0oaq22f4ebVd0QIeg0h7",
        "name": "Viptela",
        "created": "2020-03-04T00:07:20.000Z",
        "lastUpdated": "2020-05-01T05:12:05.000Z",
        "logo": [
            {
                "name": "medium",
                "href": "https://op1static.oktacdn.com/fs/bco/4/fs0rackhu6GQaCt4Z0h7",
                "type": "image/png"
            }
        ]
    },
    {
        "id": "0oaqg2mwc6dV3tjlr0h7",
        "name": "DNAC",
        "created": "2020-03-21T00:01:30.000Z",
        "lastUpdated": "2020-05-05T23:20:41.000Z",
        "logo": [
            {
                "name": "medium",
                "href": "https://op1static.oktacdn.com/fs/bco/4/fs0rabf1b464UcEmP0h7",
                "type": "image/png"
            }
        ]
    }
]
```
:::

### Update App
| PUT | `apps/${id}` |
| --- | --- |

| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| id | `id` of app | String | TRUE |

__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
{
    "id": "0oaphr2fltdBwkQHj0h7",
    "name": "AppDynamics",
    "created": "2020-01-29T17:53:14.000Z",
    "lastUpdated": "2020-05-01T05:22:04.000Z",
    "logo": [
        {
            "name": "medium",
            "href": "https://op1static.oktacdn.com/fs/bco/4/fs0radz6ecFvmO7Hv0h7",
            "type": "image/png"
        }
    ]
}
```
:::

## Admins
### Get Admin
| GET | `admins/${email}` |
| --- | --- |

| Parameter | Description | Type | Required |
| --- | :--- | --- | --- |
| email | User's email/username | String | TRUE |

__Successful Reponse__

Status: 200
::: details Sample (Click to view)
```json
HTTP/1.1 200 OK
{
    "id": "00uphv18xwgIEFgyp0h7",
    "status": "ACTIVE",
    "created": "2020-01-29T19:20:18.000Z",
    "activated": "2020-01-29T19:20:19.000Z",
    "statusChanged": "2020-03-17T04:40:52.000Z",
    "lastLogin": "2020-05-07T23:03:20.000Z",
    "lastUpdated": "2020-03-17T04:40:52.000Z",
    "passwordChanged": "2020-01-29T19:20:19.000Z",
    "type": { // FIXME: remove
        "id": "otyp8q9xbeIPtCT140h7"
    },
    "profile": {
        "firstName": "Pamela",
        "lastName": "Landy",
        "mobilePhone": null, // FIXME: remove
        "secondEmail": null, // FIXME: remove
        "login": "pamela.landy@byob.com", // FIXME: remove
        "email": "pamela.landy@byob.com"
    }
}
```
:::