module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind", unstable_transformImportMeta: true }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
            "@/shared": "./shared",
          },
        },
      ],
      "@babel/plugin-proposal-export-namespace-from",
      // NOTE: react-native-reanimated/plugin removed - babel-preset-expo handles this in SDK 54
    ],
  };
};
