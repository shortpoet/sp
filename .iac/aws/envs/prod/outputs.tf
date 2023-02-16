output "site_domain_root" {
  value = local.site_domain_root
}

output "s3_root" {
  value = module.s3_root
}

output "cloudflare_root" {
  value = module.cloudflare_root
}

output "s3_root_www" {
  value = module.s3_root_www
}

output "cloudflare_root_www" {
  value = module.cloudflare_root_www
}
