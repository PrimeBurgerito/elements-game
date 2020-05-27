const {join} = require('path');

const SRC_PATH = join(__dirname, '../src');

module.exports = {
  contentBase: SRC_PATH,
  port: 3003,
  hot: true,
  inline: true,
  historyApiFallback: true,
  disableHostCheck: true,
  stats: 'minimal'
};
