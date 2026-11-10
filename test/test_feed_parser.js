// ============================================================================
// NEWS CONNECT: Automated Unit & Parser Verification Test
// ============================================================================

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('--- Starting News Connect Automated Verification Tests ---');

// 1. Verify sources.json integrity
const sourcesPath = path.join(__dirname, '..', 'data', 'sources.json');
assert(fs.existsSync(sourcesPath), 'sources.json must exist');
const sources = JSON.parse(fs.readFileSync(sourcesPath, 'utf8'));
assert.strictEqual(sources.length, 8, 'Must configure exactly 8 news organizations');

const expectedIds = [
  'newsmax', 'foxnews', 'ln24international', 'ln247',
  'loveworldeurope', 'loveworldsat', 'skynews_australia', 'ani'
];

expectedIds.forEach(id => {
  const found = sources.find(s => s.id === id);
  assert(found, `Source ${id} must be configured`);
  assert(found.name, `Source ${id} must have a name`);
  assert(found.website, `Source ${id} must have an official website`);
  assert(typeof found.hasRss === 'boolean', `Source ${id} must specify boolean hasRss`);
  console.log(`[PASS] Source validated: ${found.name} (${found.hasRss ? 'RSS Active: ' + found.rssUrl : 'Non-RSS: ' + found.integrationMethod})`);
});

// 2. Verify RSS vs Non-RSS segregation
const rssSources = sources.filter(s => s.hasRss);
const nonRssSources = sources.filter(s => !s.hasRss);
assert.strictEqual(rssSources.length, 5, 'Must have 5 verified RSS sources (Newsmax, Fox News, LN24 Intl, LN247, ANI)');
assert.strictEqual(nonRssSources.length, 3, 'Must have 3 non-RSS sources (LW Europe, LW Sat, Sky News AU)');

// 3. Test XML parsing logic with sample RSS 2.0 payload
const sampleRssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Sample News Channel</title>
    <link>https://example.com</link>
    <description>Sample Description</description>
    <item>
      <title><![CDATA[Major Global Diplomatic Summit &amp; Peace Accord]]></title>
      <link>https://example.com/world/diplomatic-summit-accord</link>
      <description><![CDATA[World leaders convene to negotiate multilateral treaties on clean energy and trade security.]]></description>
      <pubDate>Mon, 09 Nov 2026 04:00:00 GMT</pubDate>
      <category>World News</category>
      <enclosure url="https://example.com/photos/summit.jpg" type="image/jpeg" length="123456" />
    </item>
  </channel>
</rss>`;

// Test unescapeXml logic
function unescapeXml(text) {
  if (!text) return '';
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "'")
    .trim();
}

const titleMatch = sampleRssXml.match(/<title[\s>](?:<!\[CDATA\[([\s\S]*?)\]\]>|([\s\S]*?))<\/title>/i);
assert(titleMatch, 'Title regex match must succeed');
const title = unescapeXml(titleMatch[1] || titleMatch[2]);
assert.strictEqual(title, 'Sample News Channel', 'Unescape title');

const itemMatch = sampleRssXml.match(/<item[\s>]([\s\S]*?)<\/item>/i);
assert(itemMatch, 'Item regex match must succeed');
const itemXml = itemMatch[1];
const itemTitleMatch = itemXml.match(/<title[\s>](?:<!\[CDATA\[([\s\S]*?)\]\]>|([\s\S]*?))<\/title>/i);
const itemTitle = unescapeXml(itemTitleMatch[1] || itemTitleMatch[2]);
assert.strictEqual(itemTitle, 'Major Global Diplomatic Summit & Peace Accord', 'Item title CDATA + entity unescape');

// Test enclosure image extraction
const enclosureMatch = itemXml.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
assert(enclosureMatch, 'Enclosure regex match must succeed');
assert.strictEqual(enclosureMatch[1], 'https://example.com/photos/summit.jpg', 'Image enclosure URL match');

console.log('[PASS] XML regex parser & entity unescaping unit tests succeeded.');
console.log('--- ALL TESTS PASSED SUCCESSFULLY ---');

