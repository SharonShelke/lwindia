// ============================================================================
// NEWS CONNECT: SearchBar Component (React Native)
// Live keyword search with instant clear, result count and responsive styling
// ============================================================================

import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export const SearchBar = ({ theme, query, onChangeQuery, onClear, totalResults }) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.surfaceHighlight, borderColor: theme.border }]}>
      <Text style={[styles.searchIcon, { color: theme.accentGold || '#F5B041' }]}>🔍</Text>
      
      <TextInput
        style={[styles.input, { color: theme.textPrimary }]}
        placeholder="Search international headlines, topics, or keywords..."
        placeholderTextColor={theme.textMuted}
        value={query}
        onChangeText={onChangeQuery}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />

      {query.length > 0 && (
        <TouchableOpacity
          onPress={onClear}
          style={[styles.clearButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
          accessibilityLabel="Clear search input"
        >
          <Text style={[styles.clearButtonText, { color: theme.textSecondary }]}>✕</Text>
        </TouchableOpacity>
      )}

      {totalResults !== undefined && (
        <View style={[styles.countBadge, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.countText, { color: theme.textSecondary }]}>
            {totalResults} {totalResults === 1 ? 'article' : 'articles'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 2
  },
  clearButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6
  },
  clearButtonText: {
    fontSize: 11,
    fontWeight: '800'
  },
  countBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1
  },
  countText: {
    fontSize: 11,
    fontWeight: '600'
  }
});

export default SearchBar;

