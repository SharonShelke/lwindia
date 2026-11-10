// ============================================================================
// NEWS CONNECT: Single-Page International News Aggregator (React Native)
// Optimized for both Web (Desktop/Tablet) and Mobile (iOS/Android/Mobile Web)
// ============================================================================

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  Platform
} from 'react-native';

import { THEME } from './src/theme/colors.js';
import { NEWS_SOURCES, CATEGORIES } from './src/config/sources.js';
import { rssService } from './src/services/rssService.js';

import Header from './src/components/Header.js';
import SearchBar from './src/components/SearchBar.js';
import NewsSourceList from './src/components/NewsSourceList.js';
import CategoryFilter from './src/components/CategoryFilter.js';
import FeaturedNews from './src/components/FeaturedNews.js';
import NewsCard from './src/components/NewsCard.js';
import BroadcastSpotlight from './src/components/BroadcastSpotlight.js';
import Footer from './src/components/Footer.js';
import AttributionModal from './src/components/AttributionModal.js';

export default function App() {
  // Window dimensions for responsive Web & Mobile layout
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isLargeDesktop = width >= 1100;

  // Theme State: Default to premium dark navy editorial palette
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? THEME.dark : THEME.light;

  // Data & Filter State
  const [articles, setArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI & Sync State
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('news');
  const [modalVisible, setModalVisible] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLiveServer, setIsLiveServer] = useState(false);

  // Load News from Aggregator Service
  const loadNews = useCallback(async (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const res = await rssService.fetchNews({
        source: selectedSource,
        category: selectedCategory,
        query: searchQuery
      });

      setArticles(res.articles || []);
      setLastUpdated(res.lastUpdated);
      setIsLiveServer(res.isLiveServer);

      // Featured items across diverse sources
      const featured = await rssService.fetchFeatured();
      setFeaturedArticles(featured);
    } catch (err) {
      console.error('Failed to load feeds:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [selectedSource, selectedCategory, searchQuery]);

  // Initial load & when filters change
  useEffect(() => {
    loadNews();
  }, [loadNews]);

  // Compute live counts per category for the current source
  const categoryCounts = useMemo(() => {
    const counts = { All: articles.length };
    articles.forEach(art => {
      if (art.category) {
        counts[art.category] = (counts[art.category] || 0) + 1;
      }
    });
    return counts;
  }, [articles]);

  const handleToggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleClearFilters = () => {
    setSelectedSource('all');
    setSelectedCategory('All');
    setSearchQuery('');
  };

  // Card grid column width calculation for Web
  const cardWidth = useMemo(() => {
    if (isMobile) return '100%';
    if (isLargeDesktop) return '31.8%';
    return '48.5%';
  }, [isMobile, isLargeDesktop]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.surface}
      />

      {/* Main Responsive Wrapper (Max 1240px centered on Desktop Web) */}
      <View style={[styles.outerContainer, !isMobile && styles.desktopContainer]}>
        {/* Sticky Header */}
        <Header
          theme={theme}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          lastUpdated={lastUpdated}
        />

        <ScrollView
          style={[styles.container, { backgroundColor: theme.background }]}
          contentContainerStyle={[
            styles.scrollContent,
            isMobile && styles.mobileScrollContent
          ]}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => loadNews(true)}
              tintColor={theme.accentGold}
              colors={[theme.accentGold, theme.accentRed]}
            />
          }
        >
          {/* Main News Tab */}
          {activeTab === 'news' && (
            <View>
              {/* Featured Breaking News Hero (Only when no search is active) */}
              {!searchQuery && selectedSource === 'all' && selectedCategory === 'All' && (
                <FeaturedNews theme={theme} featuredArticles={featuredArticles} />
              )}

              {/* News Sources Ribbon */}
              <NewsSourceList
                theme={theme}
                selectedSource={selectedSource}
                onSelectSource={setSelectedSource}
              />

              {/* Search Input Bar */}
              <SearchBar
                theme={theme}
                query={searchQuery}
                onChangeQuery={setSearchQuery}
                onClear={() => setSearchQuery('')}
                totalResults={articles.length}
              />

              {/* Category Filter Pills */}
              <CategoryFilter
                theme={theme}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categoryCounts={categoryCounts}
              />

              {/* Filter Status Badge Bar */}
              {(selectedSource !== 'all' || selectedCategory !== 'All' || searchQuery.length > 0) && (
                <View style={[styles.filterStatusRow, { backgroundColor: theme.surfaceHighlight, borderColor: theme.border }]}>
                  <Text style={[styles.filterStatusText, { color: theme.textSecondary }]}>
                    Filtered by:{' '}
                    {selectedSource !== 'all' && <Text style={{ color: theme.accentGold, fontWeight: '700' }}>[{selectedSource.toUpperCase()}] </Text>}
                    {selectedCategory !== 'All' && <Text style={{ color: theme.accentGold, fontWeight: '700' }}>[{selectedCategory}] </Text>}
                    {searchQuery ? `"${searchQuery}"` : ''}
                  </Text>
                  <TouchableOpacity onPress={handleClearFilters}>
                    <Text style={[styles.clearLink, { color: theme.accentRed }]}>Reset All ✕</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* News Articles Grid: Responsive 1-col on Mobile, 2 or 3 cols on Web */}
              <View style={styles.feedContainer}>
                <View style={styles.feedHeaderRow}>
                  <Text style={[styles.feedHeading, { color: theme.textPrimary }]}>
                    {selectedSource !== 'all'
                      ? `${NEWS_SOURCES.find(s => s.id === selectedSource)?.name || selectedSource} Headlines`
                      : selectedCategory !== 'All'
                      ? `${selectedCategory} News`
                      : 'Latest International Headlines'}
                  </Text>
                  <Text style={[styles.feedCount, { color: theme.textMuted }]}>
                    {articles.length} {articles.length === 1 ? 'story' : 'stories'}
                  </Text>
                </View>

                {isLoading && !isRefreshing ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.accentGold} />
                    <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
                      Aggregating international feeds...
                    </Text>
                  </View>
                ) : articles.length === 0 ? (
                  <View style={[styles.emptyContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <Text style={styles.emptyIcon}>🔍</Text>
                    <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
                      No articles matched your filter
                    </Text>
                    <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
                      Try searching for different keywords or reset your source/category selection.
                    </Text>
                    <TouchableOpacity
                      style={[styles.emptyButton, { backgroundColor: theme.accentGold }]}
                      onPress={handleClearFilters}
                    >
                      <Text style={styles.emptyButtonText}>Reset All Filters</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={[styles.cardsGridWrapper, !isMobile && styles.cardsGridWeb]}>
                    {articles.map(article => (
                      <View key={article.id} style={{ width: cardWidth }}>
                        <NewsCard
                          theme={theme}
                          article={article}
                          onFilterBySource={setSelectedSource}
                        />
                      </View>
                    ))}
                  </View>
                )}
              </View>

              {/* Broadcast Television & Portals Spotlight */}
              <BroadcastSpotlight theme={theme} />
            </View>
          )}

          {/* 8 Networks Tab */}
          {activeTab === 'sources' && (
            <View style={styles.tabSection}>
              <NewsSourceList
                theme={theme}
                selectedSource={selectedSource}
                onSelectSource={setSelectedSource}
              />
              <View style={[styles.sourceGridContainer, !isMobile && styles.cardsGridWeb]}>
                {NEWS_SOURCES.map(source => (
                  <View
                    key={source.id}
                    style={[
                      styles.sourceDetailCard,
                      { backgroundColor: theme.surface, borderColor: theme.border, width: isMobile ? '100%' : '48.5%' }
                    ]}
                  >
                    <View style={styles.sourceDetailHeader}>
                      <View style={[styles.brandBadge, { backgroundColor: source.brandColor }]}>
                        <Text style={styles.brandBadgeText}>{source.shortName}</Text>
                      </View>
                      <Text style={[styles.statusBadgeText, { color: source.hasRss ? theme.statusLive : theme.statusBroadcast }]}>
                        ● {source.integrationMethod}
                      </Text>
                    </View>
                    <Text style={[styles.sourceDetailTitle, { color: theme.textPrimary }]}>
                      {source.flag} {source.name}
                    </Text>
                    <Text style={[styles.sourceDetailRegion, { color: theme.accentGold }]}>
                      Region: {source.region}
                    </Text>
                    <Text style={[styles.sourceDetailDesc, { color: theme.textSecondary }]}>
                      {source.description}
                    </Text>
                    <View style={styles.categoriesPillRow}>
                      {source.categories.map((c, i) => (
                        <View key={i} style={[styles.microPill, { backgroundColor: theme.surfaceHighlight }]}>
                          <Text style={[styles.microPillText, { color: theme.textSecondary }]}>{c}</Text>
                        </View>
                      ))}
                    </View>
                    <TouchableOpacity
                      style={[styles.sourceActionButton, { backgroundColor: theme.surfaceHighlight, borderColor: theme.border }]}
                      onPress={() => {
                        setSelectedSource(source.id);
                        setActiveTab('news');
                      }}
                    >
                      <Text style={[styles.sourceActionText, { color: theme.accentGold }]}>
                        View {source.shortName} Headlines →
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Live Broadcasts Tab */}
          {activeTab === 'broadcasts' && (
            <View style={styles.tabSection}>
              <BroadcastSpotlight theme={theme} />
            </View>
          )}

          {/* About & Attribution Tab */}
          {activeTab === 'about' && (
            <View style={[styles.tabSection, styles.aboutContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Text style={[styles.aboutTitle, { color: theme.textPrimary }]}>About News Connect</Text>
              <Text style={[styles.aboutTagline, { color: theme.accentGold }]}>
                One World. Every Perspective.
              </Text>
              <Text style={[styles.aboutParagraph, { color: theme.textSecondary }]}>
                News Connect is a modern, single-page international news discovery dashboard built with React Native. It aggregates headlines, broadcasts, and syndication feeds from eight respected global news organisations: Newsmax, Fox News, LoveWorld LN24 International, LN247, LoveWorld Europe, LoveWorld Sat, Sky News Australia, and Asian News International (ANI).
              </Text>
              <Text style={[styles.aboutHeading, { color: theme.textPrimary }]}>
                Syndication & Content Usage Principles
              </Text>
              <Text style={[styles.aboutParagraph, { color: theme.textSecondary }]}>
                • Discovery Only: News Connect is an indexing platform and not a content publisher. Full intellectual property rights remain with the original networks.
              </Text>
              <Text style={[styles.aboutParagraph, { color: theme.textSecondary }]}>
                • Direct Linking: All article cards direct readers straight to the publisher&apos;s canonical web page without intermediary paywalls or modifications.
              </Text>
              <Text style={[styles.aboutParagraph, { color: theme.textSecondary }]}>
                • Non-Commercial Use: Feeds are consumed under publisher public RSS and syndication terms for personal discovery.
              </Text>
              <TouchableOpacity
                style={[styles.modalTriggerButton, { backgroundColor: theme.accentGold }]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.modalTriggerText}>View Full Legal & Policy Details ↗</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Footer */}
          <Footer
            theme={theme}
            onOpenModal={() => setModalVisible(true)}
            lastUpdated={lastUpdated}
            isLiveServer={isLiveServer}
          />
        </ScrollView>

        {/* Mobile-Native Bottom Navigation Bar (Visible on mobile viewports for quick thumb access) */}
        {isMobile && (
          <View style={[styles.mobileBottomNav, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
            <TouchableOpacity
              style={styles.mobileNavItem}
              onPress={() => setActiveTab('news')}
            >
              <Text style={styles.mobileNavIcon}>📰</Text>
              <Text style={[styles.mobileNavLabel, { color: activeTab === 'news' ? theme.accentGold : theme.textSecondary }]}>
                Headlines
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mobileNavItem}
              onPress={() => setActiveTab('sources')}
            >
              <Text style={styles.mobileNavIcon}>🌐</Text>
              <Text style={[styles.mobileNavLabel, { color: activeTab === 'sources' ? theme.accentGold : theme.textSecondary }]}>
                8 Networks
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mobileNavItem}
              onPress={() => setActiveTab('broadcasts')}
            >
              <Text style={styles.mobileNavIcon}>📺</Text>
              <Text style={[styles.mobileNavLabel, { color: activeTab === 'broadcasts' ? theme.accentGold : theme.textSecondary }]}>
                Live TV
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mobileNavItem}
              onPress={() => setActiveTab('about')}
            >
              <Text style={styles.mobileNavIcon}>ℹ️</Text>
              <Text style={[styles.mobileNavLabel, { color: activeTab === 'about' ? theme.accentGold : theme.textSecondary }]}>
                About
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Full Attribution & Policy Modal */}
      <AttributionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        theme={theme}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  outerContainer: {
    flex: 1,
    width: '100%'
  },
  desktopContainer: {
    maxWidth: 1240,
    alignSelf: 'center',
    width: '100%'
  },
  container: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 20
  },
  mobileScrollContent: {
    paddingBottom: 70
  },
  filterStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1
  },
  filterStatusText: {
    fontSize: 11,
    flex: 1
  },
  clearLink: {
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 8
  },
  feedContainer: {
    marginHorizontal: 16,
    marginVertical: 8
  },
  feedHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12
  },
  feedHeading: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3
  },
  feedCount: {
    fontSize: 12,
    fontWeight: '600'
  },
  cardsGridWrapper: {
    flexDirection: 'column'
  },
  cardsGridWeb: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    gap: 12
  },
  loadingText: {
    fontSize: 13,
    fontWeight: '600'
  },
  emptyContainer: {
    padding: 30,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: 10
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 10
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
    textAlign: 'center'
  },
  emptySubtitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16
  },
  emptyButton: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 8
  },
  emptyButtonText: {
    color: '#0B1325',
    fontSize: 12,
    fontWeight: '800'
  },
  tabSection: {
    paddingHorizontal: 16,
    paddingTop: 10
  },
  sourceGridContainer: {
    gap: 14,
    marginTop: 10
  },
  sourceDetailCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12
  },
  sourceDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  brandBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  brandBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900'
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700'
  },
  sourceDetailTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 2
  },
  sourceDetailRegion: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 8
  },
  sourceDetailDesc: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 10
  },
  categoriesPillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12
  },
  microPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  microPillText: {
    fontSize: 10,
    fontWeight: '600'
  },
  sourceActionButton: {
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center'
  },
  sourceActionText: {
    fontSize: 12,
    fontWeight: '700'
  },
  aboutContainer: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 2
  },
  aboutTagline: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 14
  },
  aboutHeading: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 14,
    marginBottom: 8
  },
  aboutParagraph: {
    fontSize: 12.5,
    lineHeight: 19,
    marginBottom: 8
  },
  modalTriggerButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 14
  },
  modalTriggerText: {
    color: '#0B1325',
    fontSize: 12,
    fontWeight: '800'
  },
  mobileBottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 4
  },
  mobileNavItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mobileNavIcon: {
    fontSize: 18,
    marginBottom: 2
  },
  mobileNavLabel: {
    fontSize: 10,
    fontWeight: '700'
  }
});
