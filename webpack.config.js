/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
  entry: {
    tasks: './webapp/src/tasks/main-vdom.ts',
    worker: './webapp/src/worker/main-Vdom.ts',
    performance: './webapp/src/performance/main.ts',
  },
  output: {
    path: path.resolve(__dirname, 'webapp/www'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './webapp//www',
    port: 7000,
  },
  plugins: [
    new DotenvWebpackPlugin({
      path: './.env',
      safe: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      vue$: 'vue/dist/vue.esm.js', // full build with compiler
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.yaml$/,
        use: [{ loader: 'json-loader' }, { loader: 'yaml-loader' }],
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
