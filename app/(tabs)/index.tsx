import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Platform,
} from 'react-native';
import { Link } from 'expo-router';
import { Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HerbCard } from '@/components/HerbCard';
import { useHerbsData } from '@/store/useHerbsData';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const { data: herbs = [], isLoading } = useHerbsData();

  const categories = [
    { key: 'All', tKey: 'cat_all' },
    { key: 'Anti-inflammatory', tKey: 'cat_antiInflammatory' },
    { key: 'Digestive', tKey: 'cat_digestive' },
    { key: 'Calming', tKey: 'cat_calming' },
    { key: 'Energy', tKey: 'cat_energy' },
    { key: 'Immune Support', tKey: 'cat_immuneSupport' },
    { key: 'Adaptogen', tKey: 'cat_adaptogen' }
  ];
  const featuredHerbs = herbs.slice(0, 4);

  const handleCategoryPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: Platform.OS === 'ios' ? insets.top + 60 : 20, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {Platform.OS === 'ios' && (
        <LinearGradient
          colors={[colors.tint + '20', 'transparent']}
          style={styles.gradient}
        />
      )}
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.secondaryText }]}>{t('welcome')}</Text>
        <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">{t('title')}</Text>
      </View>

      <Link href="/(tabs)/search" asChild>
        <TouchableOpacity
          style={[styles.searchBar, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          accessibilityRole="search"
          accessibilityLabel={t('searchPlaceholder')}
        >
          <Search size={20} color={colors.secondaryText} />
          <Text style={[styles.searchText, { color: colors.secondaryText }]}>{t('searchPlaceholder')}</Text>
        </TouchableOpacity>
      </Link>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('categories')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={{ paddingRight: 20 }} accessibilityRole="list">
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              onPress={handleCategoryPress}
              style={[styles.categoryBadge, { backgroundColor: category.key === 'All' ? colors.tint : colors.cardBackground, borderColor: colors.border }]}
              accessibilityRole="button"
              accessibilityLabel={`Category ${t(category.tKey)}`}
            >
              <Text style={[styles.categoryText, { color: category.key === 'All' ? '#FFF' : colors.text }]}>{t(category.tKey)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('featuredHerbs')}</Text>
          <TouchableOpacity accessibilityRole="button">
            <Text style={[styles.seeAll, { color: colors.tint }]}>{t('seeAll')}</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: colors.secondaryText }}>Loading herbs...</Text>
          </View>
        ) : (
          featuredHerbs.map((herb) => (
            <HerbCard key={herb.id} herb={herb} style={{ marginHorizontal: 20 }} />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  categoryScroll: {
    paddingLeft: 20,
  },
  categoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  categoryText: {
    fontWeight: '600',
  },
  seeAll: {
    fontWeight: '600',
    paddingRight: 20,
  },
});
