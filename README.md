# Beercules – "Jakten på den Store Starke"

En Ellenkvällen-tale. Ellen's personal fun project (not Ellenial): the cheapest stor stark in Göteborg and Malmö, ranked by APK (ml alcohol per krona), set like an 1890s newspaper.

## How it works

- `index.html` – the whole site, static, no server, no login. Reads `data/prices.json` on load.
- `data/prices.json` – the price list. This file is the database.
- Hosting: Cloudflare Pages, connected to this private repo. Every push to `main` rebuilds the site.
- Domain: beercules.se (bought separately, not through Vercel).

## Price rules (Ellen, 2026-11-16)

- Newest price wins; the bar's own site wins near-ties.
- Prices older than ~6 months count as stale (shown as "Inaktuellt").
- Other price sites and Google Maps are fine as sources.
- Publish facts with a link to the source; prefer bars' own menus and Ellen's visits; never mirror a whole price site.

## Updating prices

- Automatic: a weekly Claude scheduled run checks sources and commits changes to `data/prices.json`.
- Ellen: price tips via a GitHub issue form (to be added after she has seen it).

## Fields in prices.json

`bar, area, price_kr, size_cl, abv (0.052 = 5.2 %), beer, source, source_url, source_type, checked (YYYY-MM-DD or null), address, note`

## Decisions log

- 2026-11-18: moved from a Claude Sheet + claude.ai page to its own site. No Supabase (free limit full, and must stay apart from Phoenix and Ellenial). Data as a JSON file in this repo. Cloudflare Pages over a second Vercel account: separate company, no hosting access needed by Claude. Domain beercules.se.
