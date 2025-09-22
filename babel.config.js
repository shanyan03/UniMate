module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // IMPORTANT: this must be LAST
    plugins: ["react-native-worklets/plugin"],
  };
};
