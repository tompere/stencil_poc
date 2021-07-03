const path = require('path');
const globby = require('globby')
const webpack = require('webpack')

const entries = globby.sync('src/exports/*').reduce((acc, p) => {
  const {name} = path.parse(p)
  return {
    ...acc,
    [name]: `./${p}`
  }
}, {})

module.exports = {
  entry: entries,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist', 'components'),
  },
  mode: 'development',
  plugins: [
    new webpack.EnvironmentPlugin({
      WIX_PATCH: 'false',
    })    
  ],
};
