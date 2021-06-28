const path = require('path');

module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'wixCustomElement.js',
    path: path.resolve(__dirname, 'output'),
  },
  target: 'webworker',
  module: {},
  plugins: [],
};
