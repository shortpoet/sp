#!/bin/sh
# https://www.edwardthomson.com/blog/mirroring_git_repositories.html
# https://developercommunity.visualstudio.com/t/support-non-rsa-keys-for-ssh-authentication/365980

# set -eufo pipefail

# if [ "$#" -ne 2 ]; then
#     echo "usage: $0 source_repo_url target_repo_url" >&2
#     exit 1
# fi


source_repo="sp"
dest_url="https://shortpoet:$CPAT@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet"
echo Starting the synchronization process
echo "****Git clone****"
echo "****Source Repo: $source_repo****"
echo "****Destination Repo: $dest_url****"
sourceURL="https://github.com/shortpoet/$source_repo"
mkdir -p "$BUILD_SOURCESDIRECTORY/copyrepo"
cd "$BUILD_SOURCESDIRECTORY/copyrepo" || exit
echo "cloning into $source_repo from $sourceURL"
git config --add remote.origin.fetch '+refs/heads/*:refs/heads/*'
git config --add remote.origin.fetch '+refs/tags/*:refs/tags/*'
git config --add remote.origin.fetch '+refs/notes/*:refs/notes/*'
git clone --mirror "$sourceURL"
# cd "$BUILD_SOURCESDIRECTORY/copyrepo/$source_repo.git" || exit
echo "*****Git removing remote origin****"
git remote rm origin
echo "*****Git remote add****"
git remote add azure "$dest_url"
echo "*****Git fetch origin****"
git fetch --all
# git merge azure/main
# git push --mirror origin
git push --mirror azure
