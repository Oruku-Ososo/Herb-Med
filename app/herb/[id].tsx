import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Platform,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { Heart, ArrowLeft, CheckCircle2, AlertTriangle, Info, Share2, Beaker } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/Colors';
import { HERBS } from '@/constants/Herbs';
import { useHerbStore } from '@/store/useHerbStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HerbDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const { toggleFavorite, isFavorite } = useHerbStore();

  const herb = HERBS.find((h) => h.id === id);
  const favorite = herb ? isFavorite(herb.id) : false;

  if (!herb) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>Herb not found</Text>
      </View>
    );
  }

  const handleToggleFavorite = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    toggleFavorite(herb.id);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${herb.name} (${herb.scientificName}) on the Global Herbal Medicine App! It's great for ${herb.category}.`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: herb.image }} style={styles.heroImage} contentFit="cover" />
          {Platform.OS === 'ios' && (
            <BlurView intensity={20} tint="dark" style={styles.imageOverlay} />
          )}
          <TouchableOpacity
            style={[styles.backButton, { top: insets.top + 10 }]}
            onPress={() => router.back()}
          >
            <BlurView intensity={80} tint="light" style={styles.iconBlur}>
              <ArrowLeft size={24} color="#000" />
            </BlurView>
          </TouchableOpacity>
          <View style={[styles.rightButtons, { top: insets.top + 10 }]}>
            <TouchableOpacity onPress={handleShare} style={{ marginRight: 10 }}>
              <BlurView intensity={80} tint="light" style={styles.iconBlur}>
                <Share2 size={24} color="#000" />
              </BlurView>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleFavorite}>
              <BlurView intensity={80} tint="light" style={styles.iconBlur}>
                <Heart size={24} color={favorite ? colors.error : "#000"} fill={favorite ? colors.error : "transparent"} />
              </BlurView>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.content, { backgroundColor: colors.background }]}>
          <View style={styles.headerInfo}>
            <Text style={[styles.category, { color: colors.tint }]}>{herb.category}</Text>
            <Text style={[styles.name, { color: colors.text }]}>{herb.name}</Text>
            <Text style={[styles.scientificName, { color: colors.secondaryText }]}>{herb.scientificName}</Text>
          </View>

          <View style={[styles.section, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Info size={20} color={colors.tint} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
            </View>
            <Text style={[styles.sectionBody, { color: colors.text }]}>{herb.description}</Text>
          </View>

          <View style={[styles.section, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <CheckCircle2 size={20} color={colors.tint} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Health Benefits</Text>
            </View>
            {herb.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <View style={[styles.bullet, { backgroundColor: colors.tint }]} />
                <Text style={[styles.sectionBody, { color: colors.text }]}>{benefit}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.section, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Leaf size={20} color={colors.tint} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>How to Use</Text>
            </View>
            <Text style={[styles.sectionBody, { color: colors.text }]}>{herb.usage}</Text>
          </View>

          {herb.scientificBacking && (
            <View style={[styles.section, { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD', borderWidth: 1 }]}>
              <View style={styles.sectionHeader}>
                <Beaker size={20} color="#0284C7" />
                <Text style={[styles.sectionTitle, { color: '#0369A1' }]}>Scientific Backing</Text>
              </View>
              <Text style={[styles.sectionBody, { color: '#075985' }]}>{herb.scientificBacking}</Text>
            </View>
          )}

          <View style={[styles.section, { backgroundColor: '#FFF5F5', borderColor: '#FED7D7', borderWidth: 1 }]}>
            <View style={styles.sectionHeader}>
              <AlertTriangle size={20} color="#E53E3E" />
              <Text style={[styles.sectionTitle, { color: '#C53030' }]}>Precautions</Text>
            </View>
            <Text style={[styles.sectionBody, { color: '#742A2A' }]}>{herb.precautions}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const Leaf = ({ size, color }: { size: number, color: string }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: size * 0.8, height: size * 0.8, borderRadius: size * 0.4, backgroundColor: color, opacity: 0.2, position: 'absolute' }} />
    <View style={{ width: size * 0.4, height: size * 0.4, borderRadius: size * 0.1, backgroundColor: color }} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  rightButtons: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
    flexDirection: 'row',
  },
  iconBlur: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  content: {
    marginTop: -30,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerInfo: {
    marginBottom: 24,
  },
  category: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  name: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  section: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
  sectionBody: {
    fontSize: 16,
    lineHeight: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
});
