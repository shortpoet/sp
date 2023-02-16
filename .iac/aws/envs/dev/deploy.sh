#!/usr/bin/env bash

set -e

site_domain=$(terraform output -raw site_domain_dev)
repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root/app"
# npm run build

aws s3 cp --recursive --acl public-read --profile terraform-admin ./dist "s3://$site_domain"
