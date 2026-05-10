import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, useColorScheme, View } from 'react-native';
import { Home, Search, Heart } from 'lucide-react-native';
import * as AppleSymbols from 'expo-symbols';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';

function TabBarIcon({
  color,
  lucide: LucideIcon,
  sfSymbol,
}: {
  color: string;
  lucide: any;
  sfSymbol: string;
}) {
  if (Platform.OS === 'ios') {
    return (
      <AppleSymbols.SymbolView
        name={sfSymbol as any}
        tintColor={color}
        size={24}
        fallback={<LucideIcon color={color} size={24} />}
      />
    );
  }
  return <LucideIcon color={color} size={24} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Platform.OS === 'ios' ? 'transparent' : Colors[colorScheme].cardBackground,
          position: Platform.OS === 'ios' ? 'absolute' : 'relative',
          borderTopColor: Colors[colorScheme].border,
        },
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView intensity={80} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} tint={colorScheme} />
          ) : <View />,
        headerTransparent: Platform.OS === 'ios',
        headerBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView intensity={80} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} tint={colorScheme} />
          ) : <View />,
        headerTitleStyle: {
          color: Colors[colorScheme].text,
          fontWeight: '700',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color} lucide={Home} sfSymbol="leaf.fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color} lucide={Search} sfSymbol="magnifyingglass" />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'My Favorites',
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color} lucide={Heart} sfSymbol="heart.fill" />
          ),
        }}
      />
    </Tabs>
  );
}
