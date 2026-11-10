// ============================================================================
// NEWS CONNECT: AttributionModal Component (React Native)
// Displays About, Terms of Use, Privacy Policy & Publisher Rights Compliance
// ============================================================================

import React, { useState } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { NEWS_SOURCES } from '../config/sources';

export const AttributionModal = ({ visible, onClose, theme }) => {
  const [activeSection, setActiveSection] = useState('about');

  const handleOpenUrl = (url) => {
    if (url) Linking.openURL(url);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalContent, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          {/* Header */}
          <View style={[styles.modalHeader, { borderBottomColor: theme.border }]}>
            <View>
              <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>NEWS CONNECT</Text>
              <Text style={[styles.modalSubtitle, { color: theme.accentGold }]}>
                One World. Every Perspective.
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeButton, { backgroundColor: theme.surfaceHighlight, borderColor: theme.border }]}
            >
              <Text style={[styles.closeButtonText, { color: theme.textPrimary }]}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Tab Selector */}
          <View style={[styles.tabSelector, { borderBottomColor: theme.border }]}>
            {['about', 'sources', 'terms', 'privacy'].map((sec) => (
              <TouchableOpacity
                key={sec}
                style={[
                  styles.tabItem,
                  activeSection === sec && [styles.tabItemActive, { borderBottomColor: theme.accentGold }]
                ]}
                onPress={() => setActiveSection(sec)}
              >
                <Text
                  style={[
                    styles.tabItemText,
                    { color: activeSection === sec ? theme.accentGold : theme.textSecondary }
                  ]}
                >
                  {sec.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Modal Body */}
          <ScrollView style={styles.modalBody}>
            {activeSection === 'about' && (
              <View style={styles.sectionContainer}>
                <Text style={[styles.sectionHeading, { color: theme.textPrimary }]}>
                  About News Connect
                </Text>
                <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
                  News Connect is an international news discovery and headline aggregation platform designed to bring diverse global viewpoints together in one unified, modern dashboard.
                </Text>
                <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
                  By connecting eight major international broadcast networks and news agencies across the United States, Europe, Africa, India, and Australia, News Connect enables readers to examine breaking geopolitical developments, economic shifts, technology, and faith reporting from multiple authentic editorial angles.
                </Text>
                <View style={[styles.callout, { backgroundColor: theme.surfaceHighlight, borderColor: theme.border }]}>
                  <Text style={[styles.calloutTitle, { color: theme.accentGold }]}>Aggregation Philosophy</Text>
                  <Text style={[styles.calloutBody, { color: theme.textSecondary }]}>
                    News Connect is an index and discovery directory, not a content republisher. Every headline links directly to the original publisher article on their official domain.
                  </Text>
                </View>
              </View>
            )}

            {activeSection === 'sources' && (
              <View style={styles.sectionContainer}>
                <Text style={[styles.sectionHeading, { color: theme.textPrimary }]}>
                  Connected News Organisations (8)
                </Text>
                {NEWS_SOURCES.map((source) => (
                  <View
                    key={source.id}
                    style={[styles.sourceItem, { backgroundColor: theme.surfaceHighlight, borderColor: theme.border }]}
                  >
                    <View style={styles.sourceItemHeader}>
                      <Text style={[styles.sourceItemName, { color: theme.textPrimary }]}>
                        {source.flag} {source.name}
                      </Text>
                      <TouchableOpacity onPress={() => handleOpenUrl(source.website)}>
                        <Text style={[styles.visitLink, { color: theme.accentGold }]}>Official Site ↗</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={[styles.sourceItemDesc, { color: theme.textSecondary }]}>
                      {source.description}
                    </Text>
                    <Text style={[styles.sourceItemRule, { color: theme.textMuted }]}>
                      Integration: {source.integrationMethod}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {activeSection === 'terms' && (
              <View style={styles.sectionContainer}>
                <Text style={[styles.sectionHeading, { color: theme.textPrimary }]}>
                  Terms of Use & Attribution Policy
                </Text>
                <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
                  1. Non-Commercial Discovery: All feeds and headlines are presented strictly for personal, non-commercial discovery in accordance with publisher syndication policies.
                </Text>
                <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
                  2. Strict Attribution: Full credit and trademark rights are preserved for Newsmax, Fox News, LoveWorld Networks (LN24, LN247, LoveWorld Sat, LoveWorld Europe), Sky News Australia, and Asian News International (ANI).
                </Text>
                <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
                  3. Canonical Linking: News Connect never strips links, injects intermediary ad pages, or republishes full story text without licensing.
                </Text>
              </View>
            )}

            {activeSection === 'privacy' && (
              <View style={styles.sectionContainer}>
                <Text style={[styles.sectionHeading, { color: theme.textPrimary }]}>
                  Privacy & Data Principles
                </Text>
                <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
                  News Connect does not collect personal identity data, track user reading history across third-party websites, or require registration or accounts to access public news feeds.
                </Text>
                <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
                  Theme preferences (Dark/Light mode) and filter choices are saved locally on your device storage.
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Modal Footer */}
          <View style={[styles.modalFooter, { borderTopColor: theme.border }]}>
            <TouchableOpacity
              style={[styles.doneButton, { backgroundColor: theme.accentGold }]}
              onPress={onClose}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  modalContent: {
    width: '100%',
    maxHeight: '85%',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1
  },
  modalSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: '700'
  },
  tabSelector: {
    flexDirection: 'row',
    borderBottomWidth: 1
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  tabItemActive: {
    borderBottomWidth: 2
  },
  tabItemText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  modalBody: {
    padding: 16
  },
  sectionContainer: {
    paddingBottom: 20
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10
  },
  paragraph: {
    fontSize: 12.5,
    lineHeight: 18,
    marginBottom: 10
  },
  callout: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 6
  },
  calloutTitle: {
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4
  },
  calloutBody: {
    fontSize: 11.5,
    lineHeight: 16
  },
  sourceItem: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10
  },
  sourceItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  sourceItemName: {
    fontSize: 13,
    fontWeight: '800'
  },
  visitLink: {
    fontSize: 11,
    fontWeight: '700'
  },
  sourceItemDesc: {
    fontSize: 11.5,
    lineHeight: 16,
    marginBottom: 4
  },
  sourceItemRule: {
    fontSize: 10,
    fontStyle: 'italic'
  },
  modalFooter: {
    padding: 12,
    borderTopWidth: 1,
    alignItems: 'flex-end'
  },
  doneButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8
  },
  doneButtonText: {
    color: '#0B1325',
    fontSize: 12,
    fontWeight: '800'
  }
});

export default AttributionModal;

