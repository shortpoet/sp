#!/usr/bin/env bash

source_repo="sp"
dest_repo="sp"
# dest_url="https://shortpoet:$CPAT@dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
# dest_url="https://$PAT:PAT@dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
# dest_url="https://:$PAT@dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
# dest_url="https://$PAT@dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
# dest_url="https://$SYSTEM_ACCESSTOKEN@dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
sourceURL="https://github.com/shortpoet/$source_repo"

b64_auth=false
echo Starting the synchronization process
echo "**** Setting git config ****"
git config --global --add remote.origin.fetch '+refs/heads/*:refs/heads/*'
git config --global --add remote.origin.fetch '+refs/tags/*:refs/tags/*'
git config --global --add remote.origin.fetch '+refs/notes/*:refs/notes/*'
echo "**** Source Repo: $sourceURL ****"
echo "**** Destination Repo: $dest_repo ****"
if [[ $b64_auth == true ]]; then
  dest_url="https://dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
  echo "**** Destination url: $dest_url ****"

  B64_PAT=$(echo ":$SYSTEM_ACCESSTOKEN" | base64)
  echo "bg4: $B64_PAT"
  git config --global http.version HTTP/1.1
  git config --global http.extraheader "AUTHORIZATION: Basic $B64_PAT"
  git clone --bare "$dest_url"
  # somehow this was adding an extra / to the url
  # git -c http.extraheader="AUTHORIZATION: Basic $B64_PAT" clone --bare "$dest_url"
else
  echo "**** Destination url: $dest_url ****"
  dest_url="https://$SYSTEM_ACCESSTOKEN@dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
  echo "**** Destination url: $dest_url ****"

  git clone --bare "$dest_url"
fi
cd "$dest_repo.git" || exit
echo "***** Git remote add ****"
git remote add --mirror=fetch upstream "$sourceURL"
echo "***** Git fetch upstream ****"
git fetch upstream
echo "***** Git push to Azure Repos ****"
git push origin --all