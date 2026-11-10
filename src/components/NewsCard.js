// ============================================================================
// NEWS CONNECT: NewsCard Component (React Native)
// Responsive, clean editorial card for latest news headlines with direct links,
// native mobile sharing, and interactive bookmarking.
// ============================================================================

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet, Share } from 'react-native';
import { RssService } from '../services/rssService.js';
import { NEWS_SOURCES } from '../config/sources.js';

export const NewsCard = ({ theme, article, onFilterBySource }) => {
  const [isSaved, setIsSaved] = useState(false);
  const sourceConfig = NEWS_SOURCES.find(s => s.id === article.sourceId) || {};

  const handleOpenArticle = () => {
    if (article.link) {
      Linking.openURL(article.link).catch(err => console.error('Failed to open article:', err));
    }
  };

  const handleShareArticle = async () => {
    try {
      await Share.share({
        title: article.title,
        message: `${article.title} - ${article.sourceName}\nRead on News Connect: ${article.link}`,
        url: article.link
      });
    } catch (err) {
      console.warn('Share error:', err);
    }
  };

  const handleToggleSave = () => {
    setIsSaved(prev => !prev);
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      {/* Card Header: Source & Timestamp */}
      <View style={styles.cardHeader}>
        <TouchableOpacity
          style={styles.sourceInfo}
          onPress={() => onFilterBySource && onFilterBySource(article.sourceId)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.brandBadge,
              { backgroundColor: sourceConfig.brandColor || theme.accentGold }
            ]}
          >
            <Text style={styles.brandBadgeText}>
              {(sourceConfig.shortName || article.sourceName).substring(0, 4)}
            </Text>
          </View>

          <View>
            <Text style={[styles.sourceName, { color: theme.textPrimary }]}>
              {article.sourceName}
            </Text>
            <Text style={[styles.sourceRegion, { color: theme.textSecondary }]}>
              {sourceConfig.flag || '🌐'} {sourceConfig.region || 'Global'}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerRightActions}>
          <TouchableOpacity
            onPress={handleToggleSave}
            style={styles.iconBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel={isSaved ? 'Remove bookmark' : 'Bookmark article'}
          >
            <Text style={[styles.actionIcon, { color: isSaved ? theme.accentGold : theme.textMuted }]}>
              {isSaved ? '★' : '☆'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleShareArticle}
            style={styles.iconBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel="Share article"
          >
            <Text style={[styles.actionIcon, { color: theme.textSecondary }]}>↗</Text>
          </TouchableOpacity>

          <View style={styles.timeBadge}>
            <Text style={[styles.timeText, { color: theme.textMuted }]}>
              {RssService.formatRelativeTime(article.publishedAt)}
            </Text>
          </View>
        </View>
      </View>

      {/* Card Cover Image */}
      {article.imageUrl ? (
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: article.imageUrl }}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{article.category}</Text>
          </View>
        </View>
      ) : null}

      {/* Content Body */}
      <View style={styles.cardBody}>
        <TouchableOpacity onPress={handleOpenArticle} activeOpacity={0.8}>
          <Text style={[styles.headline, { color: theme.textPrimary }]} numberOfLines={3}>
            {article.title}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.summary, { color: theme.textSecondary }]} numberOfLines={3}>
          {article.summary}
        </Text>

        {/* Card Footer Actions */}
        <View style={[styles.cardFooter, { borderTopColor: theme.border }]}>
          <TouchableOpacity
            style={styles.readLink}
            onPress={handleOpenArticle}
            activeOpacity={0.7}
          >
            <Text style={[styles.readLinkText, { color: theme.accentGold }]}>
              Read on {article.sourceName.split(' ')[0]} ↗
            </Text>
          </TouchableOpacity>

          <Text style={[styles.attributionPill, { color: theme.textMuted }]}>
            Official Feed
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12
  },
  sourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1
  },
  brandBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4
  },
  brandBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5
  },
  sourceName: {
    fontSize: 12,
    fontWeight: '800'
  },
  sourceRegion: {
    fontSize: 10,
    marginTop: 1
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  iconBtn: {
    padding: 4
  },
  actionIcon: {
    fontSize: 15,
    fontWeight: '700'
  },
  timeBadge: {
    paddingHorizontal: 4,
    paddingVertical: 2
  },
  timeText: {
    fontSize: 11,
    fontWeight: '500'
  },
  imageWrapper: {
    height: 160,
    width: '100%',
    position: 'relative',
    backgroundColor: '#0F172A'
  },
  cardImage: {
    width: '100%',
    height: '100%'
  },
  categoryBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(11, 19, 37, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700'
  },
  cardBody: {
    padding: 14
  },
  headline: {
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 21,
    marginBottom: 8
  },
  summary: {
    fontSize: 12.5,
    lineHeight: 18,
    marginBottom: 12
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1
  },
  readLink: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  readLinkText: {
    fontSize: 12,
    fontWeight: '800'
  },
  attributionPill: {
    fontSize: 10,
    fontStyle: 'italic'
  }
});

export default NewsCard;
