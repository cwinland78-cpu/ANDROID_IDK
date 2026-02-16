/**
 * AdMob Configuration (ANDROID-ONLY)
 *
 * Production Ad Unit IDs (Android):
 * - Banner:       ca-app-pub-5879329589086028/3763975715
 * - Interstitial: ca-app-pub-5879329589086028/4169996364
 * - Result:       ca-app-pub-5879329589086028/7590766007
 *
 * AdMob App ID (Android): ca-app-pub-5879329589086028~3567654349
 */

import { Platform } from 'react-native';

// Google's official test ad unit IDs (used in development)
export const TEST_AD_UNIT_IDS = {
  BANNER: 'ca-app-pub-3940256099942544/6300978111',
  INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
  REWARDED_INTERSTITIAL: 'ca-app-pub-3940256099942544/5354046379',
};

// Your actual AdMob ad unit IDs (used in production)
export const PRODUCTION_AD_UNIT_IDS = {
  // Bottom banner ad
  BANNER: 'ca-app-pub-5879329589086028/3763975715',
  // Interstitial before opening Maps
  INTERSTITIAL: 'ca-app-pub-5879329589086028/4169996364',
  // Interstitial to reveal spin result
  REWARDED_INTERSTITIAL: 'ca-app-pub-5879329589086028/7590766007',
};

// Use test IDs in development, production IDs in release builds
export const AD_UNIT_IDS = __DEV__ ? TEST_AD_UNIT_IDS : PRODUCTION_AD_UNIT_IDS;

// AdMob App ID (needed for app.json configuration)
export const ADMOB_APP_ID = 'ca-app-pub-5879329589086028~3567654349';

// Android only: ads supported only on Android (not web)
export const isAdPlatformSupported = Platform.OS === 'android';

// AdMob is installed and will be active in native Android builds
export const isAdMobInstalled = true;
