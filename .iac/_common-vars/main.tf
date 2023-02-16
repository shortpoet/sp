terraform {
  required_version = ">= 0.13.5"
}

locals {
  zone_name       = "shortpoet.com"
  site_domain     = "shortpoet.com"
  subdomain_dev   = "dev"
  site_domain_dev = "${local.subdomain_dev}.${local.site_domain}"

  tags = {
    Terraform       = "true"
    Project         = "sp"
    CloudFlare      = "true"
    CloudFlare_Zone = local.zone_name
  }
}

output "site_domain" {
  value = local.site_domain
}

output "subdomain_dev" {
  value = local.subdomain_dev
}
output "site_domain_dev" {
  value = local.site_domain_dev
}

output "tags" {
  value = local.tags
}

output "zone_name" {
  value = local.zone_name
}
