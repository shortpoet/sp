#!/usr/bin/env bash

set -e

active_dir=$(pwd)
script_dir=$(dirname "$0")
cd "$script_dir"
repo_root=$(git rev-parse --show-toplevel)
site_domain=$(terraform output -raw site_domain_dev)
website_bucket_id=$(terraform output -json s3_dev | jq -r .website_bucket_id)
cd "$repo_root/app"
npm run build

aws s3 cp --recursive --acl public-read --profile terraform-admin ./dist "s3://$website_bucket_id"
cd "$active_dir"
