const { withProjectBuildGradle } = require('@expo/config-plugins');

module.exports = function withAdsVersion(config) {
  return withProjectBuildGradle(config, (cfg) => {
    if (!cfg.modResults || !cfg.modResults.contents) return cfg;

    // Force a compatible Ads SDK version to avoid Kotlin metadata mismatch
    cfg.modResults.contents = cfg.modResults.contents.replace(
      /com\.google\.android\.gms:play-services-ads:[0-9.]+/g,
      'com.google.android.gms:play-services-ads:24.7.0'
    );

    return cfg;
  });
};