const {join} = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MAIN_PATH = join(__dirname, '..');
const SRC_PATH = join(MAIN_PATH, 'src');

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: ['babel-polyfill', 'react-hot-loader/patch', join(SRC_PATH, 'main.tsx')]
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
  },
  devServer: require('./devServer.js'),
  module: {
    rules: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: join(MAIN_PATH, 'node_modules', '@stomp')
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            }
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
      process: {
        env: {
          NODE_ENV: JSON.stringify('development')
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
  ]
};

module.exports = merge(common, dev);
