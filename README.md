# Beercules – "Jakten på den Store Starke"

En Ellenkvällen-tale. Ellen's personal fun project (not Ellenial): the cheapest stor stark in Göteborg and Malmö, ranked by APK (ml alcohol per krona), set like an 1890s newspaper.

## How it works

- `public/index.html` – the whole site, static, no server, no login. Reads `data/prices.json` on load.
- `public/data/prices.json` – the price list. This file is the database.
- `wrangler.jsonc` – tells Cloudflare to serve only the `public` folder.
- Hosting: Cloudflare Workers (static assets), connected to this private repo. Every push to `main` deploys the site.
- Domain: beercules.se (bought separately, not through Vercel).

## Price rules (Ellen, 2026-11-16)

- Newest price wins; the bar's own site wins near-ties.
- Prices older than ~6 months count as stale (shown as "Inaktuellt").
- Other price sites and Google Maps are fine as sources.
- Publish facts with a link to the source; prefer bars' own menus and Ellen's visits; never mirror a whole price site.

## Updating prices

- Automatic: a weekly Claude scheduled run checks sources and commits changes to `public/data/prices.json`.
- Ellen: price tips via a GitHub issue form (to be added after she has seen it).

## Fields in prices.json

`bar, area, price_kr, size_cl, abv (0.052 = 5.2 %), beer, source, source_url, source_type, checked (YYYY-MM-DD or null), address, note`

## Status (2026-11-18, 15:23)

Building. Deployed on Cloudflare Workers; custom domains beercules.se and www.beercules.se added. Zone still **Pending** (nameservers just moved from Loopia), so HTTPS fails with "unsupported protocol" until Cloudflare shows Active and the Universal certificate is issued. workers.dev and Preview URLs are turned off.

### Open
- Wait for zone Active, then check https://beercules.se (Malmö no. I = Asian House, Göteborg no. I = Silverkällan).
- Turn DNSSEC back on: Cloudflare DNS → Settings → Enable DNSSEC, then DS record at Loopia (check Loopia allows DS with external nameservers).
- Price-tip form (GitHub issue form): mock-up first.
- Weekly Claude price run: show Ellen what it checks before turning it on.
- Row notes are still in English inside a Swedish page; translate?
- The old claude.ai Sheet and page are now superseded: keep as archive or delete (Ellen decides).

## Decisions log

- 2026-11-18 15:09: Ellen bought beercules.se at Loopia (MFA on), moved nameservers to Cloudflare (jerry/sasha), DNSSEC off for the move. Cloudflare DNS: no-mail records (MX ".", SPF -all, DMARC reject). AI crawler settings chosen by Ellen in Cloudflare.
- 2026-11-18 15:13: Ellen created this private repo; GitHub passkey already on. Cloudflare's GitHub app limited to this repo only.
- 2026-11-18 14:55: name beercules.se chosen (Ellen); "Beercules Logistik" used as the paper's sign-off.
- 2026-11-18 14:52: Cloudflare chosen over a second Vercel account (Ellen: feels safer; separate company).
- 2026-11-18 14:44: Ellen chose her own public site: "just for fun, humans are adults and make their own decisions. This is NOT an Ellenial product." Updates mainly automated; Ellen updates only when she knows current prices.
- 2026-11-18: moved from a Claude Sheet + claude.ai page to its own site. No Supabase (free limit full, and must stay apart from Phoenix and Ellenial). Data as a JSON file in this repo. Cloudflare (Workers static assets; Cloudflare now steers new sites there instead of Pages) over a second Vercel account: separate company, no hosting access needed by Claude. Domain beercules.se.
