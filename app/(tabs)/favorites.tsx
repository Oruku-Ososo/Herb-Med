import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Platform,
} from 'react-native';
import { Heart } from 'lucide-react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { useHerbStore } from '@/store/useHerbStore';
import { useHerbsData } from '@/store/useHerbsData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HerbCard } from '@/components/HerbCard';
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';

export default function FavoritesScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const { favorites } = useHerbStore();
  const { data: herbs = [], isLoading } = useHerbsData();

  const favoriteHerbs = herbs.filter((herb) => favorites.includes(herb.id));

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: Platform.OS === 'ios' ? insets.top + 60 : 20 }]}>
      {isLoading ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.secondaryText }]}>Loading herbs...</Text>
        </View>
      ) : favoriteHerbs.length === 0 ? (
        <View style={styles.emptyState}>
          <Heart size={64} color={colors.border} fill={colors.border} />
          <Text style={[styles.emptyTitle, { color: colors.text }]} accessibilityRole="header">{t('noFavoritesYet')}</Text>
          <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
            {t('noFavoritesDesc')}
          </Text>
          <Link href="/(tabs)/search" asChild>
            <TouchableOpacity style={[styles.browseButton, { backgroundColor: colors.tint }]} accessibilityRole="button">
              <Text style={styles.browseButtonText}>{t('browseHerbs')}</Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlashList
            data={favoriteHerbs}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            estimatedItemSize={98}
            renderItem={({ item }) => <HerbCard herb={item} />}
          />
        </View>
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
