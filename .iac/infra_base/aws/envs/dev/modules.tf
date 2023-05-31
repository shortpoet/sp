module "s3_dev" {
  # source                  = "../../modules/s3"
  # source                  = "../../../../../../../sp-cloud/tf-aws-website/modules/s3_bucket"
  source                  = "git@github.com:shortpoet-cloud/tf-aws-website.git//modules/s3_bucket?ref=develop"
  site_domain_bucket_name = local.site_domain_dev
  tags                    = local.tags
}

module "cloudflare_dev" {
  # source               = "../../modules/cloudflare"
  # source               = "../../../../../../../sp-cloud/tf-cloudflare/modules/record"
  source               = "git@github.com:shortpoet-cloud/tf-cloudflare.git//modules/record/?ref=develop"
  zone_name            = local.zone_name
  cname_name           = local.subdomain_dev
  cname_value_endpoint = module.s3_dev.website_endpoint
}
