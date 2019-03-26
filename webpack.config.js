const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const MODE = process.env.NODE_ENV;
const devMode = MODE !== 'production';
module.exports = {
  entry: { index: ['react-hot-loader/patch','./client/index.tsx'] },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './wwwroot/dist'),
    filename: devMode ? '[name].js' : `[name].[hash].js`,
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        sideEffects: false,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                require('autoprefixer')({ })
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
        loader: 'url-loader',
        query: {
          limit: 25000
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './server/Views/Shared/_WebpackTemplate.cshtml',
      filename: './..\\..\\server\\Views\\Home\\Index.cshtml',
      inject: true,
      xhtml: true
    }),
    new DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(MODE),
        NODE_ENV: JSON.stringify(MODE)
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ],
  devtool: devMode ? 'inline-source-map' : 'none',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
};
