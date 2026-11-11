// ============================================================================
// NEWS CONNECT: React Native & Service Verification Test Suite
// In-process verification of components, services, and HTTP router
// ============================================================================

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

console.log('--- Testing React Native Component Structure & Service Layer ---');

// 1. Verify existence of all React Native files
const expectedFiles = [
  'App.js',
  'app.json',
  'src/theme/colors.js',
  'src/config/sources.js',
  'src/services/rssService.js',
  'src/components/Header.js',
  'src/components/SearchBar.js',
  'src/components/NewsSourceList.js',
  'src/components/CategoryFilter.js',
  'src/components/FeaturedNews.js',
  'src/components/NewsCard.js',
  'src/components/BroadcastSpotlight.js',
  'src/components/AttributionModal.js',
  'src/components/Footer.js'
];

expectedFiles.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  assert(fs.existsSync(fullPath), `File must exist: ${file}`);
  const content = fs.readFileSync(fullPath, 'utf8');
  assert(content.length > 50, `File ${file} must have valid content`);
  console.log(`[PASS] Verified React Native file: ${file}`);
});

// Mock In-Process HTTP Dispatch
function dispatchRequest(server, urlPath) {
  return new Promise((resolve) => {
    const req = new EventEmitter();
    req.url = urlPath;
    req.method = 'GET';
    req.headers = { host: 'localhost:3000' };

    let statusCode = 200;
    const headers = {};
    let body = '';

    const res = {
      setHeader(name, val) { headers[name] = val; },
      writeHead(code, head) {
        statusCode = code;
        if (head) Object.assign(headers, head);
      },
      write(chunk) { body += chunk; },
      end(chunk) {
        if (chunk) body += chunk;
        let parsed = null;
        try { parsed = JSON.parse(body); } catch(e) {}
        resolve({ statusCode, headers, body, parsed });
      }
    };

    server.emit('request', req, res);
  });
}

(async () => {
  try {
    // 2. Test RssService relative time formatter
    const { RssService } = await import('../src/services/rssService.js');
    const now = new Date();
    const tenMinAgo = new Date(now.getTime() - 10 * 60 * 1000).toISOString();
    const threeHoursAgo = new Date(now.getTime() - 3 * 3600 * 1000).toISOString();

    assert.strictEqual(RssService.formatRelativeTime(tenMinAgo), '10m ago');
    assert.strictEqual(RssService.formatRelativeTime(threeHoursAgo), '3h ago');
    console.log('[PASS] RssService.formatRelativeTime verified.');

    // 3. Test HTTP Server API Endpoints (In-Process Mock Dispatch)
    console.log('--- Testing Backend Feed Proxy HTTP Endpoints ---');
    const server = require('../server.js');

    // Test GET /api/sources
    const sourcesRes = await dispatchRequest(server, '/api/sources');
    assert.strictEqual(sourcesRes.statusCode, 200, 'GET /api/sources returns 200');
    assert.strictEqual(sourcesRes.parsed.totalSources, 9, '9 news sources returned');
    assert.strictEqual(sourcesRes.parsed.connectedFeeds, 5, '5 active RSS feeds');
    assert.strictEqual(sourcesRes.parsed.broadcastPortals, 4, '4 broadcast/portals');
    console.log('[PASS] GET /api/sources passed: 9 organizations configured.');

    // Test GET /api/news
    const newsRes = await dispatchRequest(server, '/api/news');
    assert.strictEqual(newsRes.statusCode, 200, 'GET /api/news returns 200');
    assert(Array.isArray(newsRes.parsed.articles), 'articles is an array');
    assert(newsRes.parsed.articles.length > 0, 'articles count > 0');
    console.log(`[PASS] GET /api/news passed with ${newsRes.parsed.articles.length} articles.`);

    // Test GET /api/news?source=newsmax
    const newsmaxRes = await dispatchRequest(server, '/api/news?source=newsmax');
    assert.strictEqual(newsmaxRes.statusCode, 200);
    newsmaxRes.parsed.articles.forEach(a => assert.strictEqual(a.sourceId, 'newsmax'));
    console.log('[PASS] GET /api/news?source=newsmax filter verified.');

    // Test GET /api/featured
    const featuredRes = await dispatchRequest(server, '/api/featured');
    assert.strictEqual(featuredRes.statusCode, 200);
    assert(Array.isArray(featuredRes.parsed.featured));
    assert(featuredRes.parsed.featured.length > 0);
    console.log(`[PASS] GET /api/featured passed with ${featuredRes.parsed.featured.length} featured items.`);

    // Close server cleanly
    server.close();
    console.log('--- ALL REACT NATIVE & BACKEND TESTS PASSED SUCCESSFULLY ---');
    process.exit(0);
  } catch (err) {
    console.error('Test Failed:', err);
    process.exit(1);
  }
})();
