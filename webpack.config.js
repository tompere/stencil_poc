const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

const patterns = ['components-lib', 'ssr-runtime-lib'].map(package => (
  {
     from: path.resolve(__dirname, `packages/${package}/dist`),
     to: path.resolve(__dirname, 'dist')
  }
))

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns,
    }),
  ],
};
