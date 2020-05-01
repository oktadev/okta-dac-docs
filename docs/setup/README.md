---
title: Installation
# We can even add meta tags to the page! This sets the keywords meta tag.
# <meta name="keywords" content="my SEO keywords"/>
meta:
  - name: keywords
  - content: my SEO keywords
---

# Setup and Installation

The BYOB project will need to install custom serverless components within AWS and also refer to entities defined within the Okta tenant. BYOB leverages `terraform` and `serverless` to setup all the infrastructure as code.

## Install Terraform

Terraform is used to setup Okta.

See installation instructions here for your operating system: <https://learn.hashicorp.com/terraform/getting-started/install.html>

## Install Serverless

Serverless is used to setup AWS.

See installation instructions here for your operating system: <https://www.serverless.com/framework/docs/getting-started/>

## Install AWS CLI

AWS CLI will be used by serverless to deploy to AWS

See installation instructions here for your operating system: <https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html>

## Enable Programmatic Access to AWS

To enable programmatic access to AWS within terraform and serverless, you will need to create an IAM user with sufficient admin privileges.

Log in to the AWS account where you plan to host the BYOB artifacts and navigate to the `IAM` Service.

![AWS IAM Service](./images/aws-iam.png)

Click on `Users`

![AWS IAM - Users](./images/aws-iam-users.png)

Click on `Add User`. Make sure to check `Programmatic access` as the access type.

![AWS IAM - Add User](./images/aws-iam-create-user.png)

Click `Next: Permissions`

In `Set Permissions`, select `Attach existing policies directly`.

Select the `Administrator Access` policy as below:

![AWS IAM - Admin Access Policy](./images/aws-iam-user-admin-policy.png)

Click `Next: Tags`

Optional: Create a tag with key `okta` with value `byob`

![AWS IAM - Tags](./images/aws-iam-user-tags.png)

Click `Next: Review` to review the user configuration.

![AWS IAM - Tags](./images/aws-iam-user-review.png)

Click `Create user`.

Once the user is created, you can download the csv with the `Access Key ID` and `Secret access key`.

![AWS IAM - Credentials](./images/aws-iam-user-credentials.png)

## Create Named Profile in AWS CLI

The terraform and serverless scripts will use credentials defined in the named profile `serverless-okta`.

Follow the steps to configure the profile <https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html> using the credentials - `Access Key ID` and `Secret access key` from the previous step.

```
serverless config credentials --provider aws --key  <AWS_ACCESS_KEY_ID> --secret <AWS_SECRET_ACCESS_KEY> --profile serverless-okta
```

You can verify the presence of the named profile in the `.aws/credentials` file.

```
more ~/.aws/credentials
```

See the terminal console output below:

![AWS Named Profile - Credentials](./images/aws-cli-profile.png)

## Enable Programmatic Access to Okta

To enable programmatic access to Okta within Terraform, you need to do the following:

Log in to Admin dashboard of the Okta tenant. Make sure to login as a user with sufficient privileges to create entities like Applications and Authorization Servers

Navigate to `Security -> API -> Tokens`

![Okta Security - Tokens](./images/okta-tokens.png)

Create a Token. You can name the token `Terraform Token`.

![Okta Security - Create Token](./images/okta-create-token.png)

Make sure to copy the created token. This will be used in terraform.

![Okta Security - Token Created](./images/okta-token-created.png)
