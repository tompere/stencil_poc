const path = require('path');
const globby = require('globby')
const webpack = require('webpack')

const clientComponentsEntires = globby.sync('src/entires/*').reduce((acc, p) => {
  const {name} = path.parse(p)
  return {
    ...acc,
    [name]: `./${p}`
  }
}, {})

const clientConfig = {
  target: 'web',
  entry: clientComponentsEntires,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist', 'components'),
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      WIX_PATCH: 'false',
    })    
  ],
};

const serverConfig = {
  target: 'node',
  entry: './src/wix-dist/ssr-components.js',
  output: {
    library: {
      name: 'ssrComponents',
      type: 'var'
    },
    filename: 'ssr-components.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}

module.exports = [serverConfig, clientConfig];

