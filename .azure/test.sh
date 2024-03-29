#!/usr/bin/env bash

testing=true
again=true


read -ra branches <<< "$(git for-each-ref --format='%(refname:short)' refs/heads/ | tr '\n' ' ')"
echo "${branches[@]}"
for branch in "${branches[@]}"; do
  echo "**** Pulling $branch ****"
done
