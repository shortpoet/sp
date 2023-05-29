#!/usr/bin/env bash

# set -eufo pipefail

echo "Running import script"

az repos list \
  --organization https://dev.azure.com/shortpoet \
  --project Shortpoet \
  --query "[?name=='Shortpoet'].id" \
  --output tsv 

sp_id=$(az repos list \
  --organization https://dev.azure.com/shortpoet \
  --project Shortpoet \
  --query "[?name=='sp'].id" \
  --output tsv)

webhook_id=$(az devops service-endpoint list \
  --organization https://dev.azure.com/shortpoet \
  --project Shortpoet \
  --query "[?name=='github.com_shortpoet'].id" \
  --output tsv)

source_repo="sp"

sourceURL="https://github.com/shortpoet/$source_repo"

if [ -n "$sp_id" ]; then
  echo "Repo already exists"
else
  echo "Creating repo"
  az repos create \
    --name $source_repo \
    --organization https://dev.azure.com/shortpoet \
    --project Shortpoet \
    --detect true
fi
if [ "$CLI_RUN" ]; then
  echo "CLI_RUN is set"
  az repos import create \
  --git-source-url $sourceURL \
  --git-service-endpoint-id "$webhook_id" \
  --repository $source_repo \
  --detect true
else
  echo "CLI_RUN is not set"
  az repos import create \
  --git-source-url $sourceURL \
  --repository $source_repo \
  --detect true
fi
