import path from 'path';
import merge from 'webpack-merge';
import common from './webpack.common';

const MAIN_PATH = path.join(__dirname, '..');
const SRC_PATH = path.join(MAIN_PATH, 'src');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: '/node_modules/',
        loader: 'ts-loader'
      },
    ],
  },
});
