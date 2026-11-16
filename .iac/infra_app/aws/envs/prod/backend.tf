terraform {
  backend "s3" {
    region       = "us-east-1"
    bucket       = "litos-terraform-backend"
    key          = "sp/infra_app/aws/envs/prod/terraform.tfstate"
    use_lockfile = true
    profile      = "terraform-admin"
    encrypt      = "true"
  }
}
