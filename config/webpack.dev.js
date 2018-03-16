/* tslint:disable */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const distPath = path.resolve(__dirname, '../dist');

const plugins = () => {
  const array = [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    CopyWebpackPlugin([
      { from: 'static/css/*', to: `${distPath}/css/[name].[ext]` },
      { from: 'static/images/*', to: `${distPath}/images/[name].[ext]` },
    ]),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor', // Specify the common bundle's name.
    //   minChunks: Infinity,
    //   filename: 'js/[name].js',
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new CheckerPlugin(),
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
    }),
  ];

  return array;
};

module.exports = {
  mode: 'development',
  devtool: 'eval', // eval
  entry: {
    client: ['webpack-hot-middleware/client?name=client', './src/client/index'],
    vendor: ['react', 'react-dom', 'react-router-dom', 'react-redux', 'react-router', 'redux', 'redux-thunk'],
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: 'js/[name]-[chunkhash].js',
    filename: 'js/[name].js',
    publicPath: '/',
    pathinfo: true,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules'],
  },

  module: {
    rules: [
      {
        test: /.*\.tsx?$/,
        include: path.resolve('src'),
        use: ['awesome-typescript-loader?silent'],
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=100000&name=./public/[hash].[ext]',
      },
    ],
  },

  plugins: plugins(),
  externals: [],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    should: 'empty',
    'sinon-restore': 'empty',
    child_process: 'empty',
  },
};
