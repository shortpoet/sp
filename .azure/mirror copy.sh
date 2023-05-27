#!/bin/sh
# https://www.edwardthomson.com/blog/mirroring_git_repositories.html
# https://developercommunity.visualstudio.com/t/support-non-rsa-keys-for-ssh-authentication/365980

set -eufo pipefail

# if [ "$#" -ne 2 ]; then
#     echo "usage: $0 source_repo_url target_repo_url" >&2
#     exit 1
# fi

source_repo="sp"
sourceURL="https://github.com/shortpoet/$source_repo"
B64_PAT=$(echo ":$CPAT" | base64)
# dest_url="https://$B64_PAT@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet"
# dest_url="https://shortpoet:$B64_PAT@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet"
# dest_url="https://$PAT@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet"
# dest_url="https://shortpoet:$PAT@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet"
# dest_url="https://$SYSTEM_ACCESSTOKEN@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet"
dest_url="https://shortpoet:$CPAT@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet"



# SOURCE_URL="$1"
# TARGET_URL="$2"
SOURCE_URL="$source_repo"
TARGET_URL="$sourceURL"
WORKDIR="$(mktemp -d)"

echo "Cloning from ${SOURCE_URL} into ${WORKDIR}..."

git init --bare "${WORKDIR}"
cd "${WORKDIR}"

git config remote.origin.url "${SOURCE_URL}"
git config --add remote.origin.fetch '+refs/heads/*:refs/heads/*'
git config --add remote.origin.fetch '+refs/tags/*:refs/tags/*'
git config --add remote.origin.fetch '+refs/notes/*:refs/notes/*'
git config remote.origin.mirror true
git fetch --all

echo ""
echo "Cloned to ${WORKDIR}; pushing to ${TARGET_URL}"

git push --mirror "${TARGET_URL}"

echo ""
echo "Cleaning up temporary directory ${WORKDIR}..."

rm -rf "${WORKDIR}"

echo "Done."