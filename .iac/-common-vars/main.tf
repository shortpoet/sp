terraform {
  required_version = ">= 0.13.5"
}
locals {
  site_domain = "shortpoet.com"

  tags = {
    Terraform = "true"
    Project   = "sp"
  }

}

output "site_domain" {
  value = local.site_domain
}

output "tags" {
  value = local.tags
}
