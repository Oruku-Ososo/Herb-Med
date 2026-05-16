import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  useColorScheme,
  Platform,
} from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HerbCard } from '@/components/HerbCard';
import { useTranslation } from 'react-i18next';
import { useHerbsData } from '@/store/useHerbsData';
import { FlashList } from '@shopify/flash-list';
import Fuse from 'fuse.js';

export default function SearchScreen() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const { data: herbs = [], isLoading } = useHerbsData();

  const fuse = useMemo(
    () =>
      new Fuse(herbs, {
        keys: ['name', 'category', 'scientificName', 'benefits'],
        threshold: 0.3,
      }),
    [herbs]
  );

  const filteredHerbs = useMemo(() => {
    if (!searchQuery.trim()) {
      return herbs;
    }
    return fuse.search(searchQuery).map((result) => result.item);
  }, [searchQuery, fuse, herbs]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: Platform.OS === 'ios' ? insets.top + 60 : 20 }]}>
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <SearchIcon size={20} color={colors.secondaryText} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder={t('searchPlaceholderShort')}
            placeholderTextColor={colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessibilityRole="search"
            accessibilityLabel={t('searchPlaceholderShort')}
          />
        </View>
      </View>

      {isLoading ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.secondaryText }]}>Loading herbs...</Text>
        </View>
      ) : (
        <FlashList
          data={filteredHerbs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          estimatedItemSize={98}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: colors.secondaryText }]}>{t('noHerbsFound')}</Text>
            </View>
          }
          renderItem={({ item }) => <HerbCard herb={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    height: 24,
    padding: 0,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyState: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
