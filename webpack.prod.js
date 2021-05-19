'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    main: './src/views/index.ts',
  },
  devtool: 'inline-source-map',
  context: path.resolve(__dirname),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:20].js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            dead_code: true,
          },
        },
        cache: false,
        parallel: false,
        sourceMap: false,
      }),
    ],
  },
  module: {
    rules: [
      /****************
       * LOADERS
       *****************/
      {
        test: /\.ts|tsx$/,
        exclude: [/node_modules/],
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/views/index.html',
      chunks: ['main'],
      inject: true,
      filename: 'index.html',
    }),
  ],
};
