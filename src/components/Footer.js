// ============================================================================
// NEWS CONNECT: Footer Component (React Native)
// Editorial attribution, connected networks links, copyright & sync status
// ============================================================================

import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { NEWS_SOURCES } from '../config/sources';

export const Footer = ({ theme, onOpenModal, lastUpdated, isLiveServer }) => {
  const handleOpenSource = (url) => {
    if (url) Linking.openURL(url);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surfaceSubtle, borderTopColor: theme.border }]}>
      {/* Brand & Mission Statement */}
      <View style={styles.brandSection}>
        <View style={styles.logoRow}>
          <View style={[styles.logoIcon, { backgroundColor: theme.accentGold }]}>
            <Text style={styles.logoIconText}>✦</Text>
          </View>
          <Text style={[styles.brandTitle, { color: theme.textPrimary }]}>NEWS CONNECT</Text>
        </View>
        <Text style={[styles.tagline, { color: theme.accentGold }]}>
          One World. Every Perspective.
        </Text>
        <Text style={[styles.missionText, { color: theme.textSecondary }]}>
          A single-page international news discovery portal connecting verified feeds and broadcasts from leading global television networks and news wire agencies.
        </Text>
      </View>

      {/* Network Directory Links */}
      <View style={styles.networksSection}>
        <Text style={[styles.sectionHeading, { color: theme.textPrimary }]}>
          Connected News Networks
        </Text>
        <View style={styles.networksGrid}>
          {NEWS_SOURCES.map((source) => (
            <TouchableOpacity
              key={source.id}
              style={[styles.networkLink, { backgroundColor: theme.surface, borderColor: theme.border }]}
              onPress={() => handleOpenSource(source.website)}
            >
              <Text style={[styles.networkFlag]}>{source.flag}</Text>
              <Text style={[styles.networkName, { color: theme.textPrimary }]} numberOfLines={1}>
                {source.shortName}
              </Text>
              <Text style={[styles.networkArrow, { color: theme.accentGold }]}>↗</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Legal & Policy Navigation */}
      <View style={[styles.legalNav, { borderTopColor: theme.border }]}>
        <TouchableOpacity onPress={onOpenModal}>
          <Text style={[styles.legalLink, { color: theme.textSecondary }]}>About News Connect</Text>
        </TouchableOpacity>
        <Text style={[styles.divider, { color: theme.textMuted }]}>•</Text>
        <TouchableOpacity onPress={onOpenModal}>
          <Text style={[styles.legalLink, { color: theme.textSecondary }]}>Terms of Use</Text>
        </TouchableOpacity>
        <Text style={[styles.divider, { color: theme.textMuted }]}>•</Text>
        <TouchableOpacity onPress={onOpenModal}>
          <Text style={[styles.legalLink, { color: theme.textSecondary }]}>Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={[styles.divider, { color: theme.textMuted }]}>•</Text>
        <TouchableOpacity onPress={onOpenModal}>
          <Text style={[styles.legalLink, { color: theme.textSecondary }]}>Attribution Policy</Text>
        </TouchableOpacity>
      </View>

      {/* Copyright & Disclaimer Notice */}
      <View style={styles.disclaimerSection}>
        <Text style={[styles.disclaimerText, { color: theme.textMuted }]}>
          Content Disclaimer: News Connect is an indexing news aggregator. All article titles, excerpts, logos and trademarks are the exclusive property of their respective publishers (Newsmax, Fox News, LoveWorld Networks, Sky News Australia, Asian News International). Articles are subject to publisher terms and copyright.
        </Text>
        <View style={styles.syncRow}>
          <Text style={[styles.syncText, { color: theme.textMuted }]}>
            Engine: {isLiveServer ? '● Live Feed Proxy Active' : '○ Standalone / Fallback Resilient'}
          </Text>
          {lastUpdated && (
            <Text style={[styles.syncText, { color: theme.textMuted }]}>
              Sync: {new Date(lastUpdated).toLocaleTimeString()}
            </Text>
          )}
        </View>
        <Text style={[styles.copyright, { color: theme.textMuted }]}>
          © 2026 News Connect. Built with React Native. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 16,
    borderTopWidth: 1
  },
  brandSection: {
    marginBottom: 20
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4
  },
  logoIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoIconText: {
    color: '#0B1325',
    fontSize: 14,
    fontWeight: '900'
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1
  },
  tagline: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 8
  },
  missionText: {
    fontSize: 12,
    lineHeight: 18
  },
  networksSection: {
    marginBottom: 20
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  networksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  networkLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6
  },
  networkFlag: {
    fontSize: 12
  },
  networkName: {
    fontSize: 11,
    fontWeight: '700'
  },
  networkArrow: {
    fontSize: 11,
    fontWeight: '800'
  },
  legalNav: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 14,
    borderTopWidth: 1,
    gap: 8
  },
  legalLink: {
    fontSize: 11,
    fontWeight: '600'
  },
  divider: {
    fontSize: 10
  },
  disclaimerSection: {
    gap: 8
  },
  disclaimerText: {
    fontSize: 10.5,
    lineHeight: 15
  },
  syncRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4
  },
  syncText: {
    fontSize: 10,
    fontWeight: '600'
  },
  copyright: {
    fontSize: 10,
    marginTop: 6
  }
});

export default Footer;

