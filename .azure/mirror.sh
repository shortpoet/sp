#!/bin/sh
# https://www.edwardthomson.com/blog/mirroring_git_repositories.html
# https://developercommunity.visualstudio.com/t/support-non-rsa-keys-for-ssh-authentication/365980

set -eufo pipefail

# if [ "$#" -ne 2 ]; then
#     echo "usage: $0 source_repo_url target_repo_url" >&2
#     exit 1
# fi

source_repo="sp"
B64_PAT=$(echo ":$CPAT" | base64)
# dest_url="https://$B64_PAT@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet"
# dest_url="https://shortpoet:$B64_PAT@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet"
# dest_url="https://$PAT@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet"
# dest_url="https://shortpoet:$PAT@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet"
# dest_url="https://$SYSTEM_ACCESSTOKEN@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet"
dest_url="https://shortpoet:$CPAT@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet"
echo Add other tasks to build, test, and deploy your project.
echo See https://aka.ms/yaml
echo Starting the synchronization process
echo "****Git clone****"
echo "****Source Repo: $source_repo****"
echo "****Destination Repo: $dest_url****"
sourceURL="https://github.com/shortpoet/$source_repo"
mkdir -p "$BUILD_SOURCESDIRECTORY/copyrepo"
cd "$BUILD_SOURCESDIRECTORY/copyrepo" || exit
echo "cloning into $source_repo from $sourceURL"
git clone "$sourceURL"
# pwd
# ls -laR
cd "$BUILD_SOURCESDIRECTORY/copyrepo/$source_repo/" || exit
echo "*****Git removing remote origin****"
git remote rm origin
echo "*****Git remote add****"
git remote add --mirror=fetch origin "$dest_url"
echo "*****Git fetch origin****"
git fetch $sourceURL
echo "*****Git push to Azure Repos****"
echo "bg4: $B64_PAT"
git config --get-all http.https://shortpoet@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet.extraheader
git config --get-all http.extraheader
git config --get-regexp .*extraheader
git config --get-all http.proxy
git config --add remote.origin.fetch '+refs/heads/*:refs/heads/*'
git config --add remote.origin.fetch '+refs/tags/*:refs/tags/*'
git config --add remote.origin.fetch '+refs/notes/*:refs/notes/*'
git config remote.origin.mirror true

git config http.version HTTP/1.1
# git -c http.extraHeader="Authorization: Basic ${B64_PAT}" push origin --all -f
# git -c http.extraHeader="Authorization: Basic ${B64_PAT}" push origin --mirror
# git -c http.extraHeader="Authorization: ${CPAT}" push origin --mirror
git fetch --all
git pull origin main
git push origin --all -f
