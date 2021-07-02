const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/wix-dist/ssr-stencil-runtime.js',
  output: {
    filename: 'ssr-runtime-lib.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {}
};
