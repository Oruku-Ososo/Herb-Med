import React, { useState } from 'react';
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
import { HERBS } from '@/constants/Herbs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HerbCard } from '@/components/HerbCard';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Anti-inflammatory', 'Digestive', 'Calming', 'Energy', 'Immune Support', 'Adaptogen'];

  const featuredHerbs = selectedCategory === 'All'
    ? HERBS.slice(0, 4)
    : HERBS.filter(herb => herb.category === selectedCategory);

  const handleCategoryPress = (category: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedCategory(category);
  };

  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const herbOfTheDay = HERBS[dayOfYear % HERBS.length];

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
        <Text style={[styles.greeting, { color: colors.secondaryText }]}>Welcome to</Text>
        <Text style={[styles.title, { color: colors.text }]}>Herbal Wisdom</Text>
      </View>

      <Link href="/(tabs)/search" asChild>
        <TouchableOpacity
          style={[styles.searchBar, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        >
          <Search size={20} color={colors.secondaryText} />
          <Text style={[styles.searchText, { color: colors.secondaryText }]}>Search for herbs, benefits...</Text>
        </TouchableOpacity>
      </Link>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 0, paddingHorizontal: 0 }]}>Herb of the Day</Text>
        </View>
        <HerbCard herb={herbOfTheDay} style={{ marginHorizontal: 20 }} />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={{ paddingRight: 20 }}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => handleCategoryPress(category)}
              style={[styles.categoryBadge, { backgroundColor: category === selectedCategory ? colors.tint : colors.cardBackground, borderColor: colors.border }]}
            >
              <Text style={[styles.categoryText, { color: category === selectedCategory ? '#FFF' : colors.text }]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {selectedCategory === 'All' ? 'Featured Herbs' : `${selectedCategory} Herbs`}
          </Text>
          {selectedCategory === 'All' && (
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.tint }]}>See All</Text>
            </TouchableOpacity>
          )}
        </View>

        {featuredHerbs.map((herb) => (
          <HerbCard key={herb.id} herb={herb} style={{ marginHorizontal: 20 }} />
        ))}
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
