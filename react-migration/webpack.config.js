const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'productiont';
const SRC_DIR = __dirname + '/src';
const DIST_DIR = __dirname + '/dist';
const PUBLIC_DIR = __dirname + '/public';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: SRC_DIR + '/index.jsx',
    hostWrappers: ['./host-wrappers/index.js']
  },
  // output: {
  //   path: DIST_DIR,
  //   publicPath: '/',
  //   filename: 'bundle.js'
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        oneOf: [
          {
            test: /\.(sa|sc|c)ss$/,
            exclude: /node_modules/,
            issuer: /ClearCache/, //The same name in components folder and host-wrapper folder
            use: [
              {
                loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                options: {
                  insert: function insertAtTop(element) { // Insert style such us firstchild of shadowdom
                    var findComponent = setInterval(function(){ // Fallback for angular ui-view ready
                      if(document.querySelector('alien-clearcache-wrapper')){
                        document.querySelector('alien-clearcache-wrapper').shadowRoot.prepend(element);
                        clearInterval(findComponent);
                      }
                    }, 10);
                  },
                }
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]'
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  plugins: () => [require('autoprefixer')]
                }
              },
              'sass-loader'
            ]
          }
        ]
      },
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: { minimize: true }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: PUBLIC_DIR + '/index.html',
      filename: './index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ],
  devServer: {
    contentBase: DIST_DIR,
    hot: true,
    port: 9000
  }
};