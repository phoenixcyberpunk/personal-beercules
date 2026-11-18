// Beercules Worker: serves the static site and keeps a tiny visit counter.
// One count per phone per day (the page remembers it counted today); nothing personal is stored:
// the database holds only a date and a number.
const DAY = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' }); // YYYY-MM-DD
let ready = false;
async function init(db) {
  if (ready) return;
  await db.prepare('CREATE TABLE IF NOT EXISTS daily_visits (day TEXT PRIMARY KEY, visits INTEGER NOT NULL DEFAULT 0)').run();
  ready = true;
}
const json = (o, status = 200) => new Response(JSON.stringify(o), {
  status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/hit') {
      if (request.method !== 'POST') return json({ error: 'POST only' }, 405);
      await init(env.DB);
      await env.DB.prepare('INSERT INTO daily_visits (day, visits) VALUES (?, 1) ON CONFLICT(day) DO UPDATE SET visits = visits + 1').bind(DAY()).run();
      return new Response(null, { status: 204, headers: { 'cache-control': 'no-store' } });
    }
    if (url.pathname === '/stats.json') {
      await init(env.DB);
      const { results } = await env.DB.prepare('SELECT day, visits FROM daily_visits ORDER BY day DESC LIMIT 90').all();
      const tot = await env.DB.prepare('SELECT COALESCE(SUM(visits),0) AS total FROM daily_visits').first();
      return json({ site: 'beercules.se', today: DAY(), total: tot.total, days: results });
    }
    return env.ASSETS.fetch(request);
  }
};
