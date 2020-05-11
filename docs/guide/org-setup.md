# Org Configuration

## Terraform
We use the [Okta Terraform Provider](https://www.terraform.io/docs/providers/okta/index.html) to automatically configure the Okta Org. Refer to the [setup](/setup/terraform.html) section for more information.

## Configuration
* Add SUPERUSERS Group
* Add okta-dac app
* Add byob-dashboard app
* Add Tenants profile attribute
    ![alt text](./images/setup/ProfileAttribute_Tenants.png)
* Add `dac.admins` scope
    ![alt text](./images/setup/CustomScope.png)
* Add claims
    ![alt text](./images/setup/CustomClaims.png)
* Add AccessPolicy
    ![alt text](./images/setup/Policy_DACUsers.png)
    ![alt text](./images/setup/Policy_EveryoneElse.png)