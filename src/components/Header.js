// ============================================================================
// NEWS CONNECT: Header Component (React Native)
// Matches design in media_1795171631435_a5d3023c.png
// ============================================================================

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native';

export const Header = ({ theme, isDark, onToggleTheme, activeTab, onSelectTab, lastUpdated }) => {
  return (
    <View style={[styles.container, { backgroundColor: '#080E1C', borderBottomColor: 'rgba(255,255,255,0.08)' }]}>
      {/* 1. Top Utility Line: Date, Location, Live Status, lwindia.org */}
      <View style={styles.topUtilityBar}>
        <View style={styles.utilityLeft}>
          <Text style={styles.utilityDateText}>Friday, 20 November 2026</Text>
          <Text style={styles.utilityLocation}>Pune · IN</Text>
        </View>
        <View style={styles.utilityRight}>
          <Text style={styles.utilityDot}>●</Text>
          <Text style={styles.utilityStatus}>5 feeds live · 4 broadcasts connected</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://lwindia.org/')}>
            <Text style={styles.utilityLwLink}>lwindia.org ↗</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Main Header Row: Brand, Search Bar with Ctrl K, Actions */}
      <View style={styles.mainHeaderRow}>
        <View style={styles.brandContainer}>
          <View style={styles.logoIconGold}>
            <Text style={styles.logoIconText}>✦</Text>
          </View>
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.brandTitleNews}>News </Text>
              <Text style={styles.brandTitleConnect}>Connect</Text>
            </View>
            <Text style={styles.taglineSpaced}>ONE WORLD · EVERY PERSPECTIVE</Text>
          </View>
        </View>

        {/* Search input mock with Ctrl K */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search stories, sources, broadcasts..."
            placeholderTextColor="#64748B"
            editable={true}
          />
          <View style={styles.ctrlKBadge}>
            <Text style={styles.ctrlKText}>Ctrl K</Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>↻</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={onToggleTheme}>
            <Text style={styles.actionBtnText}>{isDark ? '☼' : '🌙'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. Navigation Bar Row */}
      <View style={styles.navBar}>
        <View style={styles.navLinksCluster}>
          <TouchableOpacity
            style={[styles.navItem, activeTab === 'all' && styles.navItemActive]}
            onPress={() => onSelectTab && onSelectTab('all')}
          >
            <Text style={[styles.navText, activeTab === 'all' && styles.navTextActive]}>Featured</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, activeTab === 'sources' && styles.navItemActive]}
            onPress={() => onSelectTab && onSelectTab('sources')}
          >
            <Text style={[styles.navText, activeTab === 'sources' && styles.navTextActive]}>9 News Networks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, activeTab === 'business' && styles.navItemActive]}
            onPress={() => onSelectTab && onSelectTab('business')}
          >
            <Text style={[styles.navText, activeTab === 'business' && styles.navTextActive]}>Business & Markets</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, activeTab === 'news' && styles.navItemActive]}
            onPress={() => onSelectTab && onSelectTab('news')}
          >
            <Text style={[styles.navText, activeTab === 'news' && styles.navTextActive]}>Latest Feed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, activeTab === 'broadcasts' && styles.navItemActive]}
            onPress={() => onSelectTab && onSelectTab('broadcasts')}
          >
            <Text style={[styles.navText, activeTab === 'broadcasts' && styles.navTextActive]}>Live Broadcasts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, activeTab === 'saved' && styles.navItemActive]}
            onPress={() => onSelectTab && onSelectTab('saved')}
          >
            <Text style={[styles.navText, activeTab === 'saved' && styles.navTextActive]}>Bookmarks</Text>
            <View style={styles.bookmarkBadge}>
              <Text style={styles.bookmarkBadgeText}>0</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, activeTab === 'about' && styles.navItemActive]}
            onPress={() => onSelectTab && onSelectTab('about')}
          >
            <Text style={[styles.navText, activeTab === 'about' && styles.navTextActive]}>Charter & Legal</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.lwindiaBtn}
          onPress={() => Linking.openURL('https://lwindia.org/')}
        >
          <Text style={styles.lwindiaBtnText}>lwindia.org ↗</Text>
        </TouchableOpacity>
      </View>

      {/* 4. Breaking News Bar */}
      <View style={styles.breakingBar}>
        <View style={styles.breakingBadge}>
          <Text style={styles.breakingDot}>●</Text>
          <Text style={styles.breakingText}>BREAKING</Text>
        </View>
        <Text style={styles.tickerText} numberOfLines={1}>
          ✦  LoveWorld Sat: 24/7 satellite broadcast special live from Johannesburg   ✦   Global leaders gather for climate framework talks   ✦   Markets open higher
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1
  },
  topUtilityBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: '#060B14',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)'
  },
  utilityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  utilityDateText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '500'
  },
  utilityLocation: {
    color: '#64748B',
    fontSize: 12
  },
  utilityRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  utilityDot: {
    color: '#10B981',
    fontSize: 9
  },
  utilityStatus: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600'
  },
  utilityLwLink: {
    color: '#F5B041',
    fontSize: 12,
    fontWeight: '600'
  },
  mainHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  logoIconGold: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F5B041',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoIconText: {
    color: '#0B1325',
    fontSize: 22,
    fontWeight: '900'
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  brandTitleNews: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'serif'
  },
  brandTitleConnect: {
    color: '#F5B041',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'serif'
  },
  taglineSpaced: {
    color: '#64748B',
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 2
  },
  searchBar: {
    flex: 1,
    maxWidth: 440,
    marginHorizontal: 16,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10
  },
  searchIcon: {
    fontSize: 14,
    color: '#64748B'
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13
  },
  ctrlKBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5
  },
  ctrlKText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600'
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  actionBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionBtnText: {
    color: '#CBD5E1',
    fontSize: 16
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8
  },
  navLinksCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24
  },
  navItem: {
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  navItemActive: {
    borderBottomColor: '#F5B041'
  },
  navText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600'
  },
  navTextActive: {
    color: '#FFFFFF',
    fontWeight: '700'
  },
  bookmarkBadge: {
    backgroundColor: '#F5B041',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1
  },
  bookmarkBadgeText: {
    color: '#0B1325',
    fontSize: 11,
    fontWeight: '800'
  },
  lwindiaBtn: {
    backgroundColor: '#F5B041',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    marginBottom: 6
  },
  lwindiaBtnText: {
    color: '#0B1325',
    fontWeight: '800',
    fontSize: 13
  },
  breakingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#050A14',
    height: 38,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)'
  },
  breakingBadge: {
    backgroundColor: '#EF4444',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 6
  },
  breakingDot: {
    color: '#FFFFFF',
    fontSize: 8
  },
  breakingText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 1.2
  },
  tickerText: {
    color: '#E2E8F0',
    fontSize: 13,
    marginLeft: 14,
    flex: 1
  }
});

export default Header;
