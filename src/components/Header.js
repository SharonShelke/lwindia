// ============================================================================
// NEWS CONNECT: Header Component (React Native)
// Displays branding, tagline, live connection status, theme switcher & nav
// ============================================================================

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const Header = ({ theme, isDark, onToggleTheme, activeTab, onSelectTab, lastUpdated }) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
      {/* Brand & Ticker Row */}
      <View style={styles.topRow}>
        <View style={styles.brandContainer}>
          <View style={[styles.logoIcon, { backgroundColor: theme.accentGold }]}>
            <Text style={styles.logoIconText}>✦</Text>
          </View>
          <View>
            <View style={styles.titleRow}>
              <Text style={[styles.brandTitle, { color: theme.textPrimary }]}>NEWS</Text>
              <Text style={[styles.brandTitleHighlight, { color: theme.accentGold }]}> CONNECT</Text>
            </View>
            <Text style={[styles.tagline, { color: theme.textSecondary }]}>
              One World. Every Perspective.
            </Text>
          </View>
        </View>

        {/* Theme & Status Actions */}
        <View style={styles.actionRow}>
          <View style={[styles.statusBadge, { backgroundColor: theme.statusLiveBg, borderColor: theme.statusLive }]}>
            <View style={[styles.statusDot, { backgroundColor: theme.statusLive }]} />
            <Text style={[styles.statusText, { color: theme.statusLive }]}>5 Live Feeds</Text>
          </View>

          <TouchableOpacity
            style={[styles.themeButton, { backgroundColor: theme.surfaceHighlight, borderColor: theme.border }]}
            onPress={onToggleTheme}
            accessibilityLabel="Toggle Dark/Light Mode"
          >
            <Text style={styles.themeButtonText}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Pills Bar */}
      <View style={[styles.navBar, { borderTopColor: theme.border }]}>
        <TouchableOpacity
          style={[
            styles.navItem,
            activeTab === 'news' && [styles.navItemActive, { borderBottomColor: theme.accentGold }]
          ]}
          onPress={() => onSelectTab('news')}
        >
          <Text
            style={[
              styles.navText,
              { color: activeTab === 'news' ? theme.accentGold : theme.textSecondary }
            ]}
          >
            Latest Headlines
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navItem,
            activeTab === 'sources' && [styles.navItemActive, { borderBottomColor: theme.accentGold }]
          ]}
          onPress={() => onSelectTab('sources')}
        >
          <Text
            style={[
              styles.navText,
              { color: activeTab === 'sources' ? theme.accentGold : theme.textSecondary }
            ]}
          >
            9 News Networks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navItem,
            activeTab === 'broadcasts' && [styles.navItemActive, { borderBottomColor: theme.accentGold }]
          ]}
          onPress={() => onSelectTab('broadcasts')}
        >
          <Text
            style={[
              styles.navText,
              { color: activeTab === 'broadcasts' ? theme.accentGold : theme.textSecondary }
            ]}
          >
            Live Broadcasts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navItem,
            activeTab === 'about' && [styles.navItemActive, { borderBottomColor: theme.accentGold }]
          ]}
          onPress={() => onSelectTab('about')}
        >
          <Text
            style={[
              styles.navText,
              { color: activeTab === 'about' ? theme.accentGold : theme.textSecondary }
            ]}
          >
            About & Attribution
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  logoIconText: {
    color: '#0B1325',
    fontSize: 20,
    fontWeight: '900'
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1
  },
  brandTitleHighlight: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1
  },
  tagline: {
    fontSize: 11,
    letterSpacing: 0.4,
    marginTop: 1
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700'
  },
  themeButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  themeButtonText: {
    fontSize: 16
  },
  navBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingHorizontal: 12
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  navItemActive: {
    borderBottomWidth: 2
  },
  navText: {
    fontSize: 13,
    fontWeight: '700'
  }
});

export default Header;

