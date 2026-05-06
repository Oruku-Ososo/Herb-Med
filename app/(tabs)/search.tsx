import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  useColorScheme,
  Platform,
} from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { HERBS } from '@/constants/Herbs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HerbCard } from '@/components/HerbCard';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const filteredHerbs = HERBS.filter(
    (herb) =>
      herb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      herb.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      herb.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: Platform.OS === 'ios' ? insets.top + 60 : 20 }]}>
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <SearchIcon size={20} color={colors.secondaryText} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Search herbs..."
            placeholderTextColor={colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={filteredHerbs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.secondaryText }]}>No herbs found matching your search.</Text>
          </View>
        }
        renderItem={({ item }) => <HerbCard herb={item} />}
      />
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
