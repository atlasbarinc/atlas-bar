const path = require('path');
const glob = require('glob');
const config = require('./config');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


function getEntries(pattern, options) {
  const entries = {};
  glob.sync(pattern, options).forEach(file => {
    const ext = file.substr(file.lastIndexOf('.'));
    const fileParts = file.split("/")
    const name = 'widget-' + fileParts[fileParts.length - 2]
    entries[name] = path.join(__dirname, file);
  });
  return entries;
}

const webpackJS = {
  mode: 'development',
  resolve: {
    alias: {
      '@shared': path.resolve(config.sharedPath),
      '@vue': path.resolve(config.vuePath)
    }
  },
  entry: getEntries('./**/app.js'),
  output: {
    path: path.resolve(config.srcPath + '/assets'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              config: { path: path.resolve(__dirname, 'postcss.config.js') }
            }
          },
          { loader: 'sass-loader' },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, config.srcPath + '/styles/global.scss')
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      name: '[name].css'
    })
  ]
};

module.exports = [{ ...webpackJS }];