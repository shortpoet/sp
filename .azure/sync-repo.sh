#!/usr/bin/env bash

echo Add other tasks to build, test, and deploy your project.
echo See https://aka.ms/yaml
echo Starting the synchronization processmkdir copyrepo
$sourceURL = "https://$(source_repo)"
cd "$BUILD_SOURCESDIRECTORY/copyrepo"
git clone --mirror $sourceURLSet-Location "$BUILD_SOURCESDIRECTORY/copyrepo/$source_repo/"
echo "*****Git removing remote origin****"
git remote rm origin
echo "*****Git remote add****"
git remote add --mirror=fetch origin $dest_url
echo "*****Git fetch origin****"
git fetch $sourceURL
echo "*****Git push to Azure Repos****"
git push origin --all -f
