/* eslint-env node */

const path = require('path');

module.exports = {
  context: __dirname,

  entry: './src/index',

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  },

  devServer: {
    contentBase: 'build/', // Relative directory for base of server
    hot: true, // Live-reload
  }

};
