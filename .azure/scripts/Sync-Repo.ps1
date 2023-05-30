
Write-Host Starting the synchronization process
mkdir copyrepo
$sourceURL = "https://$(GITLABPAT)@$(GITLABREPO)"
$destURL = "https://$(AZUREREPOPAT)@$(AZUREPO)"
Set-Location "$(Build.SourcesDirectory)/copyrepo"
git clone --mirror $sourceURL
Set-Location "$(Build.SourcesDirectory)/copyrepo/$(GITLABREPONAME)/"
Write-Host "*****Git removing remote origin****"
git remote rm origin
Write-Output "*****Git remote add****"
git remote add --mirror=fetch origin $destURL
Write-Output "*****Git fetch origin****"
git fetch $sourceURL
Write-Output "*****Git push to Azure Repos****"
git push origin --all -f