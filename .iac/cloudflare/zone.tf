data "cloudflare_accounts" "main" {
  name = "Soriano.carlos@gmail.com's Account"
}

resource "cloudflare_zone" "shortpoet" {
  zone       = "shortpoet.com"
  account_id = data.cloudflare_accounts.main.accounts[0].id
}

output "accounts" {
  value = data.cloudflare_accounts.main
}
