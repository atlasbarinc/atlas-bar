module.exports = {
  plugins: {
    "postcss-import": {
      path: "./src/styles"
    },
    'postcss-preset-env': {},
    "postcss-flexbox": {},
    "lost": {},
    "postcss-will-change": {},
    "autoprefixer": {},
    "postcss-clean": {
      level: 2
    }
  }
};