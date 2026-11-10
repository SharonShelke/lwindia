// ============================================================================
// NEWS CONNECT: FeaturedNews Hero Component (React Native / Web)
// Magazine 2-Column Hero layout + Ranked Trending Now Deck
// Matches exact aesthetic design specifications:
// - Blue (#2563EB) Read More button with rounded corners
// - Vivid Blue (#3B82F6) Category Kicker (e.g. USA, WORLD)
// - Neon Orange (#FF5722) Rounded Square Ranked Badges (1, 2, 3, 4, 5)
// ============================================================================

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet, Dimensions, Platform } from 'react-native';
import { RssService } from '../services/rssService.js';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && SCREEN_WIDTH >= 860;

export const FeaturedNews = ({ theme, featuredArticles = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!featuredArticles || featuredArticles.length === 0) return null;

  const currentArticle = featuredArticles[currentIndex] || featuredArticles[0];
  const trendingArticles = featuredArticles.filter((_, idx) => idx !== currentIndex).slice(0, 5);

  const cleanText = (txt) => {
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
  };

  const handleOpenArticle = (url) => {
    if (url) {
      Linking.openURL(url).catch(err => console.error('Error opening article URL:', err));
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredArticles.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.headerTitleRow}>
          <Text style={[styles.headerBadge, { backgroundColor: '#E11D48' }]}>FEATURED</Text>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary || '#F8FAFC' }]}>Global Spotlight</Text>
        </View>

        {/* Carousel Slide Indicators */}
        <View style={styles.dotsRow}>
          {featuredArticles.slice(0, 5).map((_, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setCurrentIndex(idx)}
              style={[
                styles.dot,
                {
                  backgroundColor: idx === currentIndex ? '#F5B041' : 'rgba(255, 255, 255, 0.2)',
                  width: idx === currentIndex ? 18 : 6
                }
              ]}
            />
          ))}
        </View>
      </View>

      {/* 2-Column Responsive Layout: Left Hero Story + Right Trending Now */}
      <View style={[styles.gridContainer, isDesktop && styles.gridRow]}>
        {/* Left Hero Story */}
        <View style={[styles.heroCard, { backgroundColor: theme.surface || '#0E162B', borderColor: theme.border || 'rgba(255, 255, 255, 0.08)' }]}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: currentArticle.imageUrl || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay} />
            
            {/* Top Source Overlay Badge */}
            <View style={styles.badgeRow}>
              <View style={[styles.sourcePill, { backgroundColor: 'rgba(11, 19, 37, 0.85)' }]}>
                <Text style={styles.sourcePillText}>
                  {cleanText(currentArticle.sourceName)}
                </Text>
              </View>
            </View>
          </View>

          {/* Hero Article Details */}
          <View style={styles.contentContainer}>
            {/* Category Kicker - Warm Gold (#F5B041) */}
            <Text style={styles.categoryKicker}>
              {cleanText(currentArticle.category || 'WORLD').toUpperCase()}
            </Text>

            {/* Headline */}
            <Text style={[styles.heroHeadline, { color: theme.textPrimary || '#F8FAFC' }]} numberOfLines={3}>
              {cleanText(currentArticle.title)}
            </Text>

            {/* Summary */}
            <Text style={[styles.heroSummary, { color: theme.textSecondary || '#94A3B8' }]} numberOfLines={3}>
              {cleanText(currentArticle.summary)}
            </Text>

            {/* Action Row: Read More (#F5B041) & Controls */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.readButton}
                onPress={() => handleOpenArticle(currentArticle.link)}
                activeOpacity={0.85}
              >
                <Text style={styles.readButtonText}>Read More</Text>
              </TouchableOpacity>

              <View style={styles.arrowControls}>
                <TouchableOpacity
                  style={[styles.arrowButton, { backgroundColor: theme.surfaceHighlight || '#1E293B', borderColor: theme.border || 'rgba(255, 255, 255, 0.1)' }]}
                  onPress={handlePrev}
                >
                  <Text style={[styles.arrowText, { color: theme.textPrimary || '#FFFFFF' }]}>‹</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.arrowButton, { backgroundColor: theme.surfaceHighlight || '#1E293B', borderColor: theme.border || 'rgba(255, 255, 255, 0.1)' }]}
                  onPress={handleNext}
                >
                  <Text style={[styles.arrowText, { color: theme.textPrimary || '#FFFFFF' }]}>›</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Right Trending Now Deck */}
        <View style={[styles.trendingCard, { backgroundColor: theme.surface || '#0E162B', borderColor: theme.border || 'rgba(255, 255, 255, 0.08)' }]}>
          <Text style={[styles.trendingTitle, { color: theme.textPrimary || '#F8FAFC' }]}>Trending Now</Text>
          <View style={styles.trendingList}>
            {trendingArticles.map((item, idx) => (
              <TouchableOpacity
                key={item.id || idx}
                style={styles.trendingItem}
                onPress={() => handleOpenArticle(item.link)}
                activeOpacity={0.8}
              >
                {/* Orange Rounded Square Badge (#FF5722) */}
                <View style={styles.trendingRankBadge}>
                  <Text style={styles.trendingRankText}>{idx + 1}</Text>
                </View>

                {/* Thumbnail Image */}
                <Image
                  source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=200&q=80' }}
                  style={styles.trendingThumb}
                  resizeMode="cover"
                />

                {/* Trending Story Title */}
                <Text style={[styles.trendingStoryText, { color: theme.textPrimary || '#F8FAFC' }]} numberOfLines={2}>
                  {cleanText(item.title)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  headerBadge: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '900',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    letterSpacing: 0.6
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  dot: {
    height: 6,
    borderRadius: 3
  },
  gridContainer: {
    display: 'flex',
    gap: 16
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  heroCard: {
    flex: 1.6,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3
  },
  imageContainer: {
    height: 230,
    width: '100%',
    position: 'relative'
  },
  heroImage: {
    width: '100%',
    height: '100%'
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 19, 37, 0.2)'
  },
  badgeRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  sourcePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)'
  },
  sourcePillText: {
    color: '#F5B041',
    fontSize: 11,
    fontWeight: '800'
  },
  contentContainer: {
    padding: 20
  },
  categoryKicker: {
    color: '#F5B041',
    fontSize: 12.5,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 8,
    textTransform: 'uppercase'
  },
  heroHeadline: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: 10
  },
  heroSummary: {
    fontSize: 13.5,
    lineHeight: 20,
    marginBottom: 18
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  readButton: {
    backgroundColor: '#F5B041',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#F5B041',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 3
  },
  readButtonText: {
    color: '#0B1325',
    fontSize: 13.5,
    fontWeight: '800'
  },
  arrowControls: {
    flexDirection: 'row',
    gap: 8
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowText: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: -2
  },
  trendingCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  trendingTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 14
  },
  trendingList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    flex: 1,
    justifyContent: 'space-between'
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4
  },
  trendingRankBadge: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: '#F5B041',
    justifyContent: 'center',
    alignItems: 'center'
  },
  trendingRankText: {
    color: '#0B1325',
    fontSize: 12.5,
    fontWeight: '900'
  },
  trendingThumb: {
    width: 48,
    height: 48,
    borderRadius: 8
  },
  trendingStoryText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 17
  }
});

export default FeaturedNews;
