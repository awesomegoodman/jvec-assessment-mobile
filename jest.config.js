module.exports = {
  preset: 'react-native',
  setupFiles: ['./__mock__/@react-native-async-storage/setupAsyncStorage.tsx'],
  "transformIgnorePatterns": [
    "node_modules/(?![^/]*react-native[^/]*/|react-native-vector-icons/)"
  ],
};
