// vue.config.js
const path = require('path');


module.exports = {
  // Add any Vue CLI-specific configurations here
  configureWebpack: {
    // Example of a webpack configuration
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
};


const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()],
  },
};
