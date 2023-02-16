data "cloudflare_accounts" "main" {
  name = "Soriano.carlos@gmail.com's Account"
}

# some other account... ?
# accounts = {
#       + accounts = []
#       + id       = "d41d....."
#       + name     = "soriano.carlos@gmail.com"
#     }


resource "cloudflare_zone" "shortpoet" {
  zone       = "shortpoet.com"
  account_id = data.cloudflare_accounts.main.accounts[0].id
}

output "accounts" {
  value = data.cloudflare_accounts.main
}
