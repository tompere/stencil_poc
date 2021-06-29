const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/customElement.client.js',
  output: {
    filename: 'wixCustomElement.client.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'webworker',
  module: {},
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/stencil-dist/server/index.js", to: "wixCustomElement.server.js" },
      ],
    }),
  ],
};
