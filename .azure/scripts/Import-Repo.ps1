[String]$Org = "shortpoet"
[String]$project = "shortpoet"
[String]$PAT = "n4ia4leabgzvo642qzlypy4wpxfqjc32zgv4zuajen7ccj7ogspq"
[String]$Repo = "shortpoet"
[String]$serviceEndpointId = "ece000ed-47ce-4584-a95a-89ff233e8d53"

$url = "https://dev.azure.com/$Org/$project/_apis/git/repositories/$Repo/importRequests?api-version=6.1-preview.1" 

$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f "", $PAT )))

$body = @{
  "parameters" = @{
    "gitSource"                              = @{
      # the source git repository to import and remember to replace with your correct url

      "url" = "https://github.com/shortpoet/sp"
    }
    "serviceEndpointId"                      = $serviceEndpointId
    "deleteServiceEndpointAfterImportIsDone" = false
  }
   
} 

$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f "", $PAT )))

$result = Invoke-RestMethod -Method 'Post' -Uri $url -Headers @{Authorization = ("Basic {0}" -f $base64AuthInfo) } -Body ($body | ConvertTo-Json)   -ContentType "application/json"
 
$result  | ConvertTo-Json