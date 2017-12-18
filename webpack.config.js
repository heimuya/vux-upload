let webpackConfig = require('./node_modules/laravel-mix/setup/webpack.config')
let HtmlWebpackPlugin = require('html-webpack-plugin')
const vuxLoader = require('vux-loader')
const merge = require('webpack-merge')

const basicConfig = {
  output: {
    chunkFilename: 'js/vux.[name].js'
  },
  resolve: {
    extensions: ['.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
}

webpackConfig = merge(webpackConfig, basicConfig)

module.exports = vuxLoader.merge(webpackConfig, {
  options: {},
  plugins: [{ name: 'vux-ui' }, 'duplicate-style']
})