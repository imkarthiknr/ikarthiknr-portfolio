// Fetches the Medium RSS feed at build time and writes public/medium-feed.json.
// Medium's feed has no CORS headers, so browsers can't read it directly; bundling a
// snapshot at build time (plus a daily scheduled deploy) keeps the Writing section current.
// Never fails the build: on any error the previous snapshot is kept.
import { readFile, writeFile } from 'node:fs/promises';

const USERNAME = 'ikarthiknr';
const FEED_URL = `https://medium.com/feed/@${USERNAME}`;
const OUT = new URL('../public/medium-feed.json', import.meta.url);

const decodeEntities = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

const cdata = (s = '') => s.replace(/^\s*<!\[CDATA\[/, '').replace(/\]\]>\s*$/, '').trim();
const tag = (item, name) => item.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1];
const toText = (html) => decodeEntities(html.replace(/<figcaption[\s\S]*?<\/figcaption>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

const parse = (xml) =>
  [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const html = cdata(tag(item, 'content:encoded'));
    const text = toText(html);
    const guid = cdata(tag(item, 'guid'));
    return {
      id: `medium-${guid}`,
      title: decodeEntities(cdata(tag(item, 'title'))),
      url: cdata(tag(item, 'link')).split('?')[0],
      excerpt: text.slice(0, 180) + (text.length > 180 ? '…' : ''),
      publishedAt: new Date(cdata(tag(item, 'pubDate'))).toISOString(),
      readingMinutes: Math.max(1, Math.round(text.split(' ').length / 230)),
      tags: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map(([, c]) => cdata(c)),
      cover: html.match(/<img[^>]+src="([^"]+)"/)?.[1],
      source: 'Medium',
    };
  });

try {
  const res = await fetch(FEED_URL, { headers: { 'User-Agent': 'portfolio-build (+https://ikarthiknr-portfolio.web.app)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const articles = parse(await res.text());
  await writeFile(OUT, JSON.stringify(articles, null, 2) + '\n');
  console.log(`medium-feed: wrote ${articles.length} article(s)`);
} catch (err) {
  const existing = await readFile(OUT, 'utf8').catch(() => null);
  if (existing === null) await writeFile(OUT, '[]\n');
  console.warn(`medium-feed: fetch failed (${err.message}); keeping previous snapshot`);
}
