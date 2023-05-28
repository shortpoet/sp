#!/usr/bin/env bash

source_repo="sp"
# dest_url="https://shortpoet:$CPAT@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet"
dest_repo="Shortpoet"
dest_url="https://$PAT:PAT@dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
echo Starting the synchronization process
echo "****Source Repo: $source_repo****"
echo "****Destination Repo: $dest_url****"
sourceURL="https://github.com/shortpoet/$source_repo"

git clone --bare "$dest_url"
cd "$dest_repo" || exit
git remote add --mirror=fetch upstream "$sourceURL"
git fetch upstream --tags
git push origin --all