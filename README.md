# NEWS CONNECT — One-Page International News Aggregator

> **Tagline:** *One World. Every Perspective.*  
> **Framework:** React Native (Expo: iOS, Android & Web) + Lightweight Node.js Feed Aggregator  
> **Repository:** `lwindia`

---

## 1. Overview & Purpose

**NEWS CONNECT** is an international news discovery portal and dashboard. It aggregates verified breaking headlines, live video streams, and broadcasts from eight leading international television networks and wire agencies into a unified single-page interface.

The platform provides readers with diverse perspectives across North America, Europe, Africa, Asia, and Oceania while strictly preserving publisher attribution, trademarks, and copyright guidelines.

---

## 2. Connected International News Organisations

| # | Organisation | Region / Base | Official Website | Integration Method | Verified RSS Feed URL |
|---|---|---|---|---|---|
| 1 | **Newsmax** | USA (Global) | [newsmax.com](https://www.newsmax.com) | Official RSS 2.0 | `https://www.newsmax.com/rss/Newsfront/16/` |
| 2 | **Fox News** | USA (Global) | [foxnews.com](https://www.foxnews.com) | Official RSS 2.0 | `https://feeds.foxnews.com/foxnews/latest` |
| 3 | **LoveWorld LN24 International** | Global | [ln24international.com](https://ln24international.com) | Official WordPress RSS | `https://ln24international.com/feed/` |
| 4 | **LN247** | Global | [ln247.news](https://ln247.news) | Official WordPress RSS | `https://ln247.news/feed/` |
| 5 | **LoveWorld Europe** | UK & Europe | [loveworldeurope.org](https://loveworldeurope.org) | Live TV & Multilingual Portal | *Unavailable (No public article RSS)* |
| 6 | **LoveWorld Sat** | South Africa (Pan-Africa) | [loveworldsat.org](https://www.loveworldsat.org) | 24/7 Satellite TV & News Hub | *Unavailable (No public article RSS)* |
| 7 | **Sky News Australia** | Australia | [skynews.com.au](https://www.skynews.com.au) | Official Portal & Digital Video | *Unavailable (No native text RSS)* |
| 8 | **ANI – Asian News International** | India & South Asia | [aninews.in](https://aninews.in) | Official RSS 2.0 | `https://aninews.in/rss/feed/category/national/politics.xml` |

> ℹ️ **Broadcast Source Investigation:** LoveWorld Sat and LoveWorld Europe are 24-hour Christian television networks without public XML article syndication. Rather than fabricating feeds or scraping, News Connect integrates them transparently through official live streams (`/live-tv`), daily news programs (*News On The Hour*, *Good Morning World*, *Global Business Update*), and canonical portals. Sky News Australia is similarly integrated via its official digital video hub and web portal.

---

## 3. Supported News Categories

The application supports 13 categories dynamically mapped from the connected sources:
- **World News**
- **Politics**
- **India**
- **International Affairs**
- **Business**
- **Technology**
- **Entertainment**
- **Health**
- **Religion and Faith**
- **Africa**
- **Europe**
- **Australia**
- **USA**

---

## 4. UI/UX Design System

- **Color Palette:**
  - **Dark Navy (Default):** `#0B1325` (Background), `#111C35` (Surface), `#1E2F54` (Border)
  - **Light Mode:** `#F8FAFC` (Background), `#FFFFFF` (Surface), `#E2E8F0` (Border)
  - **Editorial Gold:** `#D4AF37` (Badges & Primary CTAs)
  - **Breaking Red:** `#E53E3E` (Featured Highlights)
  - **Status Live:** `#10B981` (Feed Connectivity Status)
- **Features:**
  - **Featured Global Spotlight:** Hero carousel with top stories across sources.
  - **News Source Ribbon:** 8 network cards with live status badges and one-tap filtering.
  - **Category Pills:** Real-time badge counts per category.
  - **Live Search Bar:** Real-time headline filtering with instant clear.
  - **Editorial News Cards:** High-res imagery, relative timestamps ("25m ago"), concise summaries, and direct publisher links (`Linking.openURL`).
  - **Broadcast Spotlight:** Dedicated live TV cards for LoveWorld Sat, LoveWorld Europe, and Sky News Australia.
  - **Attribution Modal:** Transparent About, Privacy, and Terms of Use.

---

## 5. Technical Architecture

```
lwindia/
├── App.js                     # Root React Native Dashboard Component
├── app.json                   # Expo Application Configuration
├── package.json               # NPM Scripts & Dependencies
├── server.js                  # Zero-dependency Node.js RSS proxy & caching engine
│
├── src/
│   ├── theme/colors.js        # Color tokens & theme definition (Dark & Light)
│   ├── config/sources.js      # Structured configuration for all 8 news organisations
│   ├── services/rssService.js # Cross-platform RSS client, date formatter & offline fallback
│   └── components/
│       ├── Header.js          # Sticky header with brand, status pill & theme toggle
│       ├── SearchBar.js       # Search input with clear button and story count
│       ├── NewsSourceList.js  # Network filter cards with live status pills
│       ├── CategoryFilter.js  # Horizontal category pills with count badges
│       ├── FeaturedNews.js    # Global Spotlight hero carousel
│       ├── NewsCard.js        # Responsive news card layout with canonical links
│       ├── BroadcastSpotlight.js # Live TV & stream cards for non-RSS networks
│       ├── AttributionModal.js   # About, Terms of Use, and Privacy Policy modal
│       └── Footer.js          # Attribution disclaimer, network directory & sync status
│
├── public/                    # Standalone Web preview served by server.js
│   ├── index.html             # Semantic single-page HTML5 layout
│   ├── styles.css             # Responsive editorial CSS
│   └── app.js                 # Interactive client controller
│
├── assets/                    # Mobile app icons and splash placeholders
└── test/
    ├── test_feed_parser.js    # Unit tests for XML parsing & CDATA handling
    └── test_react_native_components.js # Integration test verifying components & API endpoints
```

---

## 6. How to Run

### Option 1: Instant Start (Zero Dependencies Required)
```bash
# Starts the live feed aggregator and web/mobile dashboard immediately
npm start

# Open http://localhost:3000 in your browser
```
*No `npm install` needed! Uses native Node.js core modules (`http`, `https`, `fs`, `zlib`).*

### Option 2: Run with Expo (React Native for iOS, Android & Web)
```bash
# First install Expo and React Native packages (if not already installed)
npm install

# Start the Expo bundler
npm run expo

# Run specifically on Web
npm run expo:web

# Run on Android emulator / device
npm run expo:android

# Run on iOS simulator / device
npm run expo:ios
```

### Option 3: Run Verification Tests
```bash
npm test
```

---

## 7. Legal, Copyright & Attribution Notice

News Connect is a news aggregator and discovery portal, not a content publisher:
1. **Mandatory Publisher Credit:** Full attribution and original trademarks are preserved for all 8 networks.
2. **Canonical Linking:** Every news card links directly to the publisher's original article without intermediate pages.
3. **No Full Article Scraping:** Only brief excerpts extracted from official RSS `<description>` tags are displayed.
4. **Non-Commercial Personal Discovery:** Complies with public RSS terms of service. Commercial wire syndication requires formal licensing from the respective publishers (ANI, Newsmax Media, Fox News, LoveWorld Television Ministry, Australian News Channel).

