output "site_domain_dev" {
  value = local.site_domain_dev
}

output "s3_dev" {
  value = module.s3_dev
}

output "cloudflare_dev" {
  value = module.cloudflare_dev
}
