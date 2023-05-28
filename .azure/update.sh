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
echo "**** Source Repo: $sourceURL ****"
echo "**** Destination Repo: $dest_repo ****"

git_wrap_error() {
  cmd="$1"
  temp=$(mktemp)
  # $cmd > "$temp"
  $cmd > "$temp" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "**** Error: $1 ****"
    exit 1
  else
    cat "$temp"
    sed -n 1p "$temp"
  fi
}

# echo "***** Git remote add ****"
# git_wrap_error "git remote add upstream $sourceURL"
echo "**** Setting git config ****"
git_wrap_error "git config --global --add remote.upstream.fetch '+refs/heads/*:refs/heads/*'"
git_wrap_error "git config --global --add remote.upstream.fetch '+refs/tags/*:refs/tags/*'"
git_wrap_error "git config --global --add remote.upstream.fetch '+refs/notes/*:refs/notes/*'"
git_wrap_error "git config --global --add remote.upstream.mirror true"
cat .git/config
# echo "***** Git fetch upstream ****"
# git_wrap_error "git remote update upstream --prune"
echo "***** Git push to origin ****"
git_wrap_error "git push --mirror"
