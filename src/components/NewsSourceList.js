// ============================================================================
// NEWS CONNECT: NewsSourceList Component (React Native)
// Displays all 8 verified international news organisations with status & filters
// ============================================================================

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { NEWS_SOURCES } from '../config/sources.js';

export const NewsSourceList = ({ theme, selectedSource, onSelectSource }) => {
  const handleOpenWebsite = (url) => {
    if (url) {
      Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
    }
  };

  const getStatusColor = (feedStatus) => {
    if (feedStatus === 'available') return theme.statusLive;
    if (feedStatus === 'broadcast_only') return theme.statusBroadcast;
    return theme.statusPortal;
  };

  const getStatusBg = (feedStatus) => {
    if (feedStatus === 'available') return theme.statusLiveBg;
    if (feedStatus === 'broadcast_only') return theme.statusBroadcastBg;
    return theme.statusPortalBg;
  };

  const getStatusLabel = (feedStatus) => {
    if (feedStatus === 'available') return 'LIVE RSS';
    if (feedStatus === 'broadcast_only') return 'LIVE TV';
    return 'PORTAL';
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.headerLeft}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            Connected Organisations
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
            8 verified international networks across USA, Europe, Africa, India & Australia
          </Text>
        </View>

        {selectedSource !== 'all' && (
          <TouchableOpacity
            style={[styles.resetButton, { backgroundColor: theme.surfaceHighlight, borderColor: theme.border }]}
            onPress={() => onSelectSource('all')}
          >
            <Text style={[styles.resetButtonText, { color: theme.accentGold }]}>Show All Sources</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* All Sources Pill */}
        <TouchableOpacity
          style={[
            styles.sourceCard,
            { backgroundColor: theme.surface, borderColor: selectedSource === 'all' ? theme.accentGold : theme.border },
            selectedSource === 'all' && [styles.sourceCardActive, { backgroundColor: theme.surfaceHighlight }]
          ]}
          onPress={() => onSelectSource('all')}
        >
          <View style={[styles.allIcon, { backgroundColor: theme.accentGold }]}>
            <Text style={styles.allIconText}>✦</Text>
          </View>
          <View>
            <Text style={[styles.sourceName, { color: theme.textPrimary }]}>All Sources</Text>
            <Text style={[styles.sourceRegion, { color: theme.textSecondary }]}>8 Networks</Text>
          </View>
        </TouchableOpacity>

        {/* 8 Specific News Organisations */}
        {NEWS_SOURCES.map((source) => {
          const isSelected = selectedSource === source.id;
          const statusColor = getStatusColor(source.feedStatus);
          const statusBg = getStatusBg(source.feedStatus);
          const statusLabel = getStatusLabel(source.feedStatus);

          return (
            <TouchableOpacity
              key={source.id}
              style={[
                styles.sourceCard,
                { backgroundColor: theme.surface, borderColor: isSelected ? theme.accentGold : theme.border },
                isSelected && [styles.sourceCardActive, { backgroundColor: theme.surfaceHighlight }]
              ]}
              onPress={() => onSelectSource(source.id)}
            >
              <View style={styles.cardTop}>
                {/* Brand Badge */}
                <View style={[styles.brandBadge, { backgroundColor: source.brandColor }]}>
                  <Text style={styles.brandBadgeText}>{source.shortName.substring(0, 4)}</Text>
                </View>

                {/* Connection Status Pill */}
                <View style={[styles.statusPill, { backgroundColor: statusBg, borderColor: statusColor }]}>
                  <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                  <Text style={[styles.statusLabel, { color: statusColor }]}>{statusLabel}</Text>
                </View>
              </View>

              <Text style={[styles.sourceName, { color: theme.textPrimary }]} numberOfLines={1}>
                {source.name}
              </Text>

              <View style={styles.cardBottom}>
                <Text style={[styles.sourceRegion, { color: theme.textSecondary }]}>
                  {source.flag} {source.region}
                </Text>

                <TouchableOpacity
                  onPress={() => handleOpenWebsite(source.website)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={[styles.linkIcon, { color: theme.accentGold }]}>↗</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10
  },
  headerLeft: {
    flex: 1
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3
  },
  sectionSubtitle: {
    fontSize: 11,
    marginTop: 2
  },
  resetButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 10
  },
  resetButtonText: {
    fontSize: 11,
    fontWeight: '700'
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 6,
    gap: 10
  },
  sourceCard: {
    width: 170,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  sourceCardActive: {
    borderWidth: 2
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  brandBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4
  },
  brandBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5
  },
  allIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  allIconText: {
    color: '#0B1325',
    fontSize: 16,
    fontWeight: '900'
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 4
  },
  statusLabel: {
    fontSize: 9,
    fontWeight: '800'
  },
  sourceName: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4
  },
  sourceRegion: {
    fontSize: 11,
    fontWeight: '500'
  },
  linkIcon: {
    fontSize: 14,
    fontWeight: '700'
  }
});

export default NewsSourceList;

