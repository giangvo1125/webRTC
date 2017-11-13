const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

let IP = require('internal-ip').v4();

module.exports = {
  entry: {
    app: './client.js', 
    vendor: [
      'react',
      'react-router',
      'redux',
      'react-dom',
      'lodash',
      'redux-thunk', 
      'redux-logger', 
      'react-select', 
      'moment', 
      'axios', 
      'reselect', 
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      // {
      //   test: /\.css$/i,
      //   loader: ExtractTextPlugin.extract('style',
      //     `css?modules&localIdentName=[name]_[local]__[hash:base64:5]!postcss`),
      // },
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
  postcss: [ 
    autoprefixer({ browsers: ['last 2 versions'] }) 
  ],
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    //optimize webpack
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'), 
        'process.env.CONFIG': JSON.stringify(process.env.CONFIG || 'development'), 
        'ipAdress': JSON.stringify(IP), 
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      'Helper': __dirname + '/src/helperFunction.js',
      'SupportComponent': __dirname + '/src/helperComponent.js',
      'types': __dirname + '/src/constants.js',
      'makeAxios': __dirname + '/src/api/API.js',
      'apiService': __dirname + '/src/api/index.js',
      '_' : 'lodash',
      'axios': 'axios',
      'recharts': 'recharts',
      'config': __dirname + '/config.js',
      'moment': 'moment', 
      'firebase': 'firebase',
      'immutable': 'immutable'
    }), 
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity)
    //end optimize
  ]

};
