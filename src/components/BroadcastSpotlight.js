// ============================================================================
// NEWS CONNECT: BroadcastSpotlight Component (React Native)
// Dedicated live stream, broadcast schedules & portal access for non-RSS sources
// ============================================================================

import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const BROADCAST_SOURCES = [
  {
    id: 'loveworldsat',
    name: 'LoveWorld Sat',
    badge: 'LW SAT',
    region: 'South Africa & Pan-Africa',
    flag: '🇿🇦',
    tagline: '24/7 Satellite Television Network & News Hub',
    description: 'Broadcasting from Johannesburg across Africa and globally. Features daily live broadcasts including News On The Hour, Good Morning World, and Global Business Update.',
    brandColor: '#1A365D',
    accentColor: '#EA580C',
    liveUrl: 'https://www.loveworldsat.org/live-tv',
    portalUrl: 'https://www.loveworldsat.org/news',
    programs: ['Good Morning World', 'News On The Hour', 'Global Business Update', 'Your Loveworld Specials'],
    statusNote: 'Broadcast Television Stream (No Public Article RSS)'
  },
  {
    id: 'loveworldeurope',
    name: 'LoveWorld Europe',
    badge: 'LW EU',
    region: 'United Kingdom & Europe',
    flag: '🇪🇺',
    tagline: 'Continental Multilingual Television Network',
    description: 'Official broadcasting portal for the UK and Continental Europe, streaming faith-based news, multilingual family programming, and global youth leadership initiatives.',
    brandColor: '#1E3A8A',
    accentColor: '#F59E0B',
    liveUrl: 'https://loveworldeurope.org',
    portalUrl: 'https://loveworlduk.org',
    programs: ['LoveWorld News Special', 'European Perspective', 'Youth Live UK', 'Faith & Society'],
    statusNote: 'Live TV & Multilingual Portal (No Public Article RSS)'
  },
  {
    id: 'skynews_australia',
    name: 'Sky News Australia',
    badge: 'SKY AU',
    region: 'Australia & Oceania',
    flag: '🇦🇺',
    tagline: "Australia's Premier 24/7 Digital News Service",
    description: "Operated by Australian News Channel (News Corp Australia). Delivers national political reporting, investigative commentary, and on-demand video reports from Canberra and Sydney.",
    brandColor: '#990000',
    accentColor: '#E60000',
    liveUrl: 'https://www.youtube.com/@news24',
    portalUrl: 'https://www.skynews.com.au',
    programs: ['First Edition', 'AM Agenda', 'Kershaw & Credlin', 'The Bolt Report'],
    statusNote: 'Official Web Portal & Digital Video (No Native Text RSS)'
  },
  {
    id: 'loveworldindia',
    name: 'LoveWorld India (LBN TV)',
    badge: 'LW INDIA',
    region: 'India & South Asia',
    flag: '🇮🇳',
    tagline: '24/7 Satellite & Digital Television Network',
    description: 'Premier Christian broadcasting network impacting India and South Asia with faith, prayer, youth empowerment, and family guidance (JioTV Channel 4080).',
    brandColor: '#08182D',
    accentColor: '#F5B041',
    liveUrl: 'https://lwindia.org/',
    portalUrl: 'https://lwindia.org/',
    programs: ['Ignite Youth Show', 'Reflection Time', 'Parenting Perspective', 'Your Loveworld Specials'],
    statusNote: 'Live TV & Web Portal (No Public Article RSS)'
  }
];

export const BroadcastSpotlight = ({ theme }) => {
  const handleOpenUrl = (url) => {
    if (url) {
      Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.titleRow}>
          <Text style={[styles.badgePill, { backgroundColor: theme.statusBroadcast }]}>BROADCAST</Text>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            Live TV & Broadcast Portals
          </Text>
        </View>
        <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
          Verified non-RSS channels integrated via official live streams and canonical portals
        </Text>
      </View>

      <View style={styles.cardsGrid}>
        {BROADCAST_SOURCES.map((source) => (
          <View
            key={source.id}
            style={[styles.broadcastCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
          >
            {/* Header */}
            <View style={styles.cardHeader}>
              <View style={[styles.brandBadge, { backgroundColor: source.brandColor }]}>
                <Text style={styles.brandBadgeText}>{source.badge}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: theme.statusBroadcastBg, borderColor: theme.statusBroadcast }]}>
                <Text style={[styles.statusBadgeText, { color: theme.statusBroadcast }]}>● Broadcast</Text>
              </View>
            </View>

            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
              {source.flag} {source.name}
            </Text>
            <Text style={[styles.tagline, { color: theme.accentGold }]}>{source.tagline}</Text>
            <Text style={[styles.description, { color: theme.textSecondary }]}>
              {source.description}
            </Text>

            {/* Program Highlights */}
            <View style={styles.programList}>
              <Text style={[styles.programLabel, { color: theme.textMuted }]}>Featured Segments:</Text>
              <View style={styles.programPills}>
                {source.programs.map((prog, idx) => (
                  <View key={idx} style={[styles.programPill, { backgroundColor: theme.surfaceHighlight, borderColor: theme.border }]}>
                    <Text style={[styles.programText, { color: theme.textPrimary }]}>{prog}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Notice */}
            <View style={[styles.noticeBox, { backgroundColor: theme.surfaceHighlight, borderColor: theme.border }]}>
              <Text style={[styles.noticeText, { color: theme.textMuted }]}>
                ℹ️ {source.statusNote}
              </Text>
            </View>

            {/* Actions */}
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: source.accentColor }]}
                onPress={() => handleOpenUrl(source.liveUrl)}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>Watch Live Stream ↗</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.secondaryButton, { backgroundColor: theme.surfaceHighlight, borderColor: theme.border }]}
                onPress={() => handleOpenUrl(source.portalUrl)}
                activeOpacity={0.8}
              >
                <Text style={[styles.secondaryButtonText, { color: theme.textPrimary }]}>Official Portal ↗</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 14
  },
  sectionHeader: {
    marginBottom: 12
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  badgePill: {
    color: '#0B1325',
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
  sectionSubtitle: {
    fontSize: 11,
    marginTop: 3
  },
  cardsGrid: {
    gap: 14
  },
  broadcastCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2
  },
  cardHeader: {
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
    fontWeight: '900',
    letterSpacing: 0.5
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 2
  },
  tagline: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 8
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12
  },
  programList: {
    marginBottom: 12
  },
  programLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  programPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  programPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1
  },
  programText: {
    fontSize: 11,
    fontWeight: '600'
  },
  noticeBox: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12
  },
  noticeText: {
    fontSize: 10,
    fontStyle: 'italic'
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800'
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center'
  },
  secondaryButtonText: {
    fontSize: 12,
    fontWeight: '700'
  }
});

export default BroadcastSpotlight;

