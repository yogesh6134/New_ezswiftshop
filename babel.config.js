// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
//   plugins: ['react-native-reanimated/plugin'],
// };


module.exports = {
  // presets: ['module:metro-react-native-babel-preset'],
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],

  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};