#!/usr/bin/env bash

    source_repo="sp"
    dest_url="https://shortpoet:$CPAT@dev.azure.com/shortpoet/Shortpoet/_git/Shortpoet"
    echo Starting the synchronization process
    echo "****Git clone****"
    echo "****Source Repo: $source_repo****"
    echo "****Destination Repo: $dest_url****"
    sourceURL="https://github.com/shortpoet/$(source_repo)"
    mkdir -p "$BUILD_SOURCESDIRECTORY/copyrepo"
    cd "$BUILD_SOURCESDIRECTORY/copyrepo" || exit
    echo "cloning into $source_repo from $sourceURL"
    git clone --mirror "$sourceURL"
    cd "$BUILD_SOURCESDIRECTORY/copyrepo/$source_repo.git" || exit
    echo "*****Git removing remote origin****"
    git remote rm origin
    echo "*****Git remote add****"
    git remote add azure "$dest_url"
    echo "*****Git fetch origin****"
    git fetch --all
    git merge azure/main
    git push --mirror origin
    git push --mirror azure
