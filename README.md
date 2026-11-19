# Beercules – "Jakten på den Store Starke"

En Ellenkvällen-tale. Ellen's personal fun project (not Ellenial): the cheapest stor stark in Göteborg and Malmö, ranked by APK (ml alcohol per krona), set like an 1890s newspaper.

## How it works

- `public/index.html` – the whole site, static, no server, no login. Reads `data/prices.json` on load.
- `public/data/prices.json` – the price list. This file is the database.
- `src/index.js` – small Worker: serves `public/` and keeps the visit counter (`POST /api/hit`, totals at `/stats.json`).
- `wrangler.jsonc` – serves only the `public` folder; D1 database `beercules-stats` for the counter (created by Cloudflare on first deploy).
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

## Visit counter

One count per phone per day: the page remembers in the browser that it already counted today, then posts to `/api/hit`. The database holds only `day` and `visits`, nothing about the visitor. `/stats.json` shows the totals (last 90 days). Ellen's Ongoing board reads them live from the D1 database `beercules-stats` (id 704cfaea-4454-4ef8-b9b4-5c1205bc219c) through the Cloudflare Developer Platform connector, SELECT only, in its own "Personal · visits per day" panel (not the Ellenial table).

## Fields in prices.json

`bar, area, price_kr, size_cl, abv (0.052 = 5.2 %), beer, source, source_url, source_type, checked (YYYY-MM-DD or null), address, note`

## Status (2026-11-18, 17:36)

Live at https://beercules.se (Ellen checked it on her phone). DNSSEC re-enabled: DS record (key tag 2371, algorithm 13, digest type 2) entered at Loopia; waiting for Cloudflare to confirm.

### Open
- Check Cloudflare's DNSSEC status turns Active.
- Price-tip form (GitHub issue form): mock-up first.
- Weekly Claude price run: show Ellen what it checks before turning it on.
- Row notes are still in English inside a Swedish page; translate?
- The old claude.ai Sheet and page are now superseded: keep as archive or delete (Ellen decides).

## Decisions log

- 2026-11-19 07:45: Ellen: the list shows only bars with a known price of max 60 kr (bars without a price stay in the data and show under "Efterlyses"); "Högst 60 kr" checkbox removed; plain numbers instead of Roman numerals (overlapped on phones); APK explanation removed from the footer; sign-off now "Beercules Logistics" in English.
- 2026-11-18 18:55: price column shows the real price and size (Ellen: kr/40 cl was misleading); visit counter counted at Cloudflare (D1).
- 2026-11-18 20:45: Ellen chose live numbers on the Ongoing board through Cloudflare: connected the Cloudflare Developer Platform connector (Claude now has access to the Cloudflare account). Separate Personal panel, not in the Ellenial table. No daily copy task.
- 2026-11-18 17:36: site live at beercules.se; DNSSEC DS record added at Loopia.
- 2026-11-18 15:09: Ellen bought beercules.se at Loopia (MFA on), moved nameservers to Cloudflare (jerry/sasha), DNSSEC off for the move. Cloudflare DNS: no-mail records (MX ".", SPF -all, DMARC reject). AI crawler settings chosen by Ellen in Cloudflare.
- 2026-11-18 15:13: Ellen created this private repo; GitHub passkey already on. Cloudflare's GitHub app limited to this repo only.
- 2026-11-18 14:55: name beercules.se chosen (Ellen); "Beercules Logistik" used as the paper's sign-off (English "Beercules Logistics" from 2026-11-19).
- 2026-11-18 14:52: Cloudflare chosen over a second Vercel account (Ellen: feels safer; separate company).
- 2026-11-18 14:44: Ellen chose her own public site: "just for fun, humans are adults and make their own decisions. This is NOT an Ellenial product." Updates mainly automated; Ellen updates only when she knows current prices.
- 2026-11-18: moved from a Claude Sheet + claude.ai page to its own site. No Supabase (free limit full, and must stay apart from Phoenix and Ellenial). Data as a JSON file in this repo. Cloudflare (Workers static assets; Cloudflare now steers new sites there instead of Pages) over a second Vercel account: separate company, no hosting access needed by Claude. Domain beercules.se.
