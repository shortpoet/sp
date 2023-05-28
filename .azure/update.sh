#!/usr/bin/env bash

source_repo="sp"
dest_repo="Shortpoet"
# dest_url="https://shortpoet:$CPAT@dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
# dest_url="https://$PAT:PAT@dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
# dest_url="https://:$PAT@dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
# dest_url="https://$PAT@dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
# dest_url="https://$SYSTEM_ACCESSTOKEN@dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
dest_url="https://$SYSTEM_ACCESSTOKEN@dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
echo Starting the synchronization process
echo "****Source Repo: $source_repo****"
echo "****Destination Repo: $dest_url****"
sourceURL="https://github.com/shortpoet/$source_repo"
# git config --add remote.origin.fetch '+refs/heads/*:refs/heads/*'
# git config --add remote.origin.fetch '+refs/tags/*:refs/tags/*'
# git config --add remote.origin.fetch '+refs/notes/*:refs/notes/*'

b64_auth=true
echo "***** Git clone Azure ****"
if [[ $b64_auth ]]; then
  echo "bg4: $B64_PAT"
  B64_PAT=$(echo ":$SYSTEM_ACCESSTOKEN" | base64)
  git config http.version HTTP/1.1
  git -c http.extraheader="AUTHORIZATION: Basic $B64_PAT" clone --bare "$dest_url"
else
  git clone --bare "$dest_url"
fi
cd "$dest_repo.git" || exit
echo "***** Git remote add ****"
git remote add --mirror=fetch upstream "$sourceURL"
echo "***** Git fetch upstream ****"
git fetch upstream
echo "***** Git push to Azure Repos ****"
git push origin --all