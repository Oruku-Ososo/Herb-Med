import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  Platform,
} from 'react-native';
import { Heart } from 'lucide-react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { HERBS } from '@/constants/Herbs';
import { useHerbStore } from '@/store/useHerbStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HerbCard } from '@/components/HerbCard';

export default function FavoritesScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const { favorites } = useHerbStore();

  const favoriteHerbs = HERBS.filter((herb) => favorites.includes(herb.id));

  const containerStyle = StyleSheet.flatten([
    styles.container,
    { backgroundColor: colors.background, paddingTop: Platform.OS === 'ios' ? insets.top + 60 : 20 }
  ]);

  return (
    <View style={containerStyle}>
      {favoriteHerbs.length === 0 ? (
        <View style={styles.emptyState}>
          <Heart size={64} color={colors.border} fill={colors.border} />
          <Text style={StyleSheet.flatten([styles.emptyTitle, { color: colors.text }])}>No Favorites Yet</Text>
          <Text style={StyleSheet.flatten([styles.emptyText, { color: colors.secondaryText }])}>
            Herbs you heart will appear here for quick access.
          </Text>
          <Link href="/(tabs)/search" asChild>
            <TouchableOpacity style={StyleSheet.flatten([styles.browseButton, { backgroundColor: colors.tint }])}>
              <Text style={styles.browseButtonText}>Browse Herbs</Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) : (
        <FlatList
          data={favoriteHerbs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 100,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  browseButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  browseButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
