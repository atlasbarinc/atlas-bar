const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function getEntries(pattern, options) {
  const entries = {};
  glob.sync(pattern, options).forEach(file => {
    const ext = file.substr(file.lastIndexOf("."));
    const name = file.substr(file.lastIndexOf("/") + 1);
    const output = name.replace(ext, "");
    if(!name.startsWith('_') || name !== 'index.js') {
      entries[output] = path.join(__dirname, file);
    }
  });
  return entries;
}

const webpackJS = {
  mode: "development",
  resolve: {
    alias: {
      "@scripts": path.resolve(__dirname, "src/scripts"),
      "@styles": path.resolve(__dirname, "src/styles")
    }
  },
  entry: getEntries("src/scripts/**/*.js", { ignore: 'src/scripts/**/_*.js' }),
  output: {
    path: path.join(__dirname, "src/assets"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              config: { path: path.resolve(__dirname, "postcss.config.js") }
            }
          },
          { loader: "sass-loader" },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, './src/styles/global.scss')
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
    new MiniCssExtractPlugin({
      name: "[name].css"
    })
  ]
};

module.exports = [{ ...webpackJS }];