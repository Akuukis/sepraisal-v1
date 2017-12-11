var webpack = require('webpack');
var path = require('path');

// variables
var isProduction = process.argv.indexOf('-p') >= 0;
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: sourcePath,
  entry: {
    main: isProduction ?
        './index.ts'
      : 
        [
          'react-hot-loader/patch',
          './index.ts',
        ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'mobx',
      'mobx-react',
      'mobx-react-router'
    ]
  },
  output: {
    path: outPath,
    filename: 'bundle.js',
    publicPath: '/'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main']
  },
  module: {
    loaders: [
      {  // .ts, .tsx
        test: /\.tsx?$/,
        use: isProduction ?
            'awesome-typescript-loader?module=es6'
          :
            [
              'react-hot-loader/webpack',
              'awesome-typescript-loader'
            ]
      },
      {  // css loader for `node_modules/react-table/react-table.css`
          test: /\.css$/,
          loaders: [ 'style-loader', 'css-loader' ],
          // include: paths
      },
      // static assets 
      { test: /\.html$/, use: 'html-loader' },
      // { test: /\.png$/, use: 'url-loader?limit=10000' },
      { test: /\.jpg$/, use: 'file-loader' },
      { test: /\.sbc$/, loader: 'raw-loader' },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      template: 'assets/index.html'
    }),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    stats: {
      warnings: false
    },
  },
};