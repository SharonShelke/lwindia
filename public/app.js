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
    { id: 'ani', name: 'ANI – Asian News International', shortName: 'ANI News', region: 'India', flag: '🇮🇳', website: 'https://www.aninews.in', brandColor: '#8B0000', hasRss: true, feedStatus: 'available' },
    { id: 'loveworldindia', name: 'LoveWorld India (LBN TV)', shortName: 'LW India', region: 'India & South Asia', flag: '🇮🇳', website: 'https://lwindia.org/', brandColor: '#08182D', hasRss: false, feedStatus: 'broadcast_only' }
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
    },
    {
      id: 'loveworldindia-broadcast-1',
      sourceId: 'loveworldindia',
      sourceName: 'LoveWorld India (LBN TV)',
      title: 'LoveWorld India Broadcast: Faith, Leadership & Inspiring Programs Transmitted Across South Asia',
      link: 'https://lwindia.org/',
      summary: 'LoveWorld India (LBN TV) streams 24/7 television broadcasts, community outreach, and global prayer sessions led by Pastor Chris Oyakhilome to millions across India and the diaspora (JioTV 4080).',
      publishedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      category: 'India',
      imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80'
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
  const searchCatToggleBtn = document.getElementById('search-cat-toggle-btn');
  const categoryDropdownPanel = document.getElementById('category-dropdown-panel');
  const categoryDropdownClose = document.getElementById('category-dropdown-close');
  const activeCategoryPill = document.getElementById('active-category-pill');
  const categoryListContainer = document.getElementById('category-list-container');

  // Official Brand Logo Images
  const APP_BRAND_ICONS = {
    newsmax: '<img src="assets/logos/newsmax.png" class="source-logo-img" alt="Newsmax" />',
    foxnews: '<img src="assets/logos/foxnews.png" class="source-logo-img" alt="Fox News" />',
    ln24international: '<img src="assets/logos/ln24international.png" class="source-logo-img" alt="LN24 International" onerror="this.src=\'assets/logos/ln24international.jpg\'" />',
    ln247: '<img src="assets/logos/ln247.png" class="source-logo-img" alt="LN247" />',
    loveworldeurope: '<img src="assets/logos/loveworldeurope.png" class="source-logo-img" alt="LoveWorld Europe" onerror="this.src=\'assets/logos/loveworldeurope.jpg\'" />',
    loveworldsat: '<img src="assets/logos/loveworldsat.png" class="source-logo-img" alt="LoveWorld Sat" />',
    skynews_australia: '<img src="assets/logos/skynews_australia.png" class="source-logo-img" alt="Sky News Australia" />',
    ani: '<img src="assets/logos/ani.png" class="source-logo-img" alt="ANI" />',
    loveworldindia: '<div class="src-logo-wrap" style="background: rgba(255,255,255,0.95); padding: 4px 8px; border-radius: 8px; display:inline-flex; align-items:center; justify-content:center;"><img src="assets/logos/loveworldindia.png" class="source-logo-img" alt="LoveWorld India" style="object-fit: contain; max-height: 36px;" /></div>'
  };

  const CATEGORY_ICONS = {
    'All': '🌐',
    'World News': '🌍',
    'Politics': '🏛️',
    'India': '🇮🇳',
    'International Affairs': '🤝',
    'Business': '📈',
    'Technology': '💻',
    'Entertainment': '🎬',
    'Health': '🩺',
    'Religion and Faith': '✝️',
    'Africa': '🦁',
    'Europe': '🇪🇺',
    'Australia': '🦘',
    'USA': '🇺🇸'
  };

  // Theme Management
  const currentTheme = localStorage.getItem('nc-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  const sunSvg = `<svg class="action-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const moonSvg = `<svg class="action-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  function renderThemeIcon(theme) {
    const slot = document.getElementById('theme-icon-slot');
    if (slot) {
      slot.innerHTML = theme === 'dark' ? sunSvg : moonSvg;
    } else if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' ? sunSvg : moonSvg;
    }
  }

  if (themeBtn) {
    renderThemeIcon(currentTheme);
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('nc-theme', newTheme);
      renderThemeIcon(newTheme);
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
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        mobileNavButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (href === '#saved') {
          renderArticles(savedArticles);
          if (feedTitle) feedTitle.textContent = `Saved Bookmarks (${savedArticles.length})`;
          const feedEl = document.getElementById('feed');
          if (feedEl) feedEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
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

  // Render Sources Grid (Real Brand Logo Images from uploads)
  function renderSources() {
    if (!sourcesGrid) return;
    sourcesGrid.innerHTML = '';

    sources.forEach(source => {
      const el = document.createElement('div');
      const isActive = currentSource === source.id;
      el.className = 'source-card' + (isActive ? ' active' : '');
      el.style.setProperty('--source-accent', source.brandColor || '#F5B041');

      const statusPill = source.hasRss
        ? '<span class="src-status-rss">📡 Live RSS</span>'
        : source.feedStatus === 'broadcast_only'
        ? '<span class="src-status-tv">📺 Live TV</span>'
        : '<span class="src-status-portal">🔗 Portal</span>';

      const logoImg = APP_BRAND_ICONS[source.id]
        || '<div class="src-logo-fallback" style="background:' + source.brandColor + '">' + source.shortName + '</div>';

      el.innerHTML = '<div class="src-card-header"><div class="src-logo-wrap">' + logoImg + '</div>' + statusPill + '</div>'
        + '<div class="src-card-body"><div class="src-network-name">' + source.name + '</div>'
        + '<div class="src-region-row"><span class="src-flag">' + (source.flag || '🌐') + '</span>'
        + '<span class="src-region">' + source.region + '</span></div></div>'
        + '<div class="src-card-footer"><button class="src-filter-btn' + (isActive ? ' active' : '') + '">'
        + (isActive ? '✓ Showing Feed' : 'Filter Stories') + '</button>'
        + '<a href="' + source.website + '" target="_blank" rel="noopener noreferrer" class="src-portal-link">Portal ↗</a></div>';

      el.addEventListener('click', function(e) {
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

  // Render Category Carousel & Dropdown Modal List (Image 1 & 2: 🔍 ☰ Button)
  function renderCategories(counts = {}) {
    // 1. Horizontal Quick Carousel Pills
    if (categoryPills) {
      categoryPills.innerHTML = '';
      CATEGORIES.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `category-pill ${currentCategory === cat ? 'active' : ''}`;
        const count = counts[cat];
        const icon = CATEGORY_ICONS[cat] || '📰';
        btn.innerHTML = `<span>${icon}</span> <span>${cat}</span> ${count ? `<span style="opacity:0.75; font-size:10px;">(${count})</span>` : ''}`;

        btn.addEventListener('click', () => {
          currentCategory = cat;
          renderCategories(counts);
          filterAndRenderNews();
        });

        categoryPills.appendChild(btn);
      });
    }

    // 2. Update Active Category Label on [🔍 ☰] Button
    if (activeCategoryPill) {
      const activeCount = counts[currentCategory] || (currentCategory === 'All' ? articles.length : 0);
      activeCategoryPill.textContent = currentCategory === 'All' ? `All (${activeCount})` : `${currentCategory} (${activeCount})`;
    }

    // 3. Populate Category Dropdown Grid/List (Image 2)
    if (categoryListContainer) {
      categoryListContainer.innerHTML = '';
      CATEGORIES.forEach(cat => {
        const item = document.createElement('button');
        item.className = `category-dropdown-item ${currentCategory === cat ? 'active' : ''}`;
        const count = counts[cat] || (cat === 'All' ? articles.length : 0);
        const icon = CATEGORY_ICONS[cat] || '📰';

        item.innerHTML = `
          <span class="cat-item-left">
            <span class="cat-icon">${icon}</span>
            <span class="cat-name">${cat}</span>
          </span>
          <span class="cat-item-right">
            <span class="cat-count-badge">${count}</span>
            ${currentCategory === cat ? '<span class="cat-check">✓</span>' : ''}
          </span>
        `;

        item.addEventListener('click', () => {
          currentCategory = cat;
          renderCategories(counts);
          filterAndRenderNews();
          if (categoryDropdownPanel) categoryDropdownPanel.style.display = 'none';
          if (searchCatToggleBtn) {
            searchCatToggleBtn.classList.remove('open');
            searchCatToggleBtn.setAttribute('aria-expanded', 'false');
          }
        });

        categoryListContainer.appendChild(item);
      });
    }
  }

  // Toggle Category Dropdown via [🔍 ☰] Button (Image 1)
  if (searchCatToggleBtn && categoryDropdownPanel) {
    searchCatToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = categoryDropdownPanel.style.display === 'block';
      categoryDropdownPanel.style.display = isOpen ? 'none' : 'block';
      searchCatToggleBtn.classList.toggle('open', !isOpen);
      searchCatToggleBtn.setAttribute('aria-expanded', !isOpen);
    });

    if (categoryDropdownClose) {
      categoryDropdownClose.addEventListener('click', () => {
        categoryDropdownPanel.style.display = 'none';
        searchCatToggleBtn.classList.remove('open');
        searchCatToggleBtn.setAttribute('aria-expanded', 'false');
      });
    }

    document.addEventListener('click', (e) => {
      if (!categoryDropdownPanel.contains(e.target) && !searchCatToggleBtn.contains(e.target)) {
        categoryDropdownPanel.style.display = 'none';
        searchCatToggleBtn.classList.remove('open');
        searchCatToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Bookmarks Storage & Helper Functions
  let savedArticles = [];
  try {
    savedArticles = JSON.parse(localStorage.getItem('nc-saved-articles') || '[]');
  } catch (e) {
    savedArticles = [];
  }

  function updateSavedCount() {
    const pill = document.getElementById('saved-count');
    if (pill) pill.textContent = savedArticles.length;
  }

  function isArticleSaved(id) {
    return savedArticles.some(a => a.id === id);
  }

  function toggleSavedArticle(art) {
    if (isArticleSaved(art.id)) {
      savedArticles = savedArticles.filter(a => a.id !== art.id);
    } else {
      savedArticles.push(art);
    }
    localStorage.setItem('nc-saved-articles', JSON.stringify(savedArticles));
    updateSavedCount();
  }

  updateSavedCount();

  // Navigation: Smooth Scroll & Active Golden Pill Highlight (Image 7)
  const navLinks = document.querySelectorAll('.header-nav .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        if (href === '#saved') {
          renderArticles(savedArticles);
          if (feedTitle) feedTitle.textContent = `Saved Bookmarks (${savedArticles.length})`;
          const feedEl = document.getElementById('feed');
          if (feedEl) feedEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });
  });

  // Scroll-Spy: Automatically Highlight Active Section in Navbar as User Scrolls
  if ('IntersectionObserver' in window) {
    const sectionIds = ['featured', 'sources', 'feed', 'broadcasts', 'about'];
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(l => {
            if (l.getAttribute('href') === `#${id}`) {
              l.classList.add('active');
            } else if (l.getAttribute('href') !== '#saved') {
              l.classList.remove('active');
            }
          });
          mobileNavButtons.forEach(b => {
            if (b.getAttribute('href') === `#${id}`) {
              b.classList.add('active');
            } else if (b.getAttribute('href') !== '#saved') {
              b.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-15% 0px -60% 0px',
      threshold: 0.1
    });

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
  }

  // View Mode Layout Toggle (Cards vs List Wire)
  const btnViewCards = document.getElementById('btn-view-cards');
  const btnViewList = document.getElementById('btn-view-list');
  if (btnViewCards && btnViewList && newsGrid) {
    btnViewCards.addEventListener('click', () => {
      btnViewCards.classList.add('active');
      btnViewList.classList.remove('active');
      newsGrid.classList.remove('view-mode-list');
      newsGrid.classList.add('view-mode-cards');
    });

    btnViewList.addEventListener('click', () => {
      btnViewList.classList.add('active');
      btnViewCards.classList.remove('active');
      newsGrid.classList.remove('view-mode-cards');
      newsGrid.classList.add('view-mode-list');
    });
  }

  function cleanHtmlText(txt) {
    if (!txt) return '';
    let str = String(txt);
    for (let i = 0; i < 3; i++) {
      str = str
        .replace(/<\/?[a-z0-9]+[^>]*>/gi, ' ')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#8220;/gi, '"')
        .replace(/&#8221;/gi, '"')
        .replace(/&#8216;/gi, "'")
        .replace(/&#8217;/gi, "'")
        .replace(/&#39;/gi, "'")
        .replace(/&apos;/gi, "'")
        .replace(/&#8211;/gi, '-')
        .replace(/&#8212;/gi, '—')
        .replace(/&amp;/gi, '&');
    }
    return str.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // Update Hero Section
  function updateHero(art) {
    if (!art || !heroImg) return;
    heroImg.src = art.imageUrl;
    if (heroSource) heroSource.textContent = cleanHtmlText(art.sourceName);
    if (heroCategory) {
      heroCategory.textContent = cleanHtmlText(art.category || 'WORLD').toUpperCase();
      heroCategory.style.color = '#F5B041';
      heroCategory.style.fontWeight = '800';
    }
    if (heroTime) heroTime.textContent = `⏱ ${formatRelative(art.publishedAt)} • ${new Date(art.publishedAt).toLocaleDateString()}`;
    if (heroTitle) heroTitle.textContent = cleanHtmlText(art.title);
    if (heroDesc) heroDesc.textContent = cleanHtmlText(art.summary);
    if (heroLink) {
      heroLink.href = art.link;
      heroLink.textContent = 'Read More';
      heroLink.style.background = '#F5B041';
      heroLink.style.color = '#0B1325';
      heroLink.style.fontWeight = '800';
    }

    // Populate Trending Now list with top 5 stories with fail-safe inline styling!
    const trendingList = document.getElementById('trending-list');
    if (trendingList && articles.length > 1) {
      const trendingArticles = articles.filter(a => a.id !== art.id).slice(0, 5);
      if (trendingArticles.length > 0) {
        trendingList.innerHTML = trendingArticles.map((tArt, idx) => `
          <a href="${tArt.link}" target="_blank" rel="noopener noreferrer" class="trending-item" style="display:flex; align-items:center; gap:12px; text-decoration:none; padding:8px 10px; border-radius:10px; transition:all 0.2s;">
            <span class="trending-rank-badge" style="width:26px; height:26px; min-width:26px; border-radius:7px; background:#F5B041; color:#0B1325; font-size:12.5px; font-weight:900; display:flex; align-items:center; justify-content:center; flex-shrink:0;">${idx + 1}</span>
            <img src="${tArt.imageUrl}" alt="${cleanHtmlText(tArt.title)}" class="trending-thumb" style="width:48px; height:48px; min-width:48px; max-width:48px; border-radius:8px; object-fit:cover; flex-shrink:0;" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=200&q=80'">
            <span class="trending-text" style="font-size:13px; font-weight:700; line-height:1.35; color:var(--text-primary); display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${cleanHtmlText(tArt.title)}</span>
          </a>
        `).join('');
      }
    }
  }

  // Render Dynamic Editorial Magazine Section (Reference Mockup Layout)
  function renderEditorialMagazine(items) {
    if (!items || items.length === 0) return;
    const leadArt = items.find(a => (a.category && a.category.toLowerCase().includes('business')) || (a.category && a.category.toLowerCase().includes('world'))) || items[1] || items[0];
    
    const edImg = document.getElementById('ed-lead-img');
    const edBadge = document.getElementById('ed-lead-badge');
    const edLink = document.getElementById('ed-lead-link');
    const edDesc = document.getElementById('ed-lead-desc');
    const edAuthor = document.getElementById('ed-author-name');
    const edMeta = document.getElementById('ed-author-meta');
    const edAvatar = document.getElementById('ed-author-avatar');

    if (leadArt && edImg) {
      edImg.src = leadArt.imageUrl;
      if (edBadge) edBadge.textContent = cleanHtmlText(leadArt.category || 'BUSINESS').toUpperCase();
      if (edLink) {
        edLink.href = leadArt.link;
        edLink.textContent = cleanHtmlText(leadArt.title);
      }
      if (edDesc) edDesc.textContent = cleanHtmlText(leadArt.summary);
      if (edAuthor) edAuthor.textContent = `${leadArt.sourceName} Editorial Wire`;
      if (edMeta) edMeta.textContent = `Verified Syndicate • ${formatRelative(leadArt.publishedAt)}`;
      if (edAvatar) edAvatar.textContent = (leadArt.sourceName || 'NC').substring(0, 2).toUpperCase();
    }

    const stackList = document.getElementById('editorial-stack-list');
    if (stackList) {
      const stackArticles = items.filter(a => a.id !== leadArt?.id).slice(0, 4);
      if (stackArticles.length > 0) {
        stackList.innerHTML = stackArticles.map(art => `
          <a href="${art.link}" target="_blank" rel="noopener noreferrer" class="editorial-stack-item">
            <img src="${art.imageUrl}" class="editorial-stack-thumb" alt="${cleanHtmlText(art.title)}" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=300&q=80'" />
            <div class="editorial-stack-content">
              <span class="editorial-stack-tag">${cleanHtmlText(art.category || 'WORLD').toUpperCase()} • ${formatRelative(art.publishedAt)}</span>
              <span class="editorial-stack-title">${cleanHtmlText(art.title)}</span>
            </div>
          </a>
        `).join('');
      }
    }
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
      renderEditorialMagazine(filtered);
    } else if (articles.length > 0) {
      renderEditorialMagazine(articles);
    }
  }

  // Render News Cards
  // Pagination & 3-Row Limit Settings (3 rows in 3-column grid = 9 stories)
  const INITIAL_VISIBLE_COUNT = 9;
  let isReportsExpanded = false;
  let currentFeedItems = [];

  // Reset pagination state when filters change
  const _origFilterAndRenderNews = filterAndRenderNews;
  filterAndRenderNews = function() {
    isReportsExpanded = false;
    _origFilterAndRenderNews();
  };

  // Render News Cards with 3-Row Limit and Animated Read More Reports Button
  function renderArticles(items) {
    if (!newsGrid) return;
    newsGrid.innerHTML = '';
    currentFeedItems = items || [];

    const totalCount = currentFeedItems.length;
    if (feedCount) feedCount.textContent = `${totalCount} ${totalCount === 1 ? 'story' : 'stories'}`;

    const readMoreWrap = document.getElementById('read-more-wrapper');
    const readMoreBtn = document.getElementById('btn-read-more-reports');
    const readMoreText = document.getElementById('btn-read-more-text');
    const readMoreBadge = document.getElementById('btn-read-more-badge');
    const readMoreIcon = document.getElementById('btn-read-more-icon');
    const readMoreSubhint = document.getElementById('read-more-subhint');

    if (!items || items.length === 0) {
      if (readMoreWrap) readMoreWrap.style.display = 'none';
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
        isReportsExpanded = false;
        renderSources();
        filterAndRenderNews();
      });
      return;
    }

    // Determine slice to display: 3 rows (9 cards) or full list
    const visibleItems = (isReportsExpanded || totalCount <= INITIAL_VISIBLE_COUNT)
      ? currentFeedItems
      : currentFeedItems.slice(0, INITIAL_VISIBLE_COUNT);

    visibleItems.forEach((art, idx) => {
      const card = document.createElement('article');
      card.className = 'news-card' + (idx >= INITIAL_VISIBLE_COUNT ? ' card-cascade-in' : '');
      if (idx >= INITIAL_VISIBLE_COUNT) {
        card.style.animationDelay = `${Math.min((idx - INITIAL_VISIBLE_COUNT) * 0.04, 0.6)}s`;
      }

      const sourceLogos = {
        newsmax: 'assets/logos/newsmax.png',
        foxnews: 'assets/logos/foxnews.png',
        ln24international: 'assets/logos/ln24international.png',
        ln247: 'assets/logos/ln247.png',
        loveworldeurope: 'assets/logos/loveworldeurope.png',
        loveworldsat: 'assets/logos/loveworldsat.png',
        skynews_australia: 'assets/logos/skynews_australia.png',
        ani: 'assets/logos/ani.png',
        loveworldindia: 'assets/logos/loveworldindia.png'
      };
      const logoSrc = sourceLogos[art.sourceId] || 'assets/logos/newsmax.png';

      card.innerHTML = `
        <div class="card-thumb-wrap">
          <img src="${art.imageUrl}" alt="${cleanHtmlText(art.title)}" class="card-thumb" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'">
          <span class="card-cat-badge">${art.category}</span>
        </div>
        <div class="card-content">
          <div class="card-source-row">
            <div class="card-source-pill" style="display:inline-flex; align-items:center; gap:8px;">
              <span class="feed-logo-wrap" style="width:24px; height:24px; border-radius:6px; background:#FFFFFF; display:inline-flex; align-items:center; justify-content:center; overflow:hidden; padding:2px; flex-shrink:0; box-shadow:0 1px 3px rgba(0,0,0,0.18);">
                <img src="${logoSrc}" alt="${art.sourceName} Logo" style="width:100%; height:100%; object-fit:contain;" />
              </span>
              <span class="source-label" style="font-weight:700;">${art.sourceName}</span>
            </div>
            <span class="card-time">${formatRelative(art.publishedAt)}</span>
          </div>
          <h3 class="card-headline">
            <a href="${art.link}" target="_blank" rel="noopener noreferrer">${cleanHtmlText(art.title)}</a>
          </h3>
          <p class="card-summary">${cleanHtmlText(art.summary)}</p>
          <div class="card-footer">
            <a href="${art.link}" target="_blank" rel="noopener noreferrer" class="read-link">Read Full Report ↗</a>
            <div style="display:flex; align-items:center; gap:8px;">
              <button class="card-action-icon bookmark-card-btn" data-id="${art.id}" title="Save story" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:14px; font-weight:700; padding:2px 4px; transition:all 0.2s ease;">★</button>
              <button class="card-action-icon share-btn" data-url="${art.link}" data-title="${encodeURIComponent(art.title)}" title="Share Article" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:12px; font-weight:700;">↗ Share</button>
              <span class="attribution-tag">Verified Feed</span>
            </div>
          </div>
        </div>
      `;

      // Bookmark Action Handler
      const bmBtn = card.querySelector('.bookmark-card-btn');
      if (bmBtn) {
        if (isArticleSaved(art.id)) {
          bmBtn.classList.add('active');
          bmBtn.style.color = 'var(--accent-gold)';
        }
        bmBtn.addEventListener('click', (e) => {
          e.preventDefault();
          toggleSavedArticle(art);
          const saved = isArticleSaved(art.id);
          bmBtn.classList.toggle('active', saved);
          bmBtn.style.color = saved ? 'var(--accent-gold)' : '';
        });
      }

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

    // Update Read More Reports Button & Subhint
    if (readMoreWrap) {
      if (totalCount <= INITIAL_VISIBLE_COUNT) {
        readMoreWrap.style.display = 'none';
      } else {
        readMoreWrap.style.display = 'flex';
        const remaining = totalCount - INITIAL_VISIBLE_COUNT;

        if (!isReportsExpanded) {
          if (readMoreText) readMoreText.textContent = 'Read More Reports';
          if (readMoreBadge) readMoreBadge.textContent = `+${remaining} more`;
          if (readMoreIcon) {
            readMoreIcon.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;
          }
          if (readMoreSubhint) {
            readMoreSubhint.textContent = `Showing ${INITIAL_VISIBLE_COUNT} of ${totalCount} live reports (3 rows)`;
          }
        } else {
          if (readMoreText) readMoreText.textContent = 'Show Less Reports';
          if (readMoreBadge) readMoreBadge.textContent = '▲';
          if (readMoreIcon) {
            readMoreIcon.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>`;
          }
          if (readMoreSubhint) {
            readMoreSubhint.textContent = `Showing all ${totalCount} live reports`;
          }
        }
      }
    }

    if (feedTitle) {
      feedTitle.textContent = currentSource !== 'all'
        ? `${sources.find(s => s.id === currentSource)?.name || currentSource} Headlines`
        : currentCategory !== 'All'
        ? `${currentCategory} Headlines`
        : 'Latest International Headlines';
    }
  }

  // Hook Read More Reports Button Click with Animation & Scroll
  const readMoreReportsBtn = document.getElementById('btn-read-more-reports');
  if (readMoreReportsBtn) {
    readMoreReportsBtn.addEventListener('click', () => {
      if (!isReportsExpanded) {
        isReportsExpanded = true;
        renderArticles(currentFeedItems);
      } else {
        isReportsExpanded = false;
        renderArticles(currentFeedItems);
        const feedSec = document.getElementById('feed');
        if (feedSec) {
          feedSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
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
    },
    loveworldindia: {
      title: '🇮🇳 LoveWorld India (LBN TV) — Live Stream',
      desc: '24/7 Satellite & Digital Broadcast Live: Impacting India and South Asia with faith, prayer, and life-changing programs (JioTV 4080).',
      embedUrl: 'https://lwindia.org/',
      externalUrl: 'https://lwindia.org/'
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

  // 4. World Capital Clocks Real-Time Engine
  function updateWorldClocks() {
    const now = new Date();
    const formatTime = (timeZone) => {
      try {
        return new Intl.DateTimeFormat('en-US', {
          timeZone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(now);
      } catch (e) {
        return '--:--';
      }
    };

    const nycEl = document.getElementById('clock-nyc');
    const lonEl = document.getElementById('clock-lon');
    const jnbEl = document.getElementById('clock-jnb');
    const delEl = document.getElementById('clock-del');
    const sydEl = document.getElementById('clock-syd');

    if (nycEl) nycEl.textContent = formatTime('America/New_York');
    if (lonEl) lonEl.textContent = formatTime('Europe/London');
    if (jnbEl) jnbEl.textContent = formatTime('Africa/Johannesburg');
    if (delEl) delEl.textContent = formatTime('Asia/Kolkata');
    if (sydEl) sydEl.textContent = formatTime('Australia/Sydney');
  }
  updateWorldClocks();
  setInterval(updateWorldClocks, 10000);

  // 5. Toast Notification System
  function showToast(message, duration = 3000) {
    let toast = document.getElementById('nc-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'nc-toast';
      toast.className = 'nc-floating-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('visible');
    }, duration);
  }

  // 6. Reader Font Size Scaler
  let fontScale = parseFloat(localStorage.getItem('nc-font-scale') || '1.0');
  function applyFontScale(scale) {
    fontScale = Math.min(1.25, Math.max(0.85, scale));
    document.documentElement.style.setProperty('--user-font-scale', fontScale);
    localStorage.setItem('nc-font-scale', fontScale.toFixed(2));
  }
  applyFontScale(fontScale);

  const fontIncBtn = document.getElementById('font-increase');
  const fontDecBtn = document.getElementById('font-decrease');
  if (fontIncBtn) {
    fontIncBtn.addEventListener('click', () => {
      applyFontScale(fontScale + 0.05);
      showToast(`Text size: ${Math.round(fontScale * 100)}%`);
    });
  }
  if (fontDecBtn) {
    fontDecBtn.addEventListener('click', () => {
      applyFontScale(fontScale - 0.05);
      showToast(`Text size: ${Math.round(fontScale * 100)}%`);
    });
  }

  // 7. Newsletter / Daily Briefing Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      const email = emailInput ? emailInput.value.trim() : '';
      if (email) {
        showToast('🎉 You are subscribed to The Morning Global Briefing!');
        if (emailInput) emailInput.value = '';
      }
    });
  }

  // 8. Enhanced Share/Bookmark Toast Hook
  document.addEventListener('click', (e) => {
    if (e.target.closest('.share-btn')) {
      showToast('🔗 Canonical article link copied to clipboard!');
    }
  });

  // 3. Asynchronous Live Feed Sync from Backend Proxy
  syncFromBackend();
})();


  // Header Search Input & Ctrl + K Shortcut Integration
  const headerSearchInput = document.getElementById('header-search-input');
  if (headerSearchInput) {
    headerSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      const mainSearch = document.getElementById('search-input');
      if (mainSearch) {
        mainSearch.value = q;
        mainSearch.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });

    headerSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const feedSec = document.getElementById('feed');
        if (feedSec) feedSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Global Ctrl + K / Cmd + K handler
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const hInput = document.getElementById('header-search-input') || document.getElementById('search-input');
      if (hInput) {
        hInput.focus();
        hInput.select();
      }
    }
  });

  // Dynamic Date in Top Utility Bar
  const dateEl = document.getElementById('utility-date-text');
  if (dateEl) {
    try {
      const now = new Date();
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('en-GB', options);
    } catch(err) {}
  }

  // 3D Perspective Card Tilt Animation (Matching Showcase Reference Image 3)
  let activeTiltCard = null;
  document.addEventListener('mousemove', (e) => {
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    const card = e.target.closest('.news-card, .broadcast-tv-card, .source-item');
    if (!card) {
      if (activeTiltCard) {
        activeTiltCard.style.transform = '';
        activeTiltCard = null;
      }
      return;
    }
    if (activeTiltCard && activeTiltCard !== card) {
      activeTiltCard.style.transform = '';
    }
    activeTiltCard = card;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const tiltX = -((y - cy) / cy * 7).toFixed(2);
    const tiltY = ((x - cx) / cx * 7).toFixed(2);
    card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px) scale3d(1.018, 1.018, 1.018)`;
  });

  document.addEventListener('mouseleave', () => {
    if (activeTiltCard) {
      activeTiltCard.style.transform = '';
      activeTiltCard = null;
    }
  });


  // ============================================================================
  // Creative 2-Minute Executive Digest Pop-Up Engine
  // "Don't have time to read the news? 60-Sec Summary / 2-Min Video Dispatch"
  // ============================================================================
  const digestModal = document.getElementById('express-digest-modal');
  const digestCloseBtn = document.getElementById('digest-modal-close');
  const digestPillTrigger = document.getElementById('open-express-digest-btn');
  const digestHeaderTrigger = document.getElementById('header-digest-trigger-btn');
  const digestExploreBtn = document.getElementById('digest-explore-wire-btn');
  const digestVideoIframe = document.getElementById('digest-video-iframe');

  let isAudioPlaying = false;
  let speechSynthUtterance = null;
  let currentSummaryTextForAudio = '';

  // De-duplicate primary Hero card from Latest Feed Grid
  if (typeof renderArticles === 'function') {
    const originalRenderArticles = renderArticles;
    renderArticles = function(items) {
      if (items && items.length > 1 && currentSource === 'all' && currentCategory === 'All' && !searchQuery) {
        const heroArt = articles && articles.length > 0 ? articles[0] : null;
        const dedupedItems = heroArt ? items.filter(a => a.id !== heroArt.id) : items;
        originalRenderArticles(dedupedItems);
      } else {
        originalRenderArticles(items);
      }
    };
  }

  function updateExecutiveDigestContent() {
    const bulletsContainer = document.getElementById('digest-summary-bullets');
    if (!bulletsContainer || !articles || articles.length === 0) return;

    // Pick 4 diverse, distinct stories covering different categories
    const categoriesWanted = ['world', 'business', 'tech', 'religion'];
    const chosen = [];
    const usedIds = new Set();

    // 1. Try finding one from each major thematic category
    for (const cat of categoriesWanted) {
      const match = articles.find(a => !usedIds.has(a.id) && a.category && a.category.toLowerCase().includes(cat));
      if (match) {
        chosen.push(match);
        usedIds.add(match.id);
      }
    }

    // 2. Fill remaining slots up to 4 with distinct articles
    for (const art of articles) {
      if (chosen.length >= 4) break;
      if (!usedIds.has(art.id)) {
        chosen.push(art);
        usedIds.add(art.id);
      }
    }

    // 3. Render 4 executive bullet cards
    bulletsContainer.innerHTML = chosen.map((art, idx) => {
      const cat = (art.category || 'WORLD NEWS').toUpperCase();
      const title = cleanHtmlText(art.title);
      const summary = cleanHtmlText(art.summary);
      const source = cleanHtmlText(art.sourceName);
      return `
        <div class="digest-bullet-card">
          <div class="digest-bullet-header">
            <span class="digest-bullet-tag">⚡ ${cat}</span>
            <span class="digest-bullet-source">${source}</span>
          </div>
          <a href="${art.link}" target="_blank" rel="noopener noreferrer" class="digest-bullet-title">${title}</a>
          <p class="digest-bullet-desc">${summary}</p>
        </div>
      `;
    }).join('');

    // 4. Prepare speech text for Audio Reader
    currentSummaryTextForAudio = chosen.map((art, idx) => {
      return `Headline ${idx + 1}: ${art.title}. ${art.summary}`;
    }).join('. ');
  }

  function toggleAudioDigest() {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech audio reader is not supported in this browser.');
      return;
    }

    const audioIcon = document.getElementById('audio-icon-slot');
    const audioLabel = document.getElementById('audio-label-slot');
    const soundwaves = document.getElementById('audio-soundwaves');
    const statusText = document.getElementById('audio-prompt-text');

    if (window.speechSynthesis.speaking) {
      if (isAudioPlaying) {
        window.speechSynthesis.cancel();
        isAudioPlaying = false;
        if (audioIcon) audioIcon.textContent = '▶';
        if (audioLabel) audioLabel.textContent = 'Play 60-Second Audio Summary';
        if (soundwaves) soundwaves.classList.remove('playing');
        if (statusText) statusText.textContent = 'Audio paused. Click to listen from start.';
        return;
      }
    }

    if (!currentSummaryTextForAudio) {
      updateExecutiveDigestContent();
    }

    const introText = "Welcome to your 60-second executive global news briefing from News Connect. Here are the top verified headlines. ";
    const fullText = introText + currentSummaryTextForAudio + ". You are fully caught up across 9 international networks.";

    speechSynthUtterance = new SpeechSynthesisUtterance(fullText);
    speechSynthUtterance.rate = 1.05;
    speechSynthUtterance.pitch = 1.0;

    // Pick English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang && v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Online')));
    if (englishVoice) speechSynthUtterance.voice = englishVoice;

    speechSynthUtterance.onstart = () => {
      isAudioPlaying = true;
      if (audioIcon) audioIcon.textContent = '⏸';
      if (audioLabel) audioLabel.textContent = 'Pause Audio Dispatch';
      if (soundwaves) soundwaves.classList.add('playing');
      if (statusText) statusText.textContent = '🎙️ Reading live executive briefing...';
    };

    speechSynthUtterance.onend = () => {
      isAudioPlaying = false;
      if (audioIcon) audioIcon.textContent = '▶';
      if (audioLabel) audioLabel.textContent = 'Replay 60-Second Audio Summary';
      if (soundwaves) soundwaves.classList.remove('playing');
      if (statusText) statusText.textContent = '✓ You are fully caught up on the global news!';
    };

    speechSynthUtterance.onerror = () => {
      isAudioPlaying = false;
      if (audioIcon) audioIcon.textContent = '▶';
      if (soundwaves) soundwaves.classList.remove('playing');
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speechSynthUtterance);
  }

  function openDigestModal(defaultTab = 'summary') {
    if (!digestModal) return;
    updateExecutiveDigestContent();
    switchDigestTab(defaultTab);
    digestModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeDigestModal() {
    if (!digestModal) return;
    digestModal.style.display = 'none';
    document.body.style.overflow = '';
    if (window.speechSynthesis && isAudioPlaying) {
      window.speechSynthesis.cancel();
      isAudioPlaying = false;
      const soundwaves = document.getElementById('audio-soundwaves');
      if (soundwaves) soundwaves.classList.remove('playing');
    }
    if (digestVideoIframe) {
      digestVideoIframe.src = '';
    }
  }

  function switchDigestTab(tabName) {
    const tabs = ['summary', 'video', 'audio'];
    tabs.forEach(t => {
      const btn = document.getElementById(`tab-btn-${t}`);
      const pane = document.getElementById(`pane-${t}`);
      if (btn) btn.classList.toggle('active', t === tabName);
      if (pane) {
        pane.style.display = t === tabName ? 'block' : 'none';
        pane.classList.toggle('active', t === tabName);
      }
    });

    if (tabName === 'video' && digestVideoIframe && !digestVideoIframe.src) {
      digestVideoIframe.src = 'https://www.loveworldsat.org/live-tv';
    }
  }

  if (digestPillTrigger) digestPillTrigger.addEventListener('click', () => openDigestModal('summary'));
  if (digestHeaderTrigger) digestHeaderTrigger.addEventListener('click', () => openDigestModal('summary'));
  if (digestCloseBtn) digestCloseBtn.addEventListener('click', closeDigestModal);
  if (digestModal) {
    digestModal.addEventListener('click', (e) => {
      if (e.target === digestModal) closeDigestModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && digestModal && digestModal.style.display === 'flex') {
      closeDigestModal();
    }
  });

  const tabBtnSummary = document.getElementById('tab-btn-summary');
  const tabBtnVideo = document.getElementById('tab-btn-video');
  const tabBtnAudio = document.getElementById('tab-btn-audio');
  if (tabBtnSummary) tabBtnSummary.addEventListener('click', () => switchDigestTab('summary'));
  if (tabBtnVideo) tabBtnVideo.addEventListener('click', () => switchDigestTab('video'));
  if (tabBtnAudio) tabBtnAudio.addEventListener('click', () => switchDigestTab('audio'));

  const btnAudioSpeak = document.getElementById('btn-audio-speak');
  if (btnAudioSpeak) btnAudioSpeak.addEventListener('click', toggleAudioDigest);

  if (digestExploreBtn) {
    digestExploreBtn.addEventListener('click', () => {
      closeDigestModal();
      const feedSec = document.getElementById('feed');
      if (feedSec) feedSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Pre-load speech voices
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }

  // Auto-populate on startup
  setTimeout(updateExecutiveDigestContent, 600);
