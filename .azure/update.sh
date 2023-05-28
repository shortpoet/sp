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
  $cmd > "$temp"
  # $cmd > "$temp" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "**** Error: $1 ****"
    exit 1
  else
    cat "$temp"
    sed -n 1p "$temp"
  fi
}

if [[ $b64_auth == true ]]; then
  dest_url="https://dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
  echo "**** Destination url: $dest_url ****"

  B64_PAT=$(echo ":$SYSTEM_ACCESSTOKEN" | base64)
  echo "bg4: $B64_PAT"
  git config --global http.version HTTP/1.1
  git config --global http.extraheader "AUTHORIZATION: Basic $B64_PAT"
  git_wrap_error "git clone --bare $dest_url"
  # somehow this was adding an extra / to the url
  # git -c http.extraheader="AUTHORIZATION: Basic $B64_PAT" clone --bare "$dest_url"
else
  echo "**** Destination url: $dest_url ****"
  dest_url="https://$SYSTEM_ACCESSTOKEN@dev.azure.com/shortpoet/Shortpoet/_git/$dest_repo"
  echo "**** Destination url: $dest_url ****"

  git_wrap_error "git clone --bare $dest_url"
fi
cd "$dest_repo.git" || exit

echo "***** Git remote add ****"
git_wrap_error "git remote add upstream $sourceURL"
echo "**** Setting git config ****"
git_wrap_error "git config --global --add remote.upstream.fetch '+refs/heads/*:refs/heads/*'"
git_wrap_error "git config --global --add remote.upstream.fetch '+refs/tags/*:refs/tags/*'"
git_wrap_error "git config --global --add remote.upstream.fetch '+refs/notes/*:refs/notes/*'"
git_wrap_error "git config --global --add remote.upstream.mirror true"
echo "***** Git fetch upstream ****"
git_wrap_error "git fetch upstream --porcelain"
declare -a branches
branches=("$(git for-each-ref --format='%(refname)' refs/heads/)")
cd ..
echo "***** Git pull ****"

git for-each-ref --format='%(refname)' refs/heads/ 
# git for-each-ref --format='%(refname)' refs/heads/ | while read -r branch; do
#   echo "**** Pulling $branch ****"
#   git_wrap_error "git pull upstream $branch"
# done

for branch in "${branches[@]}"; do
  echo "**** Pulling $branch ****"
  git_wrap_error "git pull origin $branch"
done

# for branch in $(git for-each-ref --format='%(refname)' refs/heads/); do
#   git log --oneline "$branch" ^origin/main
# done


# echo "***** Git remote add ****"
# git remote add --mirror=fetch upstream "$sourceURL"
# echo "***** Git fetch upstream ****"
# git fetch upstream --tags

# pwd
# cat ../.git/config
# cat ../.azure/test.sh


echo "***** Git push to Azure Repos ****"
git_wrap_error "git push origin --all"