# Terraform

We use the [Okta Terraform Provider](https://www.terraform.io/docs/providers/okta/index.html) to automatically configure the Okta Org.

## Setup Inputs for Terraform

The `terraform` directory in `okta-dac` contains a `terraform.tfvars.template` file with information that you need to fill in for your environment.

You will need to copy the template file as `terraform.tfvars` and specify/override the values for the different input variables, as shown below.

```sh
org_name        = "mytenant"
base_url        = "okta.com"
api_token       = "<OKTA_API_TOKEN>"
app_url         = "http://localhost:8080"
superuser_email = ""
environment     = "dev"
aws_region      = "us-east-1"
aws_profile     = "serverless-okta"
aws_ssm_prefix  = "dac"
```

This is a description of the variables:

| Variable | Description | Default Value |
| -------- | :---------: | ------------: |
| org_name | Okta tenant | "" |
| base_url | Base URL for Okta tenant | "okta.com" |
| api_token | Okta API token | |
| app_url | Base URL for DAC Single Page App. | "http://localhost:8080" |
| superuser_email | Email address of an existing Okta User to be configured as a SUPERUSER. | "" |
| environment | Stage configured in API Gateway (dev, prod, ...) | "dev" |
| aws_region | Region to deploy AWS components. See <https://aws.amazon.com/about-aws/global-infrastructure/regions_az/> | "us-east-1" |
| aws_profile | Profile configured in AWS CLI | "serverless-okta" |
| aws_ssm_prefix | Prefix for parameters created in AWS Parameter Store | "dac" |

## Using make to Automate Further

The DAC project also includes a `Makefile` that you can use to automate these tasks using `make`.

See installation instructions for your Operating System <https://www.gnu.org/software/make/>

### Check Dependencies

In a terminal, run `make check` from the okta-dac directory. This checks for all the dependencies and prints out the version information.

This is the output in macOS Catalina.

```sh
$ make check

Found Terraform v0.12.25
Found Serverless: Framework Core: 1.71.1 Plugin: 3.6.12 SDK: 2.3.0 Components: 2.30.10
Found aws-cli/2.0.8 Python/3.7.4 Darwin/19.4.0 botocore/2.0.0dev12
Found terraform.tfvars
```

### Run Targets

There are several targets specified in the Makefile.

#### Target - okta

This configures the Okta tenant with all the components specified in the terraform script.

::: details Sample output

```sh
$ make okta

Initializing the backend...

Initializing provider plugins...

The following providers do not have any version constraints in configuration,
so the latest version was installed.

To prevent automatic upgrades to new major versions that may contain breaking
changes, it is recommended to add version = "..." constraints to the
corresponding provider blocks in configuration, with the constraint strings
suggested below.

* provider.aws: version = "~> 2.63"

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

data.okta_group.dac-users: Refreshing state...
data.okta_policy.idp_policy: Refreshing state...

------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

...

```

:::

#### Target - api

This configures AWS with the API Gateway and backing lambda functions.

::: details Sample output

```sh
$ make api

npm WARN serverless-offline@6.1.7 requires a peer of serverless@>=1.60.0 but none is installed. You must install peer dependencies yourself.
npm WARN dac-api-tenants@1.0.0 No description
npm WARN dac-api-tenants@1.0.0 No repository field.

audited 297 packages in 1.699s

24 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service okta-dac-api.zip file to S3 (2.54 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - okta-dac-api-dev
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - ListTenantAppsLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - ActivateTenantAppLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - ProxyLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - GetTenantLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - AssignTenantAdminLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - ListAppsLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - VerifyTenantDomainLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - ListIdpsLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - AddTenantDomainLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - ListTenantDomainsLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - DeleteTenantDomainLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - UpdateTenantLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - ListTenantsLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - ListTenantAdminsLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - DeleteTenantLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - GetIdpLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - GetIdpMetadataLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - OktaAuthLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - AddTenantLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - DeactivateTenantAppLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - ActivateTenantAppLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - ListTenantAppsLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - ListAppsLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - UpdateIdpLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - VerifyTenantDomainLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - AssignTenantAdminLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - ProxyLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - DeleteTenantDomainLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - GetTenantLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - AddTenantDomainLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - ListIdpsLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - UpdateTenantLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - ListTenantDomainsLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - ListTenantsLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - OktaAuthLambdaVersionSInSW5MJwZIqiEyHPaq7PmgtR5E5miHnVOa8O0mpMb0
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - OktaAuthLambdaVersionSInSW5MJwZIqiEyHPaq7PmgtR5E5miHnVOa8O0mpMb0
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - AddTenantLambdaVersionWtU4msMxkOSW0BTB4gd42I5UwsEVGOL8QDAp1cvBU
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ProxyLambdaVersionYYeao8mHFrGcIM7AyhixVveeqfsJ7bSvY4MNKXC19tA
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - GetIdpMetadataLambdaVersionXjlDT0RRHUY4OT5yy6xNx9ffShHRGorzh56dQfoS0Io
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - GetIdpLambdaVersionQVeqQPna89VazNKPGpuXINCda7NTiy27BiBsjGh7o
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - DeleteTenantLambdaVersionVJIk7OSLWIHrY8z2zfzgRm3kjatBF1brJWiqHBaaX0
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - UpdateIdpLambdaVersionsZGMauNVzCkaZaOuhEz4S7xRausM6j241FzjSjBMpds
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ListTenantAdminsLambdaVersion1RyrFvdQBygoiie2swg48zIhFTHScnQBj9gzoCfZoKo
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - OktaAuthLambdaVersionSInSW5MJwZIqiEyHPaq7PmgtR5E5miHnVOa8O0mpMb0
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - DeleteTenantDomainLambdaVersionVikmozKStuYoWSA3Qc0TZTbcYdzkBbbeNV0PBdGZQRw
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ListTenantDomainsLambdaVersionSQxKqYvfvDRisBpIzHj1Sq8clAsb3mzIfV0asjM
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ActivateTenantAppLambdaVersion0Ncc2JLbfp2m7XDHh3m0D38ULe3OrCLLlDyepbQJYM4
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1590607994202
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - AddTenantLambdaVersionWtU4msMxkOSW0BTB4gd42I5UwsEVGOL8QDAp1cvBU
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - AddTenantDomainLambdaVersionrekkXfIYeCi2RE09XgtlDfLv7Ogmis07tyZW5nUA
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ProxyLambdaVersionYYeao8mHFrGcIM7AyhixVveeqfsJ7bSvY4MNKXC19tA
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - GetIdpLambdaVersionQVeqQPna89VazNKPGpuXINCda7NTiy27BiBsjGh7o
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - DeactivateTenantAppLambdaVersionmwpbGEsYA6JdwI0GMMiLJ94NcDsE1FkecIiF1TKTB4
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - GetIdpMetadataLambdaVersionXjlDT0RRHUY4OT5yy6xNx9ffShHRGorzh56dQfoS0Io
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - AssignTenantAdminLambdaVersion1qZ1pwnUsHWJ6mAaXAY863pPmeA6FBjMW0roHevFDlA
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ListTenantsLambdaVersionPW5q4susNL0NauGCxHe8g5LYRRU64W77E2OcMbbVl8
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - VerifyTenantDomainLambdaVersion5INSWagJMr9e1H56iGTN67X3JlVFh3ZVmqwotA8s
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - DeleteTenantLambdaVersionVJIk7OSLWIHrY8z2zfzgRm3kjatBF1brJWiqHBaaX0
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - UpdateTenantLambdaVersionFLz7ytwUTJtXEJHLD9m74CDYUDEnQJEyqp3iN61vFY
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ListTenantAppsLambdaVersionvuElJ6DQrFZHT5oPtApnb1VeZUfxzUAmiq5qkBlMO8
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ListIdpsLambdaVersionaFNE6Pp3q5UjAfgkGiVry9kFwdqct4kkqDIr7wfY
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ListAppsLambdaVersionzIZaSHZYQ6LwYkHLal3CbiUHUjtJa9Mrp2CRjBLJLpQ
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - GetTenantLambdaVersionkXEtgGuF4APNSFtew3kW0B9KlV2VdbUL4oAyGg0Dfk
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ListTenantAdminsLambdaVersion1RyrFvdQBygoiie2swg48zIhFTHScnQBj9gzoCfZoKo
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - UpdateIdpLambdaVersionsZGMauNVzCkaZaOuhEz4S7xRausM6j241FzjSjBMpds
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - AddTenantLambdaVersionWtU4msMxkOSW0BTB4gd42I5UwsEVGOL8QDAp1cvBU
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ListTenantDomainsLambdaVersionSQxKqYvfvDRisBpIzHj1Sq8clAsb3mzIfV0asjM
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - GetIdpLambdaVersionQVeqQPna89VazNKPGpuXINCda7NTiy27BiBsjGh7o
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - DeleteTenantDomainLambdaVersionVikmozKStuYoWSA3Qc0TZTbcYdzkBbbeNV0PBdGZQRw
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - ProxyLambdaVersionYYeao8mHFrGcIM7AyhixVveeqfsJ7bSvY4MNKXC19tA
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - GetIdpMetadataLambdaVersionXjlDT0RRHUY4OT5yy6xNx9ffShHRGorzh56dQfoS0Io
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ActivateTenantAppLambdaVersion0Ncc2JLbfp2m7XDHh3m0D38ULe3OrCLLlDyepbQJYM4
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - DeleteTenantLambdaVersionVJIk7OSLWIHrY8z2zfzgRm3kjatBF1brJWiqHBaaX0
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - ListTenantAdminsLambdaVersion1RyrFvdQBygoiie2swg48zIhFTHScnQBj9gzoCfZoKo
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - UpdateIdpLambdaVersionsZGMauNVzCkaZaOuhEz4S7xRausM6j241FzjSjBMpds
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - VerifyTenantDomainLambdaVersion5INSWagJMr9e1H56iGTN67X3JlVFh3ZVmqwotA8s
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - DeactivateTenantAppLambdaVersionmwpbGEsYA6JdwI0GMMiLJ94NcDsE1FkecIiF1TKTB4
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ListTenantAppsLambdaVersionvuElJ6DQrFZHT5oPtApnb1VeZUfxzUAmiq5qkBlMO8
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - AddTenantDomainLambdaVersionrekkXfIYeCi2RE09XgtlDfLv7Ogmis07tyZW5nUA
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - AssignTenantAdminLambdaVersion1qZ1pwnUsHWJ6mAaXAY863pPmeA6FBjMW0roHevFDlA
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1590607994202
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - DeleteTenantDomainLambdaVersionVikmozKStuYoWSA3Qc0TZTbcYdzkBbbeNV0PBdGZQRw
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ListTenantsLambdaVersionPW5q4susNL0NauGCxHe8g5LYRRU64W77E2OcMbbVl8
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - UpdateTenantLambdaVersionFLz7ytwUTJtXEJHLD9m74CDYUDEnQJEyqp3iN61vFY
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - ListTenantDomainsLambdaVersionSQxKqYvfvDRisBpIzHj1Sq8clAsb3mzIfV0asjM
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ListAppsLambdaVersionzIZaSHZYQ6LwYkHLal3CbiUHUjtJa9Mrp2CRjBLJLpQ
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ListIdpsLambdaVersionaFNE6Pp3q5UjAfgkGiVry9kFwdqct4kkqDIr7wfY
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - GetTenantLambdaVersionkXEtgGuF4APNSFtew3kW0B9KlV2VdbUL4oAyGg0Dfk
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - ActivateTenantAppLambdaVersion0Ncc2JLbfp2m7XDHh3m0D38ULe3OrCLLlDyepbQJYM4
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - VerifyTenantDomainLambdaVersion5INSWagJMr9e1H56iGTN67X3JlVFh3ZVmqwotA8s
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - ListTenantAppsLambdaVersionvuElJ6DQrFZHT5oPtApnb1VeZUfxzUAmiq5qkBlMO8
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - DeactivateTenantAppLambdaVersionmwpbGEsYA6JdwI0GMMiLJ94NcDsE1FkecIiF1TKTB4
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - AddTenantDomainLambdaVersionrekkXfIYeCi2RE09XgtlDfLv7Ogmis07tyZW5nUA
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Deployment - ApiGatewayDeployment1590607994202
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - ListTenantsLambdaVersionPW5q4susNL0NauGCxHe8g5LYRRU64W77E2OcMbbVl8
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - UpdateTenantLambdaVersionFLz7ytwUTJtXEJHLD9m74CDYUDEnQJEyqp3iN61vFY
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - AssignTenantAdminLambdaVersion1qZ1pwnUsHWJ6mAaXAY863pPmeA6FBjMW0roHevFDlA
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - ListIdpsLambdaVersionaFNE6Pp3q5UjAfgkGiVry9kFwdqct4kkqDIr7wfY
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - GetTenantLambdaVersionkXEtgGuF4APNSFtew3kW0B9KlV2VdbUL4oAyGg0Dfk
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - ListAppsLambdaVersionzIZaSHZYQ6LwYkHLal3CbiUHUjtJa9Mrp2CRjBLJLpQ
CloudFormation - UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - okta-dac-api-dev
CloudFormation - DELETE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1590556562668
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - VerifyTenantDomainLambdaVersionSb2M1T4s9h0Nc3vHQBxrc4acFKiCn1axIcTjApj87c
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - UpdateTenantLambdaVersionb7LxnS6IAptUVlq4BgubXLH2xNOO2qliRMnthYCWkEI
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - ListTenantAdminsLambdaVersionMiYrHHXstqBysbVqM3TAaCNWItxPn8djm9oz43H80
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - AddTenantLambdaVersionn2yZNUrQNfMHYHnBZRRRmt8yCYx0voQ8ogFNiwdI
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - GetTenantLambdaVersionjObHIDeZHArrVeSqgdjLPigSUpYaSEw1qXMzirRCkKs
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - ListIdpsLambdaVersion8vOTi7DTWt3z6wzJDXHKxjKkmmzCZyBOXA5CFxu410
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - OktaAuthLambdaVersioneD7UxZ2tX0LLm9ptlIZeTkksLa9y23aJDZORkd1SH8g
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - GetIdpLambdaVersion2kDrokxhqKhx92vVHhhfsOCBrRXlkmyjKztjwyOHmI
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - ListTenantAppsLambdaVersionOQjIXoTYxuEO2fREGFoabVpNCPUpj21RDgSQTkOvU
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - ProxyLambdaVersionJnVz3kjsRH00VZoHavGlY96aUvQ5UT4FAzFoPEk2s
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - UpdateIdpLambdaVersioncbVrg0swzhMao3ekKLyMR6chwMUB1x4kSzAk68Z7bE
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - ListAppsLambdaVersion5eetQuFqirdOPkBo9kbcHqb2nPAwQKO4sHY8pE79FE
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - DeactivateTenantAppLambdaVersionhhnYKmB4X6iBj2sNBEZUn9zuLf5023PYKpm985QI
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - ListTenantsLambdaVersionBOwU9WttVDXHyb1c7vfuFIWyfaxBOWoG9KPRji5nw
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - ActivateTenantAppLambdaVersionrs6SeQ0xInwV7o08rEi8PYMAAzBXksXyShpSegcXM
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - DeleteTenantLambdaVersionmFweEJiddrpKFSZ5NQVcZYT7SYIs3bGJZ79jd7XO4U
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - ListTenantDomainsLambdaVersion61VlLLFphKAaieggdgAmYiKl6VFO7MWW70MsVDFH8
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - DeleteTenantDomainLambdaVersionup6mf5WHG5jML2D8CHBdF0JhHNodOinTpYrH97xhb50
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - GetIdpMetadataLambdaVersionUoPecP8mfau3TyAApqFZ37szvVY0g00506nWIEOqDWY
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - AddTenantDomainLambdaVersionnqRyY23aw8slxTanly0KQh9REAjTOM6Av3swy8YOOc
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - AssignTenantAdminLambdaVersion8DcBzO6Km00rskqdhNftJNTEWmQ6qhJGtIMVRnyfo
CloudFormation - DELETE_COMPLETE - AWS::ApiGateway::Deployment - ApiGatewayDeployment1590556562668
CloudFormation - UPDATE_COMPLETE - AWS::CloudFormation::Stack - okta-dac-api-dev
Serverless: Stack update finished...
Service Information
service: okta-dac-api
stage: dev
region: us-east-2
stack: okta-dac-api-dev
resources: 138
api keys:
  None
endpoints:
  POST - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/tenants
  GET - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/tenants/{tenant}
  DELETE - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/tenants/{tenant}
  PUT - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/tenants/{tenant}
  GET - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/tenants
  GET - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/tenants/{tenant}/apps
  PUT - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/tenants/{tenant}/apps/{appId}
  DELETE - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/tenants/{tenant}/apps/{appId}
  GET - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/tenants/{tenant}/admins
  PUT - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/tenants/{tenant}/admins/{userId}
  POST - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/tenants/{tenant}/domains
  DELETE - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/tenants/{tenant}/domains/{domain}
  PUT - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/tenants/{tenant}/domains/{domain}
  GET - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/tenants/{tenant}/domains
  GET - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/apps
  GET - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/idps/{idpId}
  GET - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/idps
  GET - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/idps/{idpId}/metadata.xml
  PUT - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/idps/{idpId}
  ANY - https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev/api/v1/{proxy+}
functions:
  oktaAuth: okta-dac-api-dev-oktaAuth
  addTenant: okta-dac-api-dev-addTenant
  getTenant: okta-dac-api-dev-getTenant
  deleteTenant: okta-dac-api-dev-deleteTenant
  updateTenant: okta-dac-api-dev-updateTenant
  listTenants: okta-dac-api-dev-listTenants
  listTenantApps: okta-dac-api-dev-listTenantApps
  activateTenantApp: okta-dac-api-dev-activateTenantApp
  deactivateTenantApp: okta-dac-api-dev-deactivateTenantApp
  listTenantAdmins: okta-dac-api-dev-listTenantAdmins
  assignTenantAdmin: okta-dac-api-dev-assignTenantAdmin
  addTenantDomain: okta-dac-api-dev-addTenantDomain
  deleteTenantDomain: okta-dac-api-dev-deleteTenantDomain
  verifyTenantDomain: okta-dac-api-dev-verifyTenantDomain
  listTenantDomains: okta-dac-api-dev-listTenantDomains
  listApps: okta-dac-api-dev-listApps
  getIdp: okta-dac-api-dev-getIdp
  listIdps: okta-dac-api-dev-listIdps
  getIdpMetadata: okta-dac-api-dev-getIdpMetadata
  updateIdp: okta-dac-api-dev-updateIdp
  proxy: okta-dac-api-dev-proxy
layers:
  None

Stack Outputs
DeleteTenantDomainLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-deleteTenantDomain:4
OktaAuthLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-oktaAuth:4
DeactivateTenantAppLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-deactivateTenantApp:4
ListTenantAppsLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-listTenantApps:4
GetIdpMetadataLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-getIdpMetadata:4
AddTenantLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-addTenant:4
DeleteTenantLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-deleteTenant:4
ListTenantDomainsLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-listTenantDomains:4
AddTenantDomainLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-addTenantDomain:4
ListTenantsLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-listTenants:4
AssignTenantAdminLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-assignTenantAdmin:4
VerifyTenantDomainLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-verifyTenantDomain:4
ServerlessDeploymentBucketName: okta-dac-api-dev-serverlessdeploymentbucket-t1pzgi2kjtfq
ListAppsLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-listApps:4
ListTenantAdminsLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-listTenantAdmins:4
ListIdpsLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-listIdps:4
ProxyLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-proxy:4
UpdateTenantLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-updateTenant:4
GetIdpLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-getIdp:4
ActivateTenantAppLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-activateTenantApp:4
GetTenantLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-getTenant:4
ServiceEndpoint: https://57dzkihqmh.execute-api.us-east-2.amazonaws.com/dev
UpdateIdpLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:661666207641:function:okta-dac-api-dev-updateIdp:4

Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.
```

:::

#### Target - spa

::: warning
This is a work-in-progress
:::

This configures AWS with the S3 buckets.

#### Target - destroyOkta

This tears down the components setup by  in the Okta tenant.

#### Target - removeApi

This removes the API Gateway and lambda functions from the configured AWS account and region.

#### Target - removeSpa

::: warning
This is a work-in-progress
:::
This removes the S3 bucket and other assets from the configured AWS account and region.
