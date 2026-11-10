// ============================================================================
// NEWS CONNECT: FeaturedNews Hero Component (React Native)
// High-impact hero carousel displaying breaking top stories from connected networks
// ============================================================================

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet, Dimensions } from 'react-native';
import { RssService } from '../services/rssService.js';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const FeaturedNews = ({ theme, featuredArticles = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!featuredArticles || featuredArticles.length === 0) return null;

  const currentArticle = featuredArticles[currentIndex] || featuredArticles[0];

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
      <View style={styles.sectionHeader}>
        <View style={styles.headerTitleRow}>
          <Text style={[styles.headerBadge, { backgroundColor: theme.accentRed }]}>FEATURED</Text>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Global Spotlight</Text>
        </View>

        {/* Carousel Slide Indicators */}
        <View style={styles.dotsRow}>
          {featuredArticles.map((_, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setCurrentIndex(idx)}
              style={[
                styles.dot,
                {
                  backgroundColor: idx === currentIndex ? theme.accentGold : theme.border,
                  width: idx === currentIndex ? 18 : 6
                }
              ]}
            />
          ))}
        </View>
      </View>

      {/* Hero Card */}
      <View style={[styles.heroCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        {/* Cover Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: currentArticle.imageUrl }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          
          <View style={styles.imageOverlay} />

          {/* Source & Category Badge Overlay */}
          <View style={styles.badgeRow}>
            <View style={[styles.sourcePill, { backgroundColor: theme.surface }]}>
              <Text style={[styles.sourcePillText, { color: theme.accentGold }]}>
                {currentArticle.sourceName}
              </Text>
            </View>

            <View style={[styles.categoryPill, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
              <Text style={styles.categoryPillText}>{currentArticle.category}</Text>
            </View>
          </View>
        </View>

        {/* Article Details */}
        <View style={styles.contentContainer}>
          <View style={styles.metaRow}>
            <Text style={[styles.metaTime, { color: theme.textSecondary }]}>
              ⏱ {RssService.formatRelativeTime(currentArticle.publishedAt)}
            </Text>
            <Text style={[styles.metaDot, { color: theme.textMuted }]}>•</Text>
            <Text style={[styles.metaDate, { color: theme.textMuted }]}>
              {new Date(currentArticle.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </View>

          <Text style={[styles.heroHeadline, { color: theme.textPrimary }]} numberOfLines={3}>
            {currentArticle.title}
          </Text>

          <Text style={[styles.heroSummary, { color: theme.textSecondary }]} numberOfLines={3}>
            {currentArticle.summary}
          </Text>

          {/* Action Row */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.readButton, { backgroundColor: theme.accentGold }]}
              onPress={() => handleOpenArticle(currentArticle.link)}
              activeOpacity={0.8}
            >
              <Text style={styles.readButtonText}>Read Original Article ↗</Text>
            </TouchableOpacity>

            <View style={styles.arrowControls}>
              <TouchableOpacity
                style={[styles.arrowButton, { backgroundColor: theme.surfaceHighlight, borderColor: theme.border }]}
                onPress={handlePrev}
              >
                <Text style={[styles.arrowText, { color: theme.textPrimary }]}>‹</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.arrowButton, { backgroundColor: theme.surfaceHighlight, borderColor: theme.border }]}
                onPress={handleNext}
              >
                <Text style={[styles.arrowText, { color: theme.textPrimary }]}>›</Text>
              </TouchableOpacity>
            </View>
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
    marginBottom: 10
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  headerBadge: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    letterSpacing: 0.5
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  dot: {
    height: 6,
    borderRadius: 3
  },
  heroCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  imageContainer: {
    height: 200,
    width: '100%',
    position: 'relative'
  },
  heroImage: {
    width: '100%',
    height: '100%'
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 19, 37, 0.25)'
  },
  badgeRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sourcePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  sourcePillText: {
    fontSize: 11,
    fontWeight: '800'
  },
  categoryPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  categoryPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700'
  },
  contentContainer: {
    padding: 16
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  metaTime: {
    fontSize: 12,
    fontWeight: '600'
  },
  metaDot: {
    marginHorizontal: 6
  },
  metaDate: {
    fontSize: 11
  },
  heroHeadline: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 8
  },
  heroSummary: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  readButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2
  },
  readButtonText: {
    color: '#0B1325',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.2
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
  }
});

export default FeaturedNews;

