// ============================================================================
// NEWS CONNECT: CategoryFilter Component (React Native)
// Filter news headlines across 13 international categories supported by sources
// ============================================================================

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { CATEGORIES } from '../config/sources';

export const CategoryFilter = ({ theme, selectedCategory, onSelectCategory, categoryCounts = {} }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = categoryCounts[cat];

          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryPill,
                {
                  backgroundColor: isSelected ? theme.accentGold : theme.surface,
                  borderColor: isSelected ? theme.accentGold : theme.border
                }
              ]}
              onPress={() => onSelectCategory(cat)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: isSelected ? '#0B1325' : theme.textPrimary,
                    fontWeight: isSelected ? '800' : '600'
                  }
                ]}
              >
                {cat}
              </Text>

              {count !== undefined && count > 0 && (
                <View
                  style={[
                    styles.countBadge,
                    {
                      backgroundColor: isSelected ? 'rgba(11, 19, 37, 0.15)' : theme.surfaceHighlight
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.countText,
                      { color: isSelected ? '#0B1325' : theme.textSecondary }
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1
  },
  categoryText: {
    fontSize: 12,
    letterSpacing: 0.2
  },
  countBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10
  },
  countText: {
    fontSize: 10,
    fontWeight: '700'
  }
});

export default CategoryFilter;

