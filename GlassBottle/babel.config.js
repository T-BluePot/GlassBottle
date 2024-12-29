module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // Expo 프로젝트에 맞는 preset
    env: {
      production: {
        plugins: ["react-native-paper/babel"], // production 환경에서만 동작
      },
    },
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [
            ".ios.js",
            ".android.js",
            ".js",
            ".jsx",
            ".json",
          ],
          alias: {
            "@components": "./components",
            "@assets": "./assets", 
          },
        },
      ],
    ],
  };
};
