# sp

## npm upgrades

```out
ncu --upgrade
Upgrading /Users/Shared/source/repos/shortpoet/sp/app/package.json
[====================] 51/51 100%

 @fortawesome/fontawesome-free              ^5.15.4  →   ^6.3.0
 @fortawesome/fontawesome-svg-core          ^1.2.36  →   ^6.3.0
 @fortawesome/free-brands-svg-icons         ^5.15.4  →   ^6.3.0
 @fortawesome/free-regular-svg-icons        ^5.15.4  →   ^6.3.0
 @fortawesome/free-solid-svg-icons          ^5.15.4  →   ^6.3.0
 @fortawesome/vue-fontawesome               ^0.1.10  →   ^3.0.3
 @fullhuman/postcss-purgecss                 ^4.0.3  →   ^5.0.0
 @vue/cli-plugin-babel                      ^4.5.13  →   ^5.0.8
 @vue/cli-plugin-eslint                     ^4.5.13  →   ^5.0.8
 @vue/cli-plugin-router                     ^4.5.13  →   ^5.0.8
 @vue/cli-plugin-unit-jest                  ^4.5.13  →   ^5.0.8
 @vue/cli-plugin-vuex                       ^4.5.13  →   ^5.0.8
 @vue/cli-service                           ^4.5.13  →   ^5.0.8
 @vue/test-utils                      1.0.0-beta.31  →   2.2.10
 axios                                      ^0.21.4  →   ^1.3.3
 bootstrap                                   ^4.6.0  →   ^5.2.3
 chalk                                       ^4.1.2  →   ^5.2.0
 core-js                                    ^3.18.1  →  ^3.28.0
 eslint                                      ^6.7.2  →  ^8.34.0
 eslint-plugin-vue                           ^6.1.2  →   ^9.9.0
 fontfaceobserver                            ^2.1.0  →   ^2.3.0
 html2canvas                                 ^1.3.2  →   ^1.4.1
 jest                                       ^25.5.4  →  ^29.4.2
 jest-canvas-mock                            ^2.3.1  →   ^2.4.0
 jquery                                      ^3.6.0  →   ^3.6.3
 js-yaml                                    ^3.14.1  →   ^4.1.0
 jsdom                                      ^16.7.0  →  ^21.1.0
 jspdf                                       ^2.4.0  →   ^2.5.1
 markdown-it                                ^11.0.1  →  ^13.0.1
 moment                                     ^2.29.1  →  ^2.29.4
 portal-vue                                  ^2.1.7  →   ^3.0.0
 postcss-preset-env                          ^6.7.0  →   ^8.0.1
 sass                                       ^1.42.1  →  ^1.58.1
 sass-loader                                 ^8.0.2  →  ^13.2.0
 vue                                        ^2.6.14  →  ^3.2.47
 vue-markdown-loader                         ^2.4.1  →   ^2.5.0
 vue-router                                  ^3.5.2  →   ^4.1.6
 vue-template-compiler                      ^2.6.14  →  ^2.7.14
 vuex                                        ^3.6.2  →   ^4.1.0
```

## deploy

```bash
aws_assume_role
export CLOUDFLARE_API_TOKEN=$(pass Cloud/cloudflare/Terraform_Token)
```

## cloudflare

```bash
terraform import cloudflare_zone.shortpoet d4e2...
```

```bash
get_cloudflare_record_id() {
  zones=$(curl -X GET "https://api.cloudflare.com/client/v4/zones/$(pass Cloud/cloudflare/zone_id)/dns_records" \
    -H "Content-Type:application/json" \
    -H "Authorization: Bearer $(pass Cloud/cloudflare/Terraform_Token)")
  echo $zones | jq -r '.result[] | select(.name == "dev.shortpoet.com") | .id'
  echo $zones | jq -r '.result[] | select(.name == "shortpoet.com") | .id'
}
```

## instructions

<!-- BEGIN_TF_DOCS -->
## Requirements

No requirements.

## Providers

No providers.

## Modules

No modules.

## Resources

No resources.

## Inputs

No inputs.

## Outputs

No outputs.
<!-- END_TF_DOCS -->
