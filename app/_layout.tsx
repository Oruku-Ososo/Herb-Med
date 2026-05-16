import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { HERBS } from '@/constants/Herbs';
import '@/store/i18n';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0", // Mock DSN
  debug: false,
});

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

function RootLayoutComponent() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    async function prepare() {
      try {
        // Prefetch images for better performance
        const imagesToPrefetch = HERBS.map((herb) => herb.image);
        await Promise.all(imagesToPrefetch.map(url => Image.prefetch(url)));
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="herb/[id]" options={{ presentation: 'modal', title: 'Herb Details' }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(RootLayoutComponent);
