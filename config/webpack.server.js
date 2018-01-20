const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const path = require('path')
const isProd = true

module.exports = {
  devtool: 'source-map',
  entry: {
    server: path.resolve(__dirname, '../src/server/serverProd.ts')
  },

  output: {
    path: path.resolve(__dirname, '../'),
    libraryTarget: 'commonjs2',
    filename: 'server.min.js'
  },
  target: 'node',
  node: {
    console: true,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  module: {
    rules: [
      {
        test: /.*\.tsx?$/,
        include: path.resolve('src'),
        use: ['awesome-typescript-loader?silent'],
      },
    ]
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CheckerPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    })
  ],

  externals: nodeExternals(),
}