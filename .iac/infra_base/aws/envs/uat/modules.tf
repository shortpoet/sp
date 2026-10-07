module "s3_uat" {
  # source                  = "../../modules/s3"
  # source                  = "../../../../../../../sp-cloud/tf-aws-website/modules/s3_bucket"
  source                  = "git@github.com:shortpoet-cloud/tf-aws-website.git//modules/s3_bucket?ref=v0.1.0-rc.1"
  site_domain_bucket_name = local.site_domain_uat
  tags                    = local.tags
}

module "cloudflare_uat" {
  # source               = "../../modules/cloudflare"
  # source               = "../../../../../../../sp-cloud/tf-cloudflare/modules/record"
  source               = "git@github.com:shortpoet-cloud/tf-cloudflare.git//modules/record?ref=v0.1.0-rc.1"
  zone_name            = local.zone_name
  cname_name           = local.subdomain_uat
  cname_value_endpoint = module.s3_uat.website_endpoint
}
