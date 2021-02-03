const webpack = require('webpack');
const {join} = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const MAIN_PATH = join(__dirname, '..');
const SRC_PATH = join(MAIN_PATH, 'src');

const prod = {
  mode: 'production',
  entry: {
    main: ['babel-polyfill', join(SRC_PATH, 'main.tsx')]
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      process: {
        env: {
          NODE_ENV: JSON.stringify('production')
        }
      }
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
  }
};

module.exports = merge(common, prod)
