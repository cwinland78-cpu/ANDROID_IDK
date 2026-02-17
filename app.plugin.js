const { withProjectBuildGradle, withAndroidManifest } = require('@expo/config-plugins');

function withAdsVersion(config) {
  // Step 1: Force compatible Ads SDK version
  config = withProjectBuildGradle(config, (cfg) => {
    if (!cfg.modResults || !cfg.modResults.contents) return cfg;
    cfg.modResults.contents = cfg.modResults.contents.replace(
      /com\.google\.android\.gms:play-services-ads:[0-9.]+/g,
      'com.google.android.gms:play-services-ads:24.7.0'
    );
    return cfg;
  });

  // Step 2: Strip all unnecessary permissions from AndroidManifest.xml
  config = withAndroidManifest(config, (cfg) => {
    const manifest = cfg.modResults;
    const BLOCKED_PERMISSIONS = [
      'android.permission.READ_MEDIA_IMAGES',
      'android.permission.READ_MEDIA_VIDEO',
      'android.permission.READ_MEDIA_AUDIO',
      'android.permission.READ_MEDIA_VISUAL_USER_SELECTED',
      'android.permission.ACTIVITY_RECOGNITION',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.CAMERA',
      'android.permission.RECORD_AUDIO',
      'android.permission.READ_PHONE_STATE',
      'android.permission.BODY_SENSORS',
      'android.permission.READ_CONTACTS',
      'android.permission.WRITE_CONTACTS',
      'android.permission.READ_CALENDAR',
      'android.permission.WRITE_CALENDAR',
      'android.permission.SEND_SMS',
      'android.permission.READ_SMS',
      'android.permission.CALL_PHONE',
      'android.permission.USE_BIOMETRIC',
      'android.permission.USE_FINGERPRINT',
      'android.permission.BLUETOOTH',
      'android.permission.BLUETOOTH_ADMIN',
      'android.permission.BLUETOOTH_CONNECT',
      'android.permission.BLUETOOTH_SCAN',
      'android.permission.NFC',
      'android.permission.POST_NOTIFICATIONS',
      'com.google.android.gms.permission.ACTIVITY_RECOGNITION',
    ];

    // Remove blocked permissions
    if (manifest.manifest['uses-permission']) {
      manifest.manifest['uses-permission'] = manifest.manifest['uses-permission'].filter(
        (perm) => !BLOCKED_PERMISSIONS.includes(perm.$['android:name'])
      );
    }
    if (manifest.manifest['uses-permission-sdk-23']) {
      manifest.manifest['uses-permission-sdk-23'] = manifest.manifest['uses-permission-sdk-23'].filter(
        (perm) => !BLOCKED_PERMISSIONS.includes(perm.$['android:name'])
      );
    }

    // Add tools:remove for blocked permissions to override any merged from dependencies
    if (!manifest.manifest.$['xmlns:tools']) {
      manifest.manifest.$['xmlns:tools'] = 'http://schemas.android.com/tools';
    }

    // Add explicit remove entries
    BLOCKED_PERMISSIONS.forEach((permission) => {
      if (!manifest.manifest['uses-permission']) {
        manifest.manifest['uses-permission'] = [];
      }
      manifest.manifest['uses-permission'].push({
        $: {
          'android:name': permission,
          'tools:node': 'remove',
        },
      });
    });

    return cfg;
  });

  return config;
}

module.exports = withAdsVersion;
