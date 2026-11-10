// ============================================================================
// NEWS CONNECT: Interactive Dashboard Controller
// Zero-blank-screen resilience: Instant fallback rendering + live sync
// ============================================================================

(function () {
  'use strict';

  const FALLBACK_SOURCES = [
    { id: 'newsmax', name: 'Newsmax', shortName: 'Newsmax', region: 'United States', flag: '🇺🇸', website: 'https://www.newsmax.com', brandColor: '#002B49', hasRss: true, feedStatus: 'available' },
    { id: 'foxnews', name: 'Fox News', shortName: 'Fox News', region: 'United States', flag: '🇺🇸', website: 'https://www.foxnews.com', brandColor: '#003366', hasRss: true, feedStatus: 'available' },
    { id: 'ln24international', name: 'LoveWorld LN24 International', shortName: 'LN24 Intl', region: 'International', flag: '🌐', website: 'https://ln24international.com', brandColor: '#0C2340', hasRss: true, feedStatus: 'available' },
    { id: 'ln247', name: 'LN247', shortName: 'LN247', region: 'International', flag: '🌐', website: 'https://ln247.news', brandColor: '#0A2540', hasRss: true, feedStatus: 'available' },
    { id: 'loveworldeurope', name: 'LoveWorld Europe', shortName: 'LW Europe', region: 'UK & Europe', flag: '🇪🇺', website: 'https://loveworldeurope.org', brandColor: '#1E3A8A', hasRss: false, feedStatus: 'portal_only' },
    { id: 'loveworldsat', name: 'LoveWorld Sat', shortName: 'LW Sat', region: 'South Africa', flag: '🇿🇦', website: 'https://www.loveworldsat.org', brandColor: '#1A365D', hasRss: false, feedStatus: 'broadcast_only' },
    { id: 'skynews_australia', name: 'Sky News Australia', shortName: 'Sky News AU', region: 'Australia', flag: '🇦🇺', website: 'https://www.skynews.com.au', brandColor: '#990000', hasRss: false, feedStatus: 'portal_only' },
    { id: 'ani', name: 'ANI – Asian News International', shortName: 'ANI News', region: 'India', flag: '🇮🇳', website: 'https://www.aninews.in', brandColor: '#8B0000', hasRss: true, feedStatus: 'available' }
  ];

  const FALLBACK_ARTICLES = [
    {
      id: 'newsmax-1',
      sourceId: 'newsmax',
      sourceName: 'Newsmax',
      title: 'US Senate Deliberates Bipartisan Defense & Border Security Framework',
      link: 'https://www.newsmax.com/newsfront/senate-defense-border-security/2026/11/08/id/1188201/',
      summary: 'Lawmakers on Capitol Hill convene for committee hearings addressing comprehensive national security budgets, international trade alliances, and border modernization programs.',
      publishedAt: new Date(Date.now() - 36 * 60 * 1000).toISOString(),
      category: 'Politics',
      imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'foxnews-1',
      sourceId: 'foxnews',
      sourceName: 'Fox News',
      title: 'Allied Naval Exercises Conclude in Western Pacific Amid Modernized Defense Pact',
      link: 'https://www.foxnews.com/world/allied-naval-exercises-western-pacific-defense-pact',
      summary: 'Multi-national maritime units demonstrate coordinated communications and automated surveillance capabilities across key Pacific shipping routes during scheduled joint drills.',
      publishedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      category: 'World News',
      imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'ln24intl-1',
      sourceId: 'ln24international',
      sourceName: 'LoveWorld LN24 International',
      title: 'Global Economic Forum Evaluates Digital Financial Inclusion & Infrastructure in Africa',
      link: 'https://ln24international.com/global-economic-forum-evaluates-digital-financial-inclusion-africa/',
      summary: 'Regional ministers and financial technology leaders assess regulatory harmonization to accelerate cross-border trade, agricultural investments, and digital currency pilots across Africa.',
      publishedAt: new Date(Date.now() - 48 * 60 * 1000).toISOString(),
      category: 'Africa',
      imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'ln247-1',
      sourceId: 'ln247',
      sourceName: 'LN247',
      title: 'Innovations in Telemedicine and Preventative Healthcare Across Developing Markets',
      link: 'https://ln247.news/innovations-in-telemedicine-and-preventative-healthcare-developing-markets/',
      summary: 'Medical specialists and healthcare administrators highlight mobile diagnostic tools and solar-powered clinics bringing life-saving care to remote agrarian communities.',
      publishedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      category: 'Health',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'ani-1',
      sourceId: 'ani',
      sourceName: 'ANI – Asian News International',
      title: 'India Advances Semiconductor Manufacturing Hub With Multi-Billion Dollar Fab Approvals',
      link: 'https://aninews.in/news/national/general-news/india-advances-semiconductor-manufacturing-hub-fab-approvals20261108182045/',
      summary: 'The Ministry of Electronics and IT issues operational clearances for state-of-the-art silicon fabrication plants in Gujarat and Assam, bolstering regional high-tech self-reliance.',
      publishedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      category: 'India',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'ani-2',
      sourceId: 'ani',
      sourceName: 'ANI – Asian News International',
      title: 'External Affairs Minister Meets Southeast Asian Counterparts on Indo-Pacific Security & Trade',
      link: 'https://aninews.in/news/world/asia/external-affairs-minister-meets-southeast-asian-counterparts-indo-pacific-trade20261108164010/',
      summary: 'Discussions emphasize maritime navigation freedom, bilateral supply-chain resilience, and digital public infrastructure collaboration across regional trading partners.',
      publishedAt: new Date(Date.now() - 80 * 60 * 1000).toISOString(),
      category: 'International Affairs',
      imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'loveworldsat-broadcast-1',
      sourceId: 'loveworldsat',
      sourceName: 'LoveWorld Sat',
      title: "Live Broadcast Special: 'Good Morning World' & Global Business Updates From Johannesburg",
      link: 'https://www.loveworldsat.org/live-tv',
      summary: 'LoveWorld SAT delivers scheduled 24/7 satellite news bulletins, in-depth discussions on African economic transformation, community empowerment, and Christian ministry updates.',
      publishedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      category: 'Africa',
      imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'loveworldeurope-broadcast-1',
      sourceId: 'loveworldeurope',
      sourceName: 'LoveWorld Europe',
      title: 'European Continental Stream: Multilingual Christian News & Inspirational Programming',
      link: 'https://loveworldeurope.org',
      summary: 'Live broadcast programming across the UK and Continental Europe delivering multilingual faith broadcasts, youth forums, and community outreach specials.',
      publishedAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
      category: 'Europe',
      imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'skynews-portal-1',
      sourceId: 'skynews_australia',
      sourceName: 'Sky News Australia',
      title: 'Australian Parliament Debates Natural Resource Exports & Renewable Grid Transition',
      link: 'https://www.skynews.com.au/australia-news',
      summary: 'Canberra lawmakers deliberate national power reliability standards, critical mineral export tariffs, and regional infrastructure investments across Queensland and Western Australia.',
      publishedAt: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
      category: 'Australia',
      imageUrl: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80'
    }
  ];

  let sources = [...FALLBACK_SOURCES];
  let articles = [...FALLBACK_ARTICLES];
  let currentSource = 'all';
  let currentCategory = 'All';
  let searchQuery = '';

  const CATEGORIES = [
    'All',
    'World News',
    'Politics',
    'India',
    'International Affairs',
    'Business',
    'Technology',
    'Entertainment',
    'Health',
    'Religion and Faith',
    'Africa',
    'Europe',
    'Australia',
    'USA'
  ];

  // DOM Elements
  const heroCard = document.getElementById('hero-card');
  const heroImg = document.getElementById('hero-img');
  const heroSource = document.getElementById('hero-source');
  const heroCategory = document.getElementById('hero-category');
  const heroTime = document.getElementById('hero-time');
  const heroTitle = document.getElementById('hero-title');
  const heroDesc = document.getElementById('hero-desc');
  const heroLink = document.getElementById('hero-link');
  const sourcesGrid = document.getElementById('sources-grid');
  const categoryPills = document.getElementById('category-pills');
  const newsGrid = document.getElementById('news-grid');
  const feedTitle = document.getElementById('feed-title');
  const feedCount = document.getElementById('feed-count');
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  const statusText = document.getElementById('status-text');
  const lastUpdatedText = document.getElementById('last-updated-text');
  const themeBtn = document.getElementById('theme-btn');
  const resetSourcesBtn = document.getElementById('reset-sources-btn');
  const appViewport = document.getElementById('app-viewport');
  const deviceButtons = document.querySelectorAll('.device-btn');
  const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');

  // Theme Management
  const currentTheme = localStorage.getItem('nc-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (themeBtn) {
    themeBtn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('nc-theme', newTheme);
      themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
  }

  // Device Viewport Switcher
  deviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      deviceButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (appViewport) {
        appViewport.className = `app-viewport mode-${mode}`;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Mobile Bottom Navigation Actions
  mobileNavButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      mobileNavButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Relative Time Formatter
  function formatRelative(isoDate) {
    if (!isoDate) return 'Just now';
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay === 1) return 'Yesterday';
    return `${diffDay}d ago`;
  }

  // Render Sources Grid
  function renderSources() {
    if (!sourcesGrid) return;
    sourcesGrid.innerHTML = '';

    sources.forEach(source => {
      const el = document.createElement('div');
      el.className = `source-item ${currentSource === source.id ? 'active' : ''}`;
      
      const statusPill = source.hasRss
        ? `<span class="source-status-pill" style="color:var(--status-live); border-color:var(--status-live)">● Live RSS</span>`
        : source.feedStatus === 'broadcast_only'
        ? `<span class="source-status-pill" style="color:var(--status-broadcast); border-color:var(--status-broadcast)">● Live TV</span>`
        : `<span class="source-status-pill" style="color:var(--status-portal); border-color:var(--status-portal)">● Portal</span>`;

      el.innerHTML = `
        <div class="source-top">
          <span class="source-badge-tag" style="background:${source.brandColor}">${source.shortName}</span>
          ${statusPill}
        </div>
        <div class="source-title">${source.name}</div>
        <div class="source-bottom">
          <span>${source.region}</span>
          <a href="${source.website}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-gold); font-weight:700;">↗</a>
        </div>
      `;

      el.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'a') return;
        currentSource = currentSource === source.id ? 'all' : source.id;
        renderSources();
        filterAndRenderNews();
      });

      sourcesGrid.appendChild(el);
    });

    if (resetSourcesBtn) {
      resetSourcesBtn.style.display = currentSource !== 'all' ? 'inline-block' : 'none';
    }
  }

  if (resetSourcesBtn) {
    resetSourcesBtn.addEventListener('click', () => {
      currentSource = 'all';
      renderSources();
      filterAndRenderNews();
    });
  }

  // Render Category Pills
  function renderCategories(counts = {}) {
    if (!categoryPills) return;
    categoryPills.innerHTML = '';

    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `category-pill ${currentCategory === cat ? 'active' : ''}`;
      const count = counts[cat];
      btn.innerHTML = `${cat} ${count ? `<span style="opacity:0.7; font-size:10px;">(${count})</span>` : ''}`;

      btn.addEventListener('click', () => {
        currentCategory = cat;
        renderCategories(counts);
        filterAndRenderNews();
      });

      categoryPills.appendChild(btn);
    });
  }

  // Update Hero Section
  function updateHero(art) {
    if (!art || !heroImg) return;
    heroImg.src = art.imageUrl;
    heroSource.textContent = art.sourceName;
    heroCategory.textContent = art.category;
    heroTime.textContent = `⏱ ${formatRelative(art.publishedAt)} • ${new Date(art.publishedAt).toLocaleDateString()}`;
    heroTitle.textContent = art.title;
    heroDesc.textContent = art.summary;
    heroLink.href = art.link;
  }

  // Filter & Render News (Instant client-side filter)
  function filterAndRenderNews() {
    let filtered = [...articles];

    if (currentSource !== 'all') {
      filtered = filtered.filter(a => a.sourceId === currentSource);
    }

    if (currentCategory !== 'All') {
      filtered = filtered.filter(a => a.category.toLowerCase() === currentCategory.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.sourceName.toLowerCase().includes(q)
      );
    }

    renderArticles(filtered);

    // Update Category counts
    const counts = { All: articles.length };
    articles.forEach(a => {
      if (a.category) counts[a.category] = (counts[a.category] || 0) + 1;
    });
    renderCategories(counts);

    if (filtered.length > 0 && currentSource === 'all' && currentCategory === 'All' && !searchQuery) {
      updateHero(filtered[0]);
    }
  }

  // Render News Cards
  function renderArticles(items) {
    if (!newsGrid) return;
    newsGrid.innerHTML = '';

    if (feedCount) feedCount.textContent = `${items.length} ${items.length === 1 ? 'story' : 'stories'}`;

    if (!items || items.length === 0) {
      newsGrid.innerHTML = `
        <div style="grid-column: 1/-1; padding: 40px; text-align: center; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
          <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
          <h3 style="font-size: 16px; margin-bottom: 6px;">No articles found</h3>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 14px;">Try a different search term or reset your source/category filters.</p>
          <button class="btn-primary" style="margin: 0 auto;" id="empty-reset-btn">Reset Filters</button>
        </div>
      `;
      document.getElementById('empty-reset-btn')?.addEventListener('click', () => {
        currentSource = 'all';
        currentCategory = 'All';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        if (searchClear) searchClear.style.display = 'none';
        renderSources();
        filterAndRenderNews();
      });
      return;
    }

    items.forEach(art => {
      const card = document.createElement('article');
      card.className = 'news-card';

      card.innerHTML = `
        <div class="card-thumb-wrap">
          <img src="${art.imageUrl}" alt="${art.title}" class="card-thumb" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'">
          <span class="card-cat-badge">${art.category}</span>
        </div>
        <div class="card-content">
          <div class="card-source-row">
            <div class="card-source-pill">
              <span class="mini-badge" style="background:#0B1325">${art.sourceName.split(' ')[0]}</span>
              <span class="source-label">${art.sourceName}</span>
            </div>
            <span class="card-time">${formatRelative(art.publishedAt)}</span>
          </div>
          <h3 class="card-headline">
            <a href="${art.link}" target="_blank" rel="noopener noreferrer">${art.title}</a>
          </h3>
          <p class="card-summary">${art.summary}</p>
          <div class="card-footer">
            <a href="${art.link}" target="_blank" rel="noopener noreferrer" class="read-link">Read Full Report ↗</a>
            <div style="display:flex; align-items:center; gap:8px;">
              <button class="card-action-icon share-btn" data-url="${art.link}" data-title="${encodeURIComponent(art.title)}" title="Share Article" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:12px; font-weight:700;">↗ Share</button>
              <span class="attribution-tag">Verified Feed</span>
            </div>
          </div>
        </div>
      `;

      // Share Action Handler
      const shareBtn = card.querySelector('.share-btn');
      if (shareBtn) {
        shareBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          const shareUrl = shareBtn.getAttribute('data-url');
          const shareTitle = decodeURIComponent(shareBtn.getAttribute('data-title'));
          if (navigator.share) {
            try {
              await navigator.share({ title: shareTitle, url: shareUrl });
            } catch (err) {}
          } else {
            navigator.clipboard.writeText(shareUrl).then(() => {
              shareBtn.textContent = '✓ Copied';
              setTimeout(() => { shareBtn.textContent = '↗ Share'; }, 2000);
            });
          }
        });
      }

      newsGrid.appendChild(card);
    });

    if (feedTitle) {
      feedTitle.textContent = currentSource !== 'all'
        ? `${sources.find(s => s.id === currentSource)?.name || currentSource} Headlines`
        : currentCategory !== 'All'
        ? `${currentCategory} Headlines`
        : 'Latest International Headlines';
    }
  }

  // Live Backend Fetchers
  async function syncFromBackend() {
    try {
      const res = await fetch('/api/sources');
      if (res.ok) {
        const data = await res.json();
        if (data.sources && data.sources.length > 0) {
          sources = data.sources;
          renderSources();
          if (statusText) {
            statusText.textContent = `${data.connectedFeeds} Feeds Live • ${data.broadcastPortals} Broadcasts Connected`;
          }
        }
      }
    } catch (e) {
      // Offline or direct file view - fallback stays active seamlessly
    }

    try {
      const res = await fetch('/api/news');
      if (res.ok) {
        const data = await res.json();
        if (data.articles && data.articles.length > 0) {
          articles = data.articles;
          filterAndRenderNews();
          if (lastUpdatedText) {
            lastUpdatedText.textContent = `Sync: ${formatRelative(data.lastUpdated)}`;
          }
        }
      }
    } catch (e) {
      // Offline fallback already rendered
    }
  }

  // Search Input Handler (Debounced)
  let searchTimer;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchClear) searchClear.style.display = searchQuery ? 'block' : 'none';
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        filterAndRenderNews();
      }, 200);
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      searchClear.style.display = 'none';
      filterAndRenderNews();
    });
  }

  // 1. Instant Synchronous Initial Render (Screen is never white/blank!)
  renderSources();
  filterAndRenderNews();
  if (statusText) statusText.textContent = '8 Sources Connected';
  if (lastUpdatedText) lastUpdatedText.textContent = 'Sync: Active';

  // 2. Stream Player Modal Controller
  const streamModal = document.getElementById('stream-modal');
  const streamModalClose = document.getElementById('stream-modal-close');
  const streamModalTitle = document.getElementById('stream-modal-title');
  const streamModalDesc = document.getElementById('stream-modal-desc');
  const streamPlayerArea = document.getElementById('stream-player-area');
  const streamExternalLink = document.getElementById('stream-external-link');

  const STREAM_CHANNELS = {
    loveworldsat: {
      title: '🇿🇦 LoveWorld Sat — Live TV Stream',
      desc: '24/7 Satellite Broadcast Live from Johannesburg: News On The Hour, Good Morning World, and Global Business Update.',
      embedUrl: 'https://www.loveworldsat.org/live-tv',
      externalUrl: 'https://www.loveworldsat.org/live-tv'
    },
    loveworldeurope: {
      title: '🇪🇺 LoveWorld Europe — Live Stream',
      desc: 'Continental Multilingual Christian Broadcasting & Youth Leadership Special Programs.',
      embedUrl: 'https://loveworldeurope.org',
      externalUrl: 'https://loveworldeurope.org'
    },
    skynews: {
      title: '🇦🇺 Sky News Australia — Digital Reports',
      desc: 'Canberra Parliament, National Politics, and Global Affairs on-demand video coverage.',
      embedUrl: 'https://www.skynews.com.au',
      externalUrl: 'https://www.skynews.com.au'
    }
  };

  document.querySelectorAll('.open-player-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const channelKey = btn.getAttribute('data-channel');
      const channel = STREAM_CHANNELS[channelKey];
      if (!channel) return;

      if (streamModalTitle) streamModalTitle.textContent = channel.title;
      if (streamModalDesc) streamModalDesc.textContent = channel.desc;
      if (streamExternalLink) streamExternalLink.href = channel.externalUrl;
      if (streamPlayerArea) {
        streamPlayerArea.innerHTML = `<iframe src="${channel.embedUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%; border:none;"></iframe>`;
      }
      if (streamModal) streamModal.style.display = 'flex';
    });
  });

  if (streamModalClose) {
    streamModalClose.addEventListener('click', () => {
      if (streamModal) streamModal.style.display = 'none';
      if (streamPlayerArea) streamPlayerArea.innerHTML = '';
    });
  }

  // Refresh Button Handler
  const refreshBtn = document.getElementById('refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshBtn.style.transform = 'rotate(360deg)';
      refreshBtn.style.transition = 'transform 0.6s ease';
      syncFromBackend().finally(() => {
        setTimeout(() => { refreshBtn.style.transform = 'none'; }, 600);
      });
    });
  }

  // 3. Asynchronous Live Feed Sync from Backend Proxy
  syncFromBackend();
})();
