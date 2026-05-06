import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, useColorScheme, ViewStyle, StyleProp } from 'react-native';
import { Image } from 'expo-image';
import { ChevronRight, Leaf } from 'lucide-react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { Herb } from '@/constants/Herbs';

interface HerbCardProps {
  herb: Herb;
  style?: StyleProp<ViewStyle>;
}

export function HerbCard({ herb, style }: HerbCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <Link href={`/herb/${herb.id}`} asChild>
      <TouchableOpacity style={[styles.herbCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }, style]}>
        <Image source={{ uri: herb.image }} style={styles.herbThumb} contentFit="cover" transition={200} />
        <View style={styles.herbInfo}>
          <Text style={[styles.herbName, { color: colors.text }]}>{herb.name}</Text>
          <Text style={[styles.herbScientific, { color: colors.secondaryText }]}>{herb.scientificName}</Text>
          <View style={styles.tagRow}>
            <Leaf size={12} color={colors.tint} />
            <Text style={[styles.herbCategory, { color: colors.tint }]}>{herb.category}</Text>
          </View>
        </View>
        <ChevronRight size={20} color={colors.secondaryText} />
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  herbCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  herbThumb: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  herbInfo: {
    flex: 1,
    marginLeft: 12,
  },
  herbName: {
    fontSize: 18,
    fontWeight: '700',
  },
  herbScientific: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  herbCategory: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});
